import BlockContent from '@sanity/block-content-to-react';
import { urlFor } from "../utils/tools";

const Section2 = ({content})=>{


    return(
        <>

          <section className="section features">
              <div className="container-fluid ">
                  <div className="row">
                      <div className="wrapper col-12">
                          <div className="row">
                              <div className="col-md-6">
                                  <div className="col-md-6 section-head text-center">
                                      <h2 className="heading">
                                          <BlockContent blocks={content?.heading} />
                                      </h2>
                                  </div>
                                  <div className="content">
                                      <p className="title"> <BlockContent blocks={content?.subhead}  /></p>
                                     
                                      <button className="btn btn-black btnSm">Get Started <i className="fa fa-chevron-right"></i></button>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <img src={urlFor(content?.sectionImage)} alt="" />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
    
        </>
    )
}

export default Section2;