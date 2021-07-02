import Head from "next/head";
import { client,clientRead } from "../utils/sanity";
import { usePreviewSubscription } from "../utils/previewConfig";
import { urlFor } from "../utils/tools";
import BlockContent from '@sanity/block-content-to-react';
import Navbar from "../pagecomponents/Navbar";
import Footer from "../pagecomponents/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import PasswordRoute from '../pagecomponents/routes/PasswordRoute';

const Features = ({content}) => {
   
    return(
        <div className="row gallery">
            {console.log("from fatures",content)}
            {content?.map((item,i)=>(
                 <div key={i} className=" col-md-3">
                 <img src={urlFor(item.image)} alt="" />
                 <span><BlockContent blocks={item.description} /></span>
             </div>
            ))}   
                  
            </div>
    )
}

const Explore = (props)=>{

    const  postQuery= `*[_type=="siteexplore"]`

    const {data} = usePreviewSubscription(postQuery, {
      initialData: props.data,
      enabled: props.preview,
    })

    const overrides = {
        h2: props => <h5 className="heading-inner" {...props} />,
        normal:props=><p className="disc disc--change txt-white txt-shadow" {...props} />
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

    return(
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Indigo | Explore</title>
            </Head>

            <div className="main_banner_new about_us_banner expore_details_banner">
                <Navbar preview={props.preview} nav={props.nav}  />
            </div>
            
            <div id="main">
                <section className="explore section trustBrand trustBrand_new_change manufacturers changed ">
                    <div className="container-fluid ">
                        <div className="row">
                            <a className="backArrow" href={props.prevUrl}> <img src="/images/back-arrow.svg" alt="" /> </a>
                        </div>
                        <div className="row new_custom">
                            <div className="col-md-12 section-head text-center">
                                <div className="col-md-12 section-head text-center text-new-center">
                                    <span className="heading__span">Explore</span>
                                    <h2 className="heading">
                                        How it works
                                    </h2>
                                </div>

                            {/* {data[0]?.heading1 && <span className="heading__span">{data[0].heading1}</span>}
                                {data[0]?.heading2 && <h2 className="heading">
                                    {data[0]?.heading2}
                                </h2>} */}
                            </div>
                        </div>
                        
                        <div className="row row--chnage">

                            <div className="col-md-12">
                                <div className="thumb">
                                    {data[0]?.manufactures && <img src={urlFor(data[0].manufactures.image)} alt="" />}
                                </div>
                                { data[0]?.manufactures && <div className="content">
                                    <BlockContent blocks={data[0]?.manufactures.description} serializers={serializers} />
                                </div>}
                            </div>

                            <div className="col-md-12 manufacturers-content">
                                {data[0]?.manufacturedescription && <p className="info">{data[0].manufacturedescription} </p>}
                                {data[0]?.featuresmanufacturer && <> <div className="title">Features</div>
                                <Features content={data[0]?.featuresmanufacturer} /></>}
                                
                                <div className="bottom-btn">
                                    <a className="btn btn-yellow" href="/manufactureregister">Register as manufacturer</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="explore explore2 section trustBrand manufacturers trustBrand_new_change brands changed_new">
                    <div className="container-fluid">
                        <div className="row row--chnage">

                            <div className="col-md-12">
                                <div className="thumb">
                                    {data[0]?.brands && <img src={urlFor(data[0].brands.image)} alt="" />}
                                </div>
                                { data[0]?.brands && <div className="content">
                                    <BlockContent blocks={data[0]?.brands.description} serializers={serializers} />
                                </div>}
                            </div>

                            <div className="col-md-12 manufacturers-content">
                                {data[0]?.branddescription && <p className="info">{data[0].branddescription}</p>}
                                {data[0]?.featuresbrand && <><div className="title">Features</div>
                                    <Features content={data[0]?.featuresbrand} /></>} 
                                <div className="bottom-btn">
                                    <a className="btn btn-yellow brand_open" href="/brandregister">Register as brand</a>
                                </div>
                            </div>          
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default Explore;



export async function getServerSideProps(context) {
    let data = null;
    let nav = await client.fetch(`*[_id=="navbar"]{navlinks[]->}`);
    let prevUrl = "/";
    if(context.req.headers.referer){
        prevUrl = context.req.headers.referer
    }
    let preview = context.preview ? context.preview : null
    if(context.preview){
       
        data = await client.fetch('*[_type=="siteexplore"]');
    }
    else{
        data = await clientRead.fetch('*[_type=="siteexplore"]');
    }
    
    if (!data) {
        return {
        notFound: true,
        }
    }
  
    return {
      props: { data,preview,nav,prevUrl }, // will be passed to the page component as props
    }
}