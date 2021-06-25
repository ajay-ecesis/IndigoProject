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

const EditManufacturer = () => {

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

    const {addressLine1, addressLine2, dailyCapacity,employees, factoryInfo, heading, importantClients,samplingTime,skills,sku,speciality,supplierName,terms,year} = userValues

    const loadManufacturer = async (id) => {
        try {
           
            let { data } = await axios.post(`/api/getManufacturerById`, {
                userId: id
            })
            console.log("data",data)
            let tempType ="";
            
            setUser(data);
            setUserValues({
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2,
              
                dailyCapacity: data.dailyCapacity,
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
                year:data.year

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
            let { data } = await axios.put(`/api/update/manufacturer`, {
                Id: id,
                addressLine1, addressLine2, dailyCapacity,employees, factoryInfo, heading, importantClients,samplingTime,skills,sku,speciality,supplierName,terms,year
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
                <label className="text-muted">Address Line 1<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('addressLine1')} type="text" className="form-control" value={addressLine1} required/>
            </div>

            <div className="form-group">
                <label className="text-muted">addressLine2<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('addressLine2')} type="text" className="form-control" value={addressLine2} required/>
            </div>

           

            <div className="form-group">
                <label className="text-muted">dailyCapacity<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('dailyCapacity')} type="text" className="form-control" value={dailyCapacity} required/>
            </div>
      
               

            <div className="form-group">
                <label className="text-muted">employees<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('employees')} type="text" className="form-control" value={employees} required/>
            </div>

            <div className="form-group">
                <label className="text-muted">factoryInfo<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('factoryInfo')} type="text" className="form-control" value={factoryInfo} required/>
            </div>

            

            <div className="form-group">
                <label className="text-muted">heading<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('heading')} type="text" className="form-control" value={heading}  required/>
            </div>

            <div className="form-group">
                <label className="text-muted">importantClients<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('importantClients')} type="text" className="form-control" value={importantClients}  required/>
            </div>



            <div className="form-group">
                <label className="text-muted">importantClients<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('importantClients')} type="text" className="form-control" value={importantClients}  required/>
            </div>
            <div className="form-group">
                <label className="text-muted">samplingTime<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('samplingTime')} type="text" className="form-control" value={samplingTime}  required/>
            </div>

          
            <div className="form-group">
                <label className="text-muted">sku<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('sku')} type="text" className="form-control" value={sku}  required/>
            </div>

            <div className="form-group">
                <label className="text-muted">speciality<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('speciality')} type="text" className="form-control" value={speciality}  required/>
            </div>
            <div className="form-group">
                <label className="text-muted">supplierName<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('supplierName')} type="text" className="form-control" value={supplierName}  required/>
            </div>
            <div className="form-group">
                <label className="text-muted">terms<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('terms')} type="text" className="form-control" value={terms}  required/>
            </div>
            <div className="form-group">
                <label className="text-muted">year<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('year')} type="text" className="form-control" value={year}  required/>
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
                        <h2 style={{textAlign:'center', color:"#106eea"}}>Manufacturer Details</h2>
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

export default EditManufacturer
