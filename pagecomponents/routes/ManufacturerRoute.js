import {useEffect, useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

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

const ManufacturerRoute = ({children}) => {

    // state
    const [ok, setOk] = useState(false);

    // router
    const router = useRouter();

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
                router.push('/');
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

export default ManufacturerRoute