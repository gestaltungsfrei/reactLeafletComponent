import Overview from "../models/overview.js"

export const intoDB = async (req, res, next) => {
    if (req.locals.notUpdate) {
        res.json(req.locals.data)
    }
    else{
        try {
            const data = req.locals
            const newOverview = await Overview.create(data)   
            res.json(newOverview)   
        }
        catch(error){
            next(error)
        }
    }
 }

 export const checkUpToDate = async (req, res, next) => {
    console.log('checkUpdate works') 
    const {id} = req.params
     let notUpdate = false
     try {
        const find = await Overview.find({country: id})
        find.length > 0 ? notUpdate = true : notUpdate
        req.locals = {notUpdate, data: find}
        next()
    }
     catch(error){
        next(error)
        }
}


export const showResultbyCountry = async (req, res, next) => {
    const {id} = req.params
    console.log('controller found', id)
    try {
        const find = await Overview.find({country: id})
        console.log(find)
        res.json(find)
    }
    catch(error){
        next(error)
    }
}