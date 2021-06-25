import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { urlFor } from "../utils/tools"
import BlockContent from '@sanity/block-content-to-react';

const Artisanal = ({content})=>{
    const settings = {
        dots: true,
        infinite: true,
        autoplay:true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
          ]
      };
    return(
        <>
        <section className="section artisanalExperiences">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 section-head text-center">
                                <h2 className="heading">
                                    Artisanal
                                </h2>
                            </div>
                        </div>
                        <div className="row Artisanal-slider">
                            <Slider {...settings}>
                            {content.slider.map((item,i)=>(
                                <div key={i} className=" col-md-4">
                                <img src={urlFor(item.image)} alt="" />
                                <div className="title"><BlockContent blocks={item.description} /></div>
                                <button  className="btn btn-light-black-sm"><a style={{color:'white'}} href={item.link}>Explore more</a></button>
                            </div>
                            ))}
                          
                            
                            </Slider>
                        </div>
                    </div>
                </section>
        </>
    )
}

export default Artisanal;