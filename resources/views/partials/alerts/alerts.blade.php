<!-- If Errors -->
@if (count($errors) > 0)
        <div  class="row">
            <div style="margin-top: 1.3rem" class="col-md-10 col-md-offset-1">
                <div class = "alert alert-danger">
                    <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                    </ul>
                </div>
            </div>
        </div>
    @endif

    <!-- @if ( count($prod) > 0 )
        <div style="margin-top: 1.3rem" class="col-md-10 col-md-offset-1">
            <div class = "alert alert-danger">
                <ul>
                    <li>{{ $prod->qtddiavalidade }}</li>
                    <li>{{ $prod->qtdembalagem }}</li>
                </ul>
            </div>
        </div>
    @endif -->

    <!-- @if(old('success'))
        <div style="margin-top: 1.3rem" class="col-md-10 col-md-offset-1">
            <div class="alert alert-success">
                <strong>Sucesso!</strong>
                O produto {{ old('desccompleta') }} foi adicionado.
            </div>
        </div>
    @else 
        <div style="margin-top: 1.3rem" class="col-md-10 col-md-offset-1">
            <div class="alert alert-success">
                <strong>Sucesso!</strong>
                O produto  
                        @if( count($prod) > 0 )
                        {{ $prod->desccompleta }}
                    @elseif( old('desccompleta') )
                        {{ old('desccompleta')}}
                    @else 
                        {{ 'vazio' }}
                    @endif 

                        @if(count($prod) > 0) {{ $prod->desccompleta }} @elseif(old('desccompleta')) {{ old('desccompleta') }} @endif

                foi adicionado.

                
            </div>
        </div>

    @endif -->
