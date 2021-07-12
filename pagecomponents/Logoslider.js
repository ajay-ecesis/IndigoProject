
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { urlFor } from "../utils/tools"

const Logoslider = ({content})=>{

  const settings = {
      slidesToShow: 6,
      slidesToScroll: 1,
      accessibility: false,
      autoplay: true,
      autoplaySpeed: 0,
      cssEase: 'linear',
      speed:2500,
      infinite: true,
      dots: false,
      arrows: false,
   
    responsive: [
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }
    ]
  }

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