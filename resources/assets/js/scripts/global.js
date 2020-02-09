(function( $ ) {

    /** Fire on document ready. */
    $( document ).ready( function() {
       
        var flashlogin = window.localStorage.getItem('flashMessage') ? window.localStorage.getItem('flashMessage') : '' ;

        // Routes API
        const route = {
            login:    baseUrlAPI+'/auth/login',
            logout:   baseUrlAPI+'/auth/logout',
            register: baseUrlAPI+'/auth/register',
            product:  baseUrlAPI+'/v1/product',
            user:     baseUrlAPI+'/v1/user',
        }
        const formTextVal = {
            'helpName':         $('.help-name'),
            'helpEmail':        $('.help-email'),
            'helpPassword':     $('.help-password'),
            'messageSuccess':   $('.message-success'),
            'reponseBox':       $('.reponse'),
        }
        const formFields = {
            'name':       $("#name"),
            'email':      $("#email"),
            'password':   $("#password")
        }

        var color_name = ( $('#color_name').length ?  $('#color_name') : ''); 
        var color_hexa = ( $('#color_hexa').length ?  $('#color_hexa') : '');

        var color_variation = $("input[name='color_variation']");
        var colorVariationInputs = $('.colorVariationInputs');

        /*
        |--------------------------------------------------------------------------
        | Vanilla Masker
        |--------------------------------------------------------------------------
        | 
        | Mascaras  
        | 
        | https://github.com/vanilla-masker/vanilla-masker
        | Demo page: https://vanilla-masker.github.io/vanilla-masker/demo.html
        */
         
         if ($('.money').length) { VMasker($('.money')).maskMoney({separator: '.'}); }


        if ($('.click-false').length) {
           $('.click-false').click(function() {return false;});
        }
         
        if ( $("input[name='color_variation']:checked").val() == 'N' ) {
            colorVariationInputs.css("display", "none");
        } 

        color_variation.click(function() {
            if ( $("input[name='color_variation']:checked").val() == 'N' ) {
                colorVariationInputs.css("display", "none");
            } else {
                 colorVariationInputs.css("display", "block");
            }
        });
       
        if( flashlogin.length ) {
            console.log(flashlogin);
            var flash =JSON.parse(Base64.decode( flashlogin ));
            
            if (window.location.href == route_site.login) {
                formFields.email.val(flash.data.email);
                formFields.password.val(flash.data.password);
                console.log(flash.message);
                formTextVal.messageSuccess.fadeIn( function() { formTextVal.reponseBox.empty().html(flash.message); });
            }
        }

        // Form Login
        $('#formLogin').submit( function( e ) {
           e.preventDefault();

            $.ajax({
                url:                route_site.user_login,
                data:                $(this).serialize()+'&apiUrl='+route.login,
                dataType:           'application/multipart/form-data',
                dataType:           "json",
                type:               'POST',
                cache:              false,
                beforeSend:         function(){ 
                    clearTextValidation( formTextVal );
                    formTextVal.messageSuccess.fadeOut( function() { formTextVal.reponseBox.empty().html(''); });
                    if( flashlogin.length ) {
                         window.localStorage.removeItem('flashMessage');
                    }
                    formTextVal.messageSuccess.fadeOut( function() { 
                        formTextVal.reponseBox.empty().html(''); 
                    }); 
                },
                error:            function(xhr, status, error){ 
                    //console.log( xhr.status = 400 );
                    // console.log( xhr.responseJSON );
                    if(status == 'error') {
                        if (xhr.responseJSON.message.email) { 
                           helpEmail.find('strong').empty().html(xhr.responseJSON.message.email);

                        } if (xhr.responseJSON.message.password) { 
                           helpPassword.find('strong').empty().html(xhr.responseJSON.message.password);

                        } if (xhr.responseJSON.message.url) {
                            formTextVal.messageSuccess
                                .removeClass('alert-warning')
                                .addClass('alert-danger')
                                .fadeIn( function() { 
                                    formTextVal.reponseBox.empty().html(xhr.responseJSON.message.url); 
                                }); 
                        }
                    }
                },
                success:          function( response ){
                    localStorage.setItem(Base64.encode('token'), JSON.stringify(Base64.encode(response.user)));

                   if (response.code == 200) {
                        clearForm(formFields); 
                        formTextVal.messageSuccess
                            .removeClass('alert-warning alert-warning')
                            .addClass('alert-success')
                            .fadeIn( function() { 
                                formTextVal.reponseBox.empty().html('Token generate success.'); 
                            }); 
                   }
                   setTimeout(function() {   window.location.href = route_site.home;}, 3000);
                }
            });         

        });

        // Form Register
        $('#formRegister').submit( function( e ) {
            e.preventDefault();
    
            var dataForm        = $(this).serialize();
            var name            = $("#name");
            var email           = $("#email");
            var password        = $("#password");
            var objLogin        = {'name': name.val(), 'email': email.val(), 'password': password.val()};
                
            $.ajax({
                url:                route.register,
                data:               dataForm,
                dataType:           'application/multipart/form-data',
                dataType:           "json",
                //contentType:      'application/json',
                type:               'POST',
                cache:              false,
                beforeSend:       function(){ clearTextValidation(formTextVal); },
                error:            function(){ console.log('Error ao ler dados...'); },
                success:          function( response ){
                   
                   if (response.code == 400) {
                        if (response.message.email)    { formTextVal.helpEmail.find('strong').empty().html(response.message.email);}
                        if (response.message.name)     { formTextVal.helpName.find('strong').empty().html(response.message.name);}
                        if (response.message.password) { formTextVal.helpPassword.find('strong').empty().html(response.message.password);}
                   } 

                   if (response.code == 201) {
                       clearForm(formFields); 
                       formTextVal.messageSuccess.fadeIn( function()  { formTextVal.reponseBox.empty().html(response.message); });
                        
                        setTimeout(function() {
                            var flashMessage =  {'message': 'Thank you for registering now login to generate token', 'data': objLogin }
                            localStorage.setItem("flashMessage", Base64.encode(JSON.stringify(flashMessage)));
                            window.location.href = route_site.login;
                        }, 3000);
                   }
                },
            });
        });

        // Delete product id
        $('.deleteProductId').click( function(e) { 
            e.preventDefault();
            var idProdutct =  $(this).attr("data-id");
            var urlDelete     =  $(this).attr("href");
            
            $('.formProductDelete').attr("action", urlDelete);

            if(confirm('Are you sure?')) {
                $('.formProductDelete').submit();
            }
        });

        /*
        |--------------------------------------------------------------------------
        | DataTables
        |--------------------------------------------------------------------------
        | 
        | Plugin Datables
        | Demo page: https://datatables.net/
        */
       
        var tabUser = $('#tablUser').DataTable({});

        var tabProduct = $('#tabProduct').dataTable({
            dom:                     'Bfrtip',

            buttons:                 
            [
                {
                    'text':         '<a class="btn btn-secondary"><span class="glyphicon glyphicon-plus-sign"></span> Create product</a>',
                    'titleAttr':    'Criar evento',
                    'action':        function(){window.location.href = route_site.product_create;}
                }, {
                    'extend':        'csvHtml5',
                    'text':          '<a class="btn btn-defautl"><span class="glyphicon glyphicon-save"></span> Expotar para csv</a>',
                    'titleAttr':     'Expotar para csv CSV'
                }
            ]
        });


    });

    /**  Fires in document when all elements are loaded  (Jquery > 3.0) */
    $( window ).on("load", function() {
       
        $('.loader-1').fadeOut('slow', function() {
             $('.table-hidden').css('visibility','visible');
        });
    });

    /**  Fires on document when visible on screen */
    // $(window).on('scroll', function() {
    // });

})(jQuery);


// Clear fields form
function clearForm(formFields) {
     formFields.name.val('');            
     formFields.email.val('');           
     formFields.password.val('');        
} 

// Clear texts validation
function clearTextValidation(text) {
    text.helpEmail.find('strong').empty().html();
    text.helpEmail.find('strong').empty().html();
    text.helpPassword.find('strong').empty().html();
    text.messageSuccess.fadeOut();
} 
