import Navbar from "../pagecomponents/Navbar";
import { client } from "../utils/sanity";
import Head from "next/head";
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'
import {useState} from 'react'
import axios from 'axios'
import Footer from '../pagecomponents/Footer';


const manufacture = (props)=>{

    // router
    const router = useRouter();

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
            //router.push('/signin');
            return window.location.replace("/signin");
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
                            <input onChange={handleChangeRegManufacturer('certifications')} type="file" id="myCertification" name="certifications" required />
                        </div>
                        <div className="form-group form-group-change  upload">
                            <a href="">Please share between 5-10 photos of your factory and your products for Brands to see.</a>
                            <label htmlFor="myMultiphoto">Upload</label>
                            <input  type="file" multiple onChange={handleChangeRegManufacturer('multiphotos')}  accept="image/*" id="myMultiphoto" name="multiphotos"  required/>
                        </div>
                        <div className="mid-heading">
                            <p>Register</p>
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
       
        <Footer />
        </>
    )
}

export default manufacture;


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