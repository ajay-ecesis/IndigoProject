import {useContext} from 'react'
import { usePreviewSubscription } from '../utils/previewConfig';
import {Context} from '../context'

const Navbar = (props) => {
  
    const  postQuery= `*[_id=="navbar"]{navlinks[]->}`
    const {data} = usePreviewSubscription(postQuery, {
      initialData: props.nav,
      enabled: props.preview,
    })

    // state
    const {state, dispatch} = useContext(Context);
    const { user } = state;

    // Register Manufacturer functioality END

     // logout function
     const logout = async() => {
        dispatch({type: "LOGOUT"});
        const {data} = await axios.get('/api/logout');
        toast(data.message);
        //router.push('/');
        return window.location.replace("/");
    }

   /*  const handleRedirectToRegister = (id) => {
        if(id === 1){ // brand Register
            return window.location.replace("/brandregister");
        }
        else if(id === 2){
            return window.location.replace("/manufactureregister");
        }
        else if(id === 3){
            return window.location.replace("/signin");
        }
        return;
    } */

    return(
        <>
            {/* <!-- preloader --> */}
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
            {/* <!-- preloader --> */}

            {/* <!-- header --> */}

            <div className="header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="Nav">
                                <div className="humburger-menu">
                                    <img src="/images/nav_open.svg" alt="" />
                                </div>
                                <div className="bookmark-menu">
                                    <div className="bookmark"><a href="#"><img className="bookmark-icon" src="/images/bookmark-white.svg" /></a></div>
                                </div>
                                <ul className="Navbar">
                                    {data[0]?.navlinks && data[0].navlinks.map((item,i)=>(
                                        <span key={i}>
                                        { item.slug.current=="/" ? <li  ><a href="/">{item && item.linkname}</a></li>:
                                        <li  ><a href={item && "/"+item.slug.current}>{item && item.linkname}</a></li>}
                                        </span>
                                    ))}
                                    {user === null && 
                                        <li className="bottom-buttons"><p>Sign up</p>
                                            <p>
                                                <a href="/brandregister">Brand</a>
                                                <a href="/manufactureregister">Manufacturer</a>
                                            </p>
                                        </li>
                                    }

                                    {user !== null && (
                                        <>
                                            <li>
                                                {Number(user.role) === 0 ? <a href="/brand/dashboard">Dashboard</a> : (Number(user.role) === 1 ? <a href="/manufacturer/dashboard">Dashboard</a> : Number(user.role) === 2 && <a href="/admin/dashboard">Dashboard</a>)}
                                            </li>
                                            <li onClick={logout} style={{cursor:'pointer'}}>
                                                Logout
                                            </li>
                                        </>
                                    )}
                                
                                    
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <a className="main_logo" href="/"> <img src="images/logo.svg" alt="" /> Project Indigo</a>
                        </div>
                        <div className="col-md-4 text-right">
                            {user === null && <div className="manufacturer_brand_btn">
                                <a href="/signin">Manufacturer login</a>
                                <a href="/signin">Brand login</a>
                            </div> }
                            {user !== null && 
                                <div className="manufacturer_brand_btn">
                                    {Number(user.role) === 0 ? <a href="/brand/dashboard">Dashboard</a> : (Number(user.role) === 1 ? <a href="/manufacturer/dashboard">Dashboard</a> : Number(user.role) === 2 && <a href="/admin/dashboard">Dashboard</a>)}
                                    <span onClick={logout} style={{cursor:'pointer'}}>Logout</span>
                                </div>
                            }
                        </div>
                        {props.preview && <p>this site is in preview mode <a style={{color:'blue'}} href="/api/exit-preview">click here</a> to exit preview</p>}
                    </div>
                </div>
            </div>
           
        </>


    )
}

export default Navbar;