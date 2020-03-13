@extends('layouts.app')

@section('content')
    <section>
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-md-offset-0">
                    <div class="panel panel-default">
                        <div class="panel-heading">List of Products</div>
                        <div class="panel-body">
                            <div class="loader-1 "></div>
                            <div class="table-tabProduct table-hidden">
                               @include('partials/alerts/messages')
                                <table class="table table-striped table-bordered dt-responsive display nowrap table-hidden " id="tabProduct"  style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Description</th>
                                            <th>Color Var.</th>
                                            <th>Color</th>
                                            <th>Color Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       @foreach ( $resp as $p )
                                            <tr>
                                                <th scope="row">{{ $p->id_product }}</th>
                                                <td>{{ $p->name }}</td>
                                                <td>{{ $p->price }}</td>
                                                <td>{{ $p->description }}</td>
                                                <td>{{ ($p->color_variation == 'Y' ? 'active'  : 'inactive') }}</td>
                                                <td>
                                                    @if($p->color_variation == 'Y')
                                                         <input class="click-false input-type-color" type="color" value="{{ $p->color_hexa }}">
                                                    @endif
                                                </td>
                                                <td>{{ ($p->color_variation == 'Y' ? $p->color_name  : '') }}</td> 
                                                <td align="center" class="acoes">
                                                    <a href="/product/edit/{{ $p->id_product }}" title="Editar" class="btn btn-xs mr10">
                                                        <span class="glyphicon glyphicon-pencil"></span>
                                                    </a>
                                                    <a data-id="{{ $p->id_product }}" href="{{ route('product.destroy', $p->id_product ) }}" title="Excluir" class="deleteProductId">
                                                        <!-- onclick="event.preventDefault();
                                                            if(confirm('Are you sure?')){
                                                                document.getElementById('productDelete').submit()
                                                            };">
 -->
                                                        <span class="glyphicon glyphicon-trash"></span>
                                                    </a>

                                                    <form class="formProductDelete" action="" method="POST" style="display: none;">
                                                        <input type="hidden" name="_method" value="delete" />
                                                        {{ csrf_field() }}
                                                    </form>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection