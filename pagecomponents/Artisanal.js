
import { urlFor } from "../utils/tools"
import BlockContent from '@sanity/block-content-to-react';

const Artisanal = ({content})=>{
   
  const overrides = {
    h2: props => <h2 className="heading" {...props} />,
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
        <section className="section features artisanalExperiences">
            <div className="container-fluid ">
                <div className="row">
                    <div className="wrapper col-12">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="section-head text-center">
                                        {content?.heading && <BlockContent blocks={content?.heading} serializers={serializers} />}
                                </div>
                                <div className="content">
                                {content?.subheading &&<p className="title"> <BlockContent blocks={content?.subheading} serializers={serializers} /></p>}
                                    
                                    <span><p className="sub_title">Designer Artisan Connection</p></span>
                                    <a href="/artisanal" className="btn btn-hover btn-black">Explore more</a>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <img src="images/artisnal2.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Artisanal;