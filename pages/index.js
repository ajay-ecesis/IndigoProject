import Head from 'next/head';
import {clientRead,client} from '../utils/sanity'
import { usePreviewSubscription } from '../utils/previewConfig'
import Navbar from '../pagecomponents/Navbar';
import Banner from '../pagecomponents/Banner';
import Section2 from '../pagecomponents/Section2';
import Section3 from '../pagecomponents/Section3';
import Trustbrand from '../pagecomponents/TrustBrandSection';
import Logoslider from '../pagecomponents/Logoslider';
import Manufacturer from '../pagecomponents/Manufacturer';
import Brands from '../pagecomponents/Brands';
import Artisanal from '../pagecomponents/Artisanal';
import Sustainability from '../pagecomponents/Sustainability';
import ProjectIndigo from '../pagecomponents/ProjectIndigo';
import AvailablePlans from '../pagecomponents/AvailablePlans';
import Footer from '../pagecomponents/Footer';

const HomePage = (props)=>{

  const  postQuery= `*[_type=="siteHome"]`

  const {data} = usePreviewSubscription(postQuery, {
    initialData: props.data,
    enabled: props.preview,
  })

  return(
    <>
    <Head>
      <title>Indigo | Best company</title>
    </Head>
    {props.nav && <Navbar preview={props.preview} nav={props.nav} />}
    {data[0].hero && <Banner content={data[0].hero ? data[0].hero : null} />}
    {data[0].section2 && <Section2 content={data[0].section2 ? data[0].section2 : null} />}
    {data[0].section3 && <Section3 content={data[0].section3 ? data[0].section3 : null} />}
    {data[0].trustedbrands && <Trustbrand content={data[0].trustedbrands} />}
    {data[0].logoslider &&<Logoslider content={data[0].logoslider} />}
    {data[0].formanufactures && <Manufacturer content={data[0].formanufactures} />}
    {data[0].forbrands && <Brands content={data[0].forbrands}/>}
    {data[0].artisanal && <Artisanal  content={data[0].artisanal} />}
    {data[0].illustartive && <Sustainability content={data[0].illustartive} />}
    {data[0].slidingillustration &&<ProjectIndigo content={data[0].slidingillustration}/>}
    {data[0].finalsection && <AvailablePlans content={data[0].finalsection} />}
    <Footer />
    </>
  )
}

export default HomePage;



export async function getServerSideProps(context) {
  // console.log("the context",context)
  let data = null;
  let nav = await client.fetch(`*[_id=="navbar"]{navlinks[]->}`);
  console.log("the navbar",nav)
  let preview = context.preview ? context.preview : null
  if(context.preview){
      data = await client.fetch('*[_type=="siteHome"]');
  }
  else{
      data = await clientRead.fetch('*[_type=="siteHome"]');
  }
  // console.log(data)
if (!data) {
  return {
    notFound: true,
  }
}

  return {
    props: { data,preview,nav }, // will be passed to the page component as props
  }
}