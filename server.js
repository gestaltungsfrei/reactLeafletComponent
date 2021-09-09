import express from 'express';
import cors from "cors"
import mongoose from 'mongoose'
const app = express();

const port = 4000;
const URI = 'mongodb://127.0.0.1:27017/leMondeArticleOverview'

import routeFlow from './routes/routeFlow.js'
import userRouter from './routes/userRoute.js';


mongoose.connect( URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then( (res, rej) => console.log("Connection with DB works!") )
.catch(err => console.log("Connection is somehow strange...!", err.message))


/** EXPRESS MIDDLEWARE */
app.on('listening', () => console.log('db is started!'))

app.use( cors() ) 
app.use(express.json()); 
app.use('/', routeFlow)
app.use('/user/', userRouter)

app.use(function errorHandler(error, req, res, next) {
  res.status(error.status || 400).send({
    error: {
      message: error.message,
    }
  })
})


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
    
  });
  