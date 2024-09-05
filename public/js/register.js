     // ========== register_packages ========== //

      $(document).on("select2:select", "#register_packages_customer", function () {
        var value = $("#register_packages_customer").select2('val')
        
        var base_url = window.location.origin;
        
        $.ajax({
            url: base_url + "/online_shopping/address/ajax/" + value,
            type: "GET",
            dataType: "JSON",
            success: function (res) {
              $("#customer_address").html('<option value selected disabled>Select State</option>')
              
              $.each(res.country, function (index, value) {

                res.countries_list.forEach((data, i) => {
                  if (data.id == value) {

                    res.state_list.forEach((state_list) => {
                      if (state_list.id == res.state[index]) {

                        res.city_list.forEach((city_list) => {
                          if (city_list.id == res.city[index]) {
                            
                            $("#customer_address").append('<option value="' + res.address[index] + '"> ' + "Country : " + data.countries_name + " | State : " + state_list.state_name + " | City : " + city_list.city_name + " | Zip COde : " + res.zipcode[index] + " | Address : " + res.address[index] +' </option>')
                          }
                        })

                      }
                    })
                    
                  }
                });

              })
            }
        })
      })


      $(document).on("click", "#register_add_box", function () {
        $("#register_add_row").append(
            '<div class="row mb-3 package_information">'+
                '<div class="col-lg-1 col-md-4 d-flex align-items-start flex-column">'+
                  '<label class="form-label mb-auto" for="validationCustom01">'+ $("#json_Package_Name").text() +'</label>'+
                  '<input class="form-control form-control-sm" type="text" name="package_name" placeholder="Name">'+
                '</div>'+
                '<div class="col-lg-2 col-md-4 d-flex align-items-start flex-column">'+
          '<label class="form-label mb-auto" for="register_packages_type">Type</label>'+
          '<select class="form-control form-control-sm" name="package_type" id="register_packages_type">'+
            '<option value="1">Gold</option>'+
            '<option value="2">Land</option>'+
          '</select>'+
        '</div>'+

                '<div class="col-lg-2 col-md-4 d-flex align-items-start flex-column">'+
                  '<label class="form-label mb-auto" for="validationCustom01">'+ $("#json_Package_Description").text() +'</label>'+
                  '<input class="form-control form-control-sm" type="text" name="package_description" placeholder="Description">'+
                '</div>'+

                '<div class="col-lg-1 col-md-4 d-flex align-items-start flex-column">'+
                  '<label class="form-label mb-auto" for="validationCustom01">'+ $("#json_Amount").text() +'</label>'+
                  '<input class="form-control form-control-sm" type="number" name="package_amount" placeholder="Amount" step="0.01">'+
                '</div>'+

                '<div class="col-lg-1 col-md-4 d-flex align-items-start flex-column">'+
                  '<label class="form-label mb-auto" for="validationCustom01">'+ $("#json_Weight").text() +'</label>'+
                  '<input class="form-control form-control-sm register_packages_weight" type="number" name="weight" value="0" min="0" step="0.01">'+
                '</div>'+

                '<div class="col-lg-1 col-md-4 d-flex align-items-start flex-column">'+
                  '<label class="form-label mb-auto" for="validationCustom01">'+ $("#json_Length").text() +'</label>'+
                  '<input class="form-control form-control-sm register_packages_sum" type="number" name="length" id="register_packages_length" value="0" min="0">'+
                '</div>'+

                '<div class="col-lg-1 col-md-4 d-flex align-items-start flex-column">'+
                  '<label class="form-label mb-auto" for="validationCustom01">'+ $("#json_Width").text() +'</label>'+
                  '<input class="form-control form-control-sm register_packages_sum" type="number" name="width" id="register_packages_width" value="0" min="0">'+
                '</div>'+

                '<div class="col-lg-1 col-md-4 d-flex align-items-start flex-column">'+
                  '<label class="form-label mb-auto" for="validationCustom01">'+ $("#json_Height").text() +'</label>'+
                  '<input class="form-control form-control-sm register_packages_sum" type="number" name="height" id="register_packages_height" value="0" min="0">'+
                '</div>'+

                '<div class="col-lg-1 col-md-4 d-flex align-items-start flex-column">'+
                  '<label class="form-label mb-auto" for="validationCustom01">'+ $("#json_Weight_Vol").text() +' <i class="fa fa-info-circle" data-bs-toggle="tooltip" data-bs-placement="top" title="L x W x H / Volume percentage"></i></label>'+
                  '<input class="form-control form-control-sm register_packages_weight_vol" type="number" name="weight_vol" id="register_packages_weight_vol" placeholder="0" readonly>'+
                '</div>'+

                '<div class="col-lg-1 col-md-4 d-flex align-items-start flex-column">'+
                  '<label class="form-label mb-auto" for="validationCustom01">'+ $("#json_Fixed_charge").text() +'</label>'+
                  '<input class="form-control form-control-sm register_packages_f_charge" type="number" name="f_charge" value="0" min="0">'+
                '</div>'+

                '<div class="col-lg-1 col-md-4 d-flex align-items-start flex-column">'+
                  '<label class="form-label mb-auto" for="validationCustom01">'+ $("#json_DecValue").text() +'</label>'+
                  '<input class="form-control form-control-sm register_packages_decvalue" type="number" name="decvalue" value="0" min="0">'+
                '</div>'+

                '<div class="col-lg-1 col-md-4 d-flex align-items-center mt-4">'+
                  '<a type="submit" id="package_information_remove"><i class="icon-trash f-20 font-danger"></i></a>'+
                '</div>'+
            '</div>'
        )
      })

      $(document).on("click", "#package_information_remove", function () {
        
        $(this).parents('.package_information').remove();

        var weight_vol = 0;
        $('.register_packages_weight_vol').each(function(){
          weight_vol += parseFloat($(this).val());
        });
        
        var weight = 0;
        $('.register_packages_weight').each(function(){
          weight += parseFloat($(this).val());
        });
        
        var decvalue = 0;
        $('.register_packages_decvalue').each(function(){
          decvalue += parseFloat($(this).val());
        });
        
        var f_charge = 0;
        $('.register_packages_f_charge').each(function(){
          f_charge += parseFloat($(this).val());
        });

        subtotal = (weight_vol * $("#add_price_kg").val()).toFixed(2)
        
        $("#total_weight").val(weight.toFixed(2))
        $("#total_weight_vol").val(weight_vol.toFixed(2))
        $("#total_decvalue").val(decvalue.toFixed(2))
        $("#subtotal").val(subtotal)
        $("#discount").val(( (subtotal / 100) * $("#add_discount").val() ).toFixed(2))

        if (parseFloat(subtotal) < parseFloat($("#discount").val())) {
          toastr.error('The discount cannot be greater than the subtotal')
          $("#shipment_submit").addClass('disabled')
        }else{
          $("#shipment_submit").removeClass('disabled')
        }

        $("#shipping_insurance").val( (($("#add_value_assured").val() / 100) * $("#add_shipping_insurance").val()).toFixed(2) )
        $("#customs_duties").val( ( (weight + weight_vol) * $("#add_customs_duties").val() ).toFixed(2) )
        $("#hidden_customs_duties").val( ( (weight + weight_vol) * $("#add_customs_duties").val() ).toFixed(2) )

        if ($("#tax_count").val() == 1) {
          
          $("#tax").val( ( (subtotal / 100 ) * $("#add_tax").val()).toFixed(2) )
        } else {
          
          $("#tax").val( $("#add_tax").val() )
        }

        $("#declared_value").val( ( ( decvalue / 100) * $("#add_declared_value").val() ).toFixed(2) )
        $("#fixed_charge").val(f_charge)
        $("#reissue").val($("#add_reissue").val())

        $("#total").val( ( parseFloat($("#subtotal").val()) + parseFloat($("#shipping_insurance").val()) + parseFloat($("#customs_duties").val()) + parseFloat($("#tax").val()) + parseFloat($("#declared_value").val()) + parseFloat($("#fixed_charge").val()) + parseFloat($("#reissue").val()) - parseFloat($("#discount").val()) ).toFixed(2) )
        
      })

      $(document).on("input", ".register_packages_sum", function () {
        var currentRow=$(this).closest(".package_information");
        
        currentRow.find("#register_packages_weight_vol").val( (parseFloat(currentRow.find("#register_packages_length").val()) * parseFloat(currentRow.find("#register_packages_width").val()) * parseFloat(currentRow.find("#register_packages_height").val()) / $("#register_packages_vol_per").val()).toFixed(2) )

        var weight_vol = 0;
        $('.register_packages_weight_vol').each(function(){
          weight_vol += parseFloat($(this).val());
        });
        
        var weight = 0;
        $('.register_packages_weight').each(function(){
          weight += parseFloat($(this).val());
        });
        
        var decvalue = 0;
        $('.register_packages_decvalue').each(function(){
          decvalue += parseFloat($(this).val());
        });
        
        var f_charge = 0;
        $('.register_packages_f_charge').each(function(){
          f_charge += parseFloat($(this).val());
        });

        subtotal = (weight_vol * $("#add_price_kg").val()).toFixed(2)
        
        $("#total_weight").val(weight.toFixed(2))
        $("#total_weight_vol").val(weight_vol.toFixed(2))
        $("#total_decvalue").val(decvalue.toFixed(2))
        $("#subtotal").val(subtotal)
        $("#discount").val(( (subtotal / 100) * $("#add_discount").val() ).toFixed(2))
        
        if (parseFloat(subtotal) < parseFloat($("#discount").val())) {
          toastr.error('The discount cannot be greater than the subtotal')
          $("#shipment_submit").addClass('disabled')
        }else{
          $("#shipment_submit").removeClass('disabled')
        }

        $("#shipping_insurance").val( (($("#add_value_assured").val() / 100) * $("#add_shipping_insurance").val()).toFixed(2) )
        $("#customs_duties").val( ( (weight + weight_vol) * $("#add_customs_duties").val() ).toFixed(2) )
        $("#hidden_customs_duties").val( ( (weight + weight_vol) * $("#add_customs_duties").val() ).toFixed(2) )

        if ($("#tax_count").val() == 1) {
          
          $("#tax").val( ( (subtotal / 100 ) * $("#add_tax").val()).toFixed(2) )
        } else {
          
          $("#tax").val( $("#add_tax").val() )
        }

        $("#declared_value").val( ( ( decvalue / 100) * $("#add_declared_value").val() ).toFixed(2) )
        $("#fixed_charge").val(f_charge)
        $("#reissue").val($("#add_reissue").val())

        $("#total").val( ( parseFloat($("#subtotal").val()) + parseFloat($("#shipping_insurance").val()) + parseFloat($("#customs_duties").val()) + parseFloat($("#tax").val()) + parseFloat($("#declared_value").val()) + parseFloat($("#fixed_charge").val()) + parseFloat($("#reissue").val()) - parseFloat($("#discount").val()) ).toFixed(2) )
        
      })

      $(document).on("input", ".register_packages_weight", function () {
        var currentRow=$(this).closest(".package_information");
        
        currentRow.find("#register_packages_weight_vol").val( (currentRow.find("#register_packages_length").val() * currentRow.find("#register_packages_width").val() * currentRow.find("#register_packages_height").val() / $("#register_packages_vol_per").val()).toFixed(2) )

        var weight_vol = 0;
        $('.register_packages_weight_vol').each(function(){
          weight_vol += parseFloat($(this).val());
        });
        
        var weight = 0;
        $('.register_packages_weight').each(function(){
          weight += parseFloat($(this).val());
        });
        
        var decvalue = 0;
        $('.register_packages_decvalue').each(function(){
          decvalue += parseFloat($(this).val());
        });
        
        var f_charge = 0;
        $('.register_packages_f_charge').each(function(){
          f_charge += parseFloat($(this).val());
        });

        subtotal = (weight_vol * $("#add_price_kg").val()).toFixed(2)

        $("#total_weight").val(weight.toFixed(2))
        $("#total_weight_vol").val(weight_vol.toFixed(2))
        $("#total_decvalue").val(decvalue.toFixed(2))
        $("#subtotal").val(subtotal)
        $("#discount").val(( (subtotal / 100) * $("#add_discount").val() ).toFixed(2))
        
        if (parseFloat(subtotal) < parseFloat($("#discount").val())) {
          toastr.error('The discount cannot be greater than the subtotal')
          $("#shipment_submit").addClass('disabled')
        }else{
          $("#shipment_submit").removeClass('disabled')
        }

        $("#shipping_insurance").val( (($("#add_value_assured").val() / 100) * $("#add_shipping_insurance").val()).toFixed(2) )
        $("#customs_duties").val( ( (weight + weight_vol) * $("#add_customs_duties").val() ).toFixed(2) )
        $("#hidden_customs_duties").val( ( (weight + weight_vol) * $("#add_customs_duties").val() ).toFixed(2) )

        if ($("#tax_count").val() == 1) {
          
          $("#tax").val( ( (subtotal / 100 ) * $("#add_tax").val()).toFixed(2) )
        } else {
          
          $("#tax").val( $("#add_tax").val() )
        }

        $("#declared_value").val( ( ( decvalue / 100) * $("#add_declared_value").val() ).toFixed(2) )
        $("#fixed_charge").val(f_charge)
        $("#reissue").val($("#add_reissue").val())

        $("#total").val( ( parseFloat($("#subtotal").val()) + parseFloat($("#shipping_insurance").val()) + parseFloat($("#customs_duties").val()) + parseFloat($("#tax").val()) + parseFloat($("#declared_value").val()) + parseFloat($("#fixed_charge").val()) + parseFloat($("#reissue").val()) - parseFloat($("#discount").val()) ).toFixed(2) )
        
      })

      $(document).on("input", ".register_packages_f_charge", function () {
        var currentRow=$(this).closest(".package_information");
        
        currentRow.find("#register_packages_weight_vol").val( (currentRow.find("#register_packages_length").val() * currentRow.find("#register_packages_width").val() * currentRow.find("#register_packages_height").val() / $("#register_packages_vol_per").val()).toFixed(2) )

        var weight_vol = 0;
        $('.register_packages_weight_vol').each(function(){
          weight_vol += parseFloat($(this).val());
        });
        
        var weight = 0;
        $('.register_packages_weight').each(function(){
          weight += parseFloat($(this).val());
        });
        
        var decvalue = 0;
        $('.register_packages_decvalue').each(function(){
          decvalue += parseFloat($(this).val());
        });
        
        var f_charge = 0;
        $('.register_packages_f_charge').each(function(){
          f_charge += parseFloat($(this).val());
        });

        subtotal = (weight_vol * $("#add_price_kg").val()).toFixed(2)
        
        $("#total_weight").val(weight.toFixed(2))
        $("#total_weight_vol").val(weight_vol.toFixed(2))
        $("#total_decvalue").val(decvalue.toFixed(2))
        $("#subtotal").val(subtotal)
        $("#discount").val(( (subtotal / 100) * $("#add_discount").val() ).toFixed(2))
        
        if (parseFloat(subtotal) < parseFloat($("#discount").val())) {
          toastr.error('The discount cannot be greater than the subtotal')
          $("#shipment_submit").addClass('disabled')
        }else{
          $("#shipment_submit").removeClass('disabled')
        }

        $("#shipping_insurance").val( (($("#add_value_assured").val() / 100) * $("#add_shipping_insurance").val()).toFixed(2) )
        $("#customs_duties").val( ( (weight + weight_vol) * $("#add_customs_duties").val() ).toFixed(2) )
        $("#hidden_customs_duties").val( ( (weight + weight_vol) * $("#add_customs_duties").val() ).toFixed(2) )

        if ($("#tax_count").val() == 1) {
          
          $("#tax").val( ( (subtotal / 100 ) * $("#add_tax").val()).toFixed(2) )
        } else {
          
          $("#tax").val( $("#add_tax").val() )
        }

        $("#declared_value").val( ( ( decvalue / 100) * $("#add_declared_value").val() ).toFixed(2) )
        $("#fixed_charge").val(f_charge)
        $("#reissue").val($("#add_reissue").val())

        $("#total").val( ( parseFloat($("#subtotal").val()) + parseFloat($("#shipping_insurance").val()) + parseFloat($("#customs_duties").val()) + parseFloat($("#tax").val()) + parseFloat($("#declared_value").val()) + parseFloat($("#fixed_charge").val()) + parseFloat($("#reissue").val()) - parseFloat($("#discount").val()) ).toFixed(2) )
        
      })

      $(document).on("input", ".register_packages_decvalue", function () {
        var currentRow=$(this).closest(".package_information");
        
        currentRow.find("#register_packages_weight_vol").val( (currentRow.find("#register_packages_length").val() * currentRow.find("#register_packages_width").val() * currentRow.find("#register_packages_height").val() / $("#register_packages_vol_per").val()).toFixed(2) )
        
        var weight_vol = 0;
        $('.register_packages_weight_vol').each(function(){
          weight_vol += parseFloat($(this).val());
        });
        
        var weight = 0;
        $('.register_packages_weight').each(function(){
          weight += parseFloat($(this).val());
        });
        
        var decvalue = 0;
        $('.register_packages_decvalue').each(function(){
          decvalue += parseFloat($(this).val());
        });
        
        var f_charge = 0;
        $('.register_packages_f_charge').each(function(){
          f_charge += parseFloat($(this).val());
        });

        subtotal = (weight_vol * $("#add_price_kg").val()).toFixed(2)
        
        $("#total_weight").val(weight.toFixed(2))
        $("#total_weight_vol").val(weight_vol.toFixed(2))
        $("#total_decvalue").val(decvalue.toFixed(2))
        $("#subtotal").val(subtotal)
        $("#discount").val(( (subtotal / 100) * $("#add_discount").val() ).toFixed(2))
        
        if (parseFloat(subtotal) < parseFloat($("#discount").val())) {
          toastr.error('The discount cannot be greater than the subtotal')
          $("#shipment_submit").addClass('disabled')
        }else{
          $("#shipment_submit").removeClass('disabled')
        }

        $("#shipping_insurance").val( (($("#add_value_assured").val() / 100) * $("#add_shipping_insurance").val()).toFixed(2) )
        $("#customs_duties").val( ( (weight + weight_vol) * $("#add_customs_duties").val() ).toFixed(2) )
        $("#hidden_customs_duties").val( ( (weight + weight_vol) * $("#add_customs_duties").val() ).toFixed(2) )

        if ($("#tax_count").val() == 1) {
          
          $("#tax").val( ( (subtotal / 100 ) * $("#add_tax").val()).toFixed(2) )
        } else {
          
          $("#tax").val( $("#add_tax").val() )
        }

        $("#declared_value").val( ( ( decvalue / 100) * $("#add_declared_value").val() ).toFixed(2) )
        $("#fixed_charge").val(f_charge)
        $("#reissue").val($("#add_reissue").val())

        $("#total").val( ( parseFloat($("#subtotal").val()) + parseFloat($("#shipping_insurance").val()) + parseFloat($("#customs_duties").val()) + parseFloat($("#tax").val()) + parseFloat($("#declared_value").val()) + parseFloat($("#fixed_charge").val()) + parseFloat($("#reissue").val()) - parseFloat($("#discount").val()) ).toFixed(2) )
        
      })

      $(document).on("click", "#online_shopping_assign_driver", function () {
          let dataid = $(this).attr("data-id");
          let dataname = $(this).attr("data-name");

          $("#hidden_id").attr('value', dataid);
          $('#assign_driver_toggle').select2().select2('val', dataname);
      })

      $(document).on("click", "#online_shopping_add_payment", function () {
          let dataid = $(this).attr("data-id");
          let datainvoice = $(this).attr("data-invoice");
          let datadue = $(this).attr("data-due");

          $("#payment_action").attr('action', '/online_shopping/payment/' + dataid);
          $('#invoice').attr('value', datainvoice);
          $('#payable_amount').attr('value', datadue);
          $('#paid_amount').attr('value', datadue);
      })