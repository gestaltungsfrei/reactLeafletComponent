import './App.css';
import React, {useState} from 'react';
import Header from './Components/Header';
import MapWrapper from './Components/MapWrapper';
import ArticleBox from './Components/ArticleBox';

function App() {
  const [country, setCountry] = useState('')
  const [countryDe, setCountryDe] = useState('')
  const [mapStyle, setMapStyle] = useState('topo')


  return (
    <div className="App">
      <Header country={country} setCountry={setCountry} setMapStyle={setMapStyle} /> 
      <MapWrapper country={country} setCountry={setCountry} mapStyle={mapStyle} setCountryDe={setCountryDe} />
      {
        countryDe ? <ArticleBox country={countryDe} /> : <></>
      }
      
      
    </div>
  );
}

export default App;
