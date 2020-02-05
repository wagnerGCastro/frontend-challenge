@extends('layouts.app')

@section('content')
    @if (Session::has('message.error'))
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="alert alert-danger alert-dismissible alert-msg" role="alert">
                        <span class="glyphicon glyphicon-remove"></span> {{ Session::get('message.error') }}
                        <button type="button" class="close close-msg " data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true"><span class="glyphicon glyphicon-remove-sign"></span> </span> 
                        </button>
                    </div> 
                </div>
            </div>
        </div>
    @endif 
@endsection