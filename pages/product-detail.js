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
//import PasswordRoute from '../pagecomponents/routes/PasswordRoute';

const Details = (props)=>{

    const  postQuery= `*[_type=="siteplans"]`

    const {data} = usePreviewSubscription(postQuery, {
        initialData: props.data,
        enabled: props.preview,
    })

    const overrides = {
        h2: props => <h5 className="heading" {...props} />,
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

    const settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        accessibility: false,
        infinite: true,
        dots: false,
        arrows: false,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            centerPadding: '20px'
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                centerPadding: '5px'
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
                <title>Indigo | Upgrade Plans</title>
            </Head>

            <div className="main_banner_new about_us_banner expore_details_banner">
                <Navbar preview={props.preview} nav={props.nav} />
            </div>

            <main id="upgrade_plans">
                <section className="upgrade-plans-section">
                    <div className="container-fluid">
                        <div className="row">
                            {data[0]?.pageHeading && <BlockContent blocks={data[0]?.pageHeading} serializers={serializers} />}
                            <hr/>
                        </div>
                        <div className="row content">
                            <div className="col-12"><h6 className="heading_new">
                                For Brands
                            </h6></div>
                            <div className="col">
                                <div className="row">
                                    {data[0]?.brandplans.map((plan,i)=>(
                                         <div key={i} className="col-md-4">
                                         <div className="left-side">
                                             <h4>{plan?.plantype}</h4>
                                         </div>
                                         <div className="right-side">
                                             <h5>{plan?.planname}</h5>
                                            { plan.plandata && <BlockContent blocks={plan?.plandata}  />}
                                            
                                             <div className="price">
                                                { plan.planprice && <BlockContent blocks={plan?.planprice} />}
                                            
                                             </div>
                                             <a href="#" className="btn btn-yellow"> Coming Soon</a>
                                         </div>
                                     </div>
                                    ))}
                                   
                                </div>
                                <div className="row-change">
                                    <div className="col-12"><h6 className="heading_new">
                                        For Manufacturers
                                    </h6></div>
                                </div>
                                <div className="row row_manufacturers">
                                {data[0]?.manufacturerplans.map((plan,i)=>(
                                         <div key={i} className="col-md-4">
                                         <div className="left-side">
                                             <h4>{plan?.plantype}</h4>
                                         </div>
                                         <div className="right-side">
                                             <h5>{plan?.planname}</h5>
                                            { plan.plandata && <BlockContent blocks={plan?.plandata}  />}
                                            
                                             <div className="price">
                                                { plan.planprice && <BlockContent blocks={plan?.planprice} />}
                                            
                                             </div>
                                             <a href="#" className="btn btn-yellow"> Coming Soon</a>
                                         </div>
                                     </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            
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

    let prevUrl = "/";
    if(context.req.headers.referer){
        prevUrl = context.req.headers.referer
    }

    let preview = context.preview ? context.preview : null
    if(context.preview){
       
        data = await client.fetch('*[_type=="siteplans"]');
    }
    else{
        data = await clientRead.fetch('*[_type=="siteplans"]');
    }
    console.log(data)
  if (!data || data.length<1) {
    return {
      notFound: true,
    }
  }
  
    return {
      props: { data,preview,nav, prevUrl }, // will be passed to the page component as props
    }
  }