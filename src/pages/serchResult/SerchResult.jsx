/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";


import useFetch from "../../hook/useFetch";
import { fethchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/movieCard";
import Spinner from "../../components/spinner/Spinner";
import pohotNoResult from '../../assets/no-results.png'

import './SerchResult.scss'
import Img from "../../components/lazyLoadImage/Img";

const SerchResult = () => {

    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fatchInitData = () => {
      setLoading(true);
      fethchDataFromApi(`/search/multi?query=${query}&include_adult=false&language=ar&${pageNum}`).then((res) => {
        setData(res)
        setPageNum((prev) => prev +1)
        setLoading(false)
      })
    }

    // const fetchNextPageData = () => {
    //   fethchDataFromApi(`/search/multi?query=${query}&include_adult=false&language=ar&page=${pageNum}`).then((res) => {
    //     if (data?.results) {
    //       // console.log(res);
    //       setData({...data, results: [...data?.results, ...res.results]});
    //     } else {
    //       setData(res)
    //     }
    //     setPageNum((prev) => prev +1)
    //     }
    //   )
    // }


    useEffect(() => {
      setPageNum(1)
      fatchInitData();
    }, [query])

  return (
    <div className="searchResultsPage">
      {loading && 
      <>
        <Spinner initial={true}/>
      </>}
      {!loading && 
      <>
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
            <div className="pageTitle">
              {`${data.total_results > 1 ? ' نتائج' :  'نتيجة'} البحث لـ "${query}"  `}
            </div>

            {/* <InfiniteScroll className="content" dataLength={data?.results?.length || []} 
            next={fetchNextPageData} hasMore={pageNum <= data.total_pages}
            loader={<Spinner />}> */}
            <div className="content">
              {data?.results?.map((item, index)=> {
                if (item.media_type === 'person') return;
                return (

                  <MovieCard key={index} data={item} fromSearch={true} />
                )
              })}
            </div>
            {/* </InfiniteScroll> */}
              
            </>
          ) : (
            <>
            <div className="contaner_noResult">

              <Img src={pohotNoResult} className='noResultPh'/>
              <span className="resultNotFound">
              عذرا، لم يتم العثور على النتائج!"<span className="search_Keyword">{query}</span>" .. برجاء التاكد من صحة البحث
              </span>
            </div>
            </>
          )}
        </ContentWrapper>
      </>}
    </div>
  )
}

export default SerchResult