import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { urlFor } from "../utils/tools"
import BlockContent from '@sanity/block-content-to-react';

const ProjectIndigo = ({content})=>{
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