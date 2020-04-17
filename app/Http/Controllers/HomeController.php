<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $imagenes= Storage::files('public/images');
        $numImg=rand(0, count($imagenes)-1);
        $imagen=$imagenes[$numImg];
        $imagen=explode('/', $imagen);
        $imagen=$imagen[2];
        $imagen="storage/images/".$imagen;
        //$imagen='hola';
        return view('welcome', ['imagen'=>$imagen]);
    }

    public function getImagesParts($nivel, $imagen)
    {
        $imagen=explode('.',$imagen)[0];
        $imagenes= Storage::files('public/'.$imagen.'/'.$nivel);
        $listaImagenes=[];
        for ($x = 0; $x < count($imagenes); $x++) {
            $img=explode('/',$imagenes[$x]);
            $img='storage/'.$img[1].'/'.$img[2].'/'.$img[3];
            array_push($listaImagenes, [
                    'url'=>$img,
                    'alt'=>$imagen.$x,
                    'id'=>$x+1
                    ]);
        }
        $listaImagenes=json_encode($listaImagenes);
        return  $listaImagenes;
    }
}
