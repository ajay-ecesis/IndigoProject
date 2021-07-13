import Navbar from "../pagecomponents/Navbar";
import Footer from "../pagecomponents/Footer";
import Head from "next/head";
import { clientRead,client } from "../utils/sanity";
import { usePreviewSubscription } from '../utils/previewConfig'
import { urlFor } from "../utils/tools";
import BlockContent from '@sanity/block-content-to-react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const About = (props) => {

  const overrides = {
    normal: props => <p className="disc" {...props} />,
    h5:props =><h5 className="title" {...props} />,
  }
  
  const serializers = {
    types: {
      block: props =>
        // Check if we have an override for the “style”
        overrides[props.node.style] 
          // if so, call the function and pass in the children, ignoring
          // the other unnecessary props
          ? overrides[props.node.style]({ children: props.children })
  
          // otherwise, fallback to the provided default with all props
          : BlockContent.defaultSerializers.types.block(props),
    }
  }

  const  postQuery= `*[_type=="siteabout"]`

  const {data} = usePreviewSubscription(postQuery, {
      initialData: props.data,
      enabled: props.preview,
  })
    
  const mapSection1 = (item,i) => {
            return(
              
              <section key={i} className="section trustBrand manufacturers Sustainability brands about about1">
                <div className="container-fluid ">
                        
                    <div className="row row--chnage">
                      {item.description &&  
                        <div className="col-md-6 manufacturers-content">
                            <BlockContent blocks={item.description} serializers={serializers} />
                        </div>
                      }
                      <div className="col-md-6">
                            <div className="thumb hideMobile">
                                <img src={urlFor(item.mainimage)} alt="" />
                            </div>
                      </div>
                    </div>
                </div>
              </section> 
            )
  }

  const mapSection2= (item,i) => (
        <section key={i} className="section trustBrand manufacturers Sustainability brands about about2">
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
                  {item.description && <div className="col-md-6 manufacturers-content">
                  <BlockContent blocks={item.description} serializers={serializers} /> 
                  </div>}
              </div>
          </div>
      </section>
  )

  return(
        <>
          <Head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Indigo | About Us</title>
          </Head>
         
          
          <div className="main_banner_new about_us_banner new about-changed">
          <Navbar preview={props.preview} nav={props.nav} />
              <div className="banner ">
                  <div>
                    <a className="backArrow" href={props.prevUrl}> <img src="/images/back-arrow.svg" alt="" /> </a>
                  </div>
                  <div id="bannerWrapper" className="banner-wrapper">
                    
                    <div className="bg-img_banner new bg-img_about">
                      <img src={urlFor(data[0]?.mainimage)} alt="" />
                    </div>
                      <div className="container-fluid">
                          <div className="banner-inner row">
                              <div className="left-side col-md-6">
                                  {data[0]?.heading1 && <h6>{data[0].heading1}</h6>}
                                  {data[0]?.heading2 && <BlockContent blocks={data[0]?.heading2} />}
                              </div>
                          </div>
                      </div>
                  </div>
                  </div> 
          </div>

          <div className="about-us-main" id="main2">
            {data[0]?.maincomponents && data[0].maincomponents.map((item,i)=>(
              i%2==0 ? mapSection1(item,i) : mapSection2(item,i)
            ))}  
          </div>

  
          <section className="section aboutus-slider">
              <div className="container-fluid about">

                <div className="row">
                    <div className="col-md-12">
                        <img src={urlFor(data[0]?.bottomimage)} alt="" />                  
                    </div>
                </div>
                  
              </div>
          </section>
  
      <Footer />
    </>
  )
}


export default About;


export async function getServerSideProps(context) {
  // console.log("the context",context)
  let data = null;
  let nav = await client.fetch(`*[_id=="navbar"]{navlinks[]->}`);
  let prevUrl = "/";
    if(context.req.headers.referer){
        prevUrl = context.req.headers.referer
    }
  let preview = context.preview ? context.preview : null
  if(context.preview){
     
      data = await client.fetch('*[_type=="siteabout"]');
  }
  else{
      data = await clientRead.fetch('*[_type=="siteabout"]');
  }
  console.log(data)
if (!data) {
  return {
    notFound: true,
  }
}

  return {
    props: { data,preview,nav, prevUrl }, // will be passed to the page component as props
  }
}

