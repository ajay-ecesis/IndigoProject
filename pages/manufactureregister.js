import Navbar from "../pagecomponents/Navbar";
import { client } from "../utils/sanity";
import Head from "next/head";
import {toast} from 'react-toastify'
import {useState} from 'react'
import axios from 'axios'
import Footer from '../pagecomponents/Footer';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const manufacture = (props) => {

    const [visibility,setvisibility] = useState('password');

    const [visibility1,setvisibility1] = useState('password');

    const [open, setOpen] = useState(false);

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
        certifications:[],
        multiphotos:[],
        loading: false
    })

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
                /* skills:regManufacturerValues.skills, */
                addressLine1:regManufacturerValues.addressLine1,
                addressLine2:regManufacturerValues.addressLine2,
                zipCode:regManufacturerValues.zipCode,
                city:regManufacturerValues.city,
                country:regManufacturerValues.country,
                employees:regManufacturerValues.employees,
                category:regManufacturerValues.category,
                /* speciality:regManufacturerValues.speciality, */
                sku:regManufacturerValues.sku,
                samplingTime:regManufacturerValues.samplingTime,
                /* dailyCapacity:regManufacturerValues.dailyCapacity, */
                certifications:JSON.stringify(regManufacturerValues.certifications),
                multiphotos:JSON.stringify(regManufacturerValues.multiphotos)
            })

            toast.success('Registration successfull, Please login to continue...');
            //router.push('/signin');
            setOpen(true);
            //return window.location.replace("/signin");
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
                certifications:[],
                multiphotos:[],
                loading:false
            }) 
            return window.scrollTo(0, 0);
          
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

    const getcontent = (string) => {
        return string.slice(1,-1)
    }
    const getmultiphotos = (photos) => {
       const temp =  JSON.parse(photos)
       return temp
    }

    const handleChangeRegManufacturer = (name) => async (event ) => {

        if(name === "year"){
            const message = event.target.value.slice(0, event.target.maxLength);
            setRegManufacturerValues({...regManufacturerValues, [name]:message, loading: false})
            return;
        }

        if(name === "certifications"){
            let val = event.target.files;
            if(val.length >= 1){
                var baseData1;
                var result1 = []
                if(regManufacturerValues.certifications.length){
                    result1 = [...regManufacturerValues.certifications]
                }
                
                for(var i=0;i<val.length;i++){
                    baseData1 = await getBase64(val[i]);
                    result1.push(baseData1);
                }
               
                setRegManufacturerValues({...regManufacturerValues, [name]:result1, loading:false});
            }
            else {
                toast.error("Unable to upload images, because the Certification field is empty!")
            } 
        }
        else if(name === "multiphotos"){
            let val = event.target.files;
            if(val.length >= 1){
                var baseData;
                var result = []
                if(regManufacturerValues.multiphotos.length){
                    result = [...regManufacturerValues.multiphotos]
                }
                
                for(var i=0;i<val.length;i++){
                    baseData = await getBase64(val[i]);
                    result.push(baseData);
                }
               
                setRegManufacturerValues({...regManufacturerValues, multiphotos:result, loading:false});
            }
            else {
                toast.error("Unable to upload images, because the Multiphotos field is empty!")
            }
        }
        else {
            setRegManufacturerValues({...regManufacturerValues, [name]:event.target.value, loading: false})
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

    const handleClick = name => event => {

        const value = event.target.value;

        if(name === "year"){
            if(value.length !== 4)
            {
                toast.error("Year should be in 4 digit only!")
                //setRegManufacturerValues({...regManufacturerValues, [name]:'', loading: false})
            }   
            return;   
        }

        let pwdRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,15}$");

        if(name === "password"){
            if(!pwdRegExp.test(value)) {
                toast.error('Password must contains min 6 and max 15 characters, including one uppercase, lowercase letters, special characters and numbers');
                //setRegManufacturerValues({...regManufacturerValues, [name]:'', loading: false})
            } 
            return;
        }

        let emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(name === "email"){
            if(!emailRegexp.test(value)) {
                toast.error('Please enter a valid Email!');
                //setRegManufacturerValues({...regManufacturerValues, [name]:'', loading: false})
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

    const removeCertification = (e,i) => {
        e.preventDefault();
        var img1 = [...regManufacturerValues.certifications];
        img1.splice(i,1);
        setRegManufacturerValues({...regManufacturerValues, certifications:img1, loading:false});
    }

    const removeImage = (e,i) => {
        e.preventDefault();
        var img = [...regManufacturerValues.multiphotos];
        img.splice(i,1);
        setRegManufacturerValues({...regManufacturerValues, multiphotos:img, loading:false});
    }


    return(
        <>
        <Head>
            <title>Register Manufacturer</title>
        </Head>
        <div className="main_banner_new about_us_banner expore_details_banner">
            <Navbar nav={props.nav}/>
        </div>
        
         <div className="uploadFile signin-popup registar-popup active">
            <div className="modal-bg active">
                <div className="modal_box">
                    <span><a href={props.prevUrl}><img src="/images/back-arrow.svg" alt="" /></a></span>
                    <div className="form-heading">
                        <h2>Welcome to Projekt Indigo</h2>
                        <p>Please tell us about your company</p>
                    </div>
                    {!open ? <form onSubmit={clickSubmitRegManufacturer}>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegManufacturer('supplierName')} placeholder="Supplier name *" value={regManufacturerValues.supplierName}  />
                        </div>
                        <div className="form-group">
                            <input type="number" onChange={handleChangeRegManufacturer('year')} onBlur={handleClick('year')} maxLength="4" placeholder="Year established *" value={regManufacturerValues.year} />
                        </div>
                        <div className="form-group form-group-change full-width">
                            <select onChange={handleChangeRegManufacturer('employees')} placeholder="Number of employees *" defaultValue={regManufacturerValues.employees}>
                                <option value="" disabled hidden>Number of employees *</option>
                                <option value="1 - 100">1 - 100</option>
                                <option value="100 - 300">100 - 300</option>
                                <option value="300 - 500">300 - 500</option>
                                <option value="500+">500+</option>
                            </select>
                        </div>
                        <div className="form-group form-group-change full-width">
                            <select onChange={handleChangeRegManufacturer('category')} placeholder="Product Category" defaultValue={regManufacturerValues.category}>
                                <option value="" disabled hidden>Product Category</option>
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
                     
                        <div className="form-group">
                            <input type="number" onChange={handleChangeRegManufacturer('sku')} placeholder="Minimum order per SKU *" value={regManufacturerValues.sku}  />
                        </div>
                        <div className="form-group form-group-change full-width">
                            <select onChange={handleChangeRegManufacturer('samplingTime')} placeholder="Sampling time in weeks" defaultValue={regManufacturerValues.samplingTime} >
                                <option value="" disabled hidden>Sampling time in weeks *</option>
                                <option value="2 Weeks">2 Weeks</option>
                                <option value="3 Weeks">3 Weeks</option>
                                <option value="4 Weeks">4 Weeks</option>
                            </select>
                        </div>
                      
                        <div className="form-group">
                            <input type="number" onChange={handleChangeRegManufacturer('monthlyCapacity')} placeholder="Maximum monthly capacity *" value={regManufacturerValues.monthlyCapacity} />
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" onChange={handleChangeRegManufacturer('terms')} placeholder="What are your standard payment terms?" value={regManufacturerValues.terms} />
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" onChange={handleChangeRegManufacturer('importantClients')} placeholder="Can you state the names of 5 of your most important clients" value={regManufacturerValues.importantClients} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegManufacturer('heading')} placeholder="Profile heading *" value={regManufacturerValues.heading} />
                        </div>
                      
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegManufacturer('factoryInfo')} placeholder="Please share as much information *" value={regManufacturerValues.factoryInfo} />
                        </div>
    
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegManufacturer('addressLine1')} placeholder="First line of address *" value={regManufacturerValues.addressLine1}  />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegManufacturer('addressLine2')} placeholder="Second line of address" value={regManufacturerValues.addressLine2} />
                        </div>
                        <div className="form-group form-group-change">
                            <select onChange={handleChangeRegManufacturer('city')} placeholder="City *" defaultValue={regManufacturerValues.city} >
                                <option value="" disabled="" hidden="">City *</option>
                                <option value="volvo">America</option>
                                <option value="saab">London</option>
                                <option value="mercedes">Canada</option>
                                <option value="audi">Austrailia</option>
                            </select>
                            <input type="text" onChange={handleChangeRegManufacturer('zipCode')} placeholder="Zip Code *" value={regManufacturerValues.zipCode} />
                        </div>
                        <div className="form-group form-group-change full-width">
                            <select onChange={handleChangeRegManufacturer('country')} placeholder="Country *" value={regManufacturerValues.country}>
                                <option value="" disabled=""  hidden="">Country *</option>
                                <option value="volvo">America</option>
                                <option value="saab">London</option>
                                <option value="mercedes">Canada</option>
                                <option value="audi">Austrailia</option>
                            </select>
                        </div>

                        <div className="form-group form-group-change  upload">
                            <a href="#">Please share any certifications and/or Audits that you have *</a>
                            <label htmlFor="myCertification">Upload</label>
                            <input onChange={handleChangeRegManufacturer('certifications')} type="file" multiple id="myCertification" name="certifications" />
                        </div>

                        <div style={{display:'grid',gridTemplateColumns:'auto auto auto'}}>
                            {regManufacturerValues.certifications.length>0 && regManufacturerValues.certifications.map((item,i)=>(
                                <div className="multi-image-area" key={i} >
                                    {/* <iframe width="60" height="auto" src={item}></iframe> */}
                                     {/* <img src={item}  /> */} <object data={item} width="60" height="auto"></object> 
                                    <a style={{display:'inline', cursor:'pointer'}} className="remove-multi-image" onClick={(e)=>removeCertification(e,i)}>&#215;</a>                                 
                                </div>  
                            ))
                            }
                        </div>

                        {/* {regManufacturerValues.certifications && <div>
                            <object data={getcontent(regManufacturerValues.certifications)} width="60" height="auto"></object>
                        </div>} */}

                        <div className="form-group form-group-change  upload">
                            <a href="#">Please share between 5-10 photos of your factory and your products for Brands to see. *</a>
                            <label htmlFor="myMultiphoto">Upload</label>
                            <input  type="file" multiple onChange={handleChangeRegManufacturer('multiphotos')}  accept="image/*" id="myMultiphoto" name="multiphotos" />
                        </div>
                        <div style={{display:'grid',gridTemplateColumns:'auto auto auto'}}>
                            {regManufacturerValues.multiphotos.length>0 && regManufacturerValues.multiphotos.map((item,i)=>(
                                <div className="multi-image-area" key={i} >
                                     <img src={item}  />
                                    <a style={{display:'inline', cursor:'pointer'}} className="remove-multi-image" onClick={(e)=>removeImage(e,i)}>&#215;</a>                                 
                                </div>  
                            ))
                            }
                        </div>
                        
                        <div className="mid-heading">
                            <p>Register</p>
                        </div>
                        
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegManufacturer('firstName')} placeholder="First name *" value={regManufacturerValues.firstName} />
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={handleChangeRegManufacturer('lastName')} placeholder="Last name *" value={regManufacturerValues.lastName} />
                        </div>
                        <div className="form-group">
                            <input type="email" onChange={handleChangeRegManufacturer('email')} onBlur={handleClick('email')} placeholder="Email *" value={regManufacturerValues.email}  />
                        </div>
                        <div className="form-group" style={{display:"flex",flexDirection:'row'}}>
                            <input type={visibility} onChange={handleChangeRegManufacturer('password')} onBlur={handleClick('password')} placeholder="Password *"  value={regManufacturerValues.password}  />
                            <input type="checkbox" onClick={(e)=>(togglevisibility('password'))} id="toggle" style={{width:'10%'}} hidden />
                            <label htmlFor="toggle">{visibility=='password' ?<VisibilityIcon /> :<VisibilityOffIcon />}</label>
                        </div>
                        <div className="form-group" style={{display:"flex",flexDirection:'row'}}>
                            <input type={visibility1} onChange={handleChangeRegManufacturer('password1')} placeholder="Confirm Password *" value={regManufacturerValues.password1} />
                            <input type="checkbox" onClick={(e)=>(togglevisibility('password1'))} id="toggle1" style={{width:'10%'}} hidden />
                            <label htmlFor="toggle1">{visibility1=='password' ?<VisibilityIcon /> :<VisibilityOffIcon />}</label>
                        </div>
                       
                        <div className="bottom-btn">
                            <input type="submit" className="btn-yellow" value={regManufacturerValues.loading ? "Loading..." : "Register"} />
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

export default manufacture;


export async function getServerSideProps(context) {
    let nav = await client.fetch(`*[_id=="navbar"]{navlinks[]->}`);

    let prevUrl = "/";
    if(context.req.headers.referer){
        prevUrl = context.req.headers.referer
    }
     
    return {
      props: {nav, prevUrl }, // will be passed to the page component as props
    }
  }