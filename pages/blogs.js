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

    const {state} = useContext(Context);
    const { user } = state;
    const settings = {
        slidesToShow: 3,
   slidesToScroll: 1,
   autoplay: true,
   autoplaySpeed: 3000,
accessibility: false,
   infinite: true,
   cssEase: 'linear',
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
         slidesToShow: 1,
         slidesToScroll: 1
       }
     }
   ]
      };
    const [mappedPosts, setMappedPosts] = useState([]);

    // updated on 26-06-21 start
    const [liked1,setliked1] = useState()
    const [liked2,setliked2] = useState()
    const [liked3,setliked3] = useState()
    const [likedposts,setlikedposts] = useState([]);

    // state for saved post
    const [saved1,setSaved1] = useState()
    const [saved2,setSaved2] = useState()
    const [saved3,setSaved3] = useState()
    const [savedPosts,setSavedPosts] = useState([]);

    useEffect(async()=>{
   
        const response = await fetch(`/api/userlikedposts`)
        const data = await response.json()
        if(data){
            setlikedposts(data)
        }

        const savedResponse = await fetch(`/api/user/saved/posts`)
        const savedPostData = await savedResponse.json()
        if(savedPostData){
            setSavedPosts(savedPostData)
        }
    },[user]);


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

    //updated on 26-06-21
    useEffect(()=>{
        for(let i in likedposts){
            if(likedposts[i].status){
                if(likedposts[i].postId == mappedPosts[0]._id){
                    setliked1(true)
                }
                if(likedposts[i].postId == mappedPosts[1]._id){
                    setliked2(true)
                }
                if(likedposts[i].postId == mappedPosts[2]._id){
                    setliked3(true)
                }
            }
        }
        for(let j in savedPosts){
            if(savedPosts[j]._id){
                if(savedPosts[j].postId == mappedPosts[0]._id){
                    setSaved1(true)
                }
                if(savedPosts[j].postId == mappedPosts[1]._id){
                    setSaved2(true)
                }
                if(savedPosts[j].postId == mappedPosts[2]._id){
                    setSaved3(true)
                }
            }
        }
    },[mappedPosts,likedposts, savedPosts]);

    const handleLike =async (postId,state) => {
        if(!user){
            toast.error("You should login first to like the post")
            return
        }
        
        if(state=="liked1"){
            setliked1(!liked1)
        }
        if(state=="liked2"){
            setliked2(!liked2)
        }
        if(state=="liked3"){
            setliked3(!liked3)
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
        if(data.success){
            toast.success(data.success)
        }
        if(data.error){
            toast.error(data.error)
        }
    }
    //
   
    // Saved Post Section Start

    const handleSave = async(postId, postName, postSlug) => {
        if(!user){
            toast.error("You should login first to save the post")
            return
        }

        if(postId === mappedPosts[0]._id){
            setSaved1(!saved1);
        }
        if(postId === mappedPosts[1]._id){
            setSaved2(!saved2);
        }
        if(postId === mappedPosts[2]._id){
            setSaved3(!saved3);
        }

        try {
            const {data} = await axios.post(`/api/save/post`, {
                userId: user._id,
                postId,
                postName,
                postSlug
            })
            toast.success(data.success);
        } catch (error) {
            console.log("Saved Error", error)
            toast.error(error.response.data)
        }
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
                        <div className="col-md-12">
                            <h5>Featured Stories</h5>
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
                                             {liked1 ? <img style={{borderRadius:'50%',background:'#40b36c'}} onClick={()=>handleLike(mappedPosts[0]._id,"liked1")} src="images/clapping.svg" alt="" />
                                             :<img  onClick={()=>handleLike(mappedPosts[0]._id,"liked1")} src="images/clapping.svg" alt="" />
                                             }
                                        </span>
                                        <span style={{cursor:'pointer'}}>
                                            <a href={`/post/${mappedPosts[0].slug.current}/#comment`}><img src="images/chat.svg" alt="" /></a>
                                        </span>
                                        <span onClick={()=>handleShare(mappedPosts[0],'section1')}>
                                            <img src="images/forward.svg" alt="" />
                                        </span>
                                        <span style={{cursor:'pointer'}} >
                                             {saved1 ? <img style={{borderRadius:'50%',background:'#40b36c'}} onClick={() => handleSave(mappedPosts[0]._id, mappedPosts[0].title, mappedPosts[0].slug.current)} src="images/bookmark2.svg" alt="" />
                                             :<img onClick={() => handleSave(mappedPosts[0]._id, mappedPosts[0].title, mappedPosts[0].slug.current)} src="images/bookmark2.svg" alt="" />
                                             }
                                        </span>
                                        {/* <span onClick={() => savedPost(mappedPosts[0]._id)} style={{cursor:'pointer'}} >
                                            <img src="images/bookmark2.svg" alt="" />
                                        </span> */}
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
                                            {liked2 ? <img style={{borderRadius:'50%',background:'#40b36c'}} onClick={()=>handleLike(mappedPosts[1]._id,"liked2")} src="images/clapping.svg" alt="" />
                                             :<img  onClick={()=>handleLike(mappedPosts[1]._id,"liked2")} src="images/clapping.svg" alt="" />
                                            }
                                        </span>
                                        <span style={{cursor:'pointer'}} >
                                            <a href={`/post/${mappedPosts[1].slug.current}/#comment`}><img src="images/chat.svg" alt="" /></a>
                                        </span>
                                        <span onClick={()=>handleShare(mappedPosts[1],'section2')}>
                                            <img src="images/forward.svg" alt="" />
                                        </span>
                                        <span style={{cursor:'pointer'}} >
                                             {saved2 ? <img style={{borderRadius:'50%',background:'#40b36c'}} onClick={() => handleSave(mappedPosts[1]._id, mappedPosts[1].title, mappedPosts[1].slug.current)} src="images/bookmark2.svg" alt="" />
                                             :<img onClick={() => handleSave(mappedPosts[1]._id, mappedPosts[1].title, mappedPosts[1].slug.current)} src="images/bookmark2.svg" alt="" />
                                             }
                                        </span>
                                        {/* <span onClick={() => savedPost(mappedPosts[1]._id)} style={{cursor:'pointer'}} >
                                            <img src="images/bookmark2.svg" alt="" />
                                        </span> */}
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
                                        {liked3 ? <img style={{borderRadius:'50%',background:'#40b36c'}} onClick={()=>handleLike(mappedPosts[2]._id,"liked3")} src="images/clapping.svg" alt="" />
                                        :<img  onClick={()=>handleLike(mappedPosts[2]._id,"liked3")} src="images/clapping.svg" alt="" />
                                        }
                                    </span>
                                    <span style={{cursor:'pointer'}} >
                                        <a href={`/post/${mappedPosts[2].slug.current}/#comment`}><img src="images/chat.svg" alt="" /></a>
                                    </span>
                                    <span onClick={()=>handleShare(mappedPosts[2],'section3')}>
                                            <img src="images/forward.svg" alt="" />
                                    </span>
                                    <span style={{cursor:'pointer'}} >
                                             {saved3 ? <img style={{borderRadius:'50%',background:'#40b36c'}} onClick={() => handleSave(mappedPosts[2]._id, mappedPosts[2].title, mappedPosts[2].slug.current)} src="images/bookmark2.svg" alt="" />
                                             :<img onClick={() => handleSave(mappedPosts[2]._id, mappedPosts[2].title, mappedPosts[2].slug.current)} src="images/bookmark2.svg" alt="" />
                                             }
                                    </span>
                                    {/* <span onClick={() => savedPost(mappedPosts[2]._id)} style={{cursor:'pointer'}} >
                                        <img src="images/bookmark2.svg" alt="" />
                                    </span> */}
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
                                
                                    <div key={item._id} className="col-md-4">
                                        <img src={item.mainImage} alt="" /> 
                                        <div className="footer-content--change">
                                            {item.categories.map((data) => (
                                                <><div key={data._id} className="title__change">{data.title}</div>&nbsp;</>
                                            ))} 
                                            <h5 className="title">{item.title}</h5>
                                            <p>{item.maincomponents[0].subHeading.slice(0, 60)} ...</p>
                                            {/* <p>{item.maincomponents[0].subHeading}</p>  */}
                                            <div className="read_more">
                                                <a href= {`/post/${item.slug.current}`} key={i} className="btn btn-black btnSm">Read more <i className="fa fa-chevron-right"></i></a>
                                                <span> {item.readMin} min read</span>
                                            </div>
                                            <a href={`/post/${item.slug.current}`} key={i}><i onClick={() => router.push(`/post/${item.slug.current}`)} className="fas fa-arrow-right"></i></a>
                                        </div>                 
                                    </div>          
                            ))}
                            </Slider>
                    </div>
                </div>
            </section>
        )
    }

    const showTopBlogSection = () => (
        <section className="explore stories section trustBrand manufacturers brands">
            <div className="container-fluid ">
                <div className="all_manu_brand_wrapper">

                    <div className="row row--chnage">
                        <div className="col-md-6">
                            <div className="thumb">
                                <img src={mappedPosts[0].mainImage && mappedPosts[0].mainImage } alt="" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="manufacturers-content">
                                {mappedPosts[0].categories.length && mappedPosts[0].categories.map((s) => (
                                    <><div key={s._id} className="title title__change">{s.title}</div>&nbsp;</>
                                ))}  
                                <h3 className="inner__heading">{mappedPosts[0].title && mappedPosts[0].title}</h3>
                            </div>
                        </div>
                    </div>

                    {mappedPosts.length >= 2 && <div className="row row--chnage">
                        <div className="col-md-6">
                            <div className="thumb">
                                <img src={mappedPosts[1].mainImage && mappedPosts[1].mainImage } alt="" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="manufacturers-content">
                                {mappedPosts[1].categories.length && mappedPosts[1].categories.map((s) => (
                                    <><div key={s._id} className="title title__change">{s.title}</div>&nbsp;</>
                                ))}  
                                <h3 className="inner__heading">{mappedPosts[1].title && mappedPosts[1].title}</h3>
                            </div>
                        </div>
                    </div> }

                    {mappedPosts.length >= 3 && <div className="row row--chnage">
                        <div className="col-md-6">
                            <div className="thumb">
                                <img src={mappedPosts[2].mainImage && mappedPosts[2].mainImage } alt="" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="manufacturers-content">
                                {mappedPosts[2].categories.length && mappedPosts[2].categories.map((s) => (
                                    <><div key={s._id} className="title title__change">{s.title}</div>&nbsp;</>
                                ))}  
                                <h3 className="inner__heading">{mappedPosts[2].title && mappedPosts[2].title}</h3>
                            </div>
                        </div>
                    </div> }

                </div>
            </div>
        </section>
    )
    
    return (
        <>

            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Indigo | Stories</title>
            </Head>

            <div className="main_banner_new about_us_banner">
                <Navbar nav={nav} />
                <div className="banner ">
                    <div id="bannerWrapper" className="banner-wrapper">
                    <div className="bg-img_about">
                        <img src="images/stories_new.png" alt="" />
                    </div>
                        <div className="container-fluid">
                            <div className="banner-inner row">
                                <div className="left-side col-md-6">
                                    <h6>Blogs</h6>
                                    <h1>We Are <br/>Project Indigo</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="blog_new" className="blog">
                {mappedPosts.length && showTopBlogSection()}
                {mappedPosts.length && showSection1()}
                {mappedPosts.length >=2 && showSection2()}
                {mappedPosts.length >=3 && showSection3()}
                
            </div>
            {showSlider()}
            {/* {showAllBlogsSlider()} */}
            <Footer />
        </>
    )
}

export const getServerSideProps = async () => {

    let nav = await client.fetch(`*[_id=="navbar"]{navlinks[]->}`);
    const query = encodeURIComponent('*[_type == "post"]{...,categories[]->} | order(_createdAt desc)');
    const url = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${query}`;
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