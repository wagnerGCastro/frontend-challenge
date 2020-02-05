@extends('layouts.app')

@section('content')
    <section>
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-md-offset-0">
                    <div class="panel panel-default">
                        <div class="panel-heading">List of Products</div>
                
                        <div class="panel-body">

                             <!-- Succes Messages -->
                            @include( 'partials/alerts/alerts-messages' )

                            <div class="table-response" >
                                <table class="table table-striped table-bordered" id="tabProduct">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Description</th>
                                            <th>Color Var.</th>
                                            <th>Color Hexa</th>
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
                                                <td>{{ $p->color_variation }}</td>
                                                <td>{{ $p->color_hexa }}</td>
                                                <td>{{ $p->color_name }}</td>
                                                <td align="center" class="acoes">
                                                    <a href="/product/edit/{{ $p->id_product }}" title="Editar">
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