import Navbar from "../pagecomponents/Navbar";
import { client } from "../utils/sanity";
import Head from "next/head";
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'
import {Context} from '../context'
import {useState, useContext} from 'react'
import axios from 'axios'
import Footer from '../pagecomponents/Footer';
//import PasswordRoute from '../pagecomponents/routes/PasswordRoute';

const signin = (props) => {

    const {state, dispatch} = useContext(Context);
    const { user } = state;

    // router
    const router = useRouter();

    // Login Values
    const [loginValues, setLoginValues] = useState({
        email:'',
        password:'',
        loading: false
    })

    // login functionality START
    const handleChangeForLogin = name => event => {
        setLoginValues({...loginValues, [name]:event.target.value, loading:false});
    }

    const clickSubmitLogin = async(e) => {
        e.preventDefault();
        try {
            setLoginValues({...loginValues, loading:true});
            const {data} = await axios.post(`/api/login`, {
                email: loginValues.email,
                password: loginValues.password
            });
            toast.success('login success,Please wait...');
            dispatch({
                type:"LOGIN",
                payload: user
            });
            if(data.role === 0){
                router.push('/brand/dashboard');
            }
            else if(data.role === 1){
                router.push('/manufacturer/dashboard');
            }
            else if(data.role === 2){
                router.push('/admin/dashboard');
            }
            //setLoginValues({...loginValues, email:'', password:'', loading: false});
        } catch (error) {
            console.log("Error", error);
            toast.error(error.response.data);
            setLoginValues({...loginValues, loading: false});
        }
    }
    // login functionality END

    
    return(
        <>
        <Head>
            <title>INDIGO | SignIn</title>
        </Head>

        <div className="main_banner_new about_us_banner expore_details_banner">
            <Navbar nav={props.nav}/>
        </div>

            <div className="signin-popup signin-popup-open">
                <div className="modal-bg">
                    <div className="modal_box">
                        <span><a className="modal_close" href={props.prevUrl}><img src="/images/back-arrow.svg" alt="" /></a></span>
                        <div className="form-heading">
                            <h3 className="text-center">SIGN IN</h3>
                        </div>
                        <form onSubmit={clickSubmitLogin}>
                            <div className="form-group">
                                <label htmlFor="yourEmail">Your Email</label>
                                <input type="email" onChange={handleChangeForLogin('email')} placeholder="jasonfoster@gmail.com" value={loginValues.email} required />
                            </div>
                            <div className="form-group">
                                <input type="password" onChange={handleChangeForLogin('password')} placeholder="Password" value={loginValues.password} required />
                            </div>
                            <div className="form-group forgot_remember">
                                <div className="remberme">
                                    <input type="checkbox" placeholder="Password" id="rememberMe" name="Your Email" />
                                    <label htmlFor="rememberMe">Remember Me</label>
                                </div>
                                <label htmlFor="">Forgot password ?</label>
                            </div>
                            
                            <div className="bottom-btn">
                                <input id="singupSubmit" type="submit" value={loginValues.loading ? "Loading..." : "Sign in"} />
                        
                                <p className="or">OR</p>
                                <a href="/register" className="btn-yellow btn-black-yellow">Sign Up</a>
                            </div>
                            <div className="term-conditions">
                                <p>Terms of Use <a className="txt-light">and</a> Privacy Policy</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        
        <Footer />
        </>
    )
}

export default signin;

export async function getServerSideProps(context) {
    // console.log("the context",context)
    let nav = await client.fetch(`*[_id=="navbar"]{navlinks[]->}`);
  
    let prevUrl = "/";
    if(context.req.headers.referer){
        prevUrl = context.req.headers.referer
    }
     
    return {
      props: {nav, prevUrl }, // will be passed to the page component as props
    }
}