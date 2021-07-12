
import { urlFor } from "../utils/tools"
import BlockContent from '@sanity/block-content-to-react';

const Manufacturer = ({content})=>{

    const overrides = {
        h2: props => <h2 className="heading-inner" {...props} />,
        normal:props=><p className="disc disc--change" {...props} />
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
            <section className="section trustBrand trustBrand-change manufacturers">
                <div className="container-fluid">
                    <div className="row row--chnage">
                        <div className="col-md-12">
                            <div className="thumb">
                                <img src={urlFor(content?.coversection?.image)} alt="" />
                            </div>
                            <div className="content">
                           
                                <BlockContent blocks={content?.coversection?.description} serializers={serializers} />
                            </div>
                        </div>

                        <div className="col-md-12 manufacturers-content">
                            <div className="content-wrapper">
                                <p className="info">{content?.description1}</p>
                                <div className="title">
                                    Features
                                </div>
                                {content?.featureImages &&  <div className="row gallery2" >
                                  {content.featureImages.map((item,i)=>(
                                       <div key={i} className="col-md-3">
                                       <img src={urlFor(item.image)} alt="" />
                                       <p htmlFor="" ><BlockContent blocks={item.description} /></p>
                                   </div>
                                  ))}
                                </div>}
                                <p className="disc">{content?.description2}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Manufacturer;