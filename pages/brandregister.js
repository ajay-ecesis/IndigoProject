import Navbar from "../pagecomponents/Navbar";
import { client } from "../utils/sanity";
import Head from "next/head";
import {toast} from 'react-toastify'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Footer from '../pagecomponents/Footer';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
//import PasswordRoute from '../pagecomponents/routes/PasswordRoute';

const brandregister = (props) => {

    const [categories, setCategories] = useState([]);
    const [markets, setMarkets] = useState([]);
    const [visibility,setvisibility] = useState('password');
    const [visibility1,setvisibility1] = useState('password');

    const [open, setOpen] = useState(false);

    const loadCategory = async() => {
        try {
            const {data} = await axios.get('/api/get/active/categories');
            setCategories(data);
        } catch (error) {
            console.log("Error", error);
            toast.error(error.response.data);
        }
    }

    const loadMarket = async() => {
        try {
            const {data} = await axios.get('/api/get/active/markets');
            setMarkets(data);
        } catch (error) {
            console.log("Error", error);
            toast.error(error.response.data);
        }
    }

    useEffect(() => {
            loadCategory();
            loadMarket();
    }, [])

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
            setOpen(true);
            //push('/signin'); 
            //return window.location.replace("/signin");
            setRegBrandValues({...regBrandValues, firstName:'', lastName:'', email:'', password:'', password1:'',brandName:'', url:'', category:'', market:'', linkedIn:'', zipCode:'', city:'', country:'', loading:false})
         
        } catch (error) {
            console.log("Error", error);
            setRegBrandValues({...regBrandValues, loading:false});
            toast.error(error.response.data);
        }
    }

    const handleClick = name => event => {

        const value = event.target.value;

        let pwdRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,15}$");

        if(name === "password"){
            if(!pwdRegExp.test(value)) {
                toast.error('Password must contains min 6 and max 15 characters, including one uppercase, lowercase letters, special characters and numbers');
                //setRegBrandValues({...regBrandValues, [name]:'', loading: false})
            } 
            return;
        }
    }

    const showSuccessfullMsg = () => {
        if(open){
            return (
                <>
                    <div className="form-heading">
                        <h6>Registration Successfull, Please <a style={{textDecoration:'underline', color:'#106eea'}} href="/signin">Login</a> to continue.</h6>
                    </div>
            </>
            )
        }
    }

    const togglevisibility = (field)=>{
        switch (field) {
            case 'password1':
                if(visibility1=='password'){
                    setvisibility1('text')
                }
                if(visibility1=='text') {
                    setvisibility1('password')
                }
                break;
        
            case 'password':
                if(visibility == 'password'){
                    setvisibility('text')
                }
                if(visibility == 'text')
                setvisibility('password')
                break;
        }
    }

    return(
        <>
         <Head>
            <title>Register Brand</title>
        </Head>
        <div className="main_banner_new about_us_banner expore_details_banner">
            <Navbar nav={props.nav}/>
        </div>
      
         <div className="signin-popup registar-popup_new registar-popup active">
            <div className="modal-bg active">
                <div className="modal_box">
                    <span><a href={props.prevUrl}><img src="/images/back-arrow.svg" alt="" /></a></span>
                    <div className="form-heading">
                        <h2>Welcome to Projekt Indigo</h2>
                        <p>Please tell us about your brand</p>
                    </div>
                    {!open ? <form onSubmit={clickSubmitRegBrand}>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegBrand('brandName')} placeholder="Brand name *" value={regBrandValues.brandName} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegBrand('url')} placeholder="Website url" value={regBrandValues.url} />
                        </div>
                        <div className="form-group form-group-change full-width">
                            <select
                                onChange={handleChangeRegBrand('category')}
                            >
                                <option>Product Category</option>{
                                    categories && categories.map((s) => (
                                        <option key={s._id} value={s._id}>{s.categoryName}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group form-group-change full-width">
                            {/* <input type="text" onChange={handleChangeRegBrand('market')} placeholder="Market" value={regBrandValues.market} required /> */}
                            <select
                                onChange={handleChangeRegBrand('market')}
                            >
                                <option>Market</option>{
                                    markets && markets.map((s) => (
                                        <option key={s._id} value={s._id}>{s.marketName}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegBrand('linkedIn')} placeholder="LinkedIn" value={regBrandValues.linkedIn} />
                        </div>
                        <div className="form-group form-group-change">
                            <select onChange={handleChangeRegBrand('city')} defaultValue={regBrandValues.city} placeholder="City">
                                <option value="" disabled  hidden>City *</option>
                                <option value="volvo">America</option>
                                <option value="saab">London</option>
                                <option value="mercedes">Canada</option>
                                <option value="audi">Austrailia</option>
                            </select>
                            <input type="text" onChange={handleChangeRegBrand('zipCode')} placeholder="Zip Code *" value={regBrandValues.zipCode}/>
                        </div>
                        <div className="form-group form-group-change full-width">
                            <select onChange={handleChangeRegBrand('country')} placeholder="Country" defaultValue={regBrandValues.country}>
                                <option value="" disabled  hidden>Country *</option>
                                <option value="volvo">America</option>
                                <option value="saab">London</option>
                                <option value="mercedes">Canada</option>
                                <option value="audi">Austrailia</option>
                            </select>
                        </div>
                        <div className="mid-heading">
                            <p>Register</p>
                        </div>
                        
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegBrand('firstName')} placeholder="First name *" value={regBrandValues.firstName} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegBrand('lastName')} placeholder="Last name *" value={regBrandValues.lastName} />
                        </div>
                        <div className="form-group">
                            <input type="email" onChange={handleChangeRegBrand('email')} placeholder="Email *" value={regBrandValues.email} />
                        </div>
                        <div className="form-group" style={{display:"flex",flexDirection:'row'}}>
                            <input type={visibility} onChange={handleChangeRegBrand('password')} onBlur={handleClick('password')} placeholder="Password *" value={regBrandValues.password} />
                            <input type="checkbox" onClick={(e)=>(togglevisibility('password'))} id="toggle" style={{width:'10%'}} hidden />
                            <label htmlFor="toggle">{visibility=='password' ?<VisibilityIcon /> :<VisibilityOffIcon />}</label>
                        </div>
                        <div className="form-group" style={{display:"flex",flexDirection:'row'}}>
                            <input type={visibility1} onChange={handleChangeRegBrand('password1')} placeholder="Confirm Password *" value={regBrandValues.password1} />
                            <input type="checkbox" onClick={(e)=>(togglevisibility('password1'))} id="toggle1" style={{width:'10%'}} hidden />
                            <label htmlFor="toggle1">{visibility1=='password' ?<VisibilityIcon /> :<VisibilityOffIcon />}</label>
                        </div>
                        
                        <div className="bottom-btn">
                            <input id="forUpload" type="submit" className="btn-yellow" value={regBrandValues.loading ? 'Loading...' : "Register"} />
                        </div>
                        
                        <div className="term-conditions">
                            <p>By clicking the “Register” button, you are creating a Projekt Indigo account, and you agree to Projekt Indigo’s Terms of Use and Privacy Policy. </p>
                        </div>
                    </form>
                    
                    : showSuccessfullMsg()}
                </div>
            </div>
        </div>
       
        <Footer />
        </>
    )
}

export default brandregister;



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