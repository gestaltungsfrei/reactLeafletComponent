import countries from '../data/countries.geo.json'
import capitals from '../data/capitals.geo.json'
import gerCountry from '../data/gerCountriesCoord.json'
import numbersCountry from '../data/numArticlesCountry.json'

//Functions for handling the map and geo.json files



// getting polygon coordinates of the country from geo.json file
export const fetchAllBorders = async (country, L) => {
    let latLngs =[]
    let coordinates = []
    let type = 'Polygon'
    
    // Filter geo.json list of countries
    const filter = countries.features.filter( element => element.properties.name === country)
    if (filter[0]){
        type = filter[0].geometry.type
        coordinates = filter[0].geometry.coordinates
    
    //change postion of coordinates using build in method of leaflet with specified depth of the array 
    if (type === 'Polygon') latLngs = L.GeoJSON.coordsToLatLngs(coordinates,1);
    else if (type === 'MultiPolygon') latLngs = L.GeoJSON.coordsToLatLngs(coordinates,2);

    return latLngs
    }}




//Using OSM nominatim for fetching clicked country
export const fetchCountryByCoord = async (coordinates) => {
    const {lat, lng} = (coordinates.latlng)
    try{
        //get english country name 
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=3&accept-language=en`)
        const dataEn = await res.json()
        return [dataEn] }
    catch(error){
        console.log(error)
    }}


//GET GERMAN NAME BY FILTERING THE JSON FILE
export const getGermanCountry = async (country) => {
    if (country) {
       const countryObj = gerCountry.filter((element) =>  element.country === country)
       if (countryObj[0]) {
        return countryObj[0].germanName
       }
 
    }
}

// Centering the map when the country changes using the coordinates of its capital    
export const newCenterCoord = async (country) => {
    const newCenter = capitals.features.filter(element => element.properties.country === country )
    if (newCenter.length>0){
        let coordinates = [...newCenter[0].geometry.coordinates]
        let fixedCoord = coordinates.reverse()
        return fixedCoord
        }
    else {
        console.log('Something is wrong with centering ', country,' the json found is',newCenter) 
    }
}


export const getPolyColor = async(country) => {
    const colorArray = ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "##969696", "#737373", "#525252", "#252525", "#000000" ]
    let color ='blue'
    const countryObj = numbersCountry.filter((element) => element.countryName === country)
    if (countryObj[0]){
        
        const numberArt = countryObj[0].numArticles
         if (numberArt < 100) {color = colorArray[0]}
         else if (numberArt < 200) {color = colorArray[1]}
         else if (numberArt < 300) {color = colorArray[2]}
         else if (numberArt < 300) {color = colorArray[3]}
         else if (numberArt < 400) {color = colorArray[4]}
         else if (numberArt < 500) {color = colorArray[5]}
         else if (numberArt < 600) {color = colorArray[6]}
         else if (numberArt < 800) {
            console.log('number is: ', numberArt, 'color should be: ', color) 
            color = colorArray[7]}
         else {color = colorArray[8]} 
        }
        return color
    // return color
}


// export const getGermanCountryName = async (coordinates) => {
//     console.log('german coordinates:', coordinates)
    // if (coordinates){
    //     try {
    //         const [lat, lng] = coordinates
    //         const resDe = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=3&accept-language=de`)
    //         const dataDe = await resDe.json()
    //         return dataDe.address.country
    //     }
    //     catch(error){
    //         console.log('something was wrong with german country names')
    //     }
       
    // }
// }