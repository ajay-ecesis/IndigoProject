import {useContext} from 'react'
import {Context} from '../../context'
import BrandRoute from '../../pagecomponents/routes/BrandRoute'
import BrandLayout from '../../pagecomponents/layout/brand/BrandLayout'

const Dashboard = () => {

    const {state:{user}} = useContext(Context);
    
    return (
        <BrandRoute>
            <BrandLayout>
                <h1 className="jumbotron text-center square">
                    <pre>{user && `Hello ${user.firstName+" "+user.lastName}`} from brand</pre>
                </h1> 
            </BrandLayout>
        </BrandRoute>
    )
}

export default Dashboard