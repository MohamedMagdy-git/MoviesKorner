import {useState} from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import './popular.scss'
import SwitchTap from '../../../components/switchTap/SwitchTap'
import  useFetch  from '../../../hook/useFetch'
import Carousel from '../../../components/carousel/Carousel'



const Popular = () => {
  const [endPoint, SetEendPoint] = useState('movie')
  const {data, loading} = useFetch(`/${endPoint}/popular?language=ar&include_adult=false&page=1`)

  const onTapChange = (tab) => {
    SetEendPoint(tab === 'افلام' ? 'movie' : 'tv')
  }

  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <SwitchTap data={['مسلسلات','افلام']} onTapChange={onTapChange}/>
            <span className="carouseTitle">شائع</span>
        </ContentWrapper>
        <Carousel data={data?.results} endPoint= {endPoint} loading={loading}/>
    </div>
  )
}

export default Popular