const serverUrl ='http://localhost:4000/user/login/'


export const fetchUserFav = async(id) => {
    try{
        const res = await fetch(`${serverUrl}${id}/getMe`)
        const data = await res.json()
        return {user : data.userName, fav: data.articleFav, id: data._id} 
    }
    catch(error){
        return error
    }
}