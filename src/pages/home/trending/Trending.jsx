import {useState} from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import './trending.scss'
import SwitchTap from '../../../components/switchTap/SwitchTap'
import  useFetch  from '../../../hook/useFetch'
import Carousel from '../../../components/carousel/Carousel'



const Trending = () => {
  const [endPoint, SetEendPoint] = useState('day')
  const {data, loading} = useFetch(`/trending/all/${endPoint}?language=ar&include_adult=false&page=1`)

  const onTapChange = (tab) => {
    SetEendPoint(tab === 'أسبوع' ? 'week' : 'day')
  }

  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <SwitchTap data={['يـوم','أسبوع']} onTapChange={onTapChange}/>
            <span className="carouseTitle"> رائج الان</span>
        </ContentWrapper>
        <Carousel data={data?.results} endPoint={endPoint} loading={loading}/>
    </div>
  )
}

export default Trending