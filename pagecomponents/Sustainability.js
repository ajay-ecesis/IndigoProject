import { urlFor } from '../utils/tools'
import BlockContent from '@sanity/block-content-to-react';

const Sustainability = ({content})=>{
    const overrides = {
        h2: props => <h2 className="title" {...props} />,
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
         <section className="section Sustainability new">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 wrapper">
                        <img src={urlFor(content?.image)} alt="" />
                        <div className="content">
                            <BlockContent blocks={content?.description} serializers={serializers}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Sustainability;