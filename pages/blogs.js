import {useState, useEffect,useContext} from 'react'
import Head from "next/head";
import imageUrlBuilder from '@sanity/image-url'
import { client } from "../utils/sanity";
import axios from 'axios'
import {toast} from 'react-toastify'
import router from 'next/router';
import {EmailShareButton,EmailIcon,FacebookShareButton,FacebookIcon,WhatsappShareButton,WhatsappIcon,TwitterShareButton,TwitterIcon,LinkedinShareButton,LinkedinIcon} from 'react-share'
import Navbar from '../pagecomponents/Navbar';
import Footer from '../pagecomponents/Footer';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Context } from '../context';

const blogs = ({posts,nav,pageurl}) => {

    const {state, dispatch} = useContext(Context);
    const { user } = state;
    const settings = {
        infinite: true,
        autoplay:true,
        speed: 500,
        slidesToShow: 3,
        arrows:false,
        slidesToScroll: 1,
        responsive: [
           
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            }
          ]
      };
    const [mappedPosts, setMappedPosts] = useState([]);

    
    // state
    const [blogurl,setblogurl] = useState(null);
    const [section,setSection] = useState(null)
   
    useEffect(() => {
        if(posts.length){
            const imgBuilder = imageUrlBuilder({
                projectId:'a4cdxjbi',
                dataset:'production',
            });
            setMappedPosts(
                posts.map(p => {
                    return {
                        ...p,
                        mainImage: imgBuilder.image(p.mainImage)/* .width(500).height(250) */,
                    }
                })
            )
        }
        else {
            setMappedPosts([])
        }
    },[])
    const handleLike =async (postId) => {
        // console.log("Handke Like", postId)
        if(!user){
            toast.error("You should login first to like the post")
            return
        }
        
        const response = await   fetch('/api/likefromlist',{
            method:'POST',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                postId:postId,
                userId:user._id
            })
        })
        
        const data = await response.json();
        console.log(data)
        if(data.success){
            toast.success(data.success)
        }
        if(data.error){
            toast.error(data.error)
        }
    }

   
    const savedPost = async(id) => {
        try {
            const {data} = await axios.post(`/api/savedPosts`, {
                user: user._id,
                post: id
            })
            console.log("Saved Data", data);
            toast.success("Post has been saved to your stories.")
        } catch (error) {
            console.log("Saved Error", error)
            toast.error(error.response.data)
        }
    }

    const isliked = (post)=>{
        let result=false;
        post?.likedby.map((likeduser,i)=>{
            if(likeduser._ref == user._id){
                return result =true
            } 
            else return result = false
        })
        return result
    }

    const handleShare = (post,section)=>{
        setblogurl(pageurl+"/post/"+post.slug.current)
        setSection(section)
        // console.log(post.slug.current,"clicked")
    }

    const shareComponent = ()=>(
        <>
         <EmailShareButton style={{margin:'10px'}}  url={blogurl}>
             <EmailIcon />
         </EmailShareButton>
         <FacebookShareButton style={{margin:'10px'}} url={blogurl}>
             <FacebookIcon />
         </FacebookShareButton>
         <WhatsappShareButton style={{margin:'10px'}} url={blogurl}>
             <WhatsappIcon />
         </WhatsappShareButton>
         <TwitterShareButton style={{margin:'10px'}} url={blogurl}>
             <TwitterIcon />
         </TwitterShareButton>
         <LinkedinShareButton style={{margin:'10px'}}  url={blogurl}>
             <LinkedinIcon />
         </LinkedinShareButton>
        </>
    )


    const showSection1 = () => {
        return (
            <section className="explore stories section trustBrand manufacturers brands">
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-md-12 section-head text-center">
                            <span className="heading__span">Explore our</span>
                            <h2 className="heading">
                                Stories
                            </h2>
                        </div>
                    </div>
                    <div className="row row--chnage">
                        <div className="col-md-6">
                            <div className="thumb">
                                <img src={mappedPosts.length && mappedPosts[0].mainImage} alt="" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="manufacturers-content">
                                {mappedPosts.length && mappedPosts[0].categories.map((s) => (
                                    <><div key={s._id} className="title title__change">{s.title}</div>&nbsp;</>
                                ))}   
                                <h3 className="inner__heading">{mappedPosts.length && mappedPosts[0].title}</h3>
                                {/* <p className="info">"“A new approach is required where brands realize that sustainable strategies are not for the niche market anymore as such products are available at commercial …"</p> */}
                                <span className="info">{mappedPosts.length ? mappedPosts[0].maincomponents[0].subHeading : ''}</span> 
                                <div className="bottom-content">
                                    <a href={`/post/${mappedPosts.length && mappedPosts[0].slug.current}`}><a className="btn btn-black btn-hover">Read More <i className="fa fa-chevron-right"></i></a></a>
                                    
                                    {<div className="icon-gallery">
                                        <span style={{cursor:'pointer'}} >
                                             <img onClick={()=>handleLike(mappedPosts[0]._id)} src="images/clapping.svg" alt="" />
                                        </span>
                                        <span style={{cursor:'pointer'}} onClick={() => router.push(`/post/${mappedPosts[0].slug.current}`)}>
                                            <img src="images/chat.svg" alt="" />
                                        </span>
                                        <span onClick={()=>handleShare(mappedPosts[0],'section1')}>
                                            <img src="images/forward.svg" alt="" />
                                        </span>
                                        <span style={{cursor:'pointer'}} >
                                            <img src="images/bookmark2.svg" alt="" />
                                        </span>
                                        <div>
                                        {blogurl && section=='section1' && shareComponent()}
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    const showSection2 = () => {
        return (
            <section className="explore stories section trustBrand manufacturers brands">
                <div className="container-fluid ">
                    <div className="row row--chnage">
                        <div className="col-md-6">
                            <div className="thumb">
                                <img src={mappedPosts.length && mappedPosts[1].mainImage}  alt="" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="manufacturers-content">
                                {mappedPosts.length && mappedPosts[1].categories.map((s) => (
                                    <><div key={s._id} className="title title__change">{s.title}</div>&nbsp;</>
                                ))} 
                                <h3 className="inner__heading">{mappedPosts.length && mappedPosts[1].title}</h3>
                                <span className="info">{mappedPosts.length ? mappedPosts[1].maincomponents[0].subHeading : ''}</span> 
                                <div className="bottom-content">
                                <a href={`/post/${mappedPosts.length && mappedPosts[1].slug.current}`}><a className="btn btn-black btn-hover">Read More <i className="fa fa-chevron-right"></i></a></a>
                                    {<div className="icon-gallery">
                                        <span style={{cursor:'pointer'}} >
                         <img onClick={()=>handleLike(mappedPosts[1]._id)} src="images/clapping.svg" alt="" />
                                        </span>
                                        <span style={{cursor:'pointer'}} onClick={() => router.push(`/post/${mappedPosts[1].slug.current}`)}>
                                            <img src="images/chat.svg" alt="" />
                                        </span>
                                        <span onClick={()=>handleShare(mappedPosts[1],'section2')}>
                                            <img src="images/forward.svg" alt="" />
                                        </span>
                                        <span style={{cursor:'pointer'}} >
                                            <img src="images/bookmark2.svg" alt="" />
                                        </span>
                                        <div>
                                        {blogurl && section=='section2' && shareComponent()}
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    const showSection3 = () => {
        return (
            <section className="explore stories section trustBrand manufacturers brands">
                <div className="container-fluid ">
                    <div className="row row--chnage">
                        <div className="col-md-6">
                            <div className="thumb">
                                <img src={mappedPosts.length && mappedPosts[2].mainImage} alt="" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="manufacturers-content">
                                {mappedPosts.length && mappedPosts[2].categories.map((s) => (
                                    <><div key={s._id} className="title title__change">{s.title}</div>&nbsp;</>
                                ))}  
                                <h3 className="inner__heading">{mappedPosts.length && mappedPosts[2].title}</h3>
                                <p className="info">{mappedPosts.length ? mappedPosts[2].maincomponents[0].subHeading : ''}</p> 
                                <div className="bottom-content">
                                <a href={`/post/${mappedPosts.length && mappedPosts[2].slug.current}`}><a className="btn btn-black btn-hover">Read More <i className="fa fa-chevron-right"></i></a></a>
                                {<div className="icon-gallery">
                                    <span style={{cursor:'pointer'}} >
                                    <img onClick={()=>handleLike(mappedPosts[2]._id)} src="images/clapping.svg" alt="" />
                                    </span>
                                    <span style={{cursor:'pointer'}} onClick={() => router.push(`/post/${mappedPosts[2].slug.current}`)}>
                                        <img src="images/chat.svg" alt="" />
                                    </span>
                                    <span onClick={()=>handleShare(mappedPosts[2],'section3')}>
                                            <img src="images/forward.svg" alt="" />
                                        </span>
                                    <span style={{cursor:'pointer'}} >
                                        <img src="images/bookmark2.svg" alt="" />
                                    </span>
                                    <div>
                                    {blogurl && section=='section3' && shareComponent()}
                                    </div>
                                </div>}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }


    const showSlider = () => {
        return (
            <section className="section artisanalExperiences Plans bottom-blog-gallery-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 section-head text-center">
                            <p className="txt-light">Swipe for more</p>
                            <div className="view__all">
                                <h6>View all</h6>
                            </div>
                        </div>
                    </div>
                    <div className="row Artisanal-slider_second">
                        
                        
                        <Slider {...settings}>
                            { mappedPosts.length && mappedPosts.map((item,i)=>(
                                
                                    <div key={item._id} className=" col-md-4">
                                        <img src={item.mainImage} alt="" /> 
                                        <div className="footer-content--change">
                                            {item.categories.map((data) => (
                                                <><div key={data._id} className="title__change">{data.title}</div>&nbsp;</>
                                            ))} 
                                            <h5 className="title">{item.title}</h5>
                                            <p>{item.maincomponents[0].subHeading}</p> 
                                            <div className="read_more">
                                                <button onClick={() => router.push(`/post/${item.slug.current}`)} key={i} className="btn btn-black btnSm">Read more <i className="fa fa-chevron-right"></i></button>
                                                <span>{item.readMin}</span>
                                            </div>
                                        </div>                 
                                    </div>          
                            ))}
                            </Slider>
                    </div>
                </div>
            </section>
        )
    }
    
    return (
        <>

            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Indigo | Stories</title>
            </Head>
            <Navbar nav={nav} />

            <div id="main" className="blog">
                {mappedPosts.length && showSection1()}
                {mappedPosts.length >=2 && showSection2()}
                {mappedPosts.length >=3 && showSection3()}
                
            </div>
            {showSlider()}
            {console.log('mappedPosts', mappedPosts)}
            {/* {showAllBlogsSlider()} */}
            <Footer />
        </>
    )
}

export const getServerSideProps = async () => {

    let nav = await client.fetch(`*[_id=="navbar"]{navlinks[]->}`);
    const query = encodeURIComponent('*[_type == "post"]{...,categories[]->} | order(_createdAt desc)');
    const url = `https://a4cdxjbi.api.sanity.io/v1/data/query/production?query=${query}`;
    const result = await fetch(url).then(res => res.json());

    if(!result.result || !result.result.length){
        return {
            props: {
                posts: [],
                nav
            }
        }
    }
    else {
        return {
            props: {
                posts: result.result,
                nav,
                pageurl:process.env.DOMAIN
            }
        }
    }
}

export default blogs