import {useContext} from 'react'
import {Context} from '../../context'
import Head from 'next/head'
import BrandRoute from '../../pagecomponents/routes/BrandRoute'
import BrandLayout from '../../pagecomponents/layout/brand/BrandLayout'

const Dashboard = () => {

    const {state:{user}} = useContext(Context);
    
    return (
        <BrandRoute>
            <BrandLayout>
                    <Head>
                        <meta charSet="UTF-8" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Indigo | Brand-Dashboard</title>
                    </Head>
                <h1 className="jumbotron text-center square">
                    <pre>{user && `Hello ${user.firstName+" "+user.lastName}`} from brand</pre>
                </h1> 
            </BrandLayout>
        </BrandRoute>
    )
}

export default Dashboard