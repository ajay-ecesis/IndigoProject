import '../public/css/style.css'
import '../public/css/responsive.css'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Provider} from '../context'


//Binding events. 

function MyApp({ Component, pageProps }) {


  return(
    <Provider>
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
    </Provider>
  ) 
}

export default MyApp
