/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react'
import './heroBannar.scss'
import { useNavigate } from 'react-router-dom';
import  useFetch  from '../../../hook/useFetch'
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'


function HeroBannar() {
  // state and logic
const [background, setBackground] = useState("");
const [query, setQuery] = useState("");
const navigate = useNavigate();
// redux
const {url} = useSelector((state) => state.Home)

const {data, loading} = useFetch('/account/20360942/favorite/tv?language=ar&include_adult=false&page=1')

const inputHandler = (event) => {
  if (event.key === "Enter" && query.length > 0) {
    navigate(`/search/${query}`);
  }
}


useEffect(() =>{
  const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)].backdrop_path;
  setBackground(bg)
}, [data])

  return (
    <div className='heroBannar'>

    {!loading && ( <div className="backdrop-img">
      <Img src={background}></Img>
    </div>)}

      <div className="opacity-img"></div>
      <ContentWrapper>

        <div className="heroBannar_content">
          <span className="title">أهلًا وسهلًا</span>
          <span className="suptitle">
          ملايين الأفلام والبرامج التلفزيونية والأشخاص لاكتشافها. استكشف الآن.
          </span>

          <div className="search_input">
            <button onClick={inputHandler}> بحـث </button>
            <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={inputHandler}
              name=""
              id=""
              placeholder=' ابحث عن فيلمك او عرضك التلفزيوني' />
          </div>
        </div>
        
      </ContentWrapper>

      
    </div>
  )
}

export default HeroBannar