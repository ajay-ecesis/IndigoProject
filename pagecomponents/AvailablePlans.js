import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { urlFor } from "../utils/tools"
import BlockContent from '@sanity/block-content-to-react';

const AvailablePlans =({contentbrand,contentmanufacture})=> {
  // const [showbrand,setshowbrand] = useState(true);
  // const [showmanufacture,setshowmanufacture] = useState(false);
  
    const settings = {
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 0,
      centerPadding: '10px',
      speed:2000,
        dots: false,
      arrows: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            centerPadding: '15px',
            autoplay: true,
            slidesToShow: 1
          }
        }
      ]
    };

    return(
        <>
          <section className="section Available_plans">
              <div className="container-fluid">
                <div className="row">
                    <h2 className="heading">
                        Available Plans
                    </h2>
                </div>

                <div className="row tab-row">

                  <nav>
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                          <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Brand</button>
                          <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Manufacturer</button>                           
                      </div>
                  </nav>

                  <div className="tab-content" id="nav-tabContent">

                      <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                          <div className="row Artisanal-slider_new">

                            <Slider {...settings}>
                                {contentbrand?.map((item,i)=>(
                                    <div key={i} className="content">
                                      <div className="box_wrapper">
                                          <img src={urlFor(item.image)} alt="" />
                                          <div className="text-wrapper">
                                            <div className="text">
                                              <div className="left_side">
                                                  <span className="strip">{item?.specialtext}</span>
                                                  {/* <p class="title">Free</p> */}
                                                  <p className="title"><BlockContent blocks={item.description} /></p>
                                              </div>
                                                     
                                              <div className="right_side">
                                                <a href={item?.link}><i className="fas fa-arrow-right"></i></a>
                                              </div>
                                          </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </Slider>

                          </div>
                      </div>

                      <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <div className="row Artisanal-slider_new">

                            <Slider {...settings}>
                                {contentmanufacture?.map((item,i)=>(
                                    <div key={i} className="content">
                                      <div className="box_wrapper">
                                        <img src={urlFor(item.image)} alt="" />
                                        <div className="text-wrapper">
                                            <div className="text">
                                              <div className="left_side">
                                                  <span className="strip">{item?.specialtext}</span>
                                                  {/* <p class="title">Free</p> */}
                                                  <p className="title"><BlockContent blocks={item.description} /></p>
                                              </div>
                                                     
                                              <div className="right_side">
                                                <a href={item?.link}><i className="fas fa-arrow-right"></i></a>
                                              </div>
                                          </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </Slider>


                        </div>
                      </div>

                  </div>
                </div>
              </div>
          </section>
       
        </>
    )
}

export default AvailablePlans;