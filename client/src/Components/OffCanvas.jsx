import React, {useContext} from 'react'
import { Offcanvas, Button } from 'react-bootstrap'
import Login from './Login';
import AuthContext from '../context'
import ReadingList from './ReadingList';



export default function OffCanvas(props) {
  const {authUser, setAuthUser} = useContext(AuthContext)
  const {offCanvasShow, setOffCanvasShow} = props
  const handleClose = () => setOffCanvasShow(false);
  const handleShow = () => setOffCanvasShow(true);
    
  return (
      <>
       <Offcanvas show={offCanvasShow} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {authUser !==0 
            ? <ReadingList />
            : <Login />
            }
          </Offcanvas.Body>
        </Offcanvas>
      </>
    )
}
