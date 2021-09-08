import mongoose from 'mongoose'
import Overview from '../models/overview.js'

import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const {laender} = require("../data/laender.json") // use the require method


//Connection DB
const port = 4000;
const URI = 'mongodb://127.0.0.1:27017/leMondeArticleOverviewTest'

mongoose.connect( URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then( (res, rej) => console.log("Connection with DB works!") )
  .catch(err => console.log("Connection is somehow strange...!", err.message))



  const correctPromises = laender.map((countryName, index) =>  {
    
    const escapeHTML = str => str.replace(/(&.uml;)|(&szlig;)|(&eacute;)|(&aacute;)|(&agrave;)|(&egrave;)/g, 
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
        '&egrave;':'è'
      }[tag])); 

    return Overview.updateMany({}, {"$set":{"head" : escapeHTML(head)}} )
  })

  try {
      await Promise.all(correctPromises)
      console.log('Country names should be corrected')
  }
  catch(error){
      console.log('Something went wrong')
  }
