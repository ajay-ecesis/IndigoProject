import {useContext} from 'react'
import {Context} from '../../context'
import BrandRoute from '../../pagecomponents/routes/BrandRoute'
import Navbar from '../../pagecomponents/Navbar'

const Dashboard = () => {

    const {state:{user}} = useContext(Context);
    
    return (
        <BrandRoute>
        {/* <Navbar /> */}
            <h1 className="jumbotron text-center square">
                <pre>{user && `Hello ${user.firstName+" "+user.lastName}`} from brand</pre>
            </h1> 
        </BrandRoute>
    )
}

export default Dashboard