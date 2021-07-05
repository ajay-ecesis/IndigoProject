import BlockContent from '@sanity/block-content-to-react';
import { urlFor } from "../utils/tools";

const Section2 = ({content})=>{

    const overrides = {
        normal:props => <p className="title" {...props} />,
      }
      
      const serializers = {
        types: {
          block: props =>
            // Check if we have an override for the “style”
            overrides[props.node.style] 
              // if so, call the function and pass in the children, ignoring
              // the other unnecessary props
              ? overrides[props.node.style]({ children: props.children })
      
              // otherwise, fallback to the provided default with all props
              : BlockContent.defaultSerializers.types.block(props),
        }
      }


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
                                       <BlockContent blocks={content?.subhead} serializers={serializers} />
                                     
                                      <a href="/register" className="btn btn-black btnSm">Get Started <i className="fa fa-chevron-right"></i></a>
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