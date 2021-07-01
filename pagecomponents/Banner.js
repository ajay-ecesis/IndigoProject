
import BlockContent from '@sanity/block-content-to-react';
//import { urlFor } from '../utils/tools';

export default function Banner(props) {
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
                                <BlockContent blocks={props.content?.text} />
                                <BlockContent blocks={props.content?.subtext} />
                                    <a href="/signin" className="btn btn-hover btn-black">Register Now <i className="fa fa-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
  );
}