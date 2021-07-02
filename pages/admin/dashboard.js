import {useContext} from 'react'
import {Context} from '../../context'
import AdminRoute from '../../pagecomponents/routes/AdminRoute'
import AdminLayout from '../../pagecomponents/layout/admin/AdminLayout'
import Head from "next/head";

const Dashboard = () => {

    const {state:{user}} = useContext(Context);
    
    return (
        <AdminRoute>
            <AdminLayout>
                    <Head>
                        <meta charSet="UTF-8" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Indigo | Admin-Dashboard</title>
                    </Head>
                {/* <Navbar /> */}
                <h1 className="jumbotron text-center square">
                    <pre>{user && `Hello ${user.firstName+" "+user.lastName}`} from brand</pre>
                </h1> 
            </AdminLayout>
        </AdminRoute>
    )
}

export default Dashboard