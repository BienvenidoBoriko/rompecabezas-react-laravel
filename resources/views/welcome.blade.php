@extends('layouts.app')

@section('content')
    @isset($imagen)
        <script>
            var imagen=@json($imagen);
            console.log(imagen)
        </script>
    @endisset

    <div class="flex-center position-ref full-height" id="example">
    </div>

@endsection
