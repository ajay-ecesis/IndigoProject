import { urlFor } from "../utils/tools";
import Head from "next/head";
import BlockContent from '@sanity/block-content-to-react';
import { client,clientRead } from "../utils/sanity";
import { usePreviewSubscription } from "../utils/previewConfig";
import Navbar from "../pagecomponents/Navbar";
import Footer from "../pagecomponents/Footer";
//import PasswordRoute from '../pagecomponents/routes/PasswordRoute';

const Detail = (props)=>{

  const  postQuery= `*[_type=="siteSustainability"]`

  const {data} = usePreviewSubscription(postQuery, {
    initialData: props.data,
    enabled: props.preview,
  })

  const overrides = {
    h5: props => <h5 className="title" {...props} />,
    normal:props=><p className="disc" {...props} />
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
  const mapSection1 = (item,i) => {
    return(
          <section key={i} className="section trustBrand manufacturers Sustainability brands about about1 new">
              <div className="container-fluid ">
                              
                  <div className="row row--chnage">
                      
                      <div className="col-md-6 manufacturers-content">
                          <BlockContent blocks={item.description} serializers={serializers} />
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
                      <BlockContent blocks={item.description} serializers={serializers} /> 
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
                      <div className="bg-img_about bg-img_banner">
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
                            <img src="images/sustainability.png" alt="" />                  
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