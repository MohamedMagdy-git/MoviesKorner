import React, { useState, useRef } from "react";

import "./videosSection.scss";


import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../detailsBanner/PlayIcon";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";
// import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const carouselContainer = useRef()


    // const Navigation = (dir) => {
    //     const container = carouselContainer?.current;

    //     const scrollAmount = dir === 'left' ? container.scrollLeft - ( container.offsetWidth + 20) : 
    //     container.scrollLeft + ( container.offsetWidth + 20) 

    //     container.scrollTo({
    //         left : scrollAmount,
    //         behavior : 'smooth'
    //     })
    // }

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
            {/* <BsFillArrowLeftCircleFill 
            className="carouselLeftNav arrow"
            onClick={() => Navigation('left')}/>
            <BsFillArrowRightCircleFill 
            className="carouselRighttNav arrow"
            onClick={() => Navigation('right')}/> */}

                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos" ref={carouselContainer}>
                        {data?.map((video, index) => (
                            <div key={index} className="videoItem"
                            onClick={() => {
                                setVideoId(video.key)
                                setShow(true)
                            }}>

                                <div className="videoThumbnail">
                                    <Img src={`https://i.ytimg.com/vi_webp/${video.key}/maxresdefault.webp`}></Img>
                                    <PlayIcon />
                                </div>
                                {/* <div className="videoTitle">
                                    {video?.name}
                                </div> */}

                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;