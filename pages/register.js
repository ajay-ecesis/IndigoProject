import Navbar from "../pagecomponents/Navbar";
import { client } from "../utils/sanity";
import Head from "next/head";
import Footer from '../pagecomponents/Footer';
//import PasswordRoute from '../pagecomponents/routes/PasswordRoute';

const Register = (props) => {     

    return(
        <>
        <Head>
            <title>INDIGO | Register</title>
        </Head>
        <div className="main_banner_new about_us_banner expore_details_banner">
            <Navbar nav={props.nav}/>
        </div>

            <div className="signin-popup signUp-popup signUp-popup-open">
                <div className="modal-bg">
                    <div id="modal2" className="modal_box">
                        <span><a href={props.prevUrl}><img src="/images/back-arrow.svg" alt="" /></a></span>
                        <div className="form-heading">
                            <h3>Register</h3>
                            <p>Register as a Brand or Manufacturer</p>
                        </div>
                        <form>
                            <div className="both-buttons">
                                <a href="/brandregister" className="nav-btn brand_open">
                                Brand
                            </a>
                            <a href="/manufactureregister" className="nav-btn manufactur_open">
                                Manufacturer
                            </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        <Footer />
        </>
    )
}

export default Register;



export async function getServerSideProps(context) {
    // console.log("the context",context)
    let nav = await client.fetch(`*[_id=="navbar"]{navlinks[]->}`);
    console.log("the navbar",nav)

    let prevUrl = "/";
    if(context.req.headers.referer){
        prevUrl = context.req.headers.referer
    }
     
    return {
      props: {nav, prevUrl }, // will be passed to the page component as props
    }
}