import {useState} from 'react'
import Head from "next/head";
import {toast} from 'react-toastify'
import axios from 'axios'

const password = () => {

  /*   const classes = useStyles(); */

    const [open, setOpen] = useState(false);

    const [values, setValues] = useState({ // Newsletter Values
        email:'',
        success: false,
        loading: false
    });

    const [passwordValues, setPasswordValues] = useState({ // Password Values
        password:'',
        success: false,
        loading: false
    });

    const handleChangeNewsletter = name => event => {
        setValues({...values, [name]:event.target.value, success:false, loading:false});
    }

    const clickSubmitNewsletter = async (e) => {
        e.preventDefault();
        try {
            setValues({...values, loading:true, success:false});          
            const {data} = await axios.post(`/api/create/newsletter`, {
                email:values.email
            });
            if(data.success){
                toast.success('We will send you an email right before we open!')
                setValues({...values, email:'', loading:false, success:true});  
                //return window.location.replace('/');
            }
        } catch (error) {
            console.log("Password Page Error", error);
            setValues({...values,loading:false, success:false});  
            toast.error(error.response.data);
        }
    }

    const handleToggle = () => {
        setValues({...values, email:'', loading:false, success:false});  
        setPasswordValues({...passwordValues, password:'', loading:false, success:false});  
        setOpen(!open);
    }

    const handleChangePassword = name => event => {
        setPasswordValues({...passwordValues, [name]:event.target.value, success:false, loading:false});
    }

    const clickSubmitPassword = async (e) => {
        e.preventDefault();
        try {
            setPasswordValues({...passwordValues, loading:true, success:false});    
            if(String(process.env.INDIGO_PWD) === String(passwordValues.password))
            {
                let strEncode = window.btoa(unescape(encodeURIComponent(passwordValues.password)));
                window.localStorage.setItem("pwd", JSON.stringify(strEncode))
                return window.location.replace('/');
            }    
            else {
                toast.error("Your Password not match!")
            } 
        } catch (error) {
            console.log("Password Page Error", error);
            setPasswordValues({...passwordValues, loading:false, success:false});  
            toast.error(error.response.data);
        }
    }

    const showPasswordForm = () => (

        <div className="signin-popup passpop signin-popup-open">
                <div className="modal-bg">
                    <div className="modal_box">
                       
                        <div className="form-heading">
                           {/*  <h1 className="text-center">INDIGO</h1><br/> */}
                            <h1 className="text-center">Launching Soon</h1>
                        </div>
                        <hr/>
                        <div className="term-conditions">
                            <h5>Enter store using password.</h5>
                        </div>
                        <br/>
                        
                        <form onSubmit={clickSubmitPassword}>
                            <div className="form-group">
                                <input type="password" onChange={handleChangePassword('password')} value={passwordValues.password} placeholder="password" required />
                            </div>
                            
                            <div className="bottom-btn">
                                <input disabled={!passwordValues.password || passwordValues.loading} id="singupSubmit" type="submit" value={passwordValues.loading ? "Loading..." : "ENTER"} />
                            </div>
                            
                        </form>
                        
                    </div>
                </div>
            </div>

    )

    return (
        <>

            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Indigo | Password</title>               
            </Head>
      
            <div className="main_banner_new about_us_banner expore_details_banner">
                <div className="header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="Nav">
                                   
                                    <div className="bookmark-menu">
                                        <div className="bookmark"><span style={{backgroundColor:'#000', color:'#fff', padding: '10px 25px', borderRadius:'50px', style:'cursor'}} onClick={() => handleToggle()} >Enter Using Password</span></div>
                                    </div>
                                 
                                </div>
                            </div>
                            <div className="col-md-4">
                                <a className="main_logo" href="/"> <img src="/images/logo.svg" alt="" /> Project Indigo</a>
                            </div>
                            <div className="col-md-4 text-right">
                                <div className="manufacturer_brand_btn">
                                    <a onClick={() => handleToggle()} style={{cursor:'pointer'}}>Enter Using Password</a>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {open ? showPasswordForm() : (   
                <div className="signin-popup passpop signin-popup-open">
                    <div className="modal-bg">
                        <div className="modal_box" >
                        
                            <div className="form-heading">
                            {/*  <h1 className="text-center">INDIGO</h1><br/> */}
                                <h1 className="text-center">Launching Soon</h1>
                            </div>
                            <hr/>
                            <div className="term-conditions">
                                <h5>Be the first to know when we launch.</h5>
                            </div>
                            <br/>
                            
                            <form onSubmit={clickSubmitNewsletter}>
                                <div className="form-group">
                                    <input type="email" onChange={handleChangeNewsletter('email')} value={values.email} placeholder="Email Address" required />
                                </div>
                                
                                <div className="bottom-btn">
                                    <input disabled={!values.email || values.loading} id="singupSubmit" type="submit" value={values.loading ? "Loading..." : "Notify me"} />
                                </div>
                                
                            </form>
                            {values.success && 
                                <div className="term-conditions">
                                    <h5 style={{color:'#04AA6D'}}>We will send you an email right before we open!</h5>
                                </div>
                            } 
                        </div>
                    </div>
                </div>
            )}
            
        </>
    )
}

export default password
