import { urlFor } from '../utils/tools'
import BlockContent from '@sanity/block-content-to-react';

const Sustainability = ({content})=>{
    return(
        <>
         <section className="section trustBrand manufacturers Sustainability brands">
         {content.map((item,i)=>(
       <div key={i} className="container-fluid ">
       <div className="row row--chnage">
           <div className="col-md-6">
               <div className="thumb">
                   <img src={urlFor(item.image)} alt="" />
               </div>
           </div>
           <div className="col-md-6 manufacturers-content"> 
                <BlockContent blocks={item.description} />
               <button className="btn btn-black btnSm">Read more</button>
           </div>
       </div>
   </div>
   ))}
                </section>
        </>
    )
}

export default Sustainability;