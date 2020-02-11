<?php  $user = session()->get('user') ? (object) session()->get('user') : null ; ?>
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs/jszip-2.5.0/dt-1.10.20/af-2.3.4/b-1.6.1/b-colvis-1.6.1/b-flash-1.6.1/b-html5-1.6.1/b-print-1.6.1/cr-1.5.2/fc-3.3.0/fh-3.1.6/kt-2.5.1/r-2.2.3/rg-1.1.1/rr-1.2.6/sc-2.0.1/sp-1.0.1/sl-1.3.1/datatables.min.css"/>

    <link href="{{ asset('css/styles-all.css') }}" rel="stylesheet">
    <link href="{{ asset('css/site.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <nav id="" class="navbar navbar-default navbar-static-top navbar navbar-modify-top">
            <div class="container ra-container-top">
                <div class="navbar-header ra-navbar-header">

                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <a class="navbar-brand" href="{{ url('/home') }}">
                        <img style="width: 120px;" class="logo-top" src="{{asset('/images/logo-api.png')}}">
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav nav-bar-left  nav-bar-left-primary">
                        @if ($user)
                            &nbsp;
                            <li class="dropdown"> 
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                   Product<span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu" role="menu">
                                    <li> <a href="{{ route('product.index') }}">List product</a></li>
                                    <li> <a href="{{ route('product.create') }}">Create new product</a></li>
                                </ul>
                            </li>
                            <li><a href="/user">User</a></li>
                        @endif
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right nav-bar-right">
                        <!-- Authentication Links -->
                        @if (! $user)
                            <li><a class="item" href="{{ route('login') }}">Login</a></li>
                            <li><a class="item" href="{{ route('register') }}">Register</a></li>
                        @else
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle user-logo" data-toggle="dropdown" role="button" aria-expanded="false">
                                    {{ $user->name }}&nbsp;&nbsp;<img class="avatar" src="{{asset('/images/avatar.png')}}">
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        <a href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            <i class="glyphicon glyphicon-off"></i>&nbsp;Logout
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </li>
                        @endif
                    </ul>
                </div>
            </div>
        </nav>

        @yield('content')
    </div>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/v/bs/jszip-2.5.0/dt-1.10.20/af-2.3.4/b-1.6.1/b-colvis-1.6.1/b-flash-1.6.1/b-html5-1.6.1/b-print-1.6.1/cr-1.5.2/fc-3.3.0/fh-3.1.6/kt-2.5.1/r-2.2.3/rg-1.1.1/rr-1.2.6/sc-2.0.1/sp-1.0.1/sl-1.3.1/datatables.min.js"></script>
    <script>
        // BASE URL API 
        const baseUrlAPI = "{{ !empty( getenv('APP_API_URL') ) ? getenv('APP_API_URL') : Config::get('app.api_url') }}";

        // ROUTES SITE APP
        const route_site = {
            'login':            "{{ route('login') }}",
            'user_login':       "{{ route('user.login') }}",
            'logout':           "{{ route('logout') }}",
            'home':             "{{ route('home.index') }}",
            'product_create':   "{{ route('product.create') }}",
        } 
    </script>
    <script src="{{ asset('js/scripts-all.js') }}"></script>
</body>
</html>
