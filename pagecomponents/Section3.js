import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlockContent from '@sanity/block-content-to-react';

const Section3 = ({content})=>{

    const settings = {
        dots: true,
        infinite: true,
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
         <section className="section products">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 section-head text-center">
                        <BlockContent blocks={content[0]} />
                    </div>
                </div>
                <div className="row">
                    <div className="wrapper col-12">
                        <div className="row products-slider">
                            <Slider {...settings}>
                            <div className="col-md-4">
                                
                                <div className="Card">
                                    <div className="card-thumb">
                                        <img src="images/product1.jpg" alt="" />
                                    </div>
                                    <p className="feature-tag">Featured</p>
                                    <div className="card-content">
                                        <h5 className="cardTitle">East Indigo co.</h5>
                                        <p className="cardDisc txt-light txt-light">Manufacturer</p>
                                        <div className="card-footer">
                                            <div className="rate">
                                                <input className="star-inner" type="radio" id="star5" name="rate" value="5" />
                                                <label htmlFor="star5" title="text">5 stars</label>
                                                <input className="star-inner" type="radio" id="star4" name="rate" value="4" />
                                                <label htmlFor="star4" title="text">4 stars</label>
                                                <input className="star-inner" type="radio" id="star3" name="rate" value="3" />
                                                <label htmlFor="star3" title="text">3 stars</label>
                                                <input type="radio" id="star2" name="rate" value="2" />
                                                <label htmlFor="star2" title="text">2 stars</label>
                                                <input type="radio" id="star1" name="rate" value="1" />
                                                <label htmlFor="star1" title="text">1 star</label>
                                              </div>
                                            <div className="follower txt-light">
                                                <span className="value">1.2k</span>
                                                <span className="Label">followers</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-4">
                                
                                <div className="Card">
                                    <div className="card-thumb">
                                        <img src="images/product2.jpg" alt="" />
                                    </div>
                                    <p className="feature-tag">Featured</p>
                                    <div className="card-content">
                                        <h5 className="cardTitle">Atlantic Mills</h5>
                                        <p className="cardDisc txt-light">Mills</p>
                                        <div className="card-footer">
                                            <div className="rate">
                                                <input className="star-inner" type="radio" id="star6" name="rate" value="5" />
                                                <label htmlFor="star6" title="text">5 stars</label>
                                                <input className="star-inner" type="radio" id="star7" name="rate" value="4" />
                                                <label htmlFor="star7" title="text">4 stars</label>
                                                <input className="star-inner" type="radio" id="star8" name="rate" value="3" />
                                                <label htmlFor="star8" title="text">3 stars</label>
                                                <input type="radio" id="star9" name="rate" value="2" />
                                                <label htmlFor="star9" title="text">2 stars</label>
                                                <input type="radio" id="star10" name="rate" value="1" />
                                                <label htmlFor="star10" title="text">1 star</label>
                                              </div>
                                            <div className="follower txt-light">
                                                <span className="value">1.2k</span>
                                                <span className="Label">followers</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-4">
                                
                                <div className="Card">
                                    <div className="card-thumb">
                                        <img src="images/product3.jpg" alt="" />
                                    </div>
                                    <p className="feature-tag">Featured</p>
                                    <div className="card-content">
                                        <h5 className="cardTitle">Arvind’s Mills</h5>
                                        <p className="cardDisc txt-light">Mills</p>
                                        <div className="card-footer">
                                            <div className="rate">
                                                <input className="star-inner" type="radio" id="star5" name="rate" value="5" />
                                                <label htmlFor="star5" title="text">5 stars</label>
                                                <input className="star-inner" type="radio" id="star4" name="rate" value="4" />
                                                <label htmlFor="star4" title="text">4 stars</label>
                                                <input className="star-inner" type="radio" id="star3" name="rate" value="3" />
                                                <label htmlFor="star3" title="text">3 stars</label>
                                                <input type="radio" id="star2" name="rate" value="2" />
                                                <label htmlFor="star2" title="text">2 stars</label>
                                                <input type="radio" id="star1" name="rate" value="1" />
                                                <label htmlFor="star1" title="text">1 star</label>
                                              </div>
                                            <div className="follower txt-light">
                                                <span className="value">1.2k</span>
                                                <span className="Label">followers</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-4">
                                
                                <div className="Card">
                                    <div className="card-thumb">
                                        <img src="images/product1.jpg" alt="" />
                                    </div>
                                    <p className="feature-tag">Featured</p>
                                    <div className="card-content">
                                        <h5 className="cardTitle">East Indigo co.</h5>
                                        <p className="cardDisc txt-light">Manufacturer</p>
                                        <div className="card-footer">
                                            <div className="rate">
                                                <input className="star-inner" type="radio" id="star5" name="rate" value="5" />
                                                <label htmlFor="star5" title="text">5 stars</label>
                                                <input className="star-inner" type="radio" id="star4" name="rate" value="4" />
                                                <label htmlFor="star4" title="text">4 stars</label>
                                                <input className="star-inner" type="radio" id="star3" name="rate" value="3" />
                                                <label htmlFor="star3" title="text">3 stars</label>
                                                <input type="radio" id="star2" name="rate" value="2" />
                                                <label htmlFor="star2" title="text">2 stars</label>
                                                <input type="radio" id="star1" name="rate" value="1" />
                                                <label htmlFor="star1" title="text">1 star</label>
                                              </div>
                                            <div className="follower txt-light">
                                                <span className="value">1.2k</span>
                                                <span className="Label">followers</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-4">
                                
                                <div className="Card">
                                    <div className="card-thumb">
                                        <img src="images/product2.jpg" alt="" />
                                    </div>
                                    <p className="feature-tag">Featured</p>
                                    <div className="card-content">
                                        <h5 className="cardTitle">Atlantic Mills</h5>
                                        <p className="cardDisc txt-light">Mills</p>
                                        <div className="card-footer">
                                            <div className="rate">
                                                <input className="star-inner" type="radio" id="star5" name="rate" value="5" />
                                                <label htmlFor="star5" title="text">5 stars</label>
                                                <input className="star-inner" type="radio" id="star4" name="rate" value="4" />
                                                <label htmlFor="star4" title="text">4 stars</label>
                                                <input className="star-inner" type="radio" id="star3" name="rate" value="3" />
                                                <label htmlFor="star3" title="text">3 stars</label>
                                                <input type="radio" id="star2" name="rate" value="2" />
                                                <label htmlFor="star2" title="text">2 stars</label>
                                                <input type="radio" id="star1" name="rate" value="1" />
                                                <label htmlFor="star1" title="text">1 star</label>
                                              </div>
                                            <div className="follower txt-light">
                                                <span className="value">1.2k</span>
                                                <span className="Label">followers</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-4">
                                
                                <div className="Card">
                                    <div className="card-thumb">
                                        <img src="images/product3.jpg" alt="" />
                                    </div>
                                    <p className="feature-tag">Featured</p>
                                    <div className="card-content">
                                        <h5 className="cardTitle">Arvind’s Mills</h5>
                                        <p className="cardDisc txt-light">Mills</p>
                                        <div className="card-footer">
                                            <div className="rate">
                                                <input className="star-inner" type="radio" id="star5" name="rate" value="5" />
                                                <label htmlFor="star5" title="text">5 stars</label>
                                                <input className="star-inner" type="radio" id="star4" name="rate" value="4" />
                                                <label htmlFor="star4" title="text">4 stars</label>
                                                <input className="star-inner" type="radio" id="star3" name="rate" value="3" />
                                                <label htmlFor="star3" title="text">3 stars</label>
                                                <input type="radio" id="star2" name="rate" value="2" />
                                                <label htmlFor="star2" title="text">2 stars</label>
                                                <input type="radio" id="star1" name="rate" value="1" />
                                                <label htmlFor="star1" title="text">1 star</label>
                                              </div>
                                            <div className="follower txt-light">
                                                <span className="value">1.2k</span>
                                                <span className="Label">followers</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Section3;