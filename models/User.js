import mongoose from 'mongoose'
const {Schema, model} = mongoose

const UserSchema = new Schema({
    userName: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    articleFav: {type: Array},
    role: {type: String, enum: 
                        {values: ['User', 'Admin'],
                         message: '{VALUE} is not supported'}, 
            default: 'User'},
},
{
    versionKey: false,
    timestamps: true,
    id: false,
    toJSON : {
        virtuals: true
    } 
})

const User = model('User', UserSchema);
export default User;