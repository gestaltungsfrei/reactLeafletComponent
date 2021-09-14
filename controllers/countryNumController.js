import Country from "../models/Country.js"

export const intoDB = async (req, res, next) => {
    if (req.locals.notUpdate) {
        console.log('you shouldnt be here')
        res.json(req.locals.data)
    }
    else{
        try {
            console.log('right position started')
            const data = req.locals
            console.log('this should be in DB')
            const newCountry = await Country.create(data)   
            res.json(newCountry)   
        }
        catch(error){
            next(error)
        }
    }
 }