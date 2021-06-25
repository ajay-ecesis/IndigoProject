import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { urlFor } from "../utils/tools"
import BlockContent from '@sanity/block-content-to-react';

const AvailablePlans =({content})=> {
    const settings = {
        dots: true,
        infinite: true,
        autoplay:true,
        speed: 500,
        slidesToShow: 4,
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
         <section className="section artisanalExperiences Plans">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 section-head text-center">
                                <h2 className="heading">
                                {content.head}
                                </h2>
                            </div>
                        </div>
                        <div className="row Artisanal-slider">
                            <Slider {...settings}>
                                {content.sliders.map((item,i)=>(
                                      <div key={i} className="col-md-4">
                                     <img src={urlFor(item.image)} alt="" />
                                      <div className="footer-content">
                                      <BlockContent blocks={item.description} />
                                          <i className="fas fa-arrow-right"></i>
                                      </div>
                                  </div>
                                ))}
                        
                           
                            </Slider>
                        </div>
                    </div>
                </section>  
        </>
    )
}

export default AvailablePlans;