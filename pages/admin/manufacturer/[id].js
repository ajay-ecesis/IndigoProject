import { useState, useEffect } from 'react'
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
                setSupplier(data);
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
                 
                        <p className="card-text"><b>supplierName : </b>{supplier.supplierName}</p>
                        <p className="card-text"><b>Product Category : </b>{supplier.category}</p>
                        <p className="card-text"><b>year : </b>{supplier.year}</p>
                        <p className="card-text"><b>employees : </b>{supplier.employees}</p>
                        <p className="card-text"><b> SKU: </b>{supplier.sku}</p>
                        <p className="card-text"><b>speciality : </b>{supplier.speciality}</p>
                        <p className="card-text"><b>samplingTime : </b>{supplier.samplingTime}</p>
                        <p className="card-text"><b>dailyCapacity : </b>{supplier.dailyCapacity}</p>
                        <p className="card-text"><b> monthlyCapacity: </b>{supplier.monthlyCapacity}</p>
                        <p className="card-text"><b>terms : </b>{supplier.terms}</p>
                        <p className="card-text"><b>importantClients : </b>{supplier.importantClients}</p>
                        <p className="card-text"><b>factoryInfo : </b>{supplier.factoryInfo}</p>
                        <p className="card-text"><b> skills: </b>{supplier.skills}</p>
                        <p className="card-text"><b>addressLine1 : </b>{supplier.addressLine1}</p>
                        <p className="card-text"><b>addressLine2 : </b>{supplier.addressLine2}</p>
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
                        <img src={supplier.certifications} alt="certification" width="20%" height="auto" />
                        
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
