import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from "next/head";
import Navbar from "../pagecomponents/Navbar";
import { client,clientRead } from "../utils/sanity";
import { usePreviewSubscription } from "../utils/previewConfig";
import { urlFor } from "../utils/tools";
import BlockContent from '@sanity/block-content-to-react';
import Footer from "../pagecomponents/Footer";

const Details = (props)=>{
    const settings = {
        infinite: true,
        autoplay:true,
        speed: 500,
        slidesToShow: 3,
        arrows:false,
        slidesToScroll: 1,
        responsive: [
           
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            }
          ]
      };
    return(
        <>
        <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Indigo | Product</title>
        </Head>
        <Navbar preview={props.preview} nav={props.nav} />
         <section class="explore stories section trustBrand manufacturers brands product-detail">
       <div class="container-fluid ">
           <div class="row">
               <div class="col-12">
                <a class="backArrow" href="/"> <img  src="images/back-arrow.svg" alt="" /> </a>
               </div>
               <div class="col-md-12 section-head">
                    <div class="left-side">
                        <h2 class="heading">
                            Basic plan
                        </h2>
                        <span class="heading__span txt-light">A Modern Tradition</span>
                    </div>
                    <div id="productBtn" class="right-side">
                        <span>More info</span>
                        <i class="fa fa-chevron-down"></i>
                    </div>
               </div>
           </div>
           <div class="row row--chnage">
                <div class="col-9">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="thumb">
                                <img src="images/12.jpg" alt="" />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="manufacturers-content">
                                <div class="head">
                                    <p class="price">$0/month</p>
                                    <a class="btn btn-yellow" href="">Coming Soon</a>
                                </div>
                                <div class="footer-info">
                                 <ul id="accordion" class="accordion pl-0">
                                     <div role="contentinfo" class="l-footer02">
                                         <div class="l-footer02-inner cf">
                                             <nav class="l-footer02-nav">
                                                    <ul class="l-footer02-nav-list">
                                                        <li class="l-footer02-nav-item">
                                                        <h2 class="l-footer02-nav-title js-dropdown-footer c-btn c-btn-hover01 footer-col-text-change"><span>Details</span><i class="fa fa-chevron-down"></i></h2>
                                                        <div class="l-footer02-nav-panel js-dropdown-footer-menu" style={{display:'none'}}>
                                                            <ul class="l-footer02-nav-panel-inner">
                                                            <li class="l-footer02-nav-panel-item">
                                                                <a href="#"><p>Create a free profile and get matched with information and connections.</p>
                                                                <ul class="details">
                                                                    <li>Access all free content</li>
                                                                    <li>5 connections per month</li>
                                                                    <li>Basic individual profile</li>
                                                                    <li>3 portfolio files</li>
                                                                    <li>Basic business profile</li>
                                                                    <li>3 portfolio / product files</li>
                                                                </ul>
                                                                </a>
                                                            </li>
                                                            </ul>
                                                        </div>
                                                        </li>
                                                    </ul>
                                             </nav>
                                         </div>
                                     </div>
                                 </ul>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
       </div>
   </section>
        
   <section class="section artisanalExperiences Plans bottom-blog-gallery-section product-detail">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12 section-head text-center">
                        <p class="browse_plan">Browse other plans</p>
                        <div class="view__all">
                            <h6>View all</h6>
                        </div>
                    </div>
                </div>
                <div class="row Artisanal-slider_second Artisanal-slider_second_view_all">
                    <Slider {...settings} >
                    <div class="col-md-4">
                        <div class="product">
                            <img src="images/15.jpg" alt="" />
                        <div class="product-footer">
                            <h5 class="title">Professional plan</h5>
                            <p>A modern take on tradition</p>
                            <div class="product_price">
                                <p>$21</p>
                                <img src="images/cart-checkout.png" alt="" />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="product">
                            <img src="images/14.jpg" alt="" />
                        <div class="product-footer">
                            <h5 class="title">Professional plan</h5>
                            <p>A modern take on tradition</p>
                            <div class="product_price">
                                <p>$21</p>
                                <img src="images/cart-checkout.png" alt="" />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="product">
                            <img src="images/15.jpg" alt="" />
                        <div class="product-footer">
                            <h5 class="title">Professional plan</h5>
                            <p>A modern take on tradition</p>
                            <div class="product_price">
                                <p>$21</p>
                                <img src="images/cart-checkout.png" alt="" />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="product">
                            <img src="images/14.jpg" alt="" />
                        <div class="product-footer">
                            <h5 class="title">Professional plan</h5>
                            <p>A modern take on tradition</p>
                            <div class="product_price">
                                <p>$21</p>
                                <img src="images/cart-checkout.png" alt="" />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="product">
                            <img src="images/15.jpg" alt="" />
                        <div class="product-footer">
                            <h5 class="title">Professional plan</h5>
                            <p>A modern take on tradition</p>
                            <div class="product_price">
                                <p>$21</p>
                                <img src="/images/cart-checkout.png" alt="" />
                            </div>
                        </div>
                        </div>
                    </div>
                    </Slider>
                </div>
            </div>
        </section>  
        <Footer />
        </>

    )
}

export default Details;

//need to add dynamic content
export async function getServerSideProps(context) {
    // console.log("the context",context)
    let data = null;
    let nav = await client.fetch(`*[_id=="navbar"]{navlinks[]->}`);
    let preview = context.preview ? context.preview : null
    if(context.preview){
       
        data = await client.fetch('*[_type=="sitedetail"]');
    }
    else{
        data = await clientRead.fetch('*[_type=="sitedetail"]');
    }
    console.log(data)
//   if (!data || data.length<1) {
//     return {
//       notFound: true,
//     }
//   }
  
    return {
      props: { data,preview,nav }, // will be passed to the page component as props
    }
  }