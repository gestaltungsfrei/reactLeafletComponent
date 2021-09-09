import React,{useContext, useState, useEffect} from 'react'
import { Container, Button } from 'react-bootstrap'
import AuthContext from '../context'
import { fetchUserFav } from '../functions/fetchUserFav'
import { deleteUserFav } from '../functions/deleteUserFav'

export default function ReadingList() {
    const {authUser, setAuthUser} = useContext(AuthContext)
    const [list, setList] = useState([])
    const [user, setUser] = useState({userName: '', id: 0})

    const handleClick = (id) => {
        console.log('user: ', user.id, 'fav: ', id)
        deleteUserFav(user.id, id)
            .then(() => fetchUserFav(authUser))
            .then((result) => setList(result.fav))
    }

    useEffect(() => {
        fetchUserFav(authUser)
            .then((result) => {
                console.log('result looks like this: ', result)
                setList(result.fav)
                setUser({userName: result.user, id: result.id})}
            )
            .catch((err) => console.log('catch favs not working', err))  
    }, [authUser,])
    
    return (
        <Container>
            <h4>Welcome {user.userName}</h4>
            <p>Your liked the following articles:</p>
            {list.map((element, index) => {
                return(
                    <div key={index} onClick={() => handleClick(element)}>{element}</div>
                )
            })}
            <Button variant="danger" onClick={() => setAuthUser(0)}>Logout</Button>
        </Container>
    )
}
