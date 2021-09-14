import React, {useState, useEffect} from 'react'
import { Map, TileLayer, Polygon, Marker } from 'react-leaflet'
import L from 'leaflet'
import MapPolygon from './MapPolygon'
import countries from '../data/countries.geo.json'
import { fetchAllBorders, fetchCountryByCoord, getGermanCountry, getGermanCountryName, newCenterCoord } from '../functions/mapFunctions'

export default function MapWrapper(props) {
    const [border, setBorder] = useState([])
    const polyColor = 'red'
    const [mapCenter, setMapCenter] = useState([51.505, -0.09])
    const {country, setCountry, mapStyle, setCountryDe} = props


    //mapCLick getting the country and coordinates of new border, change these states
    const handleMapClick = async (e) => {
        // if (mapStyle !== 'choro'){
            const countryFetch = await fetchCountryByCoord(e)
            if (countryFetch[0].address) {
                    const latLngs = await fetchAllBorders(countryFetch[0].address.country, L)
                    setBorder(() => latLngs) 
                    setCountry(() => countryFetch[0].address.country)
                    // setCountryDe(() => countryFetch[1].address.country)
            }
            else {
                setCountry('')
                setCountryDe('')
            }
        // }
       
    }

    //border and the centering should only take place when country is changed
    useEffect(()=> {
        fetchAllBorders(country, L)
            .then((res) => setBorder(res))
        
        newCenterCoord(country)
            .then((res) => setMapCenter(res))
        },[country])

    // useEffect(() => {
    //     getGermanCountryName(mapCenter)
    //      .then((res) => setCountryDe(res))
    // },[mapCenter])

    useEffect(() => {
        getGermanCountry(country)
        .then((res) => {
            console.log('This is the german name? ',res)
            setCountryDe(res)})
    }, [country])

  
    return (
        <>
        {/* Create the Map Object */}
            <Map center={mapCenter} zoom={4} scrollWheelZoom={false}
            style={{width: "100vw", height: "100vh"}}
              onClick={(e) => handleMapClick(e) }
            >
                {/* 4 Map Styles - Choro - Hot - Osm - Topo */}
               {mapStyle=== 'choro'
                ?   countries.features.map((element, index) => 
                        <MapPolygon polyColor={polyColor} L={L} country={element.properties.name} index={index}/>) 
                :  (<>
                    {/* Only with Hot, Osm and Topo maptiles are loaded */}
                    <TileLayer
                        attribution={
                            ('&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors') + 
                            (mapStyle === 'topo' ? ' - SRTM | Kartendarstellung: <a href="http://opentopomap.org/">OpenTopoMap</a>' 
                            : mapStyle === 'hot' ? ' - fond de carte par <a href="https://www.hotosm.org/updates/2013-09-29_a_new_window_on_openstreetmap_data">Yohan Boniface & Humanitarian OSM Team</a> sous <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.fr">licence domaine public CC0</a> 🏠 hébergé par <a href="https://www.openstreetmap.fr/mentions-legales/">OSM France</a>'
                            : '')}
                            url={mapStyle === 'topo' ? "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" :
                            mapStyle === 'hot'  ? "http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" :
                            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            }
                    />
                    {country ? <Polygon color={polyColor} positions={border} /> : <></>}
                </>)
                }   
               

               
            </Map>
        </>
    )
}
