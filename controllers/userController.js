import createError from "http-errors";
import User from '../models/User.js'
import mongoose from 'mongoose'


export const createUser = async (req, res, next) => {
    const data = req.body
    try {
        const user = await User.create(data)
        const show = {}
        show.name = user.userName
        res.json({message: `User ${show} created`});
       }
       catch(error){
           next(error)
    }
}


export const getUser = async (req,res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select('-password');
        if (!user) throw new createError(418, `No user with id:${id} can be found.`);
        res.json(user);
    }
    catch(error){
        next(error)
    }
}

export const updateUser = async (req,res, next) => {
    let user
    const { id, method } = req.params;
    const {articleFav} = req.body;
    console.log(articleFav, method)
    const steve = mongoose.Types.ObjectId(articleFav)
    console.log(steve)
    try {
        if (method === 'add') {
            console.log('this is 38')
            user = await User.findByIdAndUpdate(id, {$push: {"articleFav" : articleFav}}, {new: true});
            if (!user) throw new createError(418, `No user with id:${id} can be found.`);
        }
        else if (method === 'delete') {
            console.log('delete should start')
            user = await User.findByIdAndUpdate(id, {$pull: {"articleFav": articleFav}}, {new: true});
            if (!user) throw new createError(418, `No user with id:${id} can be found.`);
        }
     const show = {}
     show.name = user.userName
     show.fav  = user.favArticle
     res.json({message: `User ${show.name} updated`});
    }
    catch(error){
        next(error)
    }
}


export const loginUser = (req, res) => {
    const {userName, password} = req.body
    console.log('Whats the user who arrive?',userName)
    try {
        // const findUser = User.find( element => element.userName === userName && element.password === password)    

    }
    catch(error){
        console.log(error)
    }
        
    //     if (findUser) {
    //         res.json({messsage: 'You are logged in', login: true})
    //     }
    //     else {
    //         res.json({messsage: `Invalid User`, login: false  })
    //     }
}