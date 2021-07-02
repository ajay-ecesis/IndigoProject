import {useEffect, useState} from 'react'
import axios from 'axios'
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

const ManufacturerRoute = ({children}) => {

    // state
    const [ok, setOk] = useState(false);

    useEffect(() => {
        fetchUser()
    },[])

    const fetchUser = async () => {
        try {
            const {data} = await axios.get('/api/auth');
            console.log("Man Data", data);
            //made correction old->data.role
            if(data.user.role === 1){
                setOk(true);
            }else {
                const {data} = await axios.get('/api/logout');
                toast(data.message);
                return window.location.replace("/signin");
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

export default ManufacturerRoute