import React, { Component } from 'react'
import axios from "axios"
import customData from './champs.json';
export default class home extends Component {

    state = {
        users: [
        ],
        champions: [
        ],
        maxmastery: [
        ],
        championList: [
        ],
        lista: [],
        Campeon: [],
        imagen: [],
        title: "",
        checked: "",
        historial: [],
        partida: [],
        resultado:[],
        ganador:[],
        campeoneslista: [],
        cola: [],
        kills:[],
        deads:[],
        assists:[],
        colorfondo:[],
        soloq:"",
        flexq:"",

    }

    async consultarPartida() {
        let par = [];
        for (var i = 0; i < 10; i++) {
            const partida = await axios("https://servidor-rest-op.herokuapp.com/perfil/partida/" + this.state.historial.matches[i].gameId)
            par.push(partida)
        }
        this.setState({ partida: par })
        return par
    }

    async buscardatos(nombre) {

        let res=[];
        let gana=[];
        this.state.partida.map(result => {
            result.data.participantIdentities.map(par =>{
                if (par.player.summonerName == nombre) {
                    res.push(result.data.participants[(par.participantId-1)])
                    if (result.data.participants[(par.participantId-1)].stats.win) {
                        gana.push("Victoria")
                    }else {
                        gana.push("Derrota")
                    }
                }

            })
        })
        this.setState({ganador:gana})
        this.setState({resultado: res})
    }

    async tipocola() {
        let cola =[]

        for (let index = 0; index < 10; index++) {
           if (this.state.historial.matches[index].queue=="440") {
               cola.push("Clasificatoria Flexible")
           }
           if (this.state.historial.matches[index].queue=="420") {
            cola.push("Clasificatoria Solo/Duo")
            }
            if (this.state.historial.matches[index].queue=="450") {
                cola.push("ARAM")
                }
                if (this.state.historial.matches[index].queue=="400") {
                    cola.push("Normal")
                    }


        }
        console.log(cola);

        this.setState({cola: cola})
    }

    async insertarRutas() {
        let campeoneslista=[]
        for (let index = 0; index < 10; index++) {
            this.state.lista.forEach((item, i) => {
                if (item.key == this.state.resultado[index].championId) {
                    campeoneslista.push( require("./dragontail-10.7.1/img/champion/tiles/" + item.id + "_0.jpg") )
                }
            })

        }

        this.setState({ campeoneslista: campeoneslista });
    }

    async kda() {
        let kills=[];
        let deads=[];
        let assists=[];
        let colorfondo=[];
        for (let index = 0; index < 10; index++) {
            kills.push(this.state.resultado[index].stats.kills)
            deads.push(this.state.resultado[index].stats.deaths)
            assists.push(this.state.resultado[index].stats.assists)
            if (this.state.resultado[index].stats.win) {
                colorfondo.push("card mb-3 border-primary")
            }
            else{
                colorfondo.push("card mb-3 border-danger")
            }

        }
        this.setState({kills: kills})
        this.setState({deads: deads})
        this.setState({assists: assists})
        this.setState({colorfondo: colorfondo})
    }

    async busqueda(nombre) {
        const res = await axios("https://servidor-rest-op.herokuapp.com/perfil/" + nombre)
       // const champs = await axios("http://ddragon.leagueoflegends.com/cdn/10.7.1/data/es_ES/champion.json")
        const champmasterymax = await axios("https://servidor-rest-op.herokuapp.com/perfil/maxmastery/" + res.data.id)
        const historial = await axios("https://servidor-rest-op.herokuapp.com/perfil/historial/" + res.data.accountId)
        const perfilinfo = await axios("https://servidor-rest-op.herokuapp.com/perfil/info/" + res.data.id)
        console.log(customData);
        let tier="Unranked"
        let unranked= {tier}
        if(perfilinfo.data.length == "0"){
            this.setState({ soloq: unranked})
            this.setState({ flexq: unranked})
        }else if (perfilinfo.data.length == "1" && perfilinfo.data[0].queueType == "RANKED_SOLO_5x5" ){
            this.setState({ soloq: perfilinfo.data[0]})
            this.setState({ flexq: unranked})
        }
        else if (perfilinfo.data.length == "1" && perfilinfo.data[0].queueType == "RANKED_FLEX_SR" ){
            this.setState({ soloq: unranked})
            this.setState({ flexq: perfilinfo.data[0]})
        }
        else if (perfilinfo.data[0].queueType == "RANKED_SOLO_5x5" && perfilinfo.data[1].queueType == "RANKED_FLEX_SR") {
            this.setState({ soloq: perfilinfo.data[0]})
            this.setState({ flexq: perfilinfo.data[1]})
        } else if(perfilinfo.data[0].queueType == "RANKED_FLEX_SR" && perfilinfo.data[1].queueType == "RANKED_SOLO_5x5" ){
            this.setState({ flexq: perfilinfo.data[0]})
            this.setState({ soloq: perfilinfo.data[1]})
        }else{
        }

        this.setState({ users: res.data })
        this.setState({ champions: customData })
        this.setState({ maxmastery: champmasterymax.data[0].championId })
        this.setState({ championList: this.state.champions.data })
        this.setState({ historial: historial.data })

        const url = 'http://ddragon.leagueoflegends.com/cdn/10.7.1/data/es_ES/champion.json'

        let dataSource = [];

        Object.values(customData.data).forEach(item => {
            dataSource = dataSource.concat(item);
        });

        this.setState({ lista: dataSource })

        this.state.lista.forEach((item, i) => {
            if (item.key == this.state.maxmastery) {
                return this.setState({ Campeon: item });
            }
        })
        this.setState({ imagen: require("./dragontail-10.7.1/img/champion/splash/" + this.state.Campeon.id + "_0.jpg") })

        await this.consultarPartida()

        await this.buscardatos(this.state.users.name)

        await this.insertarRutas()

        await this.tipocola()

        await this.kda()

        console.log(this.state.kda);

    }
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log('enter press here! ')
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1>Buscador</h1>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre de invocador"
                        onChange={this.onInputChange}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                this.busqueda(this.state.title)
                                this.state.checked = "false";
                            }
                        }}
                        name="title"
                        value={this.state.title}
                        required />
                </div>
                <br></br>
                <div className="container" hidden={this.state.checked ? false : true}>
                    <div className="card mb-3">

                        <img src={this.state.imagen} className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{this.state.users.name}</h5>
                            <p className="card-text">Nivel {this.state.users.summonerLevel}</p>
                    <p className="text-primary">Solo/Duo: {(this.state.soloq.tier)} {(this.state.soloq.rank)},  {this.state.soloq.leaguePoints} Lp</p>
                            <p className="text-primary">Flexible: {(this.state.flexq.tier)} {(this.state.flexq.rank)},  {this.state.flexq.leaguePoints} Lp</p>
                            <p className="card-text"><small className="text-muted">{this.state.Campeon.title}</small></p>
                        </div>
                    </div>
                    {

                    this.state.partida.map((result,index) => {
                        return (
                            <div className={this.state.colorfondo[index]}>
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src={this.state.campeoneslista[index]}  className="card-img" alt="..."></img>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{this.state.ganador[index]}</h5>
                                        <p className="card-text">{this.state.cola[index]} <br></br> {this.state.kills[index]}/
                                        {this.state.deads[index]}/{this.state.assists[index]}</p>
                                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })
                    }


                    <footer className="pt-4 my-md-5 pt-md-5 border-top">
                        <div className="row">
                            <div className="col-12 col-md">
                                <small className="d-block mb-3 text-muted">© 2017-2019</small>
                            </div>
                            <div className="col-6 col-md">
                                <h5>Features</h5>
                                <ul className="list-unstyled text-small">
                                    <li><a className="text-muted" href="http://localhost:3000/login">Cool stuff</a></li>
                                </ul>
                            </div>
                            <div className="col-6 col-md">
                                <h5>Resources</h5>
                                <ul className="list-unstyled text-small">
                                    <li><a className="text-muted" href="#">Resource</a></li>
                                </ul>
                            </div>
                            <div className="col-6 col-md">
                                <h5>About</h5>
                                <ul className="list-unstyled text-small">
                                    <li><a className="text-muted" href="#">Team</a></li>
                                </ul>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}
