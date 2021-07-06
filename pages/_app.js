import '../public/css/style.css'
import '../public/css/responsive.css'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Provider} from '../context'
import {AppWrapper} from '../context/loginmodal'

//Binding events. 

function MyApp({ Component, pageProps }) {
  
  return(
    <Provider>
      <ToastContainer position="top-center" />
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
    </Provider>
  ) 
}

export default MyApp
