export const addUserFav = async (user, favId) => {
        try{
        const res = await fetch(`http://localhost:4000/user/login/${user}/add`, {
        method: 'PUT',
        headers: { "Content-type" : "application/json"},
        body: JSON.stringify({articleFav: favId})
        })
        const result = await res.json()
        console.log(result)
        return result
      
    }
    catch(error){
      console.log('something went wrong while sending')
    }
    
}