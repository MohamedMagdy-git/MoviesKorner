import  React,{ useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./detailsBanner.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hook/useFetch";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.jpg";
import CircleRating from "../../../components/circleRating/CircleRating";
import { PlayIcon } from "./PlayIcon";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
// import ImbdRate from "../../../components/imbdRate/ImbdRate";



const DetailsBanner = ({video, crew, rate}) => {

    const {mediaType, id} = useParams()
    const {data, loading} = useFetch(`/${mediaType}/${id}?language=ar&include_adult=false`)
    console.log(data);

    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null)

    
    const {url} = useSelector((state) => state.Home)
    
    
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const _gener = data?.genres.slice(0,3)?.map((gener) => {
        return (
            
                <div className="genree" key={gener.id}>
                    {gener.name}
                </div>          
            
    )})

    
    const director = crew?.filter((f)=> (f.job === 'Director' || f.job === 'Directing'))
    
    const writers = crew?.filter((f) =>  f.job === 'Writing' || f.job === 'Writer' || f.job === 'Screenplay' || f.known_for_department === 'Screenplay')
    const writer = writers?.slice(0, 1)


    let languages = [
        {code: "en", name: "English"},
        {code: "ar", name: "العربية"},
        {code: "fr", name: "Français"},
        {code: "es", name: "Español"},
        {code: "de", name: "Deutsch"},
        {code: "zh", name: "中文"},
        {code: "pl", name: "Polski"},
        {code: "hi", name: "हिन्दी"},
        {code: "zh-CN", name: "简体中文"},
        {code: "ko", name: "한국어"}
      ];

    return (
        <div className="detailsBanner">
            {!loading ? (

                <>
                { (
                    <React.Fragment>
                    <div>
                        <div className="backdrop-img">
                            <Img src={url.backdrop+data?.backdrop_path} alt=''/>
                             <div className="opacity-layer"></div>
                        </div>
                    </div>

                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                            {data?.poster_path ? 
                                (
                                    <Img src={url.backdrop + data.poster_path } 
                                    className="posterImg" />
                                ) : (
                                    <Img className='posterImg' src={PosterFallback}/>
                                )}
                            </div>

                            <div className="right">
                                <div className="title">
                                    {`${data?.title || 
                                    data?.name} 
                                   ( ${dayjs(data?.release_date || data?.first_air_date).format('YYYY')})`} 
                                </div>

                                <div className="subtitle">
                                    {data?.tagline}
                                </div>

                                <div className="genress">
                                 {_gener}
                                </div>       


                                
                                
                         
                                <div className="row">
                                    <CircleRating rating= {data?.vote_average.toFixed(1)}/>
                                    {/* <ImbdRate rate={rate} loading={loading}/> */}

                                    <div className="playbtn" onClick={() => {
                                        setShow(true)
                                        setVideoId(video?.key)
                                    }}>
                                        <PlayIcon />
                                        <span className="text">
                                        مشاهدة الأعلان
                                        </span>
                                    </div>
                                </div>
                                
                                
                                


                                <div className="info">

                                {data?.last_air_date && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                تاريخ الانتاج:{' '}
                                            </span>
                                            <span className="text">
                                                { dayjs(data?.first_air_date).format("YYYY لـ") + dayjs(data?.last_air_date).format("YYYY")} 
                                            </span>
                                        </div>
                                    )}


                                    {data?.release_date  && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                تاريخ الانتاج:{' '}
                                            </span>
                                            <span className="text">
                                                {dayjs(data?.release_date).format("YYYY")} 
                                            </span>
                                        </div>
                                    )}
                                    {data?.runtime && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                 
                                                مدة العرض:{' '} 
                                            </span>
                                            <span className="text">
                                                {toHoursAndMinutes(data?.runtime)} 
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {/* <div className="info">

                                </div> */}
                                {director?.length > 0  && (
                                    <div className="info">

                                        <div className="infoItem">
                                        <span className="text bold">
                                            المخرج:{' '}
                                        </span>
                                        <span className="text">
                                            {director.map((director, index) => (
                                                <span key={index}>
                                                    {director.length - 1 !== index && '' }
                                                    {director.name}
                                                </span>
                                                
                                            ))}
                                        </span>
                                        </div>
                                        
                                        
                                        <div className="infoItem">
                                        <span className="text bold"> 
                                                الكاتب:{' '}
                                        </span>
                                        <span className="text">
                                            {writer.map((writer, index)=> (
                                                <span key={index}>{writer.name}</span>
                                            ))}
                                        </span>
                                        </div>
                                        
                                        
                                        
                                        
                                        
                                    </div>
                                )}

                                {data?.number_of_seasons && (
                                    <div className="info">
                                        <div className="infoItem">
                                            <span className="text bold">
                                                 
                                                 الموسم:{' '} 
                                            </span>
                                            <span className="text">
                                                {data?.number_of_seasons} 
                                            </span>
                                        </div>

                                        {data?.number_of_seasons && (
                                   
                                        <div className="infoItem">
                                            <span className="text bold">
                                                 
                                                 الحلقات:{' '} 
                                            </span>
                                            <span className="text">
                                                {data?.number_of_episodes} 
                                            </span>
                                        </div>
                                    
                                )}
                                    </div>
                                )}
                            

                                <div className="info">
                                <div className="infoItem">
                                        <span className="text bold"> 
                                                اللغــة:{' '}
                                        </span>
                                        <span className="text">
                                           
                                            {// data?.original_language} 
                                            }
                                            
                                            {languages.map((lan, index) => {
                                                if (lan.code !== data?.original_language) {return;}
                                                return(

                                                    <span key={index}>{lan.name}</span>
                                                )
                                                })}
                                            
                                        </span>
                                        </div>
                                        <div className="infoItem">
                                        <span className="text bold"> 
                                                النــوع:{' '}
                                        </span>
                                        <span className="text">
                                           {mediaType}
                                            {// data?.original_language} 
                                            }
                                            
                                            {/* {languages.map((lan, index) => {
                                                if (lan.code !== data?.original_language) {return;}
                                                return(

                                                    <span key={index}>{lan.name}</span>
                                                )
                                                })} */}
                                            
                                        </span>
                                        </div>
                                </div>

                                {data?.original_name && (
                                    <div className="info">
                                        <div className="infoItem">
                                        <span className="text bold"> 
                                                الاسم:{' '}
                                        </span>
                                        <span className="text ">
                                            { data?.original_name}
                                        </span>
                                        </div>
                                    </div>
                                        
                                    
                                   
                                )}

                                {data?.original_title && (
                                    <div className="info">
                                        <div className="infoItem">
                                        <span className="text bold"> 
                                                الاسم:{' '}
                                        </span>
                                        <span className="text ">
                                            {data?.original_title }
                                        </span>
                                        </div>
                                    </div>
                                        
                                    
                                   
                                )}  
                            

                            <div className="overview">
                                {/* <div className="heading">القصة:</div> */}
                                <div className="description">
                                    {data?.overview}
                                </div>
                            </div>

                            </div>
                           
                        </div>
                    <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>
                    </ContentWrapper>
                    </React.Fragment>
                )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;