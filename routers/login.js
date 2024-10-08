const express = require("express");
const app = express();
const router = express.Router();
const {mySqlQury} = require('../middleware/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const access = require('../middleware/access');
const countryCodes = require('country-codes-list')


// =========== login ============= //

router.get("/", async(req, res) => {
    try {
        const accessdata = await access (req.user)

        const data = await mySqlQury(`SELECT * FROM tbl_general_settings`)
        console.log(data);

        const customer_data = await mySqlQury(`SELECT * FROM tbl_customers WHERE customer_active = '1' ORDER BY id LIMIT 1`)
        console.log(customer_data);
        
        res.render("login", {data, customer_data, accessdata})
    } catch (error) {
        console.log(error);
    }
})

router.get("/validate", async(req, res) => {
    try {
        const accessdata = await access (req.user)

        const data = await mySqlQury(`SELECT * FROM tbl_general_settings`)
        console.log(data);

        const customer_data = await mySqlQury(`SELECT * FROM tbl_customers WHERE customer_active = '1' ORDER BY id LIMIT 1`)
        console.log(customer_data);
        
        res.render("validate", {data, customer_data, accessdata})
    } catch (error) {
        console.log(error);
    }
})


router.post("/", async(req, res) => {
    try {
        const {email, password} = req.body
        
        const query = "SELECT * FROM tbl_admin WHERE email='"+email+"'"

        const data = await mySqlQury(query);
        console.log("login data", data);
        
        if (!data[0]) {
            
            req.flash('errors', `your email is not register`)
            return res.redirect("/")
        }

        const hash_pass = await bcrypt.compare(password, data[0].password)

        if (!hash_pass){

            req.flash('errors', `your password is wrong`)
            return res.redirect("/")
        }

        if (data[0].role == '2') {
            let customer_data = await mySqlQury(`SELECT * FROM tbl_customers WHERE email = '${data[0].email}'`)
            
            if (customer_data[0].customer_active == '0') {
                req.flash('errors', `waiting for approval.!`)
                return res.redirect("/")
            }
        }

        if (data[0].role == '3') {
            let drivers_data = await mySqlQury(`SELECT * FROM tbl_drivers WHERE email = '${data[0].email}'`)

            if (drivers_data[0].active == '0') {
                req.flash('errors', `waiting for approval.!`)
                return res.redirect("/")
            }
        }


        const token = jwt.sign({id : data[0].id, name : data[0].first_name, email : data[0].email, role : data[0].role }, process.env.TOKEN_KEY)
        console.log("login token", token);

        res.cookie("jwt", token, {expires : new Date(Date.now() + 60000 * 60)})

        const lang = req.cookies.lang

        if (lang == undefined) {
            const lang_data = jwt.sign({lang : 'en'}, process.env.TOKEN)
            res.cookie("lang", lang_data)
        }

        req.flash('success', `login successfully`)
        res.redirect("/index")
    } catch (error) {
        console.log(error);
    }
})


// =========== lang ============= //

router.get("/lang/:id", async(req, res) => {
    try {
        console.log(req.params.id);
        const token = jwt.sign({lang : req.params.id}, process.env.TOKEN)
        res.cookie("lang", token)
        
        res.status(200).json({token})
    } catch (error) {
        console.log(error);
    }
})


// =========== customers sign_up ============= //

router.get("/sign_up", async(req, res) => {
    try {
        const accessdata = await access (req.user)

        const data = await mySqlQury(`SELECT * FROM tbl_general_settings`)

        const countries = await mySqlQury(`SELECT * FROM tbl_countries`)
        const states = await mySqlQury(`SELECT * FROM tbl_states`)
        const city = await mySqlQury(`SELECT * FROM tbl_city`)

        const Country_name = countryCodes.customList('countryCode', '{countryCode}')
        const nameCode = Object.values(Country_name)

        const myCountryCodesObject = countryCodes.customList('countryCode', '+{countryCallingCode}')
        const CountryCode = Object.values(myCountryCodesObject)
        
        res.render("sign_up", {data, countries, states, city, accessdata, nameCode, CountryCode})
    } catch (error) {
        console.log(error);
    }
})

router.get("/country/ajax/:id", async(req, res) => {
    try {
        
        const state_data = await mySqlQury(`SELECT * FROM tbl_states WHERE countries_id = '${req.params.id}'`)
        console.log(1111111, state_data);
        
        res.status(200).json({ state_data })
    } catch (error) {
        console.log(error);
    }
})

router.get("/state/ajax/:id", async(req, res) => {
    try {
        const query = `SELECT * FROM tbl_city WHERE state_id = '${req.params.id}'`
        const city_data = await mySqlQury(query)
        
        res.status(200).json({ city_data })
    } catch (error) {
        console.log(error);
    }
})

router.post("/sign_up", async(req, res) => {
    try {
        const {first_name, last_name, email, country_code, phone_no, password, address,solebe, country, state, city, zip_code} = req.body

        const hash = await bcrypt.hash(password, 10)

        let query = `INSERT INTO tbl_admin (first_name, last_name, email, country_code, phone_no,solebe, password, role) VALUE ('${first_name}', '${last_name}', '${email}','${solebe}', '${country_code}', '${phone_no}', '${hash}', 2)`
        await mySqlQury(query)

        const admin_data = await mySqlQury(`SELECT * FROM tbl_admin WHERE email = '${email}'`)
        console.log(admin_data);

        let customer_data = `INSERT INTO tbl_customers (first_name, last_name, email, country_code, mobile, customers_country, customers_state, customers_city, customers_zipcode, customers_address, customer_active, login_id,solebe) VALUE
        ('${first_name}', '${last_name}', '${email}', '${country_code}', '${phone_no}', '${country}', '${state}', '${city}', '${zip_code}', '${address}', '0', '${admin_data[0].id}', '${solebe}')`;
        await mySqlQury(customer_data)

        req.flash('success', `Your information will be sent to the administration for approval.!`)
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
})


// ========== New Trackings ========= //


router.get("/track", async(req, res) => {
    try {
        const accessdata = await access (req.user)
        const data = await mySqlQury(`SELECT * FROM tbl_general_settings`)

        res.render("sing_up_d", {data, accessdata})
    } catch (error) {
        console.log(error);
    }
})

router.post("/track", async (req, res) => {
    try {
        const { first_name } = req.body;

        // Use parameterized query to prevent SQL injection and ensure proper formatting
        const tracking_info = await mySqlQury(`SELECT tbl_register_packages.*, (select tbl_customers.first_name from tbl_customers where tbl_register_packages.customer = tbl_customers.id) as customer_firstname,
            (select tbl_customers.last_name from tbl_customers where tbl_register_packages.customer = tbl_customers.id) as customer_lastname
            FROM tbl_register_packages WHERE invoice ='${first_name}'`);
            res.render("sing_up_d", {tracking_info});
        
    } catch (error) {
        console.log(error);
        req.flash('error', 'An error occurred while processing your request.');
        res.redirect('/'); // Redirect to an error page or the home page
    }
});


// ========== drivers sing_up ========= //

router.get("/driver_singup", async(req, res) => {
    try {
        const accessdata = await access (req.user)
        const data = await mySqlQury(`SELECT * FROM tbl_general_settings`)

        res.render("sing_up_driver", {data, accessdata})
    } catch (error) {
        console.log(error);
    }
})

router.post("/driver_singup", async(req, res) => {
    try {
        const {first_name, last_name, email, phone_no, vehicle_plate, password} = req.body

        const hash = await bcrypt.hash(password, 10)

        let query = "INSERT INTO tbl_admin (first_name, last_name, email, phone_no, password, role) VALUE ('"+ first_name +"', '"+ last_name +"', '"+ email +"', '"+ phone_no +"', '"+ hash +"', 3)"
        await mySqlQury(query)

        const admin_data = await mySqlQury(`SELECT * FROM tbl_admin WHERE email = '${email}'`)
        console.log(admin_data);

        let drivers_data = `INSERT INTO tbl_drivers (first_name, last_name, email, mobile, vehicle_plate, active, login_id) VALUE
        ('${first_name}', '${last_name}', '${email}', '${phone_no}', '${vehicle_plate}', '0', '${admin_data[0].id}')`
        await mySqlQury(drivers_data)

        req.flash('success', `Your information will be sent to the administration for approval.!`)
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
})



// =========== logout ============ //
router.get("/logout", (req, res) => {
    res.clearCookie("jwt")

    res.redirect('/');
});


// ========= tracking ============= //

router.get("/tracking", async(req, res) => {
    try {
        const accessdata = await access (req.user)
        console.log(accessdata);
        const general_settings_data = await mySqlQury(`SELECT * FROM tbl_general_settings`)

        res.render("tracking", {
            general_settings_data : general_settings_data[0],
            accessdata
        })
    } catch (error) {
        console.log(error);
    }
})

router.post("/tracking/ajax", async (req, res) => {
    try {
        const { invoice_no, shipment_type } = req.body;
        let data, tracking_data, edit_data, country, city, address, countries_list, city_list;

        // Perform the appropriate query based on the shipment_type
        if (shipment_type == '1') {
            data = await mySqlQury(`SELECT tbl_register_packages.*, 
                                    (SELECT tbl_customers.first_name FROM tbl_customers WHERE tbl_register_packages.customer = tbl_customers.id) AS customer_firstname, 
                                    (SELECT tbl_customers.last_name FROM tbl_customers WHERE tbl_register_packages.customer = tbl_customers.id) AS customer_lastname 
                                    FROM tbl_register_packages WHERE invoice ='${invoice_no}'`);

            if (!data.length) {
                return res.status(200).json({ status: 'error', message: 'Tracking Number Not Found Kindly Check if your ID is correct or you have selected the right Shipment type' });
            }

            edit_data = await mySqlQury(`SELECT * FROM tbl_customers WHERE id = '${data[0].customer}'`);
        } 
        else if (shipment_type == '2') {
           /* data = await mySqlQury(`SELECT tbl_shipment.*, 
                                    (SELECT tbl_customers.first_name FROM tbl_customers WHERE tbl_shipment.customer = tbl_customers.id) AS customer_firstname, 
                                    (SELECT tbl_customers.last_name FROM tbl_customers WHERE tbl_shipment.customer = tbl_customers.id) AS customer_lastname, 
                                    (SELECT tbl_client.first_name FROM tbl_client WHERE tbl_shipment.client = tbl_client.id) AS client_firstname, 
                                    (SELECT tbl_client.last_name FROM tbl_client WHERE tbl_shipment.client = tbl_client.id) AS client_lastname 
                                    FROM tbl_shipment WHERE invoice ='${invoice_no}'`);*/ /*The existing and working code */
                data = await mySqlQury(`SELECT tbl_shipment.*, 
                                        (SELECT tbl_customers.first_name FROM tbl_customers WHERE tbl_shipment.customer = tbl_customers.id) AS customer_firstname, 
                                        (SELECT tbl_customers.last_name FROM tbl_customers WHERE tbl_shipment.customer = tbl_customers.id) AS customer_lastname, 
                                        (SELECT tbl_client.first_name FROM tbl_client WHERE tbl_shipment.client = tbl_client.id) AS client_firstname, 
                                        (SELECT tbl_client.last_name FROM tbl_client WHERE tbl_shipment.client = tbl_client.id) AS client_lastname,
                                        (SELECT tbl_client.address FROM tbl_client WHERE tbl_shipment.client = tbl_client.id) AS client_address,
                                        (SELECT tbl_client.country FROM tbl_client WHERE tbl_shipment.client = tbl_client.id) AS client_country,
                                        (SELECT tbl_countries.countries_name FROM tbl_countries WHERE tbl_countries.id = tbl_client.country) AS country_name
                                        FROM tbl_shipment 
                                        JOIN tbl_client ON tbl_shipment.client = tbl_client.id
                                        WHERE tbl_shipment.invoice = '${invoice_no}'`);
      
      
      

            if (!data.length) {
                return res.status(200).json({ status: 'error', message: 'Tracking Number Not Found Kindly Check if your ID is correct or you have selected the right Shipment type' });
            }

            edit_data = await mySqlQury(`SELECT * FROM tbl_customers WHERE id = '${data[0].customer}'`);
        } 
        else if (shipment_type == '3') {
            data = await mySqlQury(`SELECT tbl_pickup.*, 
                                    (SELECT tbl_customers.first_name FROM tbl_customers WHERE tbl_pickup.customer = tbl_customers.id) AS customer_firstname, 
                                    (SELECT tbl_customers.last_name FROM tbl_customers WHERE tbl_pickup.customer = tbl_customers.id) AS customer_lastname, 
                                    (SELECT tbl_client.first_name FROM tbl_client WHERE tbl_pickup.client = tbl_client.id) AS client_firstname, 
                                    (SELECT tbl_client.last_name FROM tbl_client WHERE tbl_pickup.client = tbl_client.id) AS client_lastname 
                                    FROM tbl_pickup WHERE invoice ='${invoice_no}'`);

            if (!data.length) {
                return res.status(200).json({ status: 'error', message: 'Tracking Number Not Found Kindly Check if your ID is correct or you have selected the right Shipment type' });
            }

            edit_data = await mySqlQury(`SELECT * FROM tbl_customers WHERE id = '${data[0].customer}'`);
        } 
        else if (shipment_type == '4') {
            data = await mySqlQury(`SELECT tbl_consolidated.*, 
                                    (SELECT tbl_customers.first_name FROM tbl_customers WHERE tbl_consolidated.customer = tbl_customers.id) AS customer_firstname, 
                                    (SELECT tbl_customers.last_name FROM tbl_customers WHERE tbl_consolidated.customer = tbl_customers.id) AS customer_lastname, 
                                    (SELECT tbl_client.first_name FROM tbl_client WHERE tbl_consolidated.client = tbl_client.id) AS client_firstname, 
                                    (SELECT tbl_client.last_name FROM tbl_client WHERE tbl_consolidated.client = tbl_client.id) AS client_lastname 
                                    FROM tbl_consolidated WHERE invoice ='${invoice_no}'`);

            if (!data.length) {
                return res.status(200).json({ status: 'error', message: 'Tracking Number Not Found Kindly Check if your ID is correct or you have selected the right Shipment type' });
            }

            edit_data = await mySqlQury(`SELECT * FROM tbl_customers WHERE id = '${data[0].customer}'`);
        }

        // Handle case when `edit_data` is found
        if (edit_data && edit_data.length > 0) {
            country = edit_data[0].customers_country.split(',');
            city = edit_data[0].customers_city.split(',');
            address = edit_data[0].customers_address.split(',');
        }

        // Common data fetching for all types
        countries_list = await mySqlQury("SELECT * FROM tbl_countries");
        city_list = await mySqlQury("SELECT * FROM tbl_city");

        tracking_data = await mySqlQury(`SELECT tbl_tracking_history.*, 
                                        (SELECT tbl_countries.countries_name FROM tbl_countries WHERE tbl_tracking_history.location = tbl_countries.id) AS countries_name, 
                                        (SELECT tbl_shipping_status.status_name FROM tbl_shipping_status WHERE tbl_tracking_history.delivery_status = tbl_shipping_status.id) AS status_name 
                                        FROM tbl_tracking_history WHERE invoice = '${invoice_no}'`);

        res.status(200).json({ 
            status: 'success', 
            data, 
            country, 
            city, 
            address, 
            countries_list, 
            city_list, 
            tracking_data 
        });

    } catch (error) {
        console.error("Error fetching tracking data:", error);
        res.status(500).json({ status: 'error', message: 'Internal server error', error: error.message });
    }
});


module.exports = router;