import mongoose from 'mongoose'
import Overview from '../models/overview.js'

import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const {laender} = require("../data/laender.json") // use the require method


let tmpArray =[]
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
  

  const correctPromises = laender.map((countryName, index) =>  {
    console.log(countryName)
    return Overview.updateMany({"country": index}, {"$set":{"country" : countryName}} )
  })

  try {
      await Promise.all(correctPromises)
      console.log('Country names should be corrected')
  }
  catch(error){
      console.log('Something went wrong')
  }

