import '../assets/App.css';
import React from 'react';
import { useState } from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      post: {},
      actualLong :1,
      actualLat : 1,
      finalElements: []
    };
  }
  createElements = () => {
    const elements = [];
    for (let i = 0; i< this.state.post["list"].length; i++){
      elements.push(<h4 className = "name_ville">Ville : {this.state.post["list"][i].name} </h4>);
      elements.push(<h4>Coordonnées : longitude : {this.state.post["list"][i].coord.lon} / latitude : {this.state.post["list"][i].coord.lat}</h4>);
      elements.push( <h4>Température : {(this.state.post["list"][i].main.temp-273.15).toFixed(1)} °C</h4>);
      elements.push( <h4>Temps : {this.state.post["list"][i].weather[0].description}</h4>);
      elements.push( <h4>Etat : {this.state.post["list"][i].weather[0].main}</h4>);
      elements.push( <img alt = {this.state.post["list"][i].weather[0].icon} src = {this.state.post["list"][i].weather[0].icon + '.png'}></img>);
      elements.push( <p>----------------------------------------------------------------------</p>);
  
    }
    this.setState({ finalElements : elements });
  console.log(this.state.finalElements);
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition( (position)=> {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      this.setState({actualLon : position.coords.longitude.toFixed(3)});
      this.setState({actualLat : position.coords.latitude.toFixed(3)});

    });
    fetch("http://api.openweathermap.org/data/2.5/find?lat=48.887&lon=2.290&appid=e2bf6ec9c5eebca89cab32a152fa33e2")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            post : result
          });
          this.createElements();
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div className = "main-component">
          <h1>Données de météo</h1>
          <h3>Ma position : longitude : {this.state.actualLon}/ latitude : {this.state.actualLat}</h3>
        {this.state.finalElements}
        </div>
      );
    }
  }
}

export default App;

