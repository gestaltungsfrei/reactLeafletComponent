const serverUrl ='http://localhost:4000/update/'


export const fetchData = async(country) => {
    try{
        const res = await fetch(`${serverUrl}${country}`)
        const data = await res.json()
        console.log('Found this: ',data,' for: ', country)
        return data 
    }
    catch(error){
        return error
    }
}