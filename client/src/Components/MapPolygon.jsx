import React, {useState, useEffect} from 'react'
import { Polygon } from 'react-leaflet'

import { fetchAllBorders, newCenterCoord, getGermanCountry, getPolyColor} from '../functions/mapFunctions'


export default function MapPolygon(props) {
  
    const {polyColor,L, country } = props
    let [localBorder, setLocalBorder] = useState([])
    let [localCoord, setLocalCoord] = useState()
    let [germanName, setGermanName] = useState()
    let [color, setColor] = useState('blue')

    let colortest = 'blue'

    useEffect(()=> {
        fetchAllBorders(country, L)
            .then((resolve) => setLocalBorder(() => resolve ))   
    },[])

    useEffect(()=> {
        newCenterCoord(country)
            .then((resolve) => setLocalCoord(() => resolve ))   
    },[]) 

    useEffect(()=> {
        if (country){
            getGermanCountry(country)
            .then((resolve) => setGermanName(() => resolve ))
        }},[])
     
    useEffect(() => {
        getPolyColor(germanName)
        .then((res) => setColor(res))
    }, [germanName])
        
    return (
        <>
            <Polygon color={color}  positions={localBorder} />
        </>
    )
}
