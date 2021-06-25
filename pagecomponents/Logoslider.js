
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { urlFor } from "../utils/tools"

const Logoslider = ({content})=>{
    const settings = {
        infinite: true,
        autoplay:true,
        speed: 500,
        autoplaySpeed:300,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            }
          ]
      };
    return(
        <>
         {/* <div className="col-md-12"> */}
                        <div className="row brand-logo">
                            <Slider {...settings}>
                                {content.map((item,i)=>(
                                     <div key={i} className="col-md-4">
                                      <img src={urlFor(item.asset)} alt="" />
                                 </div>
                                ))}
                           
                           
                            </Slider>
                        </div>
                    {/* </div> */}
        </>
    )
}


export default Logoslider;