<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>{{ config('app.name', 'Pterodactyl') }} - @yield('title')</title>
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <meta name="_token" content="{{ csrf_token() }}">

        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
        <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16">
        <link rel="manifest" href="/favicons/manifest.json">
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#bc6e3c">
        <link rel="shortcut icon" href="/favicons/favicon.ico">
        <meta name="msapplication-config" content="/favicons/browserconfig.xml">
        <meta name="theme-color" content="#0e4688">

        @include('layouts.scripts')

        @section('scripts')
            {!! Theme::css('vendor/select2/select2.min.css?t={cache-version}') !!}
            {!! Theme::css('vendor/bootstrap/bootstrap.min.css?t={cache-version}') !!}
            {!! Theme::css('vendor/adminlte/admin.min.css?t={cache-version}') !!}
            {!! Theme::css('vendor/adminlte/colors/skin-blue.min.css?t={cache-version}') !!}
            {!! Theme::css('vendor/sweetalert/sweetalert.min.css?t={cache-version}') !!}
            {!! Theme::css('vendor/animate/animate.min.css?t={cache-version}') !!}
            {!! Theme::css('css/pterodactyl.css?t={cache-version}') !!}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">

            <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
            <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
            <![endif]-->
        @show
        <style>
            :root {
                --di-admin-bg: #071018;
                --di-admin-surface: linear-gradient(180deg, rgba(16, 28, 39, 0.94) 0%, rgba(11, 20, 29, 0.9) 100%);
                --di-admin-panel: rgba(255, 255, 255, 0.04);
                --di-admin-border: rgba(137, 161, 172, 0.14);
                --di-admin-border-strong: rgba(40, 208, 216, 0.18);
                --di-admin-text: #e8f0f6;
                --di-admin-muted: #8eaab7;
                --di-admin-accent: #28d0d8;
                --di-admin-danger: #ff6b74;
            }

            body.hold-transition.skin-blue.fixed.sidebar-mini {
                background:
                    radial-gradient(circle at top center, rgba(40, 208, 216, 0.12), transparent 30%),
                    radial-gradient(circle at 85% 12%, rgba(255, 255, 255, 0.05), transparent 20%),
                    linear-gradient(180deg, #0a1118 0%, #091119 45%, #071018 100%);
                color: var(--di-admin-text);
            }

            .wrapper,
            .content-wrapper,
            .main-sidebar,
            .main-header .navbar,
            .main-header .logo,
            .main-footer,
            .box,
            .small-box,
            .info-box,
            .alert,
            .callout,
            .nav-tabs-custom,
            .modal-content,
            .form-control,
            .select2-container--default .select2-selection--single,
            .select2-container--default .select2-selection--multiple,
            .btn,
            .table-responsive,
            .well {
                box-shadow: none !important;
            }

            .main-header .logo,
            .main-header .navbar,
            .main-sidebar,
            .main-footer,
            .content-wrapper,
            .right-side {
                background: transparent !important;
            }

            .main-header {
                position: fixed;
                top: 14px;
                left: 14px;
                right: 14px;
                z-index: 1002;
            }

            .main-header .logo {
                color: var(--di-admin-text) !important;
                background: rgba(12, 22, 30, 0.9) !important;
                border: 1px solid var(--di-admin-border);
                border-right: none;
                border-radius: 20px 0 0 20px;
                font-weight: 700;
                letter-spacing: 0.04em;
                height: 56px;
                line-height: 56px;
                width: 240px;
            }

            .main-header .navbar {
                margin-left: 240px;
                height: 56px;
                min-height: 56px;
                backdrop-filter: blur(18px);
                background: rgba(7, 16, 24, 0.86) !important;
                border: 1px solid var(--di-admin-border);
                border-radius: 0 20px 20px 0;
            }

            .main-header .navbar .nav > li > a,
            .main-header .logo,
            .main-sidebar .sidebar-menu > li > a,
            .content-header > .breadcrumb > li > a,
            .main-footer a {
                color: #d8e5ea !important;
            }

            .main-sidebar {
                top: 84px !important;
                left: 14px;
                bottom: 14px;
                width: 240px;
                min-height: 0 !important;
                border: 1px solid var(--di-admin-border);
                border-radius: 22px;
                background: linear-gradient(180deg, rgba(11, 18, 27, 0.92) 0%, rgba(8, 14, 21, 0.88) 100%) !important;
            }

            .sidebar {
                padding-top: 18px;
            }

            .sidebar-menu > li.header {
                color: #688391 !important;
                background: transparent !important;
                letter-spacing: 0.16em;
                font-weight: 700;
            }

            .sidebar-menu > li > a {
                border-left: 0 !important;
                border-radius: 14px;
                margin: 2px 12px;
                padding: 12px 16px;
            }

            .sidebar-menu > li:hover > a,
            .sidebar-menu > li.active > a {
                background: rgba(40, 208, 216, 0.08) !important;
                color: #ecfeff !important;
            }

            .content-wrapper,
            .right-side {
                min-height: 100vh !important;
                margin-top: 84px !important;
                margin-left: 268px !important;
                padding-bottom: 18px;
            }

            .content-header {
                padding: 18px 24px 6px;
            }

            .content-header > h1 {
                color: #e8f0f6;
                font-weight: 700;
                letter-spacing: -0.02em;
            }

            .content-header > h1 > small,
            .breadcrumb > .active,
            .text-muted,
            .help-block,
            .small,
            .text-gray {
                color: #8eaab7 !important;
            }

            .content {
                padding: 14px 24px 28px;
            }

            .box,
            .nav-tabs-custom,
            .modal-content,
            .alert,
            .well,
            .table-responsive {
                background: var(--di-admin-surface) !important;
                border: 1px solid var(--di-admin-border) !important;
                border-radius: 18px !important;
                color: #d8e5ea !important;
            }

            .box {
                overflow: hidden;
            }

            .box-header,
            .box-footer,
            .nav-tabs-custom > .nav-tabs,
            .table > thead > tr > th,
            .table > tbody > tr > td,
            .table > tbody > tr > th {
                border-color: rgba(137, 161, 172, 0.12) !important;
            }

            .box-header.with-border {
                border-bottom: 1px solid rgba(137, 161, 172, 0.12) !important;
            }

            .box-header {
                padding: 16px 18px;
                background: rgba(255, 255, 255, 0.02);
            }

            .box-body,
            .box-footer {
                padding: 18px;
            }

            .box-title,
            .control-label,
            label,
            .table,
            .table a,
            .nav-tabs-custom > .nav-tabs > li.active > a,
            .nav-tabs-custom > .nav-tabs > li > a:hover {
                color: #e8f0f6 !important;
            }

            .nav-tabs-custom > .nav-tabs > li > a,
            .table > thead > tr > th,
            code,
            .text-blue,
            .description-block > .description-header,
            .description-block > .description-text {
                color: #8eaab7 !important;
            }

            .btn {
                border-radius: 10px !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                background: rgba(255, 255, 255, 0.05) !important;
                color: #ffffff !important;
                font-weight: 600 !important;
                transition: background 0.25s cubic-bezier(.16,1,.3,1), border-color 0.25s cubic-bezier(.16,1,.3,1), color 0.25s cubic-bezier(.16,1,.3,1), transform 0.25s cubic-bezier(.16,1,.3,1) !important;
            }

            .btn-primary,
            .btn-success,
            .btn-warning,
            .btn-default,
            .btn-secondary {
                color: #ffffff !important;
                background: rgba(255, 255, 255, 0.05) !important;
                border-color: rgba(255, 255, 255, 0.1) !important;
            }

            .btn-primary:hover,
            .btn-success:hover,
            .btn-warning:hover,
            .btn-default:hover,
            .btn-secondary:hover,
            .btn:focus,
            .btn:active {
                background: linear-gradient(135deg, rgba(0, 191, 207, 0.12), rgba(99, 102, 241, 0.06)) !important;
                border-color: rgba(0, 191, 207, 0.35) !important;
                color: var(--di-admin-accent) !important;
                transform: translateY(-1px);
            }

            .btn-danger,
            .btn-danger.disabled,
            .btn-danger[disabled] {
                background: rgba(255, 92, 92, 0.1) !important;
                border-color: rgba(255, 92, 92, 0.28) !important;
                color: #ff8f96 !important;
            }

            .btn-danger:hover,
            .btn-danger:focus,
            .btn-danger:active {
                background: rgba(255, 92, 92, 0.16) !important;
                border-color: rgba(255, 92, 92, 0.42) !important;
                color: #ffd5d8 !important;
            }

            .btn.active,
            .btn-group .btn.active,
            .btn-group .btn:active,
            .open > .dropdown-toggle.btn-primary,
            .open > .dropdown-toggle.btn-success,
            .open > .dropdown-toggle.btn-warning {
                background: rgba(0, 191, 207, 0.14) !important;
                border-color: rgba(0, 191, 207, 0.35) !important;
                color: var(--di-admin-accent) !important;
                box-shadow: inset 0 0 0 1px rgba(0, 191, 207, 0.1) !important;
            }

            .form-control,
            .select2-container--default .select2-selection--single,
            .select2-container--default .select2-selection--multiple {
                color: #e8f0f6 !important;
                background: linear-gradient(180deg, rgba(18, 31, 41, 0.94) 0%, rgba(12, 22, 30, 0.88) 100%) !important;
                border-color: rgba(137, 161, 172, 0.18) !important;
            }

            .select2-dropdown,
            .select2-results__option,
            .dropdown-menu,
            .dropdown-menu > li > a {
                background: #0f1a24 !important;
                color: #d8e5ea !important;
                border-color: rgba(137, 161, 172, 0.12) !important;
            }

            .table-hover > tbody > tr:hover,
            .dropdown-menu > li > a:hover,
            .select2-results__option--highlighted[aria-selected] {
                background: rgba(40, 208, 216, 0.1) !important;
                color: #ecfeff !important;
            }

            .table > tbody > tr > td,
            .table > tbody > tr > th {
                background: transparent !important;
            }

            .table > tbody > tr:hover > td,
            .table > tbody > tr:hover > th {
                background: rgba(40, 208, 216, 0.06) !important;
            }

            .nav-tabs-custom > .nav-tabs {
                padding: 8px 10px 0;
                background: rgba(255, 255, 255, 0.02);
            }

            .nav-tabs-custom > .nav-tabs > li {
                margin-right: 6px;
            }

            .nav-tabs-custom > .nav-tabs > li > a {
                border-radius: 12px 12px 0 0;
                border: 1px solid transparent;
                padding: 10px 14px;
            }

            .nav-tabs-custom > .nav-tabs > li.active > a {
                background: rgba(40, 208, 216, 0.1) !important;
                border-color: rgba(40, 208, 216, 0.18) !important;
                border-bottom-color: transparent !important;
                color: #ecfeff !important;
            }

            .input-group .input-group-addon {
                background: rgba(255, 255, 255, 0.05) !important;
                color: var(--di-admin-muted) !important;
                border-color: rgba(137, 161, 172, 0.18) !important;
            }

            .main-footer {
                margin-left: 268px !important;
                background: transparent !important;
                border-top: 1px solid rgba(137, 161, 172, 0.1);
                color: #8eaab7;
            }

            .user-menu > a {
                display: flex !important;
                align-items: center;
                gap: 10px;
            }

            .navbar-nav > li > a {
                height: 56px;
                display: flex !important;
                align-items: center;
            }

            .user-menu .user-image {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 1px solid rgba(255, 255, 255, 0.14);
            }

            @media (max-width: 991px) {
                .main-header {
                    left: 8px;
                    right: 8px;
                    top: 8px;
                }

                .main-header .logo {
                    width: 188px;
                }

                .main-header .navbar {
                    margin-left: 188px;
                }

                .main-sidebar {
                    left: 8px;
                    top: 78px !important;
                    bottom: 8px;
                }

                .content-wrapper,
                .right-side,
                .main-footer {
                    margin-left: 0 !important;
                }

                .content-wrapper,
                .right-side {
                    margin-top: 78px !important;
                }
            }

            code {
                background: rgba(255, 255, 255, 0.05) !important;
                border-color: rgba(137, 161, 172, 0.12) !important;
            }
        </style>
    </head>
    <body class="hold-transition skin-blue fixed sidebar-mini">
        <div class="wrapper">
            <header class="main-header">
                <a href="{{ route('index') }}" class="logo">
                    <span>{{ config('app.name', 'Pterodactyl') }}</span>
                </a>
                <nav class="navbar navbar-static-top">
                    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            <li class="user-menu">
                                <a href="{{ route('account') }}">
                                    <img src="https://www.gravatar.com/avatar/{{ md5(strtolower(Auth::user()->email)) }}?s=160" class="user-image" alt="User Image">
                                    <span class="hidden-xs">{{ Auth::user()->name_first }} {{ Auth::user()->name_last }}</span>
                                </a>
                            </li>
                            <li>
                                <li><a href="{{ route('index') }}" data-toggle="tooltip" data-placement="bottom" title="Exit Admin Control"><i class="fa fa-server"></i></a></li>
                            </li>
                            <li>
                                <li><a href="{{ route('auth.logout') }}" id="logoutButton" data-toggle="tooltip" data-placement="bottom" title="Logout"><i class="fa fa-sign-out"></i></a></li>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <aside class="main-sidebar">
                <section class="sidebar">
                    <ul class="sidebar-menu">
                        <li class="header">BASIC ADMINISTRATION</li>
                        <li class="{{ Route::currentRouteName() !== 'admin.index' ?: 'active' }}">
                            <a href="{{ route('admin.index') }}">
                                <i class="fa fa-home"></i> <span>Overview</span>
                            </a>
                        </li>
                        <li class="{{ ! starts_with(Route::currentRouteName(), 'admin.settings') ?: 'active' }}">
                            <a href="{{ route('admin.settings')}}">
                                <i class="fa fa-wrench"></i> <span>Settings</span>
                            </a>
                        </li>
                        <li class="{{ ! starts_with(Route::currentRouteName(), 'admin.api') ?: 'active' }}">
                            <a href="{{ route('admin.api.index')}}">
                                <i class="fa fa-gamepad"></i> <span>Application API</span>
                            </a>
                        </li>
                        <li class="header">MANAGEMENT</li>
                        <li class="{{ ! starts_with(Route::currentRouteName(), 'admin.databases') ?: 'active' }}">
                            <a href="{{ route('admin.databases') }}">
                                <i class="fa fa-database"></i> <span>Databases</span>
                            </a>
                        </li>
                        <li class="{{ ! starts_with(Route::currentRouteName(), 'admin.locations') ?: 'active' }}">
                            <a href="{{ route('admin.locations') }}">
                                <i class="fa fa-globe"></i> <span>Locations</span>
                            </a>
                        </li>
                        <li class="{{ ! starts_with(Route::currentRouteName(), 'admin.nodes') ?: 'active' }}">
                            <a href="{{ route('admin.nodes') }}">
                                <i class="fa fa-sitemap"></i> <span>Nodes</span>
                            </a>
                        </li>
                        <li class="{{ ! starts_with(Route::currentRouteName(), 'admin.servers') ?: 'active' }}">
                            <a href="{{ route('admin.servers') }}">
                                <i class="fa fa-server"></i> <span>Servers</span>
                            </a>
                        </li>
                        <li class="{{ ! starts_with(Route::currentRouteName(), 'admin.users') ?: 'active' }}">
                            <a href="{{ route('admin.users') }}">
                                <i class="fa fa-users"></i> <span>Users</span>
                            </a>
                        </li>
                        <li class="header">SERVICE MANAGEMENT</li>
                        <li class="{{ ! starts_with(Route::currentRouteName(), 'admin.mounts') ?: 'active' }}">
                            <a href="{{ route('admin.mounts') }}">
                                <i class="fa fa-magic"></i> <span>Mounts</span>
                            </a>
                        </li>
                        <li class="{{ ! starts_with(Route::currentRouteName(), 'admin.nests') ?: 'active' }}">
                            <a href="{{ route('admin.nests') }}">
                                <i class="fa fa-th-large"></i> <span>Nests</span>
                            </a>
                        </li>
                    </ul>
                </section>
            </aside>
            <div class="content-wrapper">
                <section class="content-header">
                    @yield('content-header')
                </section>
                <section class="content">
                    <div class="row">
                        <div class="col-xs-12">
                            @if (count($errors) > 0)
                                <div class="alert alert-danger">
                                    There was an error validating the data provided.<br><br>
                                    <ul>
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif
                            @foreach (Alert::getMessages() as $type => $messages)
                                @foreach ($messages as $message)
                                    <div class="alert alert-{{ $type }} alert-dismissable" role="alert">
                                        {{ $message }}
                                    </div>
                                @endforeach
                            @endforeach
                        </div>
                    </div>
                    @yield('content')
                </section>
            </div>
            <footer class="main-footer">
                <div class="pull-right small text-gray" style="margin-right:10px;margin-top:-7px;">
                    <strong><i class="fa fa-fw {{ $appIsGit ? 'fa-git-square' : 'fa-code-fork' }}"></i></strong> {{ $appVersion }}<br />
                    <strong><i class="fa fa-fw fa-clock-o"></i></strong> {{ round(microtime(true) - LARAVEL_START, 3) }}s
                </div>
                DarkInk Panel &copy; {{ date('Y') }} · <a href="https://pterodactyl.io/">Powered by Pterodactyl</a>.
            </footer>
        </div>
        @section('footer-scripts')
            <script src="/js/keyboard.polyfill.js" type="application/javascript"></script>
            <script>keyboardeventKeyPolyfill.polyfill();</script>

            {!! Theme::js('vendor/jquery/jquery.min.js?t={cache-version}') !!}
            {!! Theme::js('vendor/sweetalert/sweetalert.min.js?t={cache-version}') !!}
            {!! Theme::js('vendor/bootstrap/bootstrap.min.js?t={cache-version}') !!}
            {!! Theme::js('vendor/slimscroll/jquery.slimscroll.min.js?t={cache-version}') !!}
            {!! Theme::js('vendor/adminlte/app.min.js?t={cache-version}') !!}
            {!! Theme::js('vendor/bootstrap-notify/bootstrap-notify.min.js?t={cache-version}') !!}
            {!! Theme::js('vendor/select2/select2.full.min.js?t={cache-version}') !!}
            {!! Theme::js('js/admin/functions.js?t={cache-version}') !!}
            <script src="/js/autocomplete.js" type="application/javascript"></script>

            @if(Auth::user()->root_admin)
                <script>
                    $('#logoutButton').on('click', function (event) {
                        event.preventDefault();

                        var that = this;
                        swal({
                            title: 'Do you want to log out?',
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#d9534f',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Log out'
                        }, function () {
                             $.ajax({
                                type: 'POST',
                                url: '{{ route('auth.logout') }}',
                                data: {
                                    _token: '{{ csrf_token() }}'
                                },complete: function () {
                                    window.location.href = '{{route('auth.login')}}';
                                }
                        });
                    });
                });
                </script>
            @endif

            <script>
                $(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                })
            </script>
        @show
    </body>
</html>
