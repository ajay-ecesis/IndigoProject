import Head from "next/head";
import { client,clientRead } from "../utils/sanity";
import { usePreviewSubscription } from "../utils/previewConfig";
import { urlFor } from "../utils/tools";
import Navbar from "../pagecomponents/Navbar";
import Footer from "../pagecomponents/Footer";

const Artisanal = (props)=>{

    const  postQuery= `*[_type=="siteArtisanal"]{contents,heading1,heading2,"links":contents[]{relatedpage->}}`

    const {data} = usePreviewSubscription(postQuery, {
      initialData: props.data,
      enabled: props.preview,
    })

    return(
        <>
        <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Indigo | Artisanal</title>
        </Head>
        <Navbar preview={props.preview} nav={props.nav} />
        <section className="section artisanal__experiences">
        <div className="row">
            <div className="col-12">
                <a className="backArrow" href="/"> <img src="/images/back-arrow.svg" alt="" /> </a>
               </div>
            <div className="col-md-12 section-head text-center">
                <span className="heading__span">{data[0]?.heading1}</span>
                <h2 className="heading">
                    {data[0]?.heading2}
                </h2>
            </div>
        </div>
        <div className="row">
            {data[0]?.contents?.map((content,i)=>(
                     <div key={i} className="col-md-4">
                     <div className="aritsnal-card">
                         <div className="left-side">
                             <img src={urlFor(content?.mainimage)} alt="image" />
                         </div>
                         <div className="right-side">
                             <h4 className="title">
                                 {content?.title}
                             </h4>
                             <p className="disc">
                                {content?.featureddescription}
                             </p>
                             <div className="location">
                                 <p>{content?.location}</p>
                                { <a href={data[0].links[i].relatedpage?.slug.current}><i className="fas fa-arrow-right"></i></a>}
                             </div>
                         </div>
                     </div>
                 </div>
            ))}
           
              
        </div>
    </section>
        <Footer />

        </>
    )
}

export default Artisanal;




export async function getServerSideProps(context) {
    // console.log("the context",context)
    let data = null;
    let nav = await client.fetch(`*[_id=="navbar"]{navlinks[]->}`);
    let preview = context.preview ? context.preview : null
    if(context.preview){
       
        data = await client.fetch('*[_type=="siteArtisanal"]{contents,heading1,heading2,"links":contents[]{relatedpage->}}');
    }
    else{
        data = await clientRead.fetch('*[_type=="siteArtisanal"]{contents,heading1,heading2,"links":contents[]{relatedpage->}}');
    }
    // console.log("artisanal data",data)
  if (!data) {
    return {
      notFound: true,
    }
  }
  
    return {
      props: { data,preview,nav }, // will be passed to the page component as props
    }
  }


  