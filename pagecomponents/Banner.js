
import BlockContent from '@sanity/block-content-to-react';
//import { urlFor } from '../utils/tools';

export default function Banner(props) {

    const serializers = {
        marks: {  
          link: ({mark, children}) => {
            const { href } = mark
            return <a href={href} className="btn btn-hover btn-black">{children} <i className="fa fa-chevron-right"></i></a>
          }
        }
      }


  return (
        <>

            <div className="banner ">
                <div id="bannerWrapper" className="banner-wrapper">
                    <div className="bg-img_home">
                        {/* <img src={urlFor(props.content?.mainImage)}  alt="" /> */}
                        <img src="/images/new_banner.jpg"  alt="top banner" />
                    </div>
                    <div className="container-fluid">
                        <div className="banner-inner row">
                            <div className="left-side col-md-6">
                                {props.content?.text && <BlockContent blocks={props.content?.text} />}
                                {props.content?.subtext && <BlockContent blocks={props.content?.subtext} />}
                                {props.content?.calltoaction && <BlockContent blocks={props.content?.calltoaction} serializers={serializers}/>}
                                    {/* <a href="/signin" className="btn btn-hover btn-black">Register Now <i className="fa fa-chevron-right"></i></a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
  );
}