import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.jpg";


import './carousel.scss'
import Genres from "../genres/Genres";

const Carousel = ({data, loading, endPoint, title}) => {

    if ( endPoint === "movies") {
        endPoint = "movie";
    }
    // console.log(data);
    
    const carouselContainer = useRef()
    // console.log(carouselContainer.current);
    const { url } = useSelector((state) => state.Home)
    const Navigate = useNavigate();


    const Navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount = dir === 'left' ? container.scrollLeft - ( container.offsetWidth + 20) : 
        container.scrollLeft + ( container.offsetWidth + 20) 

        container.scrollTo({
            left : scrollAmount,
            behavior : 'smooth'
        })
    }

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }

  return (
    <div  className="carousel">

        <ContentWrapper>
            {title && (<><div className="carouselTitle">{title}</div></>)}
            <BsFillArrowLeftCircleFill 
            className="carouselLeftNav arrow"
            onClick={() => Navigation('left')}/>
            <BsFillArrowRightCircleFill 
            className="carouselRighttNav arrow"
            onClick={() => Navigation('right')}/>

            {!loading ? <div className="carouselItems" ref={carouselContainer}>
                {data?.map((item) => {
                    if (item.id === 865463 || item.id ===826960 || item.id ===884605 || item.id === 85552  || item.id === 81356
                        || item.id === 654374 || item.id === 654374 || item.id === 537915 || item.id === 664413 || item.id === 664413
                        || item.id === 744275 || item.id === 613504 || item.id === 249397 || item.id === 337167){return;}
                    const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                   return(
                   <div key={item.id}
                    className="carouselItem" 
                    onClick={()=> {Navigate(`/${item.media_type || endPoint}/${item.id}`)}}>
                        <Genres data={item.genre_ids.slice(0,2)}/>
                    <div className="posterBlock">
                        <Img src={posterUrl}/>
                    </div>
                    <div className="textBlock">
                        <span className="title">
                            {item.title || item.name} 
                        </span>
                        <span className="date">
                            {dayjs(item.release_date || item.first_air_date).format('YYYY ')}
                        </span>
                    </div>
                   </div>) 
                })}
            </div>
            : <div className="loadingSkeleton">
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
                </div>}
        </ContentWrapper>
    </div>
  )
}

export default Carousel