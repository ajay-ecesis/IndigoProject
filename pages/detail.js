import { urlFor } from "../utils/tools";
import BlockContent from '@sanity/block-content-to-react';
import { client,clientRead } from "../utils/sanity";
import { usePreviewSubscription } from "../utils/previewConfig";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../pagecomponents/Navbar";
import Footer from "../pagecomponents/Footer";

const Detail = (props)=>{

  const  postQuery= `*[_type=="siteSustainability"]`

  const {data} = usePreviewSubscription(postQuery, {
    initialData: props.data,
    enabled: props.preview,
  })
  const settings = {
    dots: true,
    infinite: true,
    autoplay:true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
  };

          const mapSection1 = (item,i)=>{
            return(
              <section key={i} className="section trustBrand manufacturers Sustainability brands about about2">
              <div className="container-fluid ">
                    { i==0 && <div className="row">
                    <div className="col-md-12 section-head text-center">
                        {data[0].heading1 && <span className="heading__span">{data[0].heading1}</span>}
                        {data[0].heading2 && <h2 className="heading">
                          {data[0].heading2}
                        </h2>}
                    </div>
                    </div>}                
                  <div className="row row--chnage">
                      <div className="col-md-6">
                          <div className="thumb">
                              <img src={urlFor(item.mainimage)} alt="" />
                          </div>
                        {item.imagetext && <div className="content">
                      <h2 className="heading-inner">{item.imagetext}</h2> 
                        </div>}
                      </div>
                      <div className="col-md-6 manufacturers-content">
                      <BlockContent blocks={item.description} />
                 
                      </div>
                    </div>
                  </div>
            </section>
            )
          }
          const mapSection2= (item,i)=>(
            <section key={i} className="section trustBrand manufacturers Sustainability brands about about2">
          <div className="container-fluid ">
              <div className="row row--chnage">
                  <div className="col-md-6">
                      <div className="thumb">
                      <img src={urlFor(item.mainimage)} alt="" />
                      </div>
                      {item.imagetext && <div className="content">
                      <h2 className="heading-inner">{item.imagetext}</h2> 
                        </div>}
                  </div>
                  <div className="col-md-6 manufacturers-content">
                  <BlockContent blocks={item.description} /> 
                  </div>
              </div>
          </div>
      </section>
          )


    return(
        <>
        <Navbar preview={props.preview} nav={props.nav} />
    <div id="main2">
    {data[0].content && data[0].content.map((item,i)=>(
         i%2==0 ? mapSection1(item,i) : mapSection2(item,i)
       ))}
        
    </div>

    
     <section className="section aboutus-slider">
        <div className="container-fluid about">
            
            <div  className=" row Artisanal-slider">
            <Slider {...settings}>
              {data[0].slider && data[0].slider.map((item,i)=>(
                   <div key={i} className="col-md-4">
                   <img src={urlFor(item)} alt="" />                  
               </div>
              ))}
               </Slider>
            </div>
            
        </div>
    </section>
    <Footer />
        </>
    )
}


export default Detail;


export async function getServerSideProps(context) {
  // console.log("the context",context)
  let data = null;
  let nav = await client.fetch(`*[_id=="navbar"]{navlinks[]->}`);
  let preview = context.preview ? context.preview : null
  if(context.preview){
     
      data = await client.fetch('*[_type=="siteSustainability"]');
  }
  else{
      data = await clientRead.fetch('*[_type=="siteSustainability"]');
  }
  console.log(data)
if (!data) {
  return {
    notFound: true,
  }
}

  return {
    props: { data,preview,nav }, // will be passed to the page component as props
  }
}