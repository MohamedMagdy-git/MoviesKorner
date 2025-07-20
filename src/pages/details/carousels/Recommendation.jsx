import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hook/useFetch";
import './style.scss'

const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations?language=ar&include_adult=false&page=2`
    );
console.log();
    return (
        <>
        {data?.results.length > 0 ? (<>
            <Carousel
            title="التوصيات"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
        </>) : (<>
        
        <div className="titleR"> لا توجد توصيات لهذا {mediaType}</div>
        </>)}
        {/* <div className="carouseTitle">التوصيات</div> */}
        </>
    );
};

export default Recommendation;