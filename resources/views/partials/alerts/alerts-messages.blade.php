@if (Session::has('message.success'))
    <div class="row">
        <div class="col-lg-12">
            <div class="alert alert-success alert-dismissible alert-msg" role="alert">
                <span class="glyphicon glyphicon-ok"></span> {{ Session::get('message.success') }}
                <button type="button" class="close close-msg " data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true"><span class="glyphicon glyphicon-remove-sign"></span> </span> 
                </button>
            </div> 
        </div>
    </div>
@endif 

@if (Session::has('message.error'))
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
@endif 

@if (count($errors) > 0)
    @foreach ($errors->all() as $error)
    <div class="row">
        <div class="col-lg-12">
            <div class="alert alert-warning alert-dismissible alert-msg" role="alert">
                <span class="glyphicon glyphicon-remove"></span> {{ $error }}
                <button type="button" class="close close-msg " data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true"><span class="glyphicon glyphicon-remove-sign"></span> </span> 
                </button>
            </div> 
        </div>
    </div>
    @endforeach
@endif
               

