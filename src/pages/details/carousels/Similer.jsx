import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hook/useFetch";
import '../../../components/carousel/carousel.scss'

const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar?language=ar&include_adult=false`);

    const title = mediaType === "tv" ? "مسلسلات مشابهة" : "أفلام مشابهة";

    return (
        <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Similar;