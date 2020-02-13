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
            name:             $('.help-name'),
            email:            $('.help-email'),
            password:         $('.help-password'),
            messageSuccess:   $('.message-success'),
            reponseBox:       $('.reponse'),
        }

        const formFields = {
            name:       $("#name"),
            email:      $("#email"),
            password:   $("#password")
        }

        var btnLoginReg          = $('.btn-login-register');
        var color_name           = ( $('#color_name').length ?  $('#color_name') : '');
        var color_hexa           = ( $('#color_hexa').length ?  $('#color_hexa') : '');
        var color_variation      = $("input[name='color_variation']");
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
           var flash =JSON.parse(Base64.decode( flashlogin ));
           if (window.location.href == route_site.login) {
               formFields.email.val(flash.data.email);
               formFields.password.val(flash.data.password);
               formTextVal.messageSuccess.fadeIn( function() { formTextVal.reponseBox.empty().html(flash.message); });
           }
       }

        // Form Login
        $('#formLogin').submit( function( e ) {
            e.preventDefault();
            let $serialize = $(this).serialize();

            $.ajax({
                url:                route_site.user_login,
                data:                $(this).serialize()+'&apiUrl='+route.login,
                dataType:           'application/multipart/form-data',
                dataType:           "json",
                type:               'POST',
                cache:              false,
                beforeSend:         function(){
                    clearTextValid( formTextVal );
                    onLoading(btnLoginReg);
                    formTextVal.messageSuccess.fadeOut( function() { formTextVal.reponseBox.empty().html(''); });
                    if( flashlogin.length ) {
                         window.localStorage.removeItem('flashMessage');
                    }
                    formTextVal.messageSuccess.fadeOut( function() {
                        formTextVal.reponseBox.empty().html('');
                    });
                },
                error:            function(xhr, status, error){
                    if(status == 'error') {
                        if (xhr.status == 500) {
                            responsetMsg(
                                formTextVal,
                                'alert-warning alert-success',
                                'alert-danger',
                                `Error ${xhr.status}: No communication with API server.`
                            );
                        }

                        if (xhr.status == 401) {
                            responsetMsg(
                                formTextVal,
                                'alert-warning alert-success',
                                'alert-danger',
                                xhr.responseJSON.message
                            );
                        }

                        if(xhr.responseJSON.hasOwnProperty('message')) {
                            var msg = xhr.responseJSON.message;
                            if (typeof msg.url !== 'undefined') {
                                responsetMsg(formTextVal, 'alert-warning alert-success', 'alert-danger', msg.url);
                            }
                        }
                    }
                },
                success:          function( response ){
                    localStorage.setItem(Base64.encode('token'), JSON.stringify(Base64.encode(response.user)));

                   if (response.code == 200) {
                        clearForm(formFields);
                        responsetMsg(
                            formTextVal,
                            'alert-warning alert-danger',
                            'alert-success',
                            'Token generate success.'
                        );

                       setTimeout(function() {   window.location.href = route_site.home;}, 3000);
                   }

                },
                complete:       function() { offLoading(btnLoginReg, 'Login'); }

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
                type:               'POST',
                cache:              false,
                beforeSend:         function(){
                    clearTextValid(formTextVal);
                    onLoading(btnLoginReg);
                },
                error:              function(xhr, status, error){

                    if(status == 'error') {
                        responsetMsg(
                            formTextVal,
                            'alert-warning alert-success',
                            'alert-danger',
                            `Error: No communication with API server.`
                        );

                    }
                },
                success:          function(response){

                    if (response.code == 400) {
                           let resp = response.message;
                           if (resp.email)    { respValidation(formTextVal.email, resp.email) }
                           if (resp.name)     { respValidation(formTextVal.name, resp.name) }
                           if (resp.password) { respValidation(formTextVal.password, resp.password) }
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
                complete:         function() { offLoading(btnLoginReg, 'Register') }
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
     $(formFields.name).val('');
     $(formFields.email).val('');
     $(formFields.password).val('');
}

// Clear texts validation
function clearTextValid(text){
    $(text.name).find('strong').empty().html();
    $(text.email).find('strong').empty().html();
    $(text.password).find('strong').empty().html();
    $(text.messageSuccess).fadeOut();
}

// Response Validations
function respValidation(formTextVal, text) {
    formTextVal.find('strong').empty().html(text);
}

// Response
function responsetMsg(formTextVal, remove_class, add_class, resp_json) {
    $(formTextVal.messageSuccess)
        .removeClass(remove_class)
        .addClass(add_class)
        .fadeIn(200, () => formTextVal.reponseBox.empty().html(resp_json));
}

// Loading on
function onLoading(selector) {
    selector.delay(200).html('<i class="fa fa-spinner fa-spin"></i>  Loading...');
}

// Loading off
function offLoading(selector, txt) {
    selector.delay(200).html(txt);
}


