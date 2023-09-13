import React from 'react'
import './Details.scss'
import useFetch from '../../hook/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'
import VideosSection from './videosSection/VideosSection'
import Similar from './carousels/Similer'
import Recommendation from './carousels/Recommendation'

const Details = () => {
  const {mediaType, id} = useParams();
  const {data , loading } = useFetch(`/${mediaType}/${id}/videos`)
  const {data : rate, loading : rateloading } = useFetch(`/${mediaType}/${id}`)
  const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits?language=ar`)


  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} rate={rate?.imdb_id}/>
      <VideosSection  data={data?.results.slice(0,3)} loading={loading}/>
      {/* <Similar mediaType={mediaType} id={id}/> */}
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details