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

const EditBrand = () => {

    const classes = useStyles();

    const router = useRouter()

    const { id } = router.query

    const [loading, setLoading] = useState(true);

    const [btnloading, setBtnloading] = useState(false);

    const [brand, setBrand] = useState('');

    const [categories, setCategories] = useState([]);
    
    const [markets, setMarkets] = useState([]);

    const [brandValues, setBrandValues] = useState({
        userId:'',
        firstName:'',
        lastName:'',
        email:'',
        category:'',
        city:'',
        zipCode:'',
        country:'',
        brandName:'',
        linkedIn:'',
        market:'',
        category:'',
        url:'',
    })
            
    const {userId, firstName, lastName, email, category, city, zipCode, country, brandName, linkedIn, market,url} = brandValues

    const loadBrand = async (id) => {
        try {
           
            let { data } = await axios.post(`/api/getBrandById`, {
                brandId: id
            })
            setBrand(data);
            if(data){
                setBrandValues({
                    userId: data.userId._id,
                    firstName: data.userId.firstName,
                    lastName: data.userId.lastName,
                    email: data.userId.email,
                    category: data.category ? data.category._id : '',
                    market: data.market ? data.market._id : '',
                    city: data.userId.city,
                    zipCode: data.userId.zipCode,
                    country: data.userId.country,
                    brandName: data.brandName,
                    linkedIn: data.linkedIn, 
                    url: data.url,
                })
            }
            setLoading(false);
        } catch (error) {
            console.log("error", error)
            setLoading(false);
            toast.error(error.response.data);
        }
    };

    const loadCategory = async() => {
        try {
            const {data} = await axios.get('/api/get/active/categories');
            setCategories(data);
        } catch (error) {
            console.log("Error", error);
            toast.error(error.response.data);
        }
    }

    const loadMarket = async() => {
        try {
            const {data} = await axios.get('/api/get/active/markets');
            setMarkets(data);
        } catch (error) {
            console.log("Error", error);
            toast.error(error.response.data);
        }
    }

    useEffect(() => {
        loadCategory();
        loadMarket();
    }, [])

    useEffect(() => {
        if(id){
            loadBrand(id)
        }
    },[id])

    const handleChange = name => event => {
        setBtnloading(false);
        setBrandValues({...brandValues, [name]: event.target.value})
    }

    const clickSubmit = async (e) => {
        e.preventDefault();
        try { 
            setBtnloading(true);
            let { data } = await axios.put(`/api/update/brand`, {
                Id: id, 
                userId,
                firstName, lastName, email, category, city, zipCode, country,
                brandName, linkedIn, market, url
            })
            setBtnloading(false)
            console.log("Data", data);
            toast.success("Successfully Updated");
            router.push('/admin/brands');

        } catch (error) {
            console.log("error", error)
            setBtnloading(false);   
            toast.error(error.response.data);
        }
    }

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
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} readOnly required/>
            </div>
            <div className="form-group">
                <label className="text-muted">City<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('city')} type="text" className="form-control" value={city} required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Zip Code<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('zipCode')} type="text" className="form-control" value={zipCode} required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Country<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('country')} type="text" className="form-control" value={country} required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Brand Name<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('brandName')} type="text" className="form-control" value={brandName} required/>
            </div>
            
            <div className="form-group"> 
                <label className="text-muted">Website Url</label>
                <input onChange={handleChange('url')} type="text" className="form-control" value={url} />
            </div>
            <div className="form-group">
                <label className="text-muted">Product Category</label>
                <select 
                    onChange={handleChange('category')} 
                    className="form-control"
                >
                    <option >Select Product Category</option> { 
                        categories && categories.map((s) => (
                        (category === s._id ? <option selected key={s._id} value={s._id}>{s.categoryName}
                        </option> : <option key={s._id} value={s._id}>{s.categoryName}
                        </option>)                         
                        ))}                          
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Market</label>
                <select 
                    onChange={handleChange('market')} 
                    className="form-control"
                >
                    <option >Select Market</option> { 
                        markets && markets.map((c) => (
                        (market === c._id ? <option selected key={c._id} value={c._id}>{c.marketName}
                        </option> : <option key={c._id} value={c._id}>{c.marketName}
                        </option>)                         
                        ))}                          
                </select>
            </div> 
            <div className="form-group"> 
                <label className="text-muted">linkedIn</label>
                <input onChange={handleChange('linkedIn')} type="text" className="form-control" value={linkedIn}/>
            </div>      
            <center>
                 <br/>
                 <button className="btn btn-outline-primary" disabled={btnloading}> {btnloading ? "Loading..." : "Update"} </button>
             </center>
        </form>
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
                    <Head>
                        <meta charSet="UTF-8" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Indigo | Admin-Edit Brand</title>
                    </Head>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                        <h2 style={{textAlign:'center', color:"#106eea"}}>Brand Details</h2>
                        {(!loading) && (brand ? showUpdateForm() : showNotFound())}
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
