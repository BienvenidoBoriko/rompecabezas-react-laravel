import BtnIniciarJuego from '../components/btn-iniciar-juego';
import SubNavBar from '../components/SubNavBar';
import React from 'react';

import { Component } from 'react';
import { DndProvider } from 'react-dnd';
import PartImg from './../components/partImg';
import Backend from 'react-dnd-html5-backend';

class Home extends Component {
    constructor(props) {
        super(props);
        this.cargarNivel = this.cargarNivel.bind(this);
        this.state = {
            date: new Date(),
            nivel: 0,
            imagenes: Array()
        };

        this.cambiarEstado = this.cambiarEstado.bind(this);
        this.moveImg = this.moveImg.bind(this);
        this.iniPartida = this.iniPartida.bind(this);
    }

    iniPartida() {
        this.imagenes=this.state.imagenes;
        let imagenes=this.state.imagenes;
        imagenes.sort(() => Math.random() - 0.5);
        this.cambiarEstado(this.state.nivel, imagenes);

    }

    moveImg(sIndex, tIndex) {
        let imgs = [...this.state.imagenes];
        console.log(imgs);
        let sourceImages = imgs[sIndex];
        imgs[sIndex]=imgs[tIndex];
        imgs[tIndex]=sourceImages
        console.log(imgs)
        //const targetImages = imgs.find(img => img.id === tId);
       // const sortImages = imgs.filter(img => img.id !== id);

       // sortImages.splice(index, 0, sourceImages);
        this.setState({ imagenes: imgs });
    }

    cambiarEstado(nivel, imagenes) {
        this.setState({ nivel: nivel, imagenes: [...imagenes] });
        let log=imagenes.length;
        let numImg=(log/(++nivel));
        let ancho= 55/numImg;
       let imgNodos=document.getElementsByClassName('img-small');
       for(let img of imgNodos){
        img.style.maxHeight=ancho+'vh'
       }
    }
    cargarNivel(e) {
        let nivel = e.target.value;
        fetch(`http://${window.location.hostname}/nivel/${nivel}/img/${imagen.split('/')[2] }`)
            .then((response) => {
                return response.json()
            })
            .then((imagenes) => {
                this.cambiarEstado(nivel, imagenes);
            })
    }

    chunkArray(myArray, chunk_size) {
        let results = [];
        while (myArray.length) {
            results.push(myArray.splice(0, chunk_size));
        }
        return results;
    }

    items(imgs,num,numFilas) {
        console.log(imgs)
        let items = [];
        let index=0;
        for(let i=0;i<numFilas;i++){
            index=num+i;
            items.push(
                <td key={i + 1}>
                    <PartImg
                    key={i + 1}
                    index={index}
                    id={imgs[i].id}
                    url={imgs[i].url}
                    alt={imgs[i].alt}
                    moveImg={this.moveImg}
                />
                </td>

            )
        }
        return items;
    }

    rows() {
        let rows = [];
        let numFilas = Math.sqrt(this.state.imagenes.length);
        let imagenes=[...this.state.imagenes];
        let imgs = this.chunkArray(imagenes, numFilas);
        for (let i = 0; i < numFilas; i++) {
            rows.push(<tr key={numFilas+''+i}> {this.items(imgs[i],numFilas*i,numFilas)} </tr>)
        }
        return rows;
    }

    render() {
        let items = [];

        return (
            <div id="home" className="juego">
                <header className="d-flex justify-content-center">
                    <SubNavBar niveles='7' onClick={this.cargarNivel} />
                </header>
                <div className="container d-flex flex-column justify-content-center ">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card shadow p-3 mb-5 bg-white rounded d-flex flex-row flex-wrap">

                                {this.state.nivel > 0 ? (
                                    <DndProvider backend={Backend}>
                                        <table className="tabla">
                                            <tbody>
                                            {this.rows()}
                                            </tbody>
                                        </table>
                                    </DndProvider>
                                ) : (<img src={imagen ? imagen : ''} alt="" id="img-principal" />)
                                }
                            </div>
                        </div>
                    </div>
                    <BtnIniciarJuego iniPartida={this.iniPartida} imagenes={this.state.imagenes} name='Iniciar Juego' nivel={this.state.nivel} />
                </div>

            </div>
        )
    }

}

export default Home;

