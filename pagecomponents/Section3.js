import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlockContent from '@sanity/block-content-to-react';

const Section3 = ({content})=>{


    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <button
            className={className}
            style={{ ...style,  backgroundImage: `url(/images/arrows.png)`,
                position: 'absolute',
                right: '-50px',
                height: '32px',
                width: '32px', }}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <button
            className={className}
            style={{ ...style,  backgroundImage: `url(/images/arrows.png)`,
                position: 'absolute',
                left: '-50px',
                height: '32px',
                transform: 'rotate(180deg)',
                width: '32px', }}
            onClick={onClick}
          />
        );
      }

    const settings = {
        autoplaySpeed: 3000,
        centerMode: false,
        cssEase: 'linear',
        centerPadding: '60px',
        accessibility: false,
        slidesToShow: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    arrows: true,
                    centerMode: false,
                    centerPadding: '30px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    arrows: true,
                    centerMode: false,
                    centerPadding: '30px',
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '30px',
                    slidesToShow: 1
                }
            }
        ]
      };

    return(
        <>
         <section className="section products new">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 section-head text-center">
                        <h2 className="heading"><BlockContent blocks={content[0]} /></h2>
                    </div>
                </div>
                <div className="row">
                    <div className="wrapper col-12">
                       
                            <Slider className="row products-slider" {...settings}>
                            <div className="col-md-4">
                                
                                <div className="Card">
                                    <div className="card-thumb">
                                        <img src="images/product1.jpg" alt="" />
                                    </div>
                                    <p className="feature-tag">Featured</p>
                                    <div className="card-content">
                                        <h5 className="cardTitle">East Indigo co.</h5>
                                        <p className="cardDisc txt-light txt-light">Manufacturer</p>
                                        <div className="Card-footer">
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
                                        <div className="Card-footer">
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
                                        <div className="Card-footer">
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
                                        <div className="Card-footer">
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
                                        <div className="Card-footer">
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
                                        <div className="Card-footer">
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
        </section>
        </>
    )
}

export default Section3;