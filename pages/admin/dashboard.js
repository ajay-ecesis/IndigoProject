import {useContext} from 'react'
import {Context} from '../../context'
import AdminRoute from '../../pagecomponents/routes/AdminRoute'
import AdminLayout from '../../pagecomponents/layout/admin/AdminLayout'

const Dashboard = () => {

    const {state:{user}} = useContext(Context);
    
    return (
        <AdminRoute>
            <AdminLayout>
                {/* <Navbar /> */}
                <h1 className="jumbotron text-center square">
                    <pre>{user && `Hello ${user.firstName+" "+user.lastName}`} from brand</pre>
                </h1> 
            </AdminLayout>
        </AdminRoute>
    )
}

export default Dashboard