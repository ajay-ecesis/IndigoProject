import { useState, useEffect } from 'react'
import Head from 'next/head'
import AdminRoute from '../../../pagecomponents/routes/AdminRoute'
import AdminLayout from '../../../pagecomponents/layout/admin/AdminLayout'
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

const manufacturerDetails = () => {

    const classes = useStyles();

    const router = useRouter()

    const { id } = router.query

    const [loading, setLoading] = useState(true);

    const [supplier, setSupplier] = useState([]);

    const loadManufacturer = async (id) => {
        try {
            let { data } = await axios.post(`/api/getManufacturerById`, {
                Id: id
            })
            if(!data){
                setSupplier(null);
            }
            else {
                console.log("Data",data);
                setSupplier(data);
                console.log(data)
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


    const showbrandDetails = () => (
        <div className="card mb-4 bord-line">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Manufacturer Details</h3>
                        <p className="card-text"><b>First Name : </b>{supplier.userId.firstName}</p>
                        <p className="card-text"><b>Last Name : </b>{supplier.userId.lastName}</p>
                        <p className="card-text"><b>Email : </b>{supplier.userId.email}</p>
                        <p className="card-text"><b>City: </b>{supplier.userId.city}</p>  
                        <p className="card-text"><b>Zip Code: </b>{supplier.userId.zipCode}</p>     
                        <p className="card-text"><b>Country: </b>{supplier.userId.country}</p>
                        <p className="card-text"><b>Status: </b>{supplier.userId.status === 0 ? 'Active' : "Deactivated"}</p>                
                 
                        <p className="card-text"><b>Supplier name : </b>{supplier.supplierName}</p>
                        <p className="card-text"><b>Product Category : </b>{supplier.category}</p>
                        <p className="card-text"><b>Year established : </b>{supplier.year ? supplier.year : '-'}</p>
                        <p className="card-text"><b>Number of employees : </b>{supplier.employees}</p>
                        <p className="card-text"><b>SKU: </b>{supplier.sku}</p>
                       {/*  <p className="card-text"><b>speciality : </b>{supplier.speciality}</p> */}
                        <p className="card-text"><b>Sampling time in weeks : </b>{supplier.samplingTime}</p>
                        {/* <p className="card-text"><b>dailyCapacity : </b>{supplier.dailyCapacity}</p> */}
                        <p className="card-text"><b>Maximum monthly capacity: </b>{supplier.monthlyCapacity}</p>
                        <p className="card-text"><b>What are your standard payment terms? : </b>{supplier.terms ? supplier.terms :'-'}</p>
                        <p className="card-text"><b>Can you state the names of 5 of your most important clients : </b>{supplier.importantClients ? supplier.importantClients : '-'}</p>
                        <p className="card-text"><b>Profile heading : </b>{supplier.heading}</p>
                        <p className="card-text"><b>Please share as much information : </b>{supplier.factoryInfo}</p>
                        {/* <p className="card-text"><b>skills: </b>{supplier.skills}</p> */}
                        <p className="card-text"><b>First line of address : </b>{supplier.addressLine1}</p>
                        <p className="card-text"><b>Second line of address : </b>{supplier.addressLine2 ? supplier.addressLine2 : '-'}</p>
                    </div>
                    
                    <div className="col-md-6">
                        <h5>Multiphotos</h5>
                        {(supplier.multiphotos && supplier.multiphotos.length >0) && supplier.multiphotos.map((s,i) => (
                            <>
                                <img src={supplier.multiphotos[i]} style={{margin:'10px'}} alt="multiphotos" width="20%" height="auto" />
                            </>)
                        )}
                        <hr/>
                        <h5>Certification</h5>
                        {(supplier.certifications && supplier.certifications.length >0) && supplier.certifications.map((s,i) => (
                            <>
                                <object data={`${supplier.certifications[i]}`} width="20%" height="auto" ></object>
                            </>)
                        )}
                        {/* <img src={supplier.certifications} alt="certification" width="20%" height="auto" /> */}
                      {/*   {checkmimetype(supplier.certifications) && <object data={`${supplier.certifications}`} width="20%" height="auto" ></object>} */}
                        <div>
                        {/* <a href={`${supplier.certifications}` } download="certification" target="_blank">Download Document</a> <>&nbsp;</>
                         {checkmimetype(supplier.certifications) &&<a href=""  onClick={(event)=>viewCertifications(supplier.certifications,event)}>View Document</a>} */}
                         </div>
                    </div>
                    
                </div>
            </div>
        </div>
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
                        <title>Indigo | Admin-Manufacturer Details</title>
                    </Head>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                        <h2 style={{textAlign:'center', color:"#106eea"}}>Manufacturer Details</h2>
                        {(!loading) && (supplier ? showbrandDetails(): showNotFound())}
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

export default manufacturerDetails
