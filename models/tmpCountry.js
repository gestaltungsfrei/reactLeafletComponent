import mongoose from 'mongoose'

const {Schema, model} = mongoose

const TmpCountrySchema = new Schema({
    country: {type: String, unique: true, required: true},
    coordinatesCapital: {type: Array},
    germanName: {type: String},
},
{
    versionKey: false,
    timestamps: true
})





const TmpCountry = model('TmpCountry', TmpCountrySchema);
export default TmpCountry;