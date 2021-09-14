import mongoose from 'mongoose'
import Country from '../models/Country.js'
import fetch from 'node-fetch'

//Found no import for json functionality so using require instead:
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const {laender} = require("../data/laender.json") 
//For testing purpose:
// const {laender} = require("../data/laenderForTesting.json") 


let newArray =[]


//Connection DB
const port = 4000;
const URI = 'mongodb://127.0.0.1:27017/leMondeArticleOverview'
// For testing purpose:
// const URI = 'mongodb://127.0.0.1:27017/leMondeArticleOverviewTest'

mongoose.connect( URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then( (res, rej) => console.log("Connection with DB works!") )
  .catch(err => console.log("Connection is somehow strange...!", err.message))
 



// fetch the raw material 
console.log('Will scratch number of Articles from: ',laender.length,' countries')
let rawDataPromises = Array(laender.length).fill(null).map( (el, index) => {
  return fetch(`https://monde-diplomatique.de/archiv-text?text=${laender[index]}`)
})


//helper functions
const scratchData = (rawArrayComplete) => {
    console.log('scratch data started')
    const re = /(?<=<span>Treffer).*?(<\/span><\/h3><div>)/
    const scratchArr = rawArrayComplete.map((element, index) =>
        { 
        console.log('Index: ', index, 'Element: ', element)
        const rawArticle = element.match(re)
        if (!rawArticle){
            return {[index]: ''}
        }
        console.log(666, 'From here this is extracted: ',rawArticle[0])
        return {[index]: rawArticle[0] }
    })
   return scratchArr
}

const buildInput = (scratchArr) => {
    console.log('build Article started')
   
    const finalCountryNum = scratchArr.map((element) => {
        for (const [country, rawArt] of Object.entries(element)){
            const numberStart = rawArt.indexOf('von')
            const numberEnd = rawArt.indexOf('</span>')
            let numberSlice = rawArt.slice((numberStart+4),(numberEnd))
            numberSlice = Number(numberSlice)
            const input = {
                    countryName: country,
                    numArticles: numberSlice
                }
            return input
        }
        
    })
    const merged = finalCountryNum.flat(1)
    return merged
}

const PromiseInToDb = (tmpArray) => {
    
    const newPromise = tmpArray.map((element) => {
       const country = Country(element)
       return (
          country.save()
            )
     })
     return newPromise
}

try {
    await Promise.all(rawDataPromises)
        .then((rawData) => newArray = rawData.map((element) => element.text()))
        .then(() => Promise.all(newArray))
        .then((result) => scratchData(result) )
        .then((res) => buildInput(res))
        .then((res) => PromiseInToDb(res))
        .then((intoDB) => {Promise.all(intoDB)})
        .then(() => console.log('should be in DB!'))
      
}
catch(error){
    console.log('Failed', error)
}