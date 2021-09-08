import mongoose from 'mongoose'
const {Schema, model} = mongoose

const OverviewSchema = new Schema({
    head: {
        type: String,
        required: true
    },
    url: {
        type: String,
    },
    date: {
        type: String
    },
    country: 
     {
         type: String
     }
},
{
    versionKey: false,
    timestamps: true  
})

const Overview = model ('Overview', OverviewSchema)
export default Overview;