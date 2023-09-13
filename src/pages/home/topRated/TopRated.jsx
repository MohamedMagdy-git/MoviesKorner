import {useState} from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import './topRated.scss'
import SwitchTap from '../../../components/switchTap/SwitchTap'
import  useFetch  from '../../../hook/useFetch'
import Carousel from '../../../components/carousel/Carousel'


// /account/{account_id}/favorite/movies

const TopRated = () => {
  const [endPoint, SetEendPoint] = useState('movies')
  const {data, loading} = useFetch(`/account/20360942/favorite/${endPoint}?language=ar&include_adult=false&page=1`)
  
  const onTapChange = (tab) => {
    SetEendPoint(tab === 'افلام' ? 'movies' : 'tv')
  }

  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <SwitchTap data={['افلام','مسلسلات']} onTapChange={onTapChange}/>
            <span className="carouseTitle">الاعلي تقييماً</span>
        </ContentWrapper>
        <Carousel data={data?.results} endPoint={endPoint} loading={loading}/>
    </div>
  )
}

export default TopRated