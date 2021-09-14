import mongoose from 'mongoose'

const {Schema, model} = mongoose

const CountrySchema = new Schema({
    countryName: {type: String, unique: true, required: true},
    numArticles: {type: Number},
},
{
    versionKey: false,
    timestamps: true
})





const Country = model('Country', CountrySchema);
export default Country;