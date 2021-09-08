import React, {useState} from 'react'
import countries from '../data/countries.geo.json'
import { ButtonGroup, Button } from 'react-bootstrap'

export default function Header(props) {
  
    const {country, setCountry, setMapStyle, setOffCanvasShow} = props
    const [collapsed, setCollapsed] = useState(true)

    const selectMap= (e) => {
     setMapStyle(() => e.target.value)
    }

    const selectCountry = (e) =>{
        setCountry(() => e.target.value)
    }

    const handleClick = () => {
        setCollapsed(() => !collapsed)
    }
  
    return (
        <>
        {!collapsed ?
         <div className="header">
            <p className="arrowClose" onClick={handleClick}>&#187;</p>
            <h6>{country.length<1 ? 'Select a country' : `${country} selected`} </h6>
            <select value={country} onChange={(e) => selectCountry(e)} name="country" id="countrySelect">
                {countries.features.map( (element,index) => {
                    const mapCountry = element.properties.name
                    return(
                        <option key={index} value={mapCountry}>{mapCountry}</option>
                    )
                })}

            </select>
            <select defaultValue='topo' onChange={(e) => selectMap(e)} name="Map Style">
                <option value="osm">OSM Standard</option>
                <option value="hot">Huminatarian</option>
                <option value="topo" selected>Topos Style</option>
                <option value="choro">Choropleth</option>
            </select>
            <Button onClick ={() => setOffCanvasShow(true)} variant="success">
                Login
            </Button>
        </div> :
        <div className="headCollapsed" onClick={handleClick}>
            {[6,6,6].map((e) => <div className={'menuIcon'}></div> )}
        </div>}
        </>
    )
}
