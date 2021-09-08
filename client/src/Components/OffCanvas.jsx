import React from 'react'
import { Offcanvas, Button } from 'react-bootstrap'
import Login from './Login';



export default function OffCanvas(props) {
    
    const {offCanvasShow, setOffCanvasShow} = props
    const handleClose = () => setOffCanvasShow(false);
    const handleShow = () => setOffCanvasShow(true);
    
    return (
        <>
 
        <Offcanvas show={offCanvasShow} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Login />
          </Offcanvas.Body>
        </Offcanvas>
      </>
    )
}
