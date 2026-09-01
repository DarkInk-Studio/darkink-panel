@extends('layouts.admin')

@section('title')
    Administration
@endsection

@section('content-header')
    <h1>Administrative Overview<small>A quick glance at your system.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">Index</li>
    </ol>
@endsection

@section('content')
<div class="row di-overview-grid">
    <div class="col-sm-6 col-lg-3">
        <a class="di-overview-card" href="{{ route('admin.servers') }}">
            <span class="di-overview-icon"><i class="fa fa-server"></i></span>
            <span><strong>Servers</strong><small>Provisioning and lifecycle</small></span>
            <i class="fa fa-angle-right"></i>
        </a>
    </div>
    <div class="col-sm-6 col-lg-3">
        <a class="di-overview-card" href="{{ route('admin.nodes') }}">
            <span class="di-overview-icon"><i class="fa fa-sitemap"></i></span>
            <span><strong>Nodes</strong><small>Capacity and connectivity</small></span>
            <i class="fa fa-angle-right"></i>
        </a>
    </div>
    <div class="col-sm-6 col-lg-3">
        <a class="di-overview-card" href="{{ route('admin.users') }}">
            <span class="di-overview-icon"><i class="fa fa-users"></i></span>
            <span><strong>Users</strong><small>Accounts and ownership</small></span>
            <i class="fa fa-angle-right"></i>
        </a>
    </div>
    <div class="col-sm-6 col-lg-3">
        <a class="di-overview-card" href="{{ route('admin.databases') }}">
            <span class="di-overview-icon"><i class="fa fa-database"></i></span>
            <span><strong>Databases</strong><small>Hosts and assignments</small></span>
            <i class="fa fa-angle-right"></i>
        </a>
    </div>
</div>
<div class="row">
    <div class="col-xs-12">
        <div class="box
            @if($version->isLatestPanel())
                box-success
            @else
                box-danger
            @endif
        ">
            <div class="box-header with-border">
                <h3 class="box-title">System Information</h3>
            </div>
            <div class="box-body di-system-status">
                <span class="di-status-indicator"><i class="fa fa-check"></i></span>
                <div>
                @if ($version->isLatestPanel())
                    <strong>DarkInk Panel is operational</strong>
                    <p>You are running on Pterodactyl <code>{{ config('app.version') }}</code>. The installed upstream base is current.</p>
                @else
                    <strong>Upstream update available</strong>
                    <p>The latest upstream version is <a href="https://github.com/Pterodactyl/Panel/releases/v{{ $version->getPanel() }}" target="_blank" rel="noopener noreferrer"><code>{{ $version->getPanel() }}</code></a>; this installation currently uses <code>{{ config('app.version') }}</code>. Review the <a href="https://pterodactyl.io/panel/1.0/updating.html" target="_blank" rel="noopener noreferrer">official update instructions</a> before upgrading.</p>
                @endif
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-xs-12">
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Operations Links</h3>
            </div>
            <div class="box-body">
                <div class="row">
                    <div class="col-xs-6 col-sm-3 text-center">
                        <a href="{{ $version->getDiscord() }}" class="btn btn-warning btn-block"><i class="fa fa-fw fa-support"></i> Get Help <small>(Discord)</small></a>
                    </div>
                    <div class="col-xs-6 col-sm-3 text-center">
                        <a href="https://pterodactyl.io" class="btn btn-primary btn-block"><i class="fa fa-fw fa-link"></i> Upstream Docs</a>
                    </div>
                    <div class="clearfix visible-xs-block">&nbsp;</div>
                    <div class="col-xs-6 col-sm-3 text-center">
                        <a href="https://github.com/pterodactyl/panel" class="btn btn-primary btn-block"><i class="fa fa-fw fa-code-fork"></i> Upstream GitHub</a>
                    </div>
                    <div class="col-xs-6 col-sm-3 text-center">
                        <a href="{{ $version->getDonations() }}" class="btn btn-success btn-block"><i class="fa fa-fw fa-money"></i> Support the Project</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
