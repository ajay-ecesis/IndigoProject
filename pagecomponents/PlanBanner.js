import { urlFor } from '../utils/tools'
import BlockContent from '@sanity/block-content-to-react';


const PlanBanner = ({content}) => {

    const overrides = {
        h2: props => <h2 className="heading-inner" {...props} />,
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

    return (
        <section className="section trustBrand projektIndigo">
              <div className="container-fluid ">
                  <div className="row">
                      <div className="wrapper col-12">
                          <div className="row">
                              <div className="col-md-12 col">
                                  {content?.image && <img src={urlFor(content?.image)} className="projekt-img"  alt="" />}
                                  <div className="content">
                                     {content?.description && <BlockContent blocks={content?.description} serializers={serializers} />}
                                  </div>
                              </div>
                          </div>
                      </div>       
                  </div>
              </div>
          </section>  
    )
}

export default PlanBanner
