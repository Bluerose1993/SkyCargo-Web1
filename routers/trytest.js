router.get("/register_packages", auth, async(req, res) => {
    try {
        const role_data = req.user
        const lang_data = req.language_data
        const language_name = req.lang
        const accessdata = await access (req.user)
        const notification_data = await mySqlQury(`SELECT * FROM tbl_notification WHERE received = '${role_data.id}' ORDER BY id DESC LIMIT 5`)
        const register_packages_notification = await mySqlQury(`SELECT * FROM tbl_register_packages`)
        const shipment_notification = await mySqlQury(`SELECT * FROM tbl_shipment`)
        const pickup_notification = await mySqlQury(`SELECT * FROM tbl_pickup`)
        const consolidated_notification = await mySqlQury(`SELECT * FROM tbl_consolidated`)
        
        const prefix_data = await mySqlQury(`SELECT * FROM tbl_shipping_prefix WHERE type = '1'`)
        const agencies_list = await mySqlQury(`SELECT * FROM tbl_agency_group`)
        const office_group_list = await mySqlQury(`SELECT * FROM tbl_office_group`)
        const customers_list = await mySqlQury(`SELECT * FROM tbl_customers WHERE customer_active = 1`)
        const logistics_service_list = await mySqlQury(`SELECT * FROM tbl_logistics_service`)
        const packaging_list = await mySqlQury("SELECT * FROM tbl_packaging")
        const courier_companies_list = await mySqlQury(`SELECT * FROM tbl_courier_companies`)
        const shipping_modes_list = await mySqlQury(`SELECT * FROM tbl_shipping_modes`)
        const shipping_times_list = await mySqlQury(`SELECT * FROM tbl_shipping_times`)
        const drivers_list = await mySqlQury(`SELECT * FROM tbl_drivers WHERE active = 1`)

        const register_packages = await mySqlQury(`SELECT * FROM tbl_register_packages ORDER BY ID DESC LIMIT 1`)

        const taxe_data = await mySqlQury(`SELECT * FROM tbl_taxes`)
        console.log(taxe_data);

        let table = 'register_packages'

        if (register_packages == ""){
            let invoice = '0000' + 1
    
            res.render("add_register_packages", {
                role_data : role_data, lang_data, language_name, notification_data,
                register_packages_notification, shipment_notification, pickup_notification, consolidated_notification,
                agencies_list : agencies_list,
                office_group_list : office_group_list,
                customers_list : customers_list,
                logistics_service_list : logistics_service_list,
                packaging_list : packaging_list,
                courier_companies_list : courier_companies_list,
                shipping_modes_list : shipping_modes_list,
                shipping_times_list : shipping_times_list,
                drivers_list : drivers_list,
                invoice, prefix_data,
                table, taxe_data : taxe_data[0],
                accessdata,
            })
        } else {

            if (register_packages[0].id < 100) {
                let invoice = '0000' + (register_packages[0].id + 1)
    
                res.render("add_register_packages", {
                    role_data : role_data, lang_data, language_name, notification_data,
                    register_packages_notification, shipment_notification, pickup_notification, consolidated_notification,
                    agencies_list : agencies_list,
                    office_group_list : office_group_list,
                    customers_list : customers_list,
                    logistics_service_list : logistics_service_list,
                    packaging_list : packaging_list,
                    courier_companies_list : courier_companies_list,
                    shipping_modes_list : shipping_modes_list,
                    shipping_times_list : shipping_times_list,
                    drivers_list : drivers_list,
                    invoice, prefix_data,
                    table,
                    taxe_data : taxe_data[0],
                    accessdata,
                    
                })
            }else if (register_packages[0].id > 100) {
                let invoice = '000' + (register_packages[0].id + 1)
                
                res.render("add_register_packages", {
                    role_data : role_data, lang_data, language_name, notification_data,
                    register_packages_notification, shipment_notification, pickup_notification, consolidated_notification,
                    agencies_list : agencies_list,
                    office_group_list : office_group_list,
                    customers_list : customers_list,
                    logistics_service_list : logistics_service_list,
                    packaging_list : packaging_list,
                    courier_companies_list : courier_companies_list,
                    shipping_modes_list : shipping_modes_list,
                    shipping_times_list : shipping_times_list,
                    drivers_list : drivers_list,
                    invoice, prefix_data,
                    table,
                    taxe_data : taxe_data[0],
                    accessdata,
                    
                })
            }else if (register_packages[0].id > 1000) {
                let invoice = '00' + (register_packages[0].id + 1)
                
                res.render("add_register_packages", {
                    role_data : role_data, lang_data, language_name, notification_data,
                    register_packages_notification, shipment_notification, pickup_notification, consolidated_notification,
                    agencies_list : agencies_list,
                    office_group_list : office_group_list,
                    customers_list : customers_list,
                    logistics_service_list : logistics_service_list,
                    packaging_list : packaging_list,
                    courier_companies_list : courier_companies_list,
                    shipping_modes_list : shipping_modes_list,
                    shipping_times_list : shipping_times_list,
                    drivers_list : drivers_list,
                    invoice, prefix_data,
                    table,
                    taxe_data : taxe_data[0],
                    accessdata,
                    
                })
            } else if (register_packages[0].id > 10000) {
                let invoice = '0' + (register_packages[0].id + 1)
                
                res.render("add_register_packages", {
                    role_data : role_data, lang_data, language_name, notification_data,
                    register_packages_notification, shipment_notification, pickup_notification, consolidated_notification,
                    agencies_list : agencies_list,
                    office_group_list : office_group_list,
                    customers_list : customers_list,
                    logistics_service_list : logistics_service_list,
                    packaging_list : packaging_list,
                    courier_companies_list : courier_companies_list,
                    shipping_modes_list : shipping_modes_list,
                    shipping_times_list : shipping_times_list,
                    drivers_list : drivers_list,
                    invoice, prefix_data,
                    table,
                    taxe_data : taxe_data[0],
                    accessdata,
                    
                })
            }else {
                let invoice = (register_packages[0].id + 1)
                
                res.render("add_register_packages", {
                    role_data : role_data, lang_data, language_name, notification_data,
                    register_packages_notification, shipment_notification, pickup_notification, consolidated_notification,
                    agencies_list : agencies_list,
                    office_group_list : office_group_list,
                    customers_list : customers_list,
                    logistics_service_list : logistics_service_list,
                    packaging_list : packaging_list,
                    courier_companies_list : courier_companies_list,
                    shipping_modes_list : shipping_modes_list,
                    shipping_times_list : shipping_times_list,
                    drivers_list : drivers_list,
                    invoice, prefix_data,
                    table,
                    taxe_data : taxe_data[0],
                    accessdata,
                    
                })
            }
        }

    } catch (error) {
        console.log(error);
    }
})

router.get("/add_pre_alert_packages/:id", auth, async(req, res) => {
    try {
        const role_data = req.user
        const lang_data = req.language_data
        const language_name = req.lang
        const accessdata = await access (req.user)
        const notification_data = await mySqlQury(`SELECT * FROM tbl_notification WHERE received = '${role_data.id}' ORDER BY id DESC LIMIT 5`)
        const register_packages_notification = await mySqlQury(`SELECT * FROM tbl_register_packages`)
        const shipment_notification = await mySqlQury(`SELECT * FROM tbl_shipment`)
        const pickup_notification = await mySqlQury(`SELECT * FROM tbl_pickup`)
        const consolidated_notification = await mySqlQury(`SELECT * FROM tbl_consolidated`)

        const pre_alert_data = await mySqlQury(`SELECT * FROM tbl_pre_alert WHERE id = '${req.params.id}'`)
        

        const prefix_data = await mySqlQury(`SELECT * FROM tbl_shipping_prefix WHERE type = '1'`)
        const agencies_list = await mySqlQury(`SELECT * FROM tbl_agency_group`)
        const office_group_list = await mySqlQury(`SELECT * FROM tbl_office_group`)
        const customers_list = await mySqlQury(`SELECT * FROM tbl_customers WHERE customer_active = 1`)
        const logistics_service_list = await mySqlQury(`SELECT * FROM tbl_logistics_service`)
        const packaging_list = await mySqlQury("SELECT * FROM tbl_packaging")
        const courier_companies_list = await mySqlQury(`SELECT * FROM tbl_courier_companies`)
        const shipping_modes_list = await mySqlQury(`SELECT * FROM tbl_shipping_modes`)
        const shipping_times_list = await mySqlQury(`SELECT * FROM tbl_shipping_times`)
        const drivers_list = await mySqlQury(`SELECT * FROM tbl_drivers WHERE active = 1`)


        const edit_customers_data = await mySqlQury(`SELECT * FROM tbl_customers WHERE login_id = '${pre_alert_data[0].customer_name}'`)
        const country = edit_customers_data[0].customers_country.split(',');
        const state = edit_customers_data[0].customers_state.split(',');
        const city = edit_customers_data[0].customers_city.split(',');
        const zipcode = edit_customers_data[0].customers_zipcode.split(',');
        const address = edit_customers_data[0].customers_address.split(',');
        const countries_list = await mySqlQury("SELECT * FROM tbl_countries")
        const state_list = await mySqlQury("SELECT * FROM tbl_states")
        const city_list = await mySqlQury("SELECT * FROM tbl_city")


        const register_packages = await mySqlQury(`SELECT * FROM tbl_register_packages ORDER BY ID DESC LIMIT 1`)
        const taxe_data = await mySqlQury(`SELECT * FROM tbl_taxes`)

        let table = 'pre_alert'

        if (register_packages == "") {
            let invoice = '0000' + 1
    
            res.render("add_register_packages", {
                role_data : role_data, lang_data, language_name, notification_data,
                register_packages_notification, shipment_notification, pickup_notification, consolidated_notification,
                agencies_list : agencies_list,
                office_group_list : office_group_list,
                customers_list : customers_list,
                logistics_service_list : logistics_service_list,
                packaging_list : packaging_list,
                courier_companies_list : courier_companies_list,
                shipping_modes_list : shipping_modes_list,
                shipping_times_list : shipping_times_list,
                drivers_list : drivers_list,
                invoice, prefix_data,
                taxe_data : taxe_data[0],
                accessdata,
                table, country, state, city, zipcode, address, countries_list, state_list, city_list,
                pre_alert_data : pre_alert_data[0]
                
            })
        } else {

            if (register_packages[0].id < 100) {
                let invoice = '0000' + (register_packages[0].id + 1)
    
                res.render("add_register_packages", {
                    role_data : role_data, lang_data, language_name, notification_data,
                    register_packages_notification, shipment_notification, pickup_notification, consolidated_notification,
                    agencies_list : agencies_list,
                    office_group_list : office_group_list,
                    customers_list : customers_list,
                    logistics_service_list : logistics_service_list,
                    packaging_list : packaging_list,
                    courier_companies_list : courier_companies_list,
                    shipping_modes_list : shipping_modes_list,
                    shipping_times_list : shipping_times_list,
                    drivers_list : drivers_list,
                    invoice, prefix_data,
                    taxe_data : taxe_data[0],
                    accessdata,
                    table, country, state, city, zipcode, address, countries_list, state_list, city_list,
                    pre_alert_data : pre_alert_data[0]
                    
                })
            }else if (register_packages[0].id > 100) {
                let invoice = '000' + (register_packages[0].id + 1)
                
                res.render("add_register_packages", {
                    role_data : role_data, lang_data, language_name, notification_data,
                    register_packages_notification, shipment_notification, pickup_notification, consolidated_notification,
                    agencies_list : agencies_list,
                    office_group_list : office_group_list,
                    customers_list : customers_list,
                    logistics_service_list : logistics_service_list,
                    packaging_list : packaging_list,
                    courier_companies_list : courier_companies_list,
                    shipping_modes_list : shipping_modes_list,
                    shipping_times_list : shipping_times_list,
                    drivers_list : drivers_list,
                    invoice, prefix_data,
                    taxe_data : taxe_data[0],
                    accessdata,
                    table, country, state, city, zipcode, address, countries_list, state_list, city_list,
                    pre_alert_data : pre_alert_data[0]
                    
                })
            }else if (register_packages[0].id > 1000) {
                let invoice = '00' + (register_packages[0].id + 1)
                
                res.render("add_register_packages", {
                    role_data : role_data, lang_data, language_name, notification_data,
                    register_packages_notification, shipment_notification, pickup_notification, consolidated_notification,
                    agencies_list : agencies_list,
                    office_group_list : office_group_list,
                    customers_list : customers_list,
                    logistics_service_list : logistics_service_list,
                    packaging_list : packaging_list,
                    courier_companies_list : courier_companies_list,
                    shipping_modes_list : shipping_modes_list,
                    shipping_times_list : shipping_times_list,
                    drivers_list : drivers_list,
                    invoice, prefix_data,
                    taxe_data : taxe_data[0],
                    accessdata,
                    table, country, state, city, zipcode, address, countries_list, state_list, city_list,
                    pre_alert_data : pre_alert_data[0]
                    
                })
            }else if (register_packages[0].id > 10000) {
                let invoice = '0' + (register_packages[0].id + 1)
                
                res.render("add_register_packages", {
                    role_data : role_data, lang_data, language_name, notification_data,
                    register_packages_notification, shipment_notification, pickup_notification, consolidated_notification,
                    agencies_list : agencies_list,
                    office_group_list : office_group_list,
                    customers_list : customers_list,
                    logistics_service_list : logistics_service_list,
                    packaging_list : packaging_list,
                    courier_companies_list : courier_companies_list,
                    shipping_modes_list : shipping_modes_list,
                    shipping_times_list : shipping_times_list,
                    drivers_list : drivers_list,
                    invoice, prefix_data,
                    taxe_data : taxe_data[0],
                    accessdata,
                    table, country, state, city, zipcode, address, countries_list, state_list, city_list,
                    pre_alert_data : pre_alert_data[0]
                    
                })
            }else {
                let invoice = (register_packages[0].id + 1)
                
                res.render("add_register_packages", {
                    role_data : role_data, lang_data, language_name, notification_data,
                    register_packages_notification, shipment_notification, pickup_notification, consolidated_notification,
                    agencies_list : agencies_list,
                    office_group_list : office_group_list,
                    customers_list : customers_list,
                    logistics_service_list : logistics_service_list,
                    packaging_list : packaging_list,
                    courier_companies_list : courier_companies_list,
                    shipping_modes_list : shipping_modes_list,
                    shipping_times_list : shipping_times_list,
                    drivers_list : drivers_list,
                    invoice, prefix_data,
                    taxe_data : taxe_data[0],
                    accessdata,
                    table, country, state, city, zipcode, address, countries_list, state_list, city_list,
                    pre_alert_data : pre_alert_data[0]
                    
                })
            }
        }


    } catch (error) {
        console.log(error);
    }
})