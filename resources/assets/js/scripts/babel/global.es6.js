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
               formTextVal.messageSuccess.fadeIn( () => { formTextVal.reponseBox.empty().html(flash.message); });
           }
       }

        // Form Login
        $('#formLogin').submit( function( e ) {
            e.preventDefault();

            $.ajax({
                url:                route_site.user_login,
                data:                $(this).serialize()+'&apiUrl='+route.login,
                type:               'POST',
                cache:              false,
                beforeSend:         function(){
                    clearTextValid( formTextVal );
                    onLoading(btnLoginReg);
                    formTextVal.messageSuccess.fadeOut( () => { formTextVal.reponseBox.empty().html(''); });
                    if( flashlogin.length ) {
                         window.localStorage.removeItem('flashMessage');
                    }
                    formTextVal.messageSuccess.fadeOut( () => { formTextVal.reponseBox.empty().html(''); });
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

                        if (xhr.status == 400) {
                            var strValues = '';
                            var span      = ' <br/> <span class="glyphicon glyphicon-info-sign"></span>';
                            var message   = xhr.responseJSON.message;
                            var key       = Object.keys(message).length;
                            var count     = key;

                            for (const key in  message) {
                                count--;
                                if(count == 0) { span = ""; }
                                strValues += message[key] + span;

                                if (message.hasOwnProperty(key)) {
                                    responsetMsg(formTextVal, 'alert-warning alert-success', 'alert-danger', strValues)
                                    
                                } 
                            }
                        }

                        if(typeof xhr.responseJSON !== 'undefined') {
                            if(typeof xhr.responseJSON.hasOwnProperty('message') !== 'undefined') {
                                var msg = xhr.responseJSON.message;
                                if (typeof msg.url !== 'undefined') {
                                    responsetMsg(formTextVal, 'alert-warning alert-success', 'alert-danger', msg.url);
                                }
                            }
                        } 
                    }
                },
                success:          function( response ){
                   if (response.code == 200) {
                        //localStorage.setItem(Base64.encode('token'), JSON.stringify(Base64.encode(response.user)));
                        clearForm(formFields);
                        responsetMsg(formTextVal, 'alert-warning alert-danger', 'alert-success', 'Token generate success.');
                        setTimeout( () => { window.location.href = route_site.home;}, 3000);
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
                error:              function(xhr, status, error) {
                    if (xhr.status == 400) {
                        let resp = xhr.responseJSON.message;
                        if (resp.email)    { respValidation(formTextVal.email, resp.email) }
                        if (resp.name)     { respValidation(formTextVal.name, resp.name) }
                        if (resp.password) { respValidation(formTextVal.password, resp.password) }

                    } else {
                        if(status == 'error') {
                            responsetMsg(
                                formTextVal,
                                'alert-warning alert-success',
                                'alert-danger',
                                `Error ${xhr.status}: No communication with API server.`
                            );
                        }
                    }
                },
                success:          function(response){
                    if (response.code == 201) {
                      clearForm(formFields);
                      formTextVal.messageSuccess.fadeIn( () => { formTextVal.reponseBox.empty().html(response.message); });

                       setTimeout( () => {
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
            var urlDelete  =  $(this).attr("href");

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
    selector.delay(200).html( `
        <div class="sk-circle">
            <div class="sk-circle1 sk-child"></div>
            <div class="sk-circle2 sk-child"></div>
            <div class="sk-circle3 sk-child"></div>
            <div class="sk-circle4 sk-child"></div>
            <div class="sk-circle5 sk-child"></div>
            <div class="sk-circle6 sk-child"></div>
            <div class="sk-circle7 sk-child"></div>
            <div class="sk-circle8 sk-child"></div>
            <div class="sk-circle9 sk-child"></div>
            <div class="sk-circle10 sk-child"></div>
            <div class="sk-circle11 sk-child"></div>
            <div class="sk-circle12 sk-child"></div>
        </div>  Loading...
    `);
}

// Loading off
function offLoading(selector, txt) {
    selector.delay(200).html(txt);
}


