import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { urlFor } from "../utils/tools"
import BlockContent from '@sanity/block-content-to-react';


const PlanBanner = ({content}) => {
    
    const settings = { 
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        accessibility: false,
        infinite: true,
        cssEase: 'linear',
        prevArrow: '<span class="prev"><i class="fal fa-long-arrow-alt-left"></i></span>',
                nextArrow: '<span class="next"><i class="fal fa-long-arrow-alt-right"></i></span>',
        dots: true,
        arrows: false
      };

    const overrides = {
        h2: props => <h2 className="heading-inner" {...props} />,
        normal:props =><p className="disc" {...props} />
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
                   
                    <Slider className="row project_indigo_slider" {...settings}>
                        {content.map((item,i)=>(
                             <div key={i} className="col-md-12 col">
                             <img src={urlFor(item?.image)} className="projekt-img"  alt="" />
                             <div className="content">
                                {item.description && <BlockContent blocks={item?.description} serializers={serializers} />}
                             </div>
                         </div>
                        ))}
                         
                        </Slider>
                   
                </div>
                
            </div>
        </div>
        </section>

    )
}

export default PlanBanner