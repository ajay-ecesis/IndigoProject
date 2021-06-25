import {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import {toast} from 'react-toastify'
import {Context} from '../../context'

const Preloader = () => (
    <div className="preloader">
        <div id="mdiv">
            <div className="cdiv">
                <div className="rot"></div>
                <h4 className="lh">INDIGO</h4>
            </div>
        </div>
    </div>
)

const AdminRoute = ({children}) => {

    const {state:{user}} = useContext(Context);

    const [ok, setOk] = useState(false);

    // router
    const router = useRouter();

    useEffect(() => {
        fetchUser()
    },[])

    const fetchUser = async () => {
        try {
            if(user){
                if(user.role === 2){
                    setOk(true);
                    return;
                }
                else {
                    toast("Unauthorized access to this page");
                    router.push('/');
                }
            }
            else {
                const {data} = await axios.get('/api/auth');
                console.log("Brand Data", data);
                if(data.user.role === 2){
                    setOk(true);
                }
                else if(data.user.role === 1) {
                    router.push('/manufacturer/dashboard');
                } 
                else if(data.user.role === 0) {
                    router.push('/brand/dashboard');
                } 
                else {
                    //const {data} = await axios.get('/api/logout');
                    toast("Unauthorized access to this page");
                    router.push('/');
                } 
            }
            
        } catch(err){
            console.log(err);
            setOk(false);
            router.push('/')
        } 
    };

    return (
        <>
            {!ok ? Preloader() : <>{children}</>}
        </>
    )
}

export default AdminRoute