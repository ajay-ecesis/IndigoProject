import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { urlFor } from "../utils/tools"
import BlockContent from '@sanity/block-content-to-react';

const Manufacturer = ({content})=>{
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay:true
      };
    return(
        <>
            <section className="section trustBrand manufacturers">
            <div className="container-fluid">
                <div className="row row--chnage">
                    <div className="col-md-6">
                        <div className="thumb">
                        <img src={urlFor(content.coversection.image)} alt="" />
                        </div>
                        <div className="content">
                        <BlockContent blocks={content.coversection.description} />
                        </div>
                    </div>
                    <div className="col-md-6 manufacturers-content">
                    <p className="info"> {content.description1}</p>
                        <div className="title">Features</div>
                        <div className="row gallery gallery-slider">
                            <Slider {...settings}>
                                {content.featureImages.map((item,i)=>(
                                     <div key={i} className="col-md-3">
                                     <img src={urlFor(item)} alt="" />
                                 </div>
                                ))}
                           
                            
                            </Slider>
                        </div>
                        <p className="disc">{content.description2}</p></div>                </div>
            </div>
        </section>
        </>
    )
}

export default Manufacturer;