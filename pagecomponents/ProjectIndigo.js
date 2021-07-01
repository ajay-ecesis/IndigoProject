import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { urlFor } from "../utils/tools"
import BlockContent from '@sanity/block-content-to-react';

const ProjectIndigo = ({content})=>{
    const settings = {
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      speed:1500,
      prevArrow: '<span class="prev"><i class="fal fa-long-arrow-alt-left"></i></span>',
            nextArrow: '<span class="next"><i class="fal fa-long-arrow-alt-right"></i></span>',
      dots: true,
      arrows: false,
    
      responsive: [
          {
            breakpoint: 1440,
            settings: {
              arrows: false,
              centerMode: false,
              centerPadding: '0',
              slidesToShow: 2
            }
          },
          {
            breakpoint: 767,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '0',
              slidesToShow: 1
            }
          }
        ]
      };
    return(
        <>
          <section className="section trustBrand projektIndigo">
                    <div className="container-fluid ">
                        <div className="row">
                            <div className="wrapper col-12">
                                <div className="row trustBrand-slider">
                                    <Slider {...settings}>
                                    {content.map((item,i)=>(
                                            <div key={i} className="col-md-12 col">
                                      
                                             <img src={urlFor(item.image)} className="projekt-img"  alt="" />
                                            <div className="content">
                                                <BlockContent blocks={item.description} />
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

export default ProjectIndigo;