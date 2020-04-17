import React, { useState, useEffect } from 'react';
//import {iniPartida} from '../juego.js';

const BtnIniciarJuego=(props)=>{
    console.log(props.imagenes)
    /* //let [imagenes, iniPartida] = useState(props.imagenes);

    useEffect(() => {
        //props.cambiarEstado(props.nivel, imagenes)
    }); */

    return (
        <div className="d-flex justify-content-center">
            <button  className="btn btn-primary" onClick={props.iniPartida}> {props.name }</button>
        </div>
    );
}

export default BtnIniciarJuego;
