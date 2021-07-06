import {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Context} from '../../context'
//import PasswordRoute from './PasswordRoute';

const Preloader = () => (
    <div className="preloader">
        <div id="mdiv">
            <div className="cdiv">
                <div className="rot"></div>
                    <h4 className="lh"><div className="circle pulse blue">
                    <img className="loader-img" src="/images/new_logo.svg" alt="" />
                </div></h4>
            </div>
        </div>
    </div>
)

const BrandRoute = ({children}) => {

    const {state:{user}, dispatch} = useContext(Context);

    const [ok, setOk] = useState(false);

    useEffect(() => {
        fetchUser()
    },[])

    const fetchUser = async () => {
        try {
            if(user !== null){
                if(user.role === 0){
                    setOk(true);
                    return;
                }
                else {
                    const {data} = await axios.get('/api/logout');
                    toast("Unauthorized access to this page");
                    return window.location.replace("/signin");
                }
            }
            else {
                const {data} = await axios.get('/api/auth');
                
                if(data.user.role === 0){
                    dispatch({
                        type:"LOGIN",
                        payload: data.user
                    })
                    setOk(true);
                }
                else {
                    const {data} = await axios.get('/api/logout');
                    toast("Unauthorized access to this page");
                    return window.location.replace("/signin");
                } 
            }
            
        } catch(err){
            console.log(err);
            setOk(false);
            return window.location.replace("/signin");
        } 
    };

    return (
        <>
            {!ok ? Preloader() : <>{children}</>}
        </>
    )
}

export default BrandRoute