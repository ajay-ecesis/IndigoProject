import {useContext} from 'react'
import {Context} from '../../context'
import Head from 'next/head'
import BrandRoute from '../../pagecomponents/routes/BrandRoute'
import BrandLayout from '../../pagecomponents/layout/brand/BrandLayout'
import ResetPassword from '../../pagecomponents/ResetPassword'

const changepasswordbrand = () => {
    const {state:{user}} = useContext(Context);
    return (
        <BrandRoute>
            <BrandLayout>
                    <Head>
                        <meta charSet="UTF-8" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Indigo | Change-Password</title>
                    </Head>
                    <ResetPassword />
            </BrandLayout>
        </BrandRoute>
    )
}

export default changepasswordbrand;