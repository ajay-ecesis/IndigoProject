import {useContext} from 'react'
import {Context} from '../../context'
import ManufacturerRoute from '../../pagecomponents/routes/ManufacturerRoute'
import Navbar from '../../pagecomponents/Navbar'

const Dashboard = () => {

    const {state:{user}} = useContext(Context);
    
    return (
        <ManufacturerRoute>
            <Navbar />
            <h1 className="jumbotron text-center square">
                <pre>{user && `Hello ${user.firstName+" "+user.lastName}`} from Manufacturer</pre>
            </h1> 
        </ManufacturerRoute>
    )
}

export default Dashboard