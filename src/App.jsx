import { useEffect } from 'react';
import './App.css';
import { fethchDataFromApi } from './utils/api';
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfig, getGenres } from './store/HomeSlice'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


// import components
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import SerchResult from './pages/serchResult/SerchResult'
import Explore from './pages/explore/Explore'
import PageNotFound from './pages/404/PageNotFound'
import Aboutus from './components/aboutus/Aboutus';



function App() {
const dispatch = useDispatch();
let {url} = useSelector((state) => state.Home)

// logic api and dispatch (redux)
const fatchApiConfiguration = ()=>{fethchDataFromApi('/configuration').then((res) => {
  console.log(res);
  
  let url = {
    backdrop: res.images.secure_base_url + 'w1280', 
    poster : res.images.secure_base_url + 'w342',
    profile : res.images.secure_base_url + 'original'
  }
  dispatch(getApiConfig(url))
})} 

useEffect(()=> {
  fatchApiConfiguration()
  genresCall();
}, [])


const genresCall = async () => {
  const allGeners = {};
  let movie= fethchDataFromApi(`/genre/movie/list?language=ar`)
  let tv = fethchDataFromApi(`/genre/tv/list?language=ar`)
  let promises = [movie, tv]

  // endPoints.forEach((url) = {
  //   promises.push(fethchDataFromApi(`/genre/${url}/list`)); 
  // });

  const data = await Promise.all(promises);
  // console.log(data);
  data.map(({genres}) => {
    return genres.map((item) => (allGeners[item.id] =
      item))
  })
  dispatch(getGenres(allGeners))
}
  

  return (
    <BrowserRouter>
    <Header />

    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/search/:query' element={<SerchResult />}></Route>
      <Route path='/:mediaType/:id' element={<Details />}></Route>
      <Route path='/explore/:mediaType' element={<Explore />}></Route>
      <Route path='/aboutus' element={<Aboutus />}></Route>
      <Route path='*' element={<PageNotFound />}></Route>
    </Routes>

    <Footer />
    </BrowserRouter>
  )
}

export default App
