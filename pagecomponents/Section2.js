import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlockContent from '@sanity/block-content-to-react';
import { urlFor } from "../utils/tools";

const Section2 = ({content})=>{

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
        <section className="section features">
        <div className="container-fluid ">
            <div className="row">
                <div className="col-md-12 section-head text-center">
                    <BlockContent blocks={content.heading} />
                </div>
            </div>
            <div className="row">
                <div className="wrapper col-12">
                    <div className="row feature-slider">
                        <Slider {...settings}>
                            {content.slider.map((item,i)=>(
                                <div key={i} className="col-md-4 text-right">
                                <img
                              src={urlFor(item.image)
                                .height(500)
                                .url()}
                            />
                                <div className="content">
                                <BlockContent blocks={item.description} />
                                    <button className="btn btn-black btnSm">Get Started <i className="fa fa-chevron-right"></i></button>
                                </div>
                            </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>
    )
}

export default Section2;