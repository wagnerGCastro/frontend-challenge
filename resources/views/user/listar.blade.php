@extends('layouts.app')


@section('content')
    <section>
        <div class="container">
            <div class="row">
                <div class="col-md-12 ">
                    <div class="panel panel-default">
                        <div class="panel-heading">List of users</div>
                            <div class="panel-body">
                                <div class="loader-1 "></div>
                                <div class="table-hidden">
                                    <table class="table table-bordered table-hover dt-responsive display nowrap table-hidden" id="tablUser" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Created</th>
                                                 <th>Updated</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           @foreach( $users as $u )
                                                <tr>
                                                    <th scope="row">{{ $u->id }}</th>
                                                    <td>{{ $u->name }}</td>
                                                    <td>{{ $u->email }}</td>
                                                    <td>{{ $u->created_at }}</td>
                                                    <td>{{ $u->updated_at }}</td>
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
        </div>
    </section>
@endsection