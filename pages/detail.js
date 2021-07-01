import { urlFor } from "../utils/tools";
import Head from "next/head";
import BlockContent from '@sanity/block-content-to-react';
import { client,clientRead } from "../utils/sanity";
import { usePreviewSubscription } from "../utils/previewConfig";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../pagecomponents/Navbar";
import Footer from "../pagecomponents/Footer";

const Detail = (props)=>{

  const  postQuery= `*[_type=="siteSustainability"]`

  const {data} = usePreviewSubscription(postQuery, {
    initialData: props.data,
    enabled: props.preview,
  })

  /* const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed:1500,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
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
 */
  const mapSection1 = (item,i) => {
    return(
          <section key={i} className="section trustBrand manufacturers Sustainability brands about about1">
              <div className="container-fluid ">
                              
                  <div className="row row--chnage">
                      
                      <div className="col-md-6 manufacturers-content">
                          <BlockContent blocks={item.description} />
                      </div>

                      <div className="col-md-6">
                          <div className="thumb">
                              <img src={urlFor(item.mainimage)} alt="" />
                          </div>
                        {/* {item.imagetext && <div className="content">
                      <h2 className="heading-inner">{item.imagetext}</h2> 
                        </div>} */}
                      </div>

                    </div>
                  </div>
          </section>
    )
  }

  const mapSection2= (item,i) => (

      <section key={i} className="section trustBrand manufacturers Sustainability brands about about2 sustainability_details">
          <div className="container-fluid ">
              <div className="row row--chnage">
                  <div className="col-md-6">
                      <div className="thumb">
                          <img src={urlFor(item.mainimage)} alt="" />
                      </div>
                      {item.imagetext && <div className="content">
                      <h2 className="heading-inner">{item.imagetext}</h2> 
                        </div>}
                  </div>
                  <div className="col-md-6 manufacturers-content">
                      <BlockContent blocks={item.description} /> 
                  </div>
              </div>
          </div>
      </section>
  )


  return(
        <>

            <Head>
                <meta charSet="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Indigo | Sustainability</title>
            </Head>

            <div className="main_banner_new about_us_banner sustainability_details_banner">
                <Navbar preview={props.preview} nav={props.nav} />
                {/* <!-- banner --> */}
                <div className="banner ">
                    <div id="bannerWrapper" className="banner-wrapper">
                      <div className="bg-img_about">
                        <img src="images/sustailabilty_new.png" alt="" />
                      </div>
                        <div className="container-fluid">
                            <div className="banner-inner row">
                                <div className="left-side col-md-6">
                                    {data[0]?.heading1 && <h6>{data[0].heading1}</h6>}
                                    {data[0]?.heading2 && <h1>{data[0]?.heading2}</h1>}
                                    {/* <h6>We believe in</h6>
                                    <h1>Sustainability</h1> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <div id="main2">
              {data[0]?.content && data[0].content.map((item,i)=>(
                i%2==0 ? mapSection1(item,i) : mapSection2(item,i)
              ))}       
            </div>

            <section className="section aboutus-slider">
                <div className="container-fluid about">           
                    <div className="row">
                        <div className="col-md-12">
                            <img src="images/sustainability_new2.png" alt="" />                  
                        </div>
                    </div>
                </div>
            </section>

            

            <Footer />
        </>
  )
}


export default Detail;


export async function getServerSideProps(context) {
  // console.log("the context",context)
  let data = null;
  let nav = await client.fetch(`*[_id=="navbar"]{navlinks[]->}`);
  let preview = context.preview ? context.preview : null
  if(context.preview){
     
      data = await client.fetch('*[_type=="siteSustainability"]');
  }
  else{
      data = await clientRead.fetch('*[_type=="siteSustainability"]');
  }
  console.log(data)
if (!data) {
  return {
    notFound: true,
  }
}

  return {
    props: { data,preview,nav }, // will be passed to the page component as props
  }
}