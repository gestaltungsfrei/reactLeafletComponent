import './App.css';
import React, {useState} from 'react';
import Header from './Components/Header';
import MapWrapper from './Components/MapWrapper';
import ArticleBox from './Components/ArticleBox';
import OffCanvas from './Components/OffCanvas';
import AuthContext from './context';


function App() {
  const [country, setCountry] = useState('')
  const [countryDe, setCountryDe] = useState('')
  const [mapStyle, setMapStyle] = useState('topo')
  const [offCanvasShow, setOffCanvasShow] = useState(false);
  const [authUser, setAuthUser] = useState('none')


  return (
    <div className="App">
      <AuthContext.Provider value={{authUser, setAuthUser}}>
      <Header country={country} setCountry={setCountry} setMapStyle={setMapStyle} setOffCanvasShow={setOffCanvasShow}/> 
      <OffCanvas setOffCanvasShow={setOffCanvasShow} offCanvasShow={offCanvasShow} />
      <MapWrapper country={country} setCountry={setCountry} mapStyle={mapStyle} setCountryDe={setCountryDe} />
      {
        countryDe ? <ArticleBox country={countryDe} setCountry={setCountry}  /> : <></>
      }
      </AuthContext.Provider> 
      
    </div>
  );
}

export default App;
