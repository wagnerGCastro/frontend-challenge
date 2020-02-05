@extends('layouts.app')

@section('content')
    <section>
        <div class="container">
            <div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <div class="panel panel-default">
                        <div class="panel-heading">{{ $attrib->title }}</div>
                
                        <div class="panel-body">
                           
                            <!-- Valiadtions Messages -->
                            @include( 'partials/alerts/alerts-messages' )

                            <table class="table">
                                <tbody>
                                    <tr>
                                        <td colspan="1">
                                            <form  class="form-horizontal form-table" method="POST" action="{{( isset($attrib->param) ? route($attrib->route, $attrib->param) : route($attrib->route) )}}">
                                                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                               {{  (isset($attrib->method) ? method_field($attrib->method) : '' )  }}
                                                <fieldset>
                                                    <div class="form-group">
                                                        <label class="col-md-3 control-label">Name</label>  
                                                        <div class="col-md-7 inputGroupContainer">
                                                            <div class="input-group"><input id="name" name="name" placeholder="" class="form-control" required="true" value="@if(count(get_object_vars($prod)) > 0) {{ $prod->name }} @elseif(old('name')) {{  old('name') }} @endif" type="text"></div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="col-md-3 control-label">Price</label>
                                                        <div class="col-md-7 inputGroupContainer">
                                                            <div class="input-group"><input id="price" name="price" placeholder="" class="form-control" required="true" value="@if(count(get_object_vars($prod)) > 0) {{ $prod->price }} @elseif(old('price')) {{  old('price') }} @endif" type="text"></div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="col-md-3 control-label">Description</label>
                                                        <div class="col-md-7 inputGroupContainer">
                                                            <div class="input-group"><input id="description" name="description" placeholder="" class="form-control" required="true" value="@if(count(get_object_vars($prod)) > 0) {{ $prod->description }} @elseif(old('description')) {{  old('description') }} @endif" type="text"></div>
                                                        </div>
                                                    </div>
                                            
                                                    <div class="form-group">
                                                        <label class="col-md-3 control-label">Color variation</label>
                                                        <div class="col-md-7 inputGroupContainer">
                                                            <div class="input-group">
                                                                <div class="radio">                                 
                                                                    <label>
                                                                        <input type="radio" name="color_variation"  value="Y" 
                                                                            @if(isset($prod->color_variation) &&  $prod->color_variation == 'Y') 
                                                                                {{ 'checked' }} 
                                                                            @elseif( old("color_variation") !== null   && old('color_variation') == 'Y') 
                                                                                {{ 'checked' }}
                                                                             @endif>
                                                                        Sim
                                                                    </label>
                                                                    <label>
                                                                        <input type="radio" name="color_variation"  value="N"  
                                                                            @if(isset($prod->color_variation) &&  $prod->color_variation == 'N') 
                                                                                {{ 'checked' }} 
                                                                            @elseif( old("color_variation") !== null && old('color_variation') == 'N') 
                                                                                {{ 'checked' }} 
                                                                            @elseif( old("color_variation") == null  &&  !isset($prod->color_variation)) 
                                                                                {{ 'checked' }} 
                                                                            @endif>
                                                                        Não 
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="colorVariationInputs">
                                                        <div class="form-group">
                                                            <label class="col-md-3 control-label">Color name</label>
                                                            <div class="col-md-7 inputGroupContainer">
                                                                
                                                                <div class="input-group"><input id="color_hexa" name="color_name" placeholder="" class="form-control"  value="@if(count(get_object_vars($prod)) > 0) {{ $prod->color_name }} @elseif(old('color_name')) {{  old('color_name') }} @endif" type="text"></div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="col-md-3 control-label">Color hexa</label>
                                                            <div class="col-md-7 inputGroupContainer">
                                                                <div class="input-group"><input id="color_hexa" name="color_hexa" placeholder="" class="form-control" required="true" value="@if(count(get_object_vars($prod)) > 0) {{ $prod->color_hexa }} @elseif(old('color_hexa')) {{  old('color_hexa') }} @endif" type="color"></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                            <div style="margin-top: 1.5rem" class="col-md-7 col-md-offset-3 text-left">
                                                                <button type="submit" class="btn btn-default">{{ $attrib->btnSubmit }}</button>
                                                            </div>
                                                        </div>
                                                </fieldset>
                                            </form>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection