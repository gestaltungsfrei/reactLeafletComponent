import mongoose from 'mongoose'
import Overview from '../models/overview.js'
import fetch from 'node-fetch'

//Found no import for json functionality so using require instead:

import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const {laender} = require("../data/laender.json") // use the require method

let newArray =[]

//Connection DB
const port = 4000;
const URI = 'mongodb://127.0.0.1:27017/leMondeArticleOverview'

mongoose.connect( URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then( (res, rej) => console.log("Connection with DB works!") )
  .catch(err => console.log("Connection is somehow strange...!", err.message))
  


//helper functions
const scratchData = (rawArrayComplete) => {
    console.log('scratch data started')
    // const re = /(?<="count">..<.span>).*?("><span)/g
    const re = /(?<=<li><a href="\/artikel).*?(<\/li><li><a href=")/g
    const scratchArr = rawArrayComplete.map((element, index) =>
        { 
        const rawArticle = [... element.matchAll(re)]
        let artArr = rawArticle.map(element => element[0])
        return {[index]: artArr}
    })
   return scratchArr
}



const buildArticle = (scratchArr) => {
  console.log('build Article started')
  const escapeHTML = str => str.replace(/(&.uml;)|(&szlig;)|(&eacute;)|(&aacute;)|(&agrave;)|(&egrave;)|(&nbsp;)|(&ndash;)/g, 
  tag => ({
      '&Auml;': 'Ä',
      '&auml;': 'ä',
      '&Ouml;': 'Ö',
      '&ouml;': 'ö',
      '&Uuml;': 'Ü',
      '&uuml;': 'ü',
      '&szlig;': 'ß',
      '&eacute;': 'é',
      '&aacute;': 'á',
      '&agrave;': 'à',
      '&egrave;':'è',
      '&nbsp;': ' ',
      '&ndash;': '-'

    }[tag])); 

  const finalcountryArr = scratchArr.map((element) => {
        for (const [country, rawArtArr] of Object.entries(element)){
            const finalArtArr = rawArtArr.map(element => {
                let headStart = element.indexOf('</span>')
                let headEnd = element.indexOf('</a><br>')
                let head = escapeHTML(element.slice((headStart+7),(headEnd)))
        
                let dateEnd = element.indexOf('diplomatique vom')
                let date = element.slice((dateEnd+17),(dateEnd+27))
           
                let urlEnd = element.indexOf('"')
                let url = element.slice(0,urlEnd) 
                
                const input = {
                    head: head,
                    date: date,
                    url: url,
                    country: country
                }
                return input
            })
         return finalArtArr
    }})
    const merged = finalcountryArr.flat(1)
    return merged
}


  // fetch the raw material 
  console.log('Will scratch : ',laender.length,' countries')
  let rawDataPromises = Array(laender.length).fill(null).map( (el, index) => {
    return fetch(`https://monde-diplomatique.de/archiv-text?text=${laender[index]}`)
 })

try {
    await Promise.all(rawDataPromises)
        .then((rawData) => newArray = rawData.map((element) => element.text()))
        .then(() => Promise.all(newArray))
        .then((result) => scratchData(result) )
        .then((rawText) => buildArticle(rawText))
        .then((output) => {
            const newPromiseArray = output.map((element) => {
                const overview = Overview(element)
                return overview.save()})
            Promise.all(newPromiseArray)
            })
        .then(() => console.log('should be in DB!'))
      
}
catch(error){
    console.log('Failed', error)
}

