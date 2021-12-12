import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  
  const [city, setCity] = useState("");
  const [erro, setErro] = useState("");
  const [txtBtn, setTextBtn] = useState("Pesquisar");
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [geoLocation, setGeoLocation] = useState(null);
  


  const searchGeoLocation = () => {

    fetch (`https://api.ipstack.com/201.80.107.81?access_key=9aadc0cb4c4ade9863b003d0a66b64a7`
    ).then((response) => {
      return response.json();
    }).then ((data) => {
      setGeoLocation (data);
      
      setCity(data.city)
      // setWeatherForecast(data.city)
    });
  }

  
  useEffect(() => {
    searchGeoLocation()
   
  }, [])

  const searchForecastWeather = () => {
    setTextBtn("Buscando...");
    fetch (
      `https://api.weatherapi.com/v1/current.json?key=cdbfddfed5ef4d32817233137212010&q=${city}&lang=pt
      `).then(( response ) => {
        if(response.status === 200){
          setTextBtn("Pesquisar");
          setCity ('');
          return response.json();
        }else if( response.status === 400){
          setTextBtn("Pesquisar");
          setCity ('');
          setErro('Infelizmente não encontramos nenhum registro');
        }
      }).then ((data) => {
        setWeatherForecast (data);
      });
    
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
    setErro('');
  };

  

  return (
   
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand" href="#search">
            Previsão do tempo {}
        </a>
      </nav>
      <main className="container" id="search">
        <div className="jumbotron">
          <h1>Verifique a previsão do tempo </h1>
          <p className="lead">
            Digite sua cidade no campo abaixo e em seguida clique em pesquisar.
          </p>
          <div className="row mb-4">
            <div className="col-md-6">
                <input type="text" className="form-control" value={city} onChange={handleCityChange} />
                <button className="btn btn-lg btn-primary mt-3" onClick={searchForecastWeather}>{txtBtn}</button>
                {/* <button className="btn btn-lg btn-primary mt-3" onClick={searchGeoLocation}>{txtBtn}</button> */}
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-6">
               <p className="text-danger ">{erro}</p>
            </div>
          </div>

          {/* {geoLocation ? (
             <div className="row mt-4">
              <div className = "col-12">
              <h3>{geoLocation.country_name} | {geoLocation.city}</h3>

              </div></div>
          ) :null
          } */}

          {weatherForecast ? (
              
              <div className="row mt-4">
                <div className = "col-12">
                <h3>{weatherForecast.location.name} | {weatherForecast.location.region}</h3>
                <h1 className="display-1">{weatherForecast.current.temp_c}°</h1>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <img src={weatherForecast.current.condition.icon} alt="icon" />
                  <h4>{weatherForecast.current.condition.text}</h4>
                </div>
                <div className="col-12">
                  <h6>Sensação térmica: {weatherForecast.current.feelslike_c}°</h6>
                  <h6 className="h6">Índice UV: {weatherForecast.current.uv} </h6>
                  <h6 className="h6">Umidade: {weatherForecast.current.humidity}%</h6>
                  <h6 className="h6">Velocidade do vento: {weatherForecast.current.wind_kph} Km/h</h6>
                  <h6 className="h6">Direção do vento: {weatherForecast.current.wind_dir} </h6>
                  <h6 className="h6">Visibilidade: {weatherForecast.current.vis_km} Km</h6>
                  <h6 className="h6">Pressão: {weatherForecast.current.pressure_mb} hPa</h6>
                </div>
                  

              </div>
              
            ) : null
          }
        </div>
      </main>

    </div>
    
  );
}

export default App;