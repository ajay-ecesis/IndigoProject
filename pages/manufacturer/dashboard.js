import {useContext} from 'react'
import {Context} from '../../context'
import ManufacturerRoute from '../../pagecomponents/routes/ManufacturerRoute'
import ManufacturerLayout from '../../pagecomponents/layout/manufacturer/ManufacturerLayout'

const Dashboard = () => {

    const {state:{user}} = useContext(Context);
    
    return (
        <ManufacturerRoute>
            <ManufacturerLayout>
                <h1 className="jumbotron text-center square">
                    <pre>{user && `Hello ${user.firstName+" "+user.lastName}`} from Manufacturer</pre>
                </h1> 
            </ManufacturerLayout>      
        </ManufacturerRoute>
    )
}

export default Dashboard