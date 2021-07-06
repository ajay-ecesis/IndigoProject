import {useContext} from 'react'
import {Context} from '../../context'
import Head from 'next/head'
import ManufacturerRoute from '../../pagecomponents/routes/ManufacturerRoute'
import ManufacturerLayout from '../../pagecomponents/layout/manufacturer/ManufacturerLayout'
import ResetPassword from '../../pagecomponents/ResetPassword'

const changepasswordmanufacturer = () => {

    const {state:{user}} = useContext(Context);
    
    return (
        <ManufacturerRoute>
            <ManufacturerLayout>
                    <Head>
                        <meta charSet="UTF-8" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Indigo | Change-Password</title>
                    </Head>
                    <ResetPassword />
            </ManufacturerLayout>      
        </ManufacturerRoute>
    )
}

export default changepasswordmanufacturer


