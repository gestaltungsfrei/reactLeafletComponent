export const userLogin = async (user, pw) => {
    const data = {userName: user, password: pw}
    try{
        console.log('User login started')
        const res = await fetch(`http://localhost:4000/user/login/`, {
        method: 'POST',
        headers: { "Content-type" : "application/json"},
        body: JSON.stringify(data)
        })
        const result = await res.json()
        return result
      
    }
    catch(error){
      console.log('something went wrong while sending')
    }
    
}