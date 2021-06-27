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

const brandDetails = () => {

    const classes = useStyles();

    const router = useRouter()

    const { id } = router.query

    const [loading, setLoading] = useState(true);

    const [brand, setBrand] = useState([]);

    const loadbrands = async (id) => {
        try {
            let { data } = await axios.post(`/api/getBrandById`, {
                brandId: id
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
                        <h3>Brand Details</h3>    
                        <p className="card-text"><b>Brand Name : </b>{brand.brandName}</p>
                        <p className="card-text"><b>Website Url: </b>{brand.url}</p>                 
                        <p className="card-text"><b>Product Category: </b>{brand.category.categoryName}</p>     
                        <p className="card-text"><b>LinkedIn : </b>{brand.linkedIn}</p>
                        <p className="card-text"><b>Market : </b>{brand.market.marketName}</p>      
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

    const showNotFound = () => (
        <div className="row">
            <div className="col-md-12 text-center">
                <h1 style={{color:'red'}}>Brand Not Found!</h1>
            </div>
        </div>
    )

    return (

        <AdminRoute>
            <AdminLayout>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                        <h2 style={{textAlign:'center', color:"#106eea"}}>brand Details</h2>
                        {(!loading) && (brand ? showbrandDetails() : showNotFound())}
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

export default brandDetails
