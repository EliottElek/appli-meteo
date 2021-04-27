import "../assets/App.css";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      post: {},
      actualLong: 1,
      actualLat: 1,
      url:
        "http://api.openweathermap.org/data/2.5/find?lat=0&lon=0&appid=e2bf6ec9c5eebca89cab32a152fa33e2",
      finalElements: [],
      finalElements2: [],
      otherElements: [],
      time: "",
      d: new Date(),
    };
  }
  mainInfos = () => {
    const elements = [];
    for (let i = 0; i < 1; i++) {
      elements.push(
        <img
          className="weather-icon"
          alt={this.state.post["list"][i].weather[0].icon}
          src={
            "http://openweathermap.org/img/w/" +
            this.state.post["list"][i].weather[0].icon +
            ".png"
          }
        ></img>
      );
      elements.push(
        <h1 className="name_ville">{this.state.post["list"][i].name} </h1>
      );
      elements.push(
        <h4>
          (longitude : {this.state.post["list"][i].coord.lon} / latitude :{" "}
          {this.state.post["list"][i].coord.lat})
        </h4>
      );
      elements.push(
        <h3>{this.state.post["list"][i].weather[0].description}</h3>
      );
      elements.push(
        <h1 className="temp">
          {(this.state.post["list"][i].main.temp - 273.15).toFixed(1)} °C
        </h1>
      );
      elements.push(
        <h3 className="inter_temp">
          min : {(this.state.post["list"][i].main.temp_min - 273.15).toFixed(1)}{" "}
          °C / max :{" "}
          {(this.state.post["list"][i].main.temp_max - 273.15).toFixed(1)} °C
        </h3>
      );
    }
    this.setState({ finalElements: elements });
  };
  secondaryInfos = () => {
    const elements2 = [];
    elements2.push(
      <p className="sec-info">
        humidité : {this.state.post["list"][0].main.humidity}%
      </p>
    );
    elements2.push(
      <p className="sec-info">
        vitesse du vent : {this.state.post["list"][0].wind.speed} m/s
      </p>
    );
    elements2.push(
      <p className="sec-info">
        pression atmosphérique : {this.state.post["list"][0].main.pressure} p
      </p>
    );

    this.setState({ finalElements2: elements2 });
  };
  otherElements = () => {
    const elements3 = [];
    for (let i = 0; i < this.state.post["list"].length; i++) {
      elements3.push(
        <img
          className="weather-mini-icon"
          alt={this.state.post["list"][i].weather[0].icon}
          src={
            "https://openweathermap.org/img/w/" +
            this.state.post["list"][i].weather[0].icon +
            ".png"
          }
        ></img>
      );
      elements3.push(
        <h1 className="name_ville">{this.state.post["list"][i].name} </h1>
      );
      elements3.push(
        <h4>
          (longitude : {this.state.post["list"][i].coord.lon} / latitude :{" "}
          {this.state.post["list"][i].coord.lat})
        </h4>
      );
      elements3.push(
        <h3>{this.state.post["list"][i].weather[0].description}</h3>
      );
      elements3.push(
        <h1 className="temp">
          {(this.state.post["list"][i].main.temp - 273.15).toFixed(1)} °C
        </h1>
      );
      elements3.push(
        <h3 className="inter_temp">
          min : {(this.state.post["list"][i].main.temp_min - 273.15).toFixed(1)}{" "}
          °C / max :{" "}
          {(this.state.post["list"][i].main.temp_max - 273.15).toFixed(1)} °C
        </h3>
      );
    }
    this.setState({ otherElements: elements3 });
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ actualLon: position.coords.longitude.toFixed(3) });
      this.setState({ actualLat: position.coords.latitude.toFixed(3) });
      console.log("long " + this.state.actualLon);
      let urlOfLocation =
        "https://api.openweathermap.org/data/2.5/find?lat=" +
        this.state.actualLat +
        "&lon=" +
        this.state.actualLon +
        "&appid=e2bf6ec9c5eebca89cab32a152fa33e2";
      this.setState({ url: urlOfLocation });
      console.log(this.state.url);
    });
    setTimeout(
      () =>
        fetch(this.state.url)
          .then((res) => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                post: result,
              });
              this.mainInfos();
              this.secondaryInfos();
              this.otherElements();
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error,
              });
            }
          ),
      1000
    );
  }
   ListItem=(props)=> {
    return <li>{props}</li>;
  }
  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div className="main">
          <div className="main-component">
         {this.state.finalElements}
            <h3 className="infos_sup">Infos supplémentaires :</h3>
            {this.state.finalElements2}
             </div>
          <div className="sec-component">
            <h2>Près de chez vous</h2>
           {this.state.otherElements}
          </div>
        </div>
      );
    }
  }
}
export default App;
