import { useState, useContext } from 'react'
import Head from 'next/head'
import AdminRoute from '../../../pagecomponents/routes/AdminRoute'
import AdminLayout from '../../../pagecomponents/layout/admin/AdminLayout'
import { useRouter } from 'next/router'
import {toast} from 'react-toastify'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import {Context} from '../../../context'

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const AddCategory = () => {

    const classes = useStyles();

    // state
    const {state:{user}} = useContext(Context);

    const router = useRouter()

    const [loading, setLoading] = useState(false);

    const [categoryName, setCategoryName] = useState('');

    const clickSubmit = async (e) => {
        e.preventDefault();
        try { 
            setLoading(true);  
            let { data } = await axios.post(`/api/create/category`, {
                categoryName, 
                addedBy: user._id
            })
            setLoading(false)
            toast.success("Category Successfully added.");
            setCategoryName('');
            router.push('/admin/categories');
        } catch (error) {
            console.log("error", error)
            setLoading(false);
            toast.error(error.response.data);
        }
    }

    const showAddForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Category Name<span style={{color:"red"}}> *</span></label>
                <input onChange={(e) => setCategoryName(e.target.value)} type="text" className="form-control" value={categoryName} required/>
            </div>
            <center>
                 <br/>
                 <button className="btn btn-outline-primary" disabled={loading}> {loading ? "Loading..." : "Add"} </button>
             </center>
        </form>
    )

    return (

        <AdminRoute>
            <AdminLayout>
                    <Head>
                        <meta charSet="UTF-8" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Indigo | Admin-Add Category</title>
                    </Head>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <h2 style={{textAlign:'center', color:"#106eea"}}>Add Category</h2>
                            {showAddForm()}
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

export default AddCategory
