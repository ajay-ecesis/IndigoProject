import { useState, useEffect } from 'react'
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

const EditMarket = () => {

    const classes = useStyles();

    const router = useRouter()

    const { id } = router.query

    const [loading, setLoading] = useState(true);

    const [btnloading,setBtnloading] = useState(false);

    const [market, setMarket] = useState([]);

    const [marketName, setMarketName] = useState('');

    const loadMarket = async (id) => {
        try {
            let { data } = await axios.post(`/api/get/market`, {
                marketId: id,
            })
            setMarket(data);
            setMarketName(data.marketName);
            setLoading(false);

        } catch (error) {
            console.log("error", error)
            setLoading(false);
            toast.error(error.response.data);
        }
    };

    useEffect(() => {
        if(id){
            loadMarket(id)
        }
    },[id])

    const clickSubmit = async (e) => {
        e.preventDefault();
        try { 
            setBtnloading(true);
            let { data } = await axios.put(`/api/update/market`, {
                id,marketName
            })
            setBtnloading(false)
            toast.success("Market Successfully Updated");
            router.push('/admin/markets');
        } catch (error) {
            console.log("error", error)
            setBtnloading(false);
            toast.error(error.response.data);
        }
    }

    const showUpdateForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Market Name<span style={{color:"red"}}> *</span></label>
                <input onChange={(e) => setMarketName(e.target.value)} type="text" className="form-control" value={marketName} required/>
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
                            <h2 style={{textAlign:'center', color:"#106eea"}}>Edit Market</h2>
                            {(!loading && market._id) && showUpdateForm()}
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

export default EditMarket
