import { useState, useEffect } from 'react'
import Head from 'next/head'
import AdminRoute from '../../../../pagecomponents/routes/AdminRoute'
import AdminLayout from '../../../../pagecomponents/layout/admin/AdminLayout'
import { useRouter } from 'next/router'
import {toast} from 'react-toastify'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const EditManufacturer = () => {

    const classes = useStyles();

    const router = useRouter()

    const { id } = router.query

    const [loading, setLoading] = useState(true);

    const [btnloading, setBtnloading] = useState(false);

    const [supplier, setSupplier] = useState('');

    const [ManufacturerValues, setManufacturerValues] = useState({
        userId:'',
        firstName:'',
        lastName:'',
        email:'',
        category:'',
        city:'',
        zipCode:'',
        country:'',
        addressLine1:'',
        addressLine2:'',
        dailyCapacity:'',
        monthlyCapacity:'',
        employees:'',
        factoryInfo:'',
        heading:'',
        importantClients:'',
        samplingTime:'',
        skills:'',
        sku:'',
        speciality:'',
        supplierName:'',
        terms:'',
        multiphotos:'',
        year:''  
    })

    const {
        userId,
        firstName,
        lastName,
        email,
        category,
        city,
        zipCode,
        country,
        addressLine1, 
        addressLine2, 
        dailyCapacity,
        monthlyCapacity,
        employees, 
        factoryInfo, 
        heading, 
        importantClients,
        samplingTime,
        skills,
        sku,
        speciality,
        supplierName,
        terms,
        year,
        certifications,
        multiphotos
    } = ManufacturerValues


    const loadManufacturer = async (id) => {
        try {
           
            let { data } = await axios.post(`/api/getManufacturerById`, {
                Id: id
            })
            setSupplier(data);
            if(data){
                setManufacturerValues({
                    userId: data.userId._id,
                    firstName: data.userId.firstName,
                    lastName: data.userId.lastName,
                    email: data.userId.email,
                    category: data.category,
                    city: data.userId.city,
                    zipCode: data.userId.zipCode,
                    country: data.userId.country,
                    manufacturerName:data.supplierName,
                    addressLine1: data.addressLine1,
                    addressLine2: data.addressLine2,
                    dailyCapacity: data.dailyCapacity,
                    monthlyCapacity: data.monthlyCapacity,
                    employees: data.employees,
                    factoryInfo: data.factoryInfo,
                    heading: data.heading,
                    importantClients: data.importantClients,
                    samplingTime:data.samplingTime,
                    skills:data.skills,
                    sku:data.sku,
                    speciality:data.speciality,
                    supplierName:data.supplierName,
                    terms:data.terms,
                    year:data.year,
                    certifications:data.certifications,
                    multiphotos:data.multiphotos
                })  
            }   
            setLoading(false);
        } catch (error) {
            console.log("error", error)
            setLoading(false);
            toast.error(error.response.data);
        }
    };

    useEffect(() => {
        if(id){
            loadManufacturer(id)
        }
    },[id])


    // handle change to reflect changes

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

    const handleChangeFile=(name)=>async(event)=>{
        if(name=='certifications')
        {
            let temp= await getBase64(event.target.files[0]);
            setManufacturerValues({...ManufacturerValues, [name]: temp})
        }
        if (name=='multiphotos')
        {
            let val = event.target.files;
            if(val.length >= 1){
                var baseData;
                var result = [];
                for(var i=0;i<val.length;i++){
                    baseData = await getBase64(val[i]);
                    result.push(baseData);
                }
                setManufacturerValues({...ManufacturerValues, multiphotos:result});
                //toast.success('Image Upload successfully.')
            }
            else {
                toast.error("Unable to upload images, because the field is empty!")
            }
        }
    }

    const handleChange = (name) =>async (event )=> {
        setBtnloading(false);
        setManufacturerValues({...ManufacturerValues, [name]: event.target.value})
    }

    const clickSubmit = async (e) => {
        e.preventDefault();
        try {
            setBtnloading(true);
            let { data } = await axios.put(`/api/update/manufacturer`, {
                Id: id,
                userId,
                firstName, lastName, email, category, city, zipCode,
                addressLine1, addressLine2, dailyCapacity, monthlyCapacity, employees, factoryInfo, heading, importantClients,samplingTime,skills,sku,speciality,supplierName,terms,year,
                certifications: JSON.stringify(certifications),
                multiphotos: JSON.stringify(multiphotos)
            })
            setBtnloading(false)
            toast.success("Successfully Updated");
            router.push('/admin/manufacturers');

        } catch (error) {
            console.log("error", error)
            setBtnloading(false);
            toast.error(error.response.data);
        }
    }

    const viewCertifications=(data,event)=>{
        event.preventDefault();
        const newtab = window.open();
        newtab.document.body.innerHTML = `<object data=${data} width=${window.screen.availWidth} height=${window.screen.availHeight}  />`
        console.log(data)
    }
    const checkmimetype = (data)=>{
        const mime = data.split(";")[0];
        const positive = ['data:image/jpeg','data:image/png','data:application/pdf']
        for(let i in positive){
            if(mime ==positive[i]){
                console.log("this is image or pdf")
                return true
            }
        } 
        

    }

    const showUpdateForm = () => (

        <form onSubmit={clickSubmit} enctype="multipart/form-data">

            <div className="row">
                <div className="col-md-6">       
                    <div className="form-group">
                        <label className="text-muted">supplierName<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('supplierName')} type="text" className="form-control" value={supplierName}  required/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Address Line 1<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('addressLine1')} type="text" className="form-control" value={addressLine1} required/>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Address Line 2<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('addressLine2')} type="text" className="form-control" value={addressLine2} required/>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Daily Capacity<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('dailyCapacity')} type="text" className="form-control" value={dailyCapacity} required/>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Monthly Capacity<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('monthlyCapacity')} type="text" className="form-control" value={monthlyCapacity} required/>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">No of Employees<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('employees')} type="text" className="form-control" value={employees} />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Factory Info<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('factoryInfo')} type="text" className="form-control" value={factoryInfo} required/>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Heading<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('heading')} type="text" className="form-control" value={heading}  required/>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Important Clients<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('importantClients')} type="text" className="form-control" value={importantClients}  required/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Sampling Time<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('samplingTime')} type="text" className="form-control" value={samplingTime}  required/>
                    </div>
               
                    <div className="form-group">
                        <label className="text-muted">Sku<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('sku')} type="text" className="form-control" value={sku}  required/>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Speciality<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('speciality')} type="text" className="form-control" value={speciality}  required/>
                    </div>
                
                    <div className="form-group">
                        <label className="text-muted">Terms<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('terms')} type="text" className="form-control" value={terms}  required/>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Year<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('year')} type="text" className="form-control" value={year}  required/>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Multiphotos<span style={{color:"red"}}> *</span></label>                 
                        {/* <img src={multiphotos} alt="multiphotos"  width="200px" height="150px" /> */}
                        {(multiphotos && multiphotos.length >0) && multiphotos.map((s,i) => (
                            <>
                                <img src={multiphotos[i]} style={{margin:'10px'}} alt="multiphotos" width="15%" height="auto" />
                            </>)
                        )}
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Upload new multiphotos<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChangeFile('multiphotos')} multiple type="file" accept="image/*" className="form-control"   />
                    </div>

                    {/* <img src={certifications} alt="certification" width="15%" height="auto" /> */}
                    {/* <button onClick={(event)=>viewCertifications(certifications,event)}>View certifications</button> */}
                   {checkmimetype(certifications) && <object data={`${certifications}`} width="200" height="200" ></object>}
                    <div>
                    <a href={`${certifications}` } download="certification" target="_blank">Download Document</a> <>&nbsp;</>
                    {checkmimetype(certifications) &&<a href=""  onClick={(event)=>viewCertifications(certifications,event)}>View Document</a>}
                    </div>
                    

                    <div className="form-group">
                        <label className="text-muted">Upload new Certification<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChangeFile('certifications')} type="file" className="form-control"    />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label className="text-muted">First Name<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('firstName')} type="text" className="form-control" value={firstName} required/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Last Name<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('lastName')} type="text" className="form-control" value={lastName} required/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('email')} type="email" className="form-control" value={email} readOnly required/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">City<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('city')} type="text" className="form-control" value={city} required/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Zip Code<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('zipCode')} type="text" className="form-control" value={zipCode} required/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Country<span style={{color:"red"}}> *</span></label>
                        <input onChange={handleChange('country')} type="text" className="form-control" value={country} required/>
                    </div>
                </div> 

            </div>

            <center>
                 <br/>
                 <button className="btn btn-outline-primary" disabled={btnloading}> {btnloading ? "Loading..." : "Update"} </button>
             </center>

        </form>
    )

    const showNotFound = () => (
        <div className="row">
            <div className="col-md-12 text-center">
                <h1 style={{color:'red'}}>Manufacturer Not Found!</h1>
            </div>
        </div>
    )

    return (
        <AdminRoute>
            <AdminLayout>
                    <Head>
                        <meta charSet="UTF-8" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Indigo | Admin-Edit Manufacturer</title>
                    </Head>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <h2 style={{textAlign:'center', color:"#106eea"}}>Manufacturer Details</h2>
                            {(!loading) && (supplier ? showUpdateForm() : showNotFound())}
                        </div>
                    </div>
                </div>
                <Backdrop className={classes.backdrop} open={loading} >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </AdminLayout>
        </AdminRoute>
    )
}

export default EditManufacturer
