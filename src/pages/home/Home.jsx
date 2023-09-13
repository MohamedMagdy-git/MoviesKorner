import React from 'react'
import './Home.scss'
import HeroBannar from './heroBannar/HeroBannar'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'

function Home() {
  return (
    <div className='homePage'>
        <HeroBannar />
        <Trending />
        <Popular />
        <TopRated />
    </div>
  )
}

export default Home