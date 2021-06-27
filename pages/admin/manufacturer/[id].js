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

    const [brand, setBrand] = useState([]);

    const loadbrands = async (id) => {
        try {
            let { data } = await axios.post(`/api/getManufacturerById`, {
                Id: id
            })
            console.log("data",data)
            setBrand(data);
            setLoading(false);

        } catch (error) {
            console.log("error", error)
            setLoading(false);
            toast.error(error.response.data);
        }
    };

    useEffect(() => {
        if(id){
            loadbrands(id)
        }
    },[id])

    const showbrandDetails = () => (
        <div className="card mb-4 bord-line">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Manufacturer Details</h3>
                        <p className="card-text"><b>supplierName : </b>{brand.supplierName}</p>
                        <p className="card-text"><b>year : </b>{brand.year}</p>
                        <p className="card-text"><b>employees : </b>{brand.employees}</p>
                        <p className="card-text"><b> SKU: </b>{brand.sku}</p>
                        <p className="card-text"><b>speciality : </b>{brand.speciality}</p>
                        <p className="card-text"><b>samplingTime : </b>{brand.samplingTime}</p>
                        <p className="card-text"><b>dailyCapacity : </b>{brand.dailyCapacity}</p>
                        <p className="card-text"><b> monthlyCapacity: </b>{brand.monthlyCapacity}</p>
                        <p className="card-text"><b>terms : </b>{brand.terms}</p>
                        <p className="card-text"><b>importantClients : </b>{brand.importantClients}</p>
                        <p className="card-text"><b>factoryInfo : </b>{brand.factoryInfo}</p>
                        <p className="card-text"><b> skills: </b>{brand.skills}</p>
                        <p className="card-text"><b>addressLine1 : </b>{brand.addressLine1}</p>
                        <p className="card-text"><b>addressLine2 : </b>{brand.addressLine2}</p>
                    </div>
                    <div className="col-md-6">
                        <h3>User Details</h3>
                        <p className="card-text"><b>First Name : </b>{brand.userId.firstName}</p>
                        <p className="card-text"><b>Last Name : </b>{brand.userId.lastName}</p>
                        <p className="card-text"><b>Email : </b>{brand.userId.email}</p>
                        <p className="card-text"><b>City: </b>{brand.userId.city}</p>  
                        <p className="card-text"><b>Zip Code: </b>{brand.userId.zipCode}</p>     
                        <p className="card-text"><b>Country: </b>{brand.userId.country}</p>
                        <p className="card-text"><b>Status: </b>{brand.userId.status === 0 ? 'Active' : "Deactivated"}</p>                
                    </div>
                </div>
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
                        {(!loading && brand._id) && showbrandDetails()}
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
