import {useState, useContext} from 'react'
import { usePreviewSubscription } from '../utils/previewConfig';
import {Context} from '../context'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'
import { GoogleLogin } from 'react-google-login';
import {useAppContext} from '../context/loginmodal'

const Navbar = (props) => {

    const  postQuery= `*[_id=="navbar"]{navlinks[]->}`
    const {data} = usePreviewSubscription(postQuery, {
      initialData: props.nav,
      enabled: props.preview,
    })

    // state
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
    
    // const [regBrand,setregBrand]  = useAppContext()
    // const [regmanufacture,setregmanufacture] = useAppContext();
    const {regBrand,setregBrand,regmanufacture,setregmanufacture}  = useAppContext()

    const [selectReg,setselectReg] = useState("")
    const [login,setlogin] = useState("");
   
    
    // Register Brand Values
    const [regBrandValues, setRegBrandValues] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        password1:'',
        role:0,
        brandName:'',
        url:'',
        category:'',
        market:'',
        linkedIn:'',
        zipCode:'',
        city:'',
        country:'',
        loading: false
    })

    // Register Manufacturer values
    const [regManufacturerValues, setRegManufacturerValues] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        password1:'',
        role:1,
        supplierName:'',
        year:'',
        category:'',
        employees:'',
        speciality:'',
        sku:'',
        samplingTime:'',
        dailyCapacity:'',
        monthlyCapacity:'',
        terms:'',
        importantClients:'',
        heading:'',
        factoryInfo:'',
        skills:'',
        addressLine1:'',
        addressLine2:'',
        zipCode:'',
        city:'',
        country:'',
        certifications:'',
        multiphotos:[],
        loading: false
    })

    // logout function
    const logout = async() => {
        dispatch({type: "LOGOUT"});
        const {data} = await axios.get('/api/logout');
        toast(data.message);
        //router.push('/');
        return window.location.replace("/");
    }

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

    // Register Brand functionality START
    const handleChangeRegBrand = name => event => {
        setRegBrandValues({...regBrandValues, [name]:event.target.value, loading: false})
    }

    const clickSubmitRegBrand = async(e) => {
        e.preventDefault();
        try {
            setRegBrandValues({...regBrandValues, loading:true});
            const {data} = await axios.post(`/api/createBrand`, {
                firstName: regBrandValues.firstName,
                lastName: regBrandValues.lastName,
                email: regBrandValues.email,
                password: regBrandValues.password,
                password1: regBrandValues.password1,
                role:0,
                brandName: regBrandValues.brandName, 
                url: regBrandValues.url, 
                category: regBrandValues.category, 
                market: regBrandValues.market, 
                linkedIn: regBrandValues.linkedIn, 
                zipCode: regBrandValues.zipCode, 
                city: regBrandValues.city, 
                country: regBrandValues.country,
            });
            toast.success('Registration successfull, Please login to continue.');
            // router.push('/');          
            setRegBrandValues({...regBrandValues, firstName:'', lastName:'', email:'', password:'', password1:'',brandName:'', url:'', category:'', market:'', linkedIn:'', zipCode:'', city:'', country:'', loading:false})
            setregBrand("");
            setselectReg("")
            setlogin("active")
        } catch (error) {
            console.log("Error", error);
            setRegBrandValues({...regBrandValues, loading:false});
            toast.error(error.response.data);
        }
    }

    // Register Brand functionality END

    const responseGoogleManufacture = async(response) => {
        try {
           
            const {data}=await axios.post('/api/manufactureGoogleReg',{

                response,
                role:regManufacturerValues.role,
                supplierName:regManufacturerValues.supplierName,
                year:regManufacturerValues.year,
                monthlyCapacity:regManufacturerValues.monthlyCapacity,
                terms:regManufacturerValues.terms,
                importantClients:regManufacturerValues.importantClients,
                heading:regManufacturerValues.heading,
                factoryInfo:regManufacturerValues.factoryInfo,
                skills:regManufacturerValues.skills,
                addressLine1:regManufacturerValues.addressLine1,
                addressLine2:regManufacturerValues.addressLine2,
                zipCode:regManufacturerValues.zipCode,
                city:regManufacturerValues.city,
                country:regManufacturerValues.country,
                employees:regManufacturerValues.employees,
                category:regManufacturerValues.category,
                speciality:regManufacturerValues.speciality,
                sku:regManufacturerValues.sku,
                samplingTime:regManufacturerValues.samplingTime,
                dailyCapacity:regManufacturerValues.dailyCapacity,
                certifications:regManufacturerValues.certifications,
                multiphotos:regManufacturerValues.multiphotos
            })

            toast.success('Registration successfull, Please login to continue...');
            router.push('/');
            setRegManufacturerValues({
                ...regManufacturerValues,
                firstName:'',
                lastName:'',
                email:'',
                password:'',
                password1:'',
                role:1,
                supplierName:'',
                year:'',
                category:'',
                employees:'',
                speciality:'',
                sku:'',
                samplingTime:'',
                dailyCapacity:'',
                monthlyCapacity:'',
                terms:'',
                importantClients:'',
                heading:'',
                factoryInfo:'',
                skills:'',
                addressLine1:'',
                addressLine2:'',
                zipCode:'',
                city:'',
                country:'',
                certifications:'',
                multiphotos:[],
                loading:false
            }) 
        } catch (error) {
            toast.error(error.response.data);
            setRegManufacturerValues({...regManufacturerValues, loading: false})
        }
        
    }

    const responseGoogleBrand = async(response) => {
        
        try {
            setRegBrandValues({...regBrandValues, loading:true});
            const {data} = await axios.post(`/api/brandRegGoogle`, {
                response,
                role:0,
                brandName: regBrandValues.brandName, 
                url: regBrandValues.url, 
                category: regBrandValues.category, 
                market: regBrandValues.market, 
                linkedIn: regBrandValues.linkedIn, 
                zipCode: regBrandValues.zipCode, 
                city: regBrandValues.city, 
                country: regBrandValues.country,
            });
            toast.success('Registration successfull, Please login to continue.');
            router.push('/');
            setRegBrandValues({...regBrandValues, firstName:'', lastName:'', email:'', password:'', password1:'',brandName:'', url:'', category:'', market:'', linkedIn:'', zipCode:'', city:'', country:'', loading:false})
        } catch (error) {
            console.log("Error", error);
            setRegBrandValues({...regBrandValues, loading:false});
            toast.error(error.response.data);
        }
        
    }

    const responseGooglelogin = async (response) => {
        try {
            const {data} = await axios.post(`/api/googlelogin`, {
                response
            });
            toast.success('login success')
            dispatch({
                type:"LOGIN",
                payload: data
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
        } catch (err) {
            console.log("Err", err);
            toast.error(err.response.data);
        }
    } 

    // Register Manufacturer functioality START
    const clickSubmitRegManufacturer = async(e) => {
        e.preventDefault();
        try {
 
            setRegManufacturerValues({...regManufacturerValues, loading: true})

            const {data}=await axios.post('/api/createSupplier',{

                firstName:regManufacturerValues.firstName,
                lastName:regManufacturerValues.lastName,
                email:regManufacturerValues.email,
                password:regManufacturerValues.password,
                password1:regManufacturerValues.password1,
                role:regManufacturerValues.role,
                supplierName:regManufacturerValues.supplierName,
                year:regManufacturerValues.year,
                monthlyCapacity:regManufacturerValues.monthlyCapacity,
                terms:regManufacturerValues.terms,
                importantClients:regManufacturerValues.importantClients,
                heading:regManufacturerValues.heading,
                factoryInfo:regManufacturerValues.factoryInfo,
                skills:regManufacturerValues.skills,
                addressLine1:regManufacturerValues.addressLine1,
                addressLine2:regManufacturerValues.addressLine2,
                zipCode:regManufacturerValues.zipCode,
                city:regManufacturerValues.city,
                country:regManufacturerValues.country,
                employees:regManufacturerValues.employees,
                category:regManufacturerValues.category,
                speciality:regManufacturerValues.speciality,
                sku:regManufacturerValues.sku,
                samplingTime:regManufacturerValues.samplingTime,
                dailyCapacity:regManufacturerValues.dailyCapacity,
                certifications:regManufacturerValues.certifications,
                multiphotos:regManufacturerValues.multiphotos
            })

            toast.success('Registration successfull, Please login to continue...');
            // router.push('/');
            setRegManufacturerValues({
                ...regManufacturerValues,
                firstName:'',
                lastName:'',
                email:'',
                password:'',
                password1:'',
                role:1,
                supplierName:'',
                year:'',
                category:'',
                employees:'',
                speciality:'',
                sku:'',
                samplingTime:'',
                dailyCapacity:'',
                monthlyCapacity:'',
                terms:'',
                importantClients:'',
                heading:'',
                factoryInfo:'',
                skills:'',
                addressLine1:'',
                addressLine2:'',
                zipCode:'',
                city:'',
                country:'',
                certifications:'',
                multiphotos:[],
                loading:false
            }) 
            setregmanufacture("");
            setselectReg("");
            setlogin("active")
        } catch (error) {
            toast.error(error.response.data);
            setRegManufacturerValues({...regManufacturerValues, loading: false})
        }
    }

    const getBase64 = file => {
        return new Promise(resolve => {
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
          // Convert the file to base64 text
          reader.readAsDataURL(file);
          // on reader load somthing...
          reader.onload = () => {
            baseURL = reader.result;
            resolve(baseURL);
          };
        });
    };

    const handleChangeRegManufacturer = (name) => async (event )=> {
        if(name === "certifications"){
            var baseData;
            baseData = await getBase64(event.target.files[0]);
            setRegManufacturerValues({...regManufacturerValues, [name]:JSON.stringify(baseData), loading: false})
        }
        else if(name === "multiphotos"){
            let val = event.target.files;
            if(val.length >= 1){
                var baseData;
                var result = [];
                for(var i=0;i<val.length;i++){
                    baseData = await getBase64(val[i]);
                    result.push(baseData);
                }
                setRegManufacturerValues({...regManufacturerValues, multiphotos:JSON.stringify(result), loading:false});
                //toast.success('Image Upload successfully.')
            }
            else {
                toast.error("Unable to upload images, because the field is empty!")
            }
        }
        else {
            setRegManufacturerValues({...regManufacturerValues, [name]:event.target.value, loading: false})
        }   
    }

    // Register Manufacturer functioality END

    return(
        <>
            <div className="preloader">
                <div id="mdiv">
                    <div className="cdiv">
                        <div className="rot"></div>
                        <h4 className="lh">INDIGO</h4>
                    </div>
                </div>
            </div>
            <div className="header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-1">
                            <a href="/"><img className="brand-logo-main" src="/images/logo.svg" alt="logo" /></a>
                        </div>
                        <div className="col-md-11">
                            <div className="Nav">
                                <div className="humburger-menu">
                                    <input type="checkbox" id="toggle-check" />
                                    <label id="toggle-btn" className="btn_new" htmlFor="toggle-check">
                                        <span className="humburger-span"></span>
                                        <span className="humburger-span"></span>
                                        <span className="humburger-span"></span>
                                    </label>
                                </div>
                                <div className="bookmark-menu">
                                    <div className="bookmark"><a href="#"><img className="bookmark-icon" src="/images/bookmark-white.svg" /></a></div>
                                </div>
                                <ul className="Navbar">
                                    {data[0].navlinks && data[0].navlinks.map((item,i)=>(
                                        <span key={i}>
                                        { item.slug.current=="/" ? <li  ><a href="/">{item && item.linkname}</a></li>:
                                        <li  ><a href={item && "/"+item.slug.current}>{item && item.linkname}</a></li>}
                                        </span>
                                    ))}
                                
                                    {user === null && 
                                        <>
                                            <li className="sign__btn"><a id="signIn" href="#">Sign Up & Login</a></li>
                                            <li className="bottom-buttons"><a href="#">Sign up</a>
                                                <div className="both-buttons">
                                                    <button id="Brand-clickble3" className="nav-btn Brand-clickble3 brand_open">
                                                        Brand
                                                    </button>
                                                    <button id="Manufacturer-clickble3" className="nav-btn manufactur_open">
                                                        Manufacturer
                                                    </button>
                                                </div>
                                            </li>
                                            <li className="bottom-buttons"><a href="#">Login</a>
                                                <div className="bottom-btn">
                                                    <GoogleLogin 
                                                        className="btn btn-block btn-primary" 
                                                        clientId="562948689292-a88f1a8k0ofopafidnte67hm33iu8uj5.apps.googleusercontent.com"
                                                        render={renderProps => (
                                                            <a href="" style={{padding:10,paddingLeft:25,paddingRight:25,borderRadius:30}} onClick={renderProps.onClick} className="btn-yellow border-not">Continue with Google</a>
                                                            
                                                        )}
                                                        buttonText="Continue with Google"
                                                        onSuccess={responseGooglelogin}
                                                        onFailure={responseGooglelogin}
                                                        cookiePolicy={'single_host_origin'}
                                                    />
                                                </div>
                                            </li>
                                        
                                        </>
                                    }
                                    {user !== null && (
                                        <>
                                            <li>
                                                {Number(user.role) === 0 ? <a href="/brand/dashboard">Dashboard</a> : (Number(user.role) === 1 ? <a href="/manufacturer/dashboard">Dashboard</a> : Number(user.role) === 2 && <a href="/admin/dashboard">Dashboard</a>)}
                                            </li>
                                            <li onClick={logout} style={{cursor:'pointer'}}>
                                                Logout
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            {props.preview && <p>this site is in preview mode <a style={{color:'blue'}} href="/api/exit-preview">click here</a> to exit preview</p>}
                        </div>
                    </div>
                </div>
            </div>


            {/* sign in */}
            <div className={"signin-popup signin-popup-open "+login}>
                <div className={"modal-bg "+login}>
                    <div className="modal_box">
                        <span><a href="/" className="modal_close"><img src="images/back-arrow.svg" alt="" /></a>Log in</span>
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
                                {/* <a href="" className="btn-yellow border-not">Continue with Google</a> */}
                                <GoogleLogin 
                                    className="btn btn-block btn-primary" 
                                    clientId="562948689292-a88f1a8k0ofopafidnte67hm33iu8uj5.apps.googleusercontent.com"
                                    render={renderProps => (
                                        <a href="" onClick={renderProps.onClick} className="btn-yellow border-not">Continue with Google</a>
                                        
                                    )}
                                    buttonText="Continue with Google"
                                    onSuccess={responseGooglelogin}
                                    onFailure={responseGooglelogin}
                                    cookiePolicy={'single_host_origin'}
                                />
                                <p className="or">OR</p>
                                <a id="forSignUp" onClick={()=>setselectReg("active")} href="#" className="btn-yellow btn-black-yellow">Sign Up</a>
                            </div>
                            <div className="term-conditions">
                                <p>Terms of Use <a className="txt-light">and</a> Privacy Policy</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* sign up */}
            <div className={"signin-popup signUp-popup signUp-popup-open "+selectReg}>
                <div className="modal-bg">
                    <div id="modal2" className="modal_box">
                        <span><a className="modal_close" href="/" ><img src="images/back-arrow.svg" alt="" /></a>Sign up</span>
                        <div className="form-heading">
                            <h3>Register</h3>
                            <p>Register as a Brand or Manufacturer</p>
                        </div>
                        <form>
                            <div className="both-buttons">
                                <a onClick={()=>setregBrand("active")} id="Brand-clickble2" className="nav-btn brand_open">
                                Brand
                            </a>
                            <a onClick={()=>setregmanufacture("active")} id="Manufacturer-clickble2" className="nav-btn manufactur_open">
                                Manufacturer
                            </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        {/* register */}
        <div className={"signin-popup registar-popup_new registar-popup "+regBrand  }>
            <div className={"modal-bg "+regBrand }>
                <div className="modal_box">
                    <span><a href="" onClick={() => setregBrand("")} className="modal_close"><img src="images/back-arrow.svg" alt="" /></a></span>
                    <div className="form-heading">
                        <h2>Welcome to Projekt Indigo</h2>
                        <p>Please tell us about your brand</p>
                    </div>
                    <form onSubmit={clickSubmitRegBrand}>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegBrand('brandName')} placeholder="Brand name" value={regBrandValues.brandName} required />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegBrand('url')} placeholder="Website url" value={regBrandValues.url} required />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegBrand('category')} placeholder="Product Category" value={regBrandValues.category} required />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegBrand('market')} placeholder="Market" value={regBrandValues.market} required />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegBrand('linkedIn')} placeholder="LinkedIn" value={regBrandValues.linkedIn} required />
                        </div>
                        <div className="form-group form-group-change">
                            <select onChange={handleChangeRegBrand('city')} defaultValue={regBrandValues.city} placeholder="City">
                                <option>City</option>
                                <option value="volvo">America</option>
                                <option value="saab">London</option>
                                <option value="mercedes">Canada</option>
                                <option value="audi">Austrailia</option>
                            </select>
                            <input type="text" onChange={handleChangeRegBrand('zipCode')} placeholder="Zip Code" value={regBrandValues.zipCode} />
                        </div>
                        <div className="form-group form-group-change full-width">
                            <select onChange={handleChangeRegBrand('country')} placeholder="Country" defaultValue={regBrandValues.country}>
                                <option value="" disabled selected hidden>Country</option>
                                <option value="volvo">America</option>
                                <option value="saab">London</option>
                                <option value="mercedes">Canada</option>
                                <option value="audi">Austrailia</option>
                            </select>
                        </div>
                        <div className="mid-heading">
                            <p>Register</p>
                        </div>
                        {/* Google Brand Register */}
                        <div className="bottom-btn">
                            <GoogleLogin 
                                className="btn btn-block btn-primary"
                                clientId="562948689292-a88f1a8k0ofopafidnte67hm33iu8uj5.apps.googleusercontent.com"
                                render={renderProps => (
                                    <a href="" onClick={renderProps.onClick} className="btn-yellow border-not">Continue with Google</a>
                                    
                                )}
                                buttonText="SignUp"
                                onSuccess={responseGoogleBrand}
                                onFailure={responseGoogleBrand}
                                cookiePolicy={'single_host_origin'}
                                disabled={!regBrandValues.brandName || !regBrandValues.url || !regBrandValues.category || !regBrandValues.market || !regBrandValues.linkedIn || !regBrandValues.zipCode || !regBrandValues.city || !regBrandValues.country}
                            /> 
                            <p className="or">OR</p>
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegBrand('firstName')} placeholder="First name" value={regBrandValues.firstName} required />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegBrand('lastName')} placeholder="Last name" value={regBrandValues.lastName} required />
                        </div>
                        <div className="form-group">
                            <input type="email" onChange={handleChangeRegBrand('email')} placeholder="Email" value={regBrandValues.email} required />
                        </div>
                        <div className="form-group">
                            <input type="password" onChange={handleChangeRegBrand('password')} placeholder="Password" value={regBrandValues.password} />
                        </div>
                        <div className="form-group">
                            <input type="password" onChange={handleChangeRegBrand('password1')} placeholder="Confirm Password" value={regBrandValues.password1} />
                        </div>
                        <div className="bottom-btn">
                            <input id="forUpload" type="submit" className="btn-yellow" value={regBrandValues.loading ? 'Loading...' : "Register"} />
                        </div>
                        
                        <div className="term-conditions">
                            <p>By clicking the “Register” button, you are creating a Projekt Indigo account, and you agree to Projekt Indigo’s Terms of Use and Privacy Policy. </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        {/* Manufacturer Register */}

        <div className={"uploadFile signin-popup registar-popup "+regmanufacture}>
            <div className={"modal-bg "+regmanufacture}>
                <div className="modal_box">
                    <span><a href="" onClick={() => setregmanufacture("")} className="modal_close"><img src="images/back-arrow.svg" alt="" /></a></span>
                    <div className="form-heading">
                        <h2>Welcome to Projekt Indigo</h2>
                        <p>Please tell us about your company</p>
                    </div>
                    <form onSubmit={clickSubmitRegManufacturer}>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegManufacturer('supplierName')} placeholder="Supplier name" value={regManufacturerValues.supplierName} required />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegManufacturer('year')} placeholder="Year established" value={regManufacturerValues.year} required />
                        </div>
                        <div className="form-group form-group-change full-width">
                            <select onChange={handleChangeRegManufacturer('employees')} placeholder="Number of employees" defaultValue={regManufacturerValues.employees} required>
                                <option value="" disabled selected hidden>Number of employees</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                            </select>
                        </div>
                        <div className="form-group form-group-change full-width">
                            <select onChange={handleChangeRegManufacturer('category')} placeholder="Product Category" defaultValue={regManufacturerValues.category} required>
                                <option value="" disabled selected hidden>Product Category</option>
                                <option value="Jeans">Jeans</option>
                                <option value="Shirts">Shirts</option>
                                <option value="Trousers">Trousers</option>
                                <option value="T shirts">T shirts</option>
                                <option value="Shorts">Shorts</option>
                                <option value="Bags">Bags</option>
                                <option value="Jackets">Jackets</option>
                                <option value="Beanies">Beanies</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Sweaters">Sweaters</option>
                                <option value="Overshirts">Overshirts</option>
                                <option value="Dresses">Dresses</option>
                            </select>
                        </div>
                        <div className="form-group form-group-change full-width">
                            <select onChange={handleChangeRegManufacturer('speciality')}  placeholder="Speciality" defaultValue={regManufacturerValues.speciality} required>
                                <option value="" disabled selected hidden>Speciality</option>
                                <option value="volvo">option</option>
                                <option value="volvo">option</option>
                                <option value="volvo">option</option>
                                <option value="volvo">option</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="number" onChange={handleChangeRegManufacturer('sku')} placeholder="Minimum order per SKU" value={regManufacturerValues.sku} required />
                        </div>
                        <div className="form-group form-group-change full-width">
                            <select onChange={handleChangeRegManufacturer('samplingTime')} placeholder="Sampling time in weeks" defaultValue={regManufacturerValues.samplingTime} required>
                                <option value="" disabled selected hidden>Sampling time in weeks</option>
                                <option value="option sampling1">option sampling1</option>
                                <option value="option sampling2">option sampling2</option>
                                <option value="option sampling3">option sampling3</option>
                                <option value="option sampling4">option sampling4</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="number" onChange={handleChangeRegManufacturer('dailyCapacity')} placeholder="Maximum daily capacity" value={regManufacturerValues.dailyCapacity} required />
                        </div>
                        <div className="form-group">
                            <input type="number" onChange={handleChangeRegManufacturer('monthlyCapacity')} placeholder="Maximum monthly capacity" value={regManufacturerValues.monthlyCapacity} required />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegManufacturer('terms')} placeholder="What are your standard payment terms?" value={regManufacturerValues.terms} required />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegManufacturer('importantClients')} placeholder="Can you state the names of 5 of your most important clients" value={regManufacturerValues.importantClients} required />
                        </div>
                        <div className="form-group form-group-change full-width">
                            <select onChange={handleChangeRegManufacturer('heading')} placeholder="Profile heading" defaultValue={regManufacturerValues.heading} required>
                                <option value="" disabled selected hidden>Profile heading</option>
                                <option value="volvo">option</option>
                                <option value="volvo">option</option>
                                <option value="volvo">option</option>
                                <option value="volvo">option</option>
                            </select>
                        </div>
                        <div className="form-group form-group-change full-width">
                            <select onChange={handleChangeRegManufacturer('factoryInfo')} placeholder="Please share as much information" defaultValue={regManufacturerValues.factoryInfo} required>
                                <option value="" disabled selected hidden>Please share as much information</option>
                                <option value="volvo">option</option>
                                <option value="volvo">option</option>
                                <option value="volvo">option</option>
                                <option value="volvo">option</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegManufacturer('skills')} placeholder="Add skills" value={regManufacturerValues.skills} required />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegManufacturer('addressLine1')} placeholder="First line of address" value={regManufacturerValues.addressLine1} required />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegManufacturer('addressLine2')} placeholder="Second line of address" value={regManufacturerValues.addressLine2} required />
                        </div>
                        <div className="form-group form-group-change">
                            <select onChange={handleChangeRegManufacturer('city')} placeholder="City" defaultValue={regManufacturerValues.city} required>
                                <option value="" disabled="" selected="" hidden="">City</option>
                                <option value="volvo">America</option>
                                <option value="saab">London</option>
                                <option value="mercedes">Canada</option>
                                <option value="audi">Austrailia</option>
                            </select>
                            <input type="text" onChange={handleChangeRegManufacturer('zipCode')} placeholder="Zip Code" value={regManufacturerValues.zipCode} />
                        </div>
                        <div className="form-group form-group-change full-width">
                            <select onChange={handleChangeRegManufacturer('country')} placeholder="Country" value={regManufacturerValues.country} required>
                                <option value="" disabled="" selected="" hidden="">Country</option>
                                <option value="volvo">America</option>
                                <option value="saab">London</option>
                                <option value="mercedes">Canada</option>
                                <option value="audi">Austrailia</option>
                            </select>
                        </div>
                        <div className="form-group form-group-change  upload">
                            <a href="">Please share any certifications and/or Audits that you have</a>
                            <label htmlFor="myCertification">Upload</label>
                            <input onChange={handleChangeRegManufacturer('certifications')} type="file" id="myCertification" name="certifications" accept="image/*" required />
                        </div>
                        <div className="form-group form-group-change  upload">
                            <a href="">Please share between 5-10 photos of your factory and your products for Brands to see.</a>
                            <label htmlFor="myMultiphoto">Upload</label>
                            <input  type="file" multiple onChange={handleChangeRegManufacturer('multiphotos')}  accept="image/*" id="myMultiphoto" name="multiphotos"  required/>
                        </div>
                        <div className="mid-heading">
                            <p>Register</p>
                        </div>
                        {/* Google Manufacturer Register */}
                        <div className="bottom-btn">
                            <GoogleLogin 
                                className="btn btn-block btn-primary"
                                clientId="562948689292-a88f1a8k0ofopafidnte67hm33iu8uj5.apps.googleusercontent.com"
                                render={renderProps => (
                                    <a href="" onClick={renderProps.onClick} className="btn-yellow border-not">Continue with Google</a>
                                    
                                )}
                                buttonText="SignUp"
                                onSuccess={responseGoogleManufacture}
                                onFailure={responseGoogleManufacture}
                                cookiePolicy={'single_host_origin'}
                                disabled={!regManufacturerValues.supplierName || !regManufacturerValues.year || !regManufacturerValues.employees || !regManufacturerValues.category 
                                || !regManufacturerValues.speciality || !regManufacturerValues.sku || !regManufacturerValues.samplingTime || !regManufacturerValues.dailyCapacity 
                                || !regManufacturerValues.monthlyCapacity || !regManufacturerValues.terms || !regManufacturerValues.importantClients || !regManufacturerValues.factoryInfo
                                || !regManufacturerValues.heading || !regManufacturerValues.skills || !regManufacturerValues.addressLine1 || !regManufacturerValues.addressLine2 || !regManufacturerValues.city
                                || !regManufacturerValues.zipCode || !regManufacturerValues.country || !regManufacturerValues.certifications || !regManufacturerValues.multiphotos
                                }
                            /> 
                            <p className="or">OR</p>
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegManufacturer('firstName')} placeholder="First name" value={regManufacturerValues.firstName} required />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegManufacturer('lastName')} placeholder="Last name" value={regManufacturerValues.lastName} required />
                        </div>
                        <div className="form-group">
                            <input type="email" onChange={handleChangeRegManufacturer('email')} placeholder="Email" value={regManufacturerValues.email} required />
                        </div>
                        <div className="form-group">
                            <input type="password" onChange={handleChangeRegManufacturer('password')} placeholder="Password" value={regManufacturerValues.password} required />
                        </div>
                        <div className="form-group">
                            <input type="password" onChange={handleChangeRegManufacturer('password1')} placeholder="Confirm Password" value={regManufacturerValues.password1} required />
                        </div>
                        <div className="bottom-btn">
                            <input type="submit" className="btn-yellow" value={regManufacturerValues.loading ? "Loading..." : "Register"} />
                        </div>
                        
                        <div className="term-conditions">
                            <p>By clicking the “Register” button, you are creating a Projekt Indigo account, and you agree to Projekt Indigo’s Terms of Use and Privacy Policy. </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>


    )
}

export default Navbar;