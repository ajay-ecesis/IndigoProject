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

const EditCategory = () => {

    const classes = useStyles();

    const router = useRouter()

    const { id } = router.query

    const [loading, setLoading] = useState(true);

    const [btnloading,setBtnloading] = useState(false);

    const [category, setCategory] = useState([]);

    const [categoryName, setCategoryName] = useState('');

    const loadCategory = async (id) => {
        try {
            let { data } = await axios.post(`/api/get/category`, {
                categoryId: id,
            })
            setCategory(data);
            setCategoryName(data.categoryName);
            setLoading(false);

        } catch (error) {
            console.log("error", error)
            setLoading(false);
            toast.error(error.response.data);
        }
    };

    useEffect(() => {
        if(id){
            loadCategory(id)
        }
    },[id])

    const clickSubmit = async (e) => {
        e.preventDefault();
        try { 
            setBtnloading(true);
            let { data } = await axios.put(`/api/update/category`, {
                id,categoryName
            })
            setBtnloading(false)
            toast.success("Category Successfully Updated");
            router.push('/admin/categories');
        } catch (error) {
            console.log("error", error)
            setBtnloading(false);
            toast.error(error.response.data);
        }
    }

    const showUpdateForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Category Name<span style={{color:"red"}}> *</span></label>
                <input onChange={(e) => setCategoryName(e.target.value)} type="text" className="form-control" value={categoryName} required/>
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
                    <Head>
                        <meta charSet="UTF-8" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Indigo | Admin-Edit Category</title>
                    </Head>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <h2 style={{textAlign:'center', color:"#106eea"}}>Edit Category</h2>
                            {(!loading && category._id) && showUpdateForm()}
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

export default EditCategory
