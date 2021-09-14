import mongoose from 'mongoose'
import TmpCountry from '../models/tmpCountry.js'
import fetch from 'node-fetch'

//Found no import for json functionality so using require instead:
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const capitals = require("../client/src/data/capitals.geo.json")



//Connection DB
const port = 4000;
const URI = 'mongodb://127.0.0.1:27017/leMondeArticleOverviewTest'


const delay = () => new Promise(res => setTimeout(() => {
    console.log('timeout')
    res()
}, 4000))

const resultArray = []

mongoose.connect( URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then( (res, rej) => console.log("Connection with DB works!") )
  .catch(err => console.log("Connection is somehow strange...!", err.message))
 


const fetchData = async(country, coordinates, lat, lng) => {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=3&accept-language=de`)
    const resolve = await res.json()
    const input = {
        country: country,
        coordinatesCapital: coordinates,
        germanName: resolve.address.country
    }
    resultArray.push(input)
    return input
    
}   


const seed = async() => {
    for (let i=0; i < capitals.features.length; i++){
        console.log('Promise start: ')
        let coordinates = [...capitals.features[i].geometry.coordinates]
        let fixedCoord = coordinates.reverse()
        const [lat, lng] = fixedCoord
        await delay()
        try {
            const input = await fetchData(capitals.features[i].properties.country, coordinates, lat, lng);
            const tmpCountry = TmpCountry(input)
            await tmpCountry.save()
        }
        catch(error){
            console.log(error)
        }
    }
console.log('into DB done')    
}
 

seed()
