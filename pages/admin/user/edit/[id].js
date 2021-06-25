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

const EditUser = () => {

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

    const {firstName, lastName, email, category, city, zipCode, country} = userValues

    const loadUsers = async (id) => {
        try {
            let { data } = await axios.post(`/api/user/id`, {
                userId: id
            })
            console.log("data",data)
            let tempType ="";
            if(data.role === 0){
                tempType = "Brand"
            }
            else if(data.role === 1){
                tempType = "Manufacturer"
            }
            else if(data.role === 2){
                tempType = "Admin"
            }
            setRole(tempType)
            setUser(data);
            setUserValues({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                category: data.category,
                city: data.city,
                zipCode: data.zipCode,
                country: data.country,
                btnloading: false
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
            loadUsers(id)
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
            let { data } = await axios.put(`/api/update/user`, {
                userId: id,
                firstName,
                lastName,
                email,
                city,
                category,
                zipCode,
                country
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

    const [countryList] = useState([
        { label:"volvo ",value: "America"},
        { label:"saab",value: "London"},
        { label:"mercedes",value: "Canada"},
        { label:"audi",value: "Austrailia"},
    ])

    const showUpdateForm = () => (
        <form onSubmit={clickSubmit}>

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
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Product Category<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('category')} type="text" className="form-control" value={category} required/>
            </div>

            <div className="form-group">
                <label className="text-muted">City<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('city')} type="text" className="form-control" value={city} required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Zip Code<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('zipCode')} type="text" className="form-control" value={zipCode} required/>
            </div>

            <div className="form-group ">
                <label className="text-muted">Country<span style={{color:"red"}}> *</span></label>
                    <select required
                    onChange={handleChange('country')} 
                    className="form-control">
                        <option>Select Country</option> {
                            countryList.map(s =>(
                                (country === s.value ? 
                                    <option selected key={s.value} value={s.value}>
                                        {s.value}
                                    </option> :
                                    <option key={s.value} value={s.value}>{s.value}</option>)
                            ))
                        }                                                           
                    </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Role<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('role')} type="text" className="form-control" value={role} readOnly required/>
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
                        <h2 style={{textAlign:'center', color:"#106eea"}}>User Details</h2>
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

export default EditUser
