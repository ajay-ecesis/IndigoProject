import {clientRead} from '../utils/sanity'
import { client } from '../utils/sanity'
import { usePreviewSubscription } from '../utils/previewConfig'
import { urlFor } from '../utils/tools'
import BlockContent from '@sanity/block-content-to-react';
import {useRouter} from 'next/router'
import Head from 'next/head';
import Navbar from '../pagecomponents/Navbar';
import Footer from '../pagecomponents/Footer';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DynamicPage = (props)=>{
    const router = useRouter();
    if(router.isFallback){
      return <div>Loading ....</div>
  }
    const  postQuery=`*[slug._ref=="${props?.data[0]?.slug?._ref}"]`

    const {data} = usePreviewSubscription(postQuery, {
      initialData: props.data,
      enabled: props.preview,
    })

    const overrides = {
      h5: props => <h5 className="title" {...props} />,
      normal:props=><p className="disc" {...props} />
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
    const settings = {
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      cssEase: 'linear',
   accessibility: false,
      infinite: true,
      dots: false,
      arrows: false,
      responsive: [
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
       centerPadding: '20px'
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        }
      ]
      };

   
    
    const getComponent = (content,i)=>{
        switch (content._type) {
            case 'mainheading':
                return(
                  <div className="row">
                  <div className="col-md-12 section-head text-center">
                      {content?.heading && <span className="heading__span">{content?.heading}</span>}
                 
                  </div>
              </div>
                       
                    // <span className="heading__span">{content?.heading}</span>
            
           
                    
                ) 
           
                break;
            case 'subheading':
                return (
                  <div className="row">
                    <div className="col-md-12 section-head text-center">
                        {content?.heading && <h2 className="heading">
                            {content?.heading}
                        </h2>}
                    </div>
                </div>
                  //   <div key={i}>
                  //  <h2 className="heading">{content?.heading}</h2>
                  //  </div>
                )
                break;
            case 'components':
              return(
                <>
                    <section key={i} className="artisnal-details-section">
        <div className="container-fluid">
            <div className="row wrapper">
                <div className="col-md-6">
                    <div className="left-side">
                        <a className="backArrow" href="/artisanal"> <img src="/images/back-arrow.svg" alt="" /> </a>
                        <img src={urlFor(content?.mainimage)} alt="" />
                        <div className="location">
                        <p className="title">{content?.imagetext}</p>
                            {/* <p class="title">Artisans of Fashion</p>
                            <p class="place">New Delhi, India</p> */}
                            <p className="place">{content?.imagesubtext}</p> 
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="right-side">
                    <BlockContent blocks={content?.description} serializers={serializers} />
                        <a href="#" className="btn btn-yellow">Coming soon</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
       
             
              </>
              )
              break;

          case 'image':
            return(
              <section key={i} className="section trustBrand manufacturers Sustainability brands about about2">
              <div className="container-fluid "> 
                        <img className="dynamic_image" src={urlFor(content?.asset)} />
                  </div>
            </section>
            
            );
            break;
          case 'slider':
            return(
              <>
              <section className="section artisanalExperiences Plans bottom-blog-gallery-section artisnal-details_gallery_new">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 section-head text-center">
                    <p className="txt-light">Featured</p>
                    <div className="view__all">
                        <h6>View all</h6>
                    </div>
                </div>
            </div>
            <div className="row Artisanal-slider_second artisnal-details_gallery_new_slider">
            <Slider {...settings}>
                    {content.slideritem && content.slideritem.map((item,i)=>(
                      <div key={i} className=" col-md-4">
                      {item.image && <img src={urlFor(item.image)} alt="" /> }  
                      {item.description && <BlockContent blocks={item.description} />}               
                  </div>
                    ))}
                      </Slider>
               
            </div>
        </div>
    </section>  
          
          </>
            )
        }
    } 

    return(
        <>
        <Head>
            <title>{data[0]?.pagetitle}</title>
        </Head>
        
            {props.nav && <Navbar preview={props.preview} nav={props.nav} />}
            <div className="dynamic_container">
            {data[0]?.content?.map((content,i)=>(
                <div>
                     {getComponent(content,i)}
                     <div style={{marginTop:'4rem'}}></div>
                </div>
               
            ))}
            </div>
      
        <Footer />
        </>
    )
}

export default DynamicPage;



// export async function getStaticPaths() {

//     const links = await clientRead.fetch(`*[_type=="link" && usergeneratedlink==true]`);
//     const paths = links.map((link) => ({
//         params: { page: link.slug.current },
//       })) 
// console.log("the paths is ",paths)
//     return {
//       paths,
//       fallback: true 
//     };
//   }


export async function getServerSideProps(context) {
    // console.log("the context",context)
    let data = null;
    // const slug = context.params.page;
    const slug = await client.fetch(`*[slug.current=="${context.params.page}"]{_id}`);
    
// console.log("the slug from new",slug)
    if (!slug[0] || slug.length<1) {
        return {
          notFound: true,
        }
      }
    const slugId = slug[0]._id;
    // console.log("the slug id is",slugId)

    let nav = await client.fetch(`*[_id=="navbar"]{navlinks[]->}`);
    // console.log("the navbar",nav)
    let preview = context.preview ? context.preview : null
    if(context.preview){
        data = await client.fetch(`*[slug._ref=="${slugId}"]`);
    }
    else{
        data = await clientRead.fetch(`*[slug._ref=="${slugId}"]`);
    }
    // console.log("the data is",data)
  if (!data[0] || data.length<1) {
    return {
      notFound: true,
    }
  }
  
 
    return {
      props: { data,preview,nav }
    }
  }