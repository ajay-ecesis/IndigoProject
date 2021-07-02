import {useContext} from 'react'
import {Context} from '../../context'
import Head from 'next/head'
import ManufacturerRoute from '../../pagecomponents/routes/ManufacturerRoute'
import ManufacturerLayout from '../../pagecomponents/layout/manufacturer/ManufacturerLayout'

const Dashboard = () => {

    const {state:{user}} = useContext(Context);
    
    return (
        <ManufacturerRoute>
            <ManufacturerLayout>
                    <Head>
                        <meta charSet="UTF-8" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Indigo | Manufacturer-Dashboard</title>
                    </Head>
                <h1 className="jumbotron text-center square">
                    <pre>{user && `Hello ${user.firstName+" "+user.lastName}`} from Manufacturer</pre>
                </h1> 
            </ManufacturerLayout>      
        </ManufacturerRoute>
    )
}

export default Dashboard