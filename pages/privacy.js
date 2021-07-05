import Head from "next/head";
import { client } from "../utils/sanity";
import Navbar from "../pagecomponents/Navbar";
import Footer from '../pagecomponents/Footer';

const privacy = (props) => {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Indigo | Privacy Policy</title>
            </Head>

            <div className="main_banner_new about_us_banner sustainability_details_banner">
                <Navbar nav={props.nav}/>
                {/* <!-- banner --> */}
                <div className="banner ">
                    <div id="bannerWrapper" className="banner-wrapper">
                      <div className="bg-img_about bg-img_banner">
                        <img src="/images/sustailabilty_new.png" alt="" />
                      </div>
                        <div className="container-fluid">
                            <div className="banner-inner row">
                                <div className="left-side col-md-6">
                                  
                                    <h1>Privacy Policy</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default privacy

export async function getServerSideProps(context) {
   
    let nav = await client.fetch(`*[_id=="navbar"]{navlinks[]->}`);
    const query = context?.query || null;
    let prevUrl = "/";
    if(context.req.headers.referer){
        prevUrl = context.req.headers.referer
    }
     
    return {
      props: {nav, prevUrl,query }, // will be passed to the page component as props
    }
}
