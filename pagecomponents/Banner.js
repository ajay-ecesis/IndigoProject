
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { urlFor } from '../utils/tools';

export default function Banner(props) {

    const {content} = props;
  const settings = {
    dots: true,
    infinite: true,
    autoplay:true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
        <>
           
            <div className="banner banner-slider">
            <Slider {...settings}>
                {content.map((item,i)=>(
                        <div key={i} id="bannerWrapper" className="banner-wrapper">
                        <div className="container-fluid">
                            <div className="banner-inner">
                                <div className="left-side">
                                <h1>{item.text}</h1>
                                 <h2>{item.subtext}</h2>
                                 <p>Access Projekt Indigo</p>
                                 <button className="btn btn-black">Register Now <i className="fa fa-chevron-right"></i></button>
                                </div>
                                <div className="right-side">
                                <img
                              className="banner-img"
                              src={urlFor(item.mainImage)
                                .height(500)
                                .url()}
                            />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            </div>
           
        </>
  );
}