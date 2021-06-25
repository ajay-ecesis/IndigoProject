import { useState, useEffect } from 'react'
import AdminRoute from '../../../../pagecomponents/routes/AdminRoute'
import AdminLayout from '../../../../pagecomponents/routes/AdminLayout'
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

const EditBrand = () => {

    const classes = useStyles();

    const router = useRouter()

    const { id } = router.query

    const [loading, setLoading] = useState(true);

    const [btnloading, setBtnloading] = useState(false);

    const [user, setUser] = useState([]);

    const [role, setRole] = useState('');

    const [userValues, setUserValues] = useState({
        firstName:'',
        lastName:'',
        email:'',
        category:'',
        city:'',
        zipCode:'',
        country:'',
    })

    const {brandName, linkedIn, market,url} = userValues

    const loadManufacturer = async (id) => {
        try {
           
            let { data } = await axios.post(`/api/getBrandById`, {
                brandId: id
            })
            console.log("data",data)
            let tempType ="";
            
            setUser(data);
            setUserValues({
                brandName: data.brandName,
                linkedIn: data.linkedIn,
              
                market: data.market,
                url: data.url,            

            })
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

    const handleChange = name => event => {
        setBtnloading(false);
        setUserValues({...userValues, [name]: event.target.value})
    }

    const clickSubmit = async (e) => {
        e.preventDefault();
        try { 
            setBtnloading(true);

            
            let { data } = await axios.put(`/api/update/brand`, {
                Id: id,
                brandName, linkedIn, market,employees, url
            })
            setBtnloading(false)
            console.log("Data", data);
            toast.success("Successfully Updated");
            router.push('/admin/users');

        } catch (error) {
            console.log("error", error)
            setBtnloading(false);
            toast.error(error.response.data);
        }
    }

 

    const showUpdateForm = () => (
        <form onSubmit={clickSubmit}>

            <div className="form-group">
                <label className="text-muted">Brand Name<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('brandName')} type="text" className="form-control" value={brandName} required/>
            </div>

            <div className="form-group"> 
                <label className="text-muted">linkedIn<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('linkedIn')} type="text" className="form-control" value={linkedIn} required/>
            </div>

           

            <div className="form-group">
                <label className="text-muted">market<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('market')} type="text" className="form-control" value={market} required/>
            </div>
      
               


            





          
     
            <center>
                 <br/>
                 <button  className="btn btn-outline-primary" disabled={btnloading}> {btnloading ? "Loading..." : "Update"} </button>
             </center>

        </form>
    )

    return (

        <AdminRoute>
            <AdminLayout>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                        <h2 style={{textAlign:'center', color:"#106eea"}}>Brand Details</h2>
                        {(!loading && user._id) && showUpdateForm()}
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

export default EditBrand
