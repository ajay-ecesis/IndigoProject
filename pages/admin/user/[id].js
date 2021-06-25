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

const UserDetails = () => {

    const classes = useStyles();

    const router = useRouter()

    const { id } = router.query

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState([]);

    const loadUsers = async (id) => {
        try {
            let { data } = await axios.post(`/api/user/id`, {
                userId: id/* '60d56e6483e21a3088798db9' */
            })
            console.log("data",data)
            setUser(data);
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

    const showUserDetails = () => (
        <div className="card mb-4 bord-line">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                        <p className="card-text"><b>First Name : </b>{user.firstName}</p>
                        <p className="card-text"><b>Last Name : </b>{user.lastName}</p>
                        <p className="card-text"><b>Email : </b>{user.email}</p>
                        <p className="card-text"><b>Product Category : </b>{user.category}</p>
                        <p className="card-text"><b>City : </b>{user.city}</p>
                        <p className="card-text"><b>zipCode : </b>{user.zipCode}</p>
                        <p className="card-text"><b>Country : </b>{user.country}</p>
                        <p className="card-text"><b>Type : </b>{user.status === 0 ? <span>Brand</span> : (user.status === 1 ? <span>Manufacturer</span> : <span>Admin</span>)}</p>
                        <p className="card-text"><b>Status : </b>{user.status === 0 ? <span>Active</span> : <span>Deleted</span>}</p>
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
                        <h2 style={{textAlign:'center', color:"#106eea"}}>User Details</h2>
                        {(!loading && user._id) && showUserDetails()}
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

export default UserDetails
