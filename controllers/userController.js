import createError from "http-errors";
import User from '../models/User.js'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


export const createUser = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password.toString(), salt);
        req.body.password = hash;
        let user = await User.create(req.body)
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
    try {
        if (method === 'add') {
            user = await User.findByIdAndUpdate(id, {$push: {"articleFav" : articleFav}}, {new: true});
            if (!user) throw new createError(418, `No user with id:${id} can be found.`);
        }
        else if (method === 'delete') {
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

export const loginUser = async (req, res, next) => {
    const {userName, password} = req.body
    try {
        const findUser = await User.find( {userName: userName} )
        const passwordToCompare = findUser[0].password
        const userId = findUser[0]._id
        if (findUser.length===1) {
           try {
            const match = await bcrypt.compare(password, passwordToCompare)
            res.json({login: match, id: userId})  
        }
           catch(error){
            res.json({login: false})
           }
        }
        else {
            res.json({login: false})
        }    

    }
    catch(error){
       res.json({login: false})
    }
}