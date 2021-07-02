import { useEffect, useState } from "react";

const Preloader = () => (
    <div className="preloader">
        <div id="mdiv">
            <div className="cdiv">
                <div className="rot"></div>
                    <h4 className="lh"><div className="circle pulse blue">
                    <img className="loader-img" src="/images/new_logo.svg" alt="" />
                </div></h4>
            </div>
        </div>
    </div>
)

const PasswordRoute = ({children}) => {

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        checkToken();
    },[])

    const checkToken = () => {
        try {
      
          let data = JSON.parse(window.localStorage.getItem("pwd"))
         
          if(data){     
            let sdecode = decodeURIComponent(escape(window.atob(data)));
              if(sdecode === process.env.INDIGO_PWD){
                setSuccess(true);
              }
              else {
                setSuccess(false);
                window.localStorage.removeItem('pwd');
                return window.location.replace("/password");
              }  
          }
          else {
            setSuccess(false);
            window.localStorage.removeItem('pwd');
            return window.location.replace("/password");
          }
            
        } catch (error) {
            window.localStorage.removeItem('pwd');
            return window.location.replace("/password");
        }
    }

    return (
        <>
            {!success ? Preloader() : <>{children}</>}
        </>
    )
}

export default PasswordRoute