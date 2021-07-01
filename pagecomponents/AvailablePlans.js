import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { urlFor } from "../utils/tools"
import BlockContent from '@sanity/block-content-to-react';
import { useState } from "react";

const AvailablePlans =({contentbrand,contentmanufacture})=> {

  // const [showbrand,setshowbrand] = useState(true);
  // const [showmanufacture,setshowmanufacture] = useState(false);
  
    const settings = {
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
   accessibility: false,
      infinite: true,
      dots: false,
      cssEase: 'linear',
      arrows: false,
      responsive: [
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
       centerPadding: '20px'
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return(
        <>
          <section class="section Available_plans">
              <div class="container-fluid">
                <div class="row">
                    <h2 class="heading">
                        Available Plans
                    </h2>
                </div>

                <div class="row tab-row">

                  <nav>
                      <div class="nav nav-tabs" id="nav-tab" role="tablist">
                          <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Brand</button>
                          <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Manufacturer</button>                           
                      </div>
                  </nav>

                  <div class="tab-content" id="nav-tabContent">

                      <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                          <div class="row Artisanal-slider">

                            <Slider {...settings}>
                                {contentbrand?.map((item,i)=>(
                                      <div key={i} className="content">
                                          <img src={urlFor(item.image)} alt="" />
                                          <div className="text-wrapper">
                                            <div class="text">
                                              <div class="left_side">
                                                  {/* <span class="strip">Brand</span>
                                                  <p class="title">Free</p> */}
                                                  <p className="title"><BlockContent blocks={item.description} /></p>
                                              </div>
                                                     
                                              <div class="right_side">
                                                <a href="#"><i class="fas fa-arrow-right"></i></a>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                ))}
                            </Slider>

                              {/* <div class="content">
                                  <img src="images/Plans1.png" alt="" />
                                  <div class="text-wrapper">
                                      <div class="text">
                                        <div class="left_side">
                                            <span class="strip">Brand</span>
                                            <p class="title">Free</p>
                                        </div>
                                        <div class="right_side">
                                            <a href="#"><i class="fas fa-arrow-right"></i></a>
                                        </div>
                                      </div>
                                  </div>
                              </div> */}
                          </div>
                      </div>

                      <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <div class="row Artisanal-slider">

                           {/*  <div class="content">
                                <img src="images/Plans1.png" alt="" />
                                <div class="text-wrapper">
                                    <div class="text">
                                        <div class="left_side">
                                            <span class="strip">Manufacturer</span>
                                            <p class="title">Free</p>
                                        </div>
                                        <div class="right_side">
                                            <a href="#"><i class="fas fa-arrow-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            <Slider {...settings}>
                                {contentmanufacture?.map((item,i)=>(
                                      <div key={i} className="content">
                                          <img src={urlFor(item.image)} alt="" />
                                          <div className="text-wrapper">
                                            <div class="text">
                                              <div class="left_side">
                                                  {/* <span class="strip">Brand</span>
                                                  <p class="title">Free</p> */}
                                                  <p className="title"><BlockContent blocks={item.description} /></p>
                                              </div>
                                                     
                                              <div class="right_side">
                                                <a href="#"><i class="fas fa-arrow-right"></i></a>
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
         {/* <section className="section artisanalExperiences Plans">
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
                                      <h5 className="title"><BlockContent blocks={item.description} /></h5>
                                          <i className="fas fa-arrow-right"></i>
                                      </div>
                                  </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </section>   */}
        </>
    )
}

export default AvailablePlans;