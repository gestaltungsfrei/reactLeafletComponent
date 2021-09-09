import React, {useContext} from 'react'
import Carousel from 'react-multi-carousel';
import { Container } from 'react-bootstrap'
import 'react-multi-carousel/lib/styles.css'
import {addUserFav} from '../functions/addUserFav.js'
import AuthContext from '../context'


export default function CarouselWrapper(props) {
    const {authUser} = useContext(AuthContext)
    const {items} = props
    const likeMe = (e, id) => {
      console.log('you seeking for likes?', id)
      addUserFav(authUser, id)
      .then((result) => console.log('Fav added') )
    }



    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1424 },
          items: 4,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1424, min: 1024 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
          },
        mobile: {
          breakpoint: { max: 1024, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      }

    return (
        <Carousel
        swipeable={false}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={'tablet'}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
           {items.map((element, index) => {
              return(
                <div className="article">
                    {authUser !== 0 ? <p onClick={(e) => likeMe(e, element._id)}>like me</p> : <></>}
                    <a href={`https://monde-diplomatique.de${element.url}`} target={"_blank"} style={{textDecoration: "none", color: "white"}}>
                        <h3>{element.head}</h3>
                        <p>{element.date}</p>
                        <img src={`https://picsum.photos/230/140?blur=2&random=${index}`}></img>
                    </a>
                </div>
              )
          })}
          
      </Carousel>
    )
}
