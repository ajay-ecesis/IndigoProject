import {useState, useEffect, useContext} from 'react'
import Navbar from '../../pagecomponents/Navbar';
import Footer from '../../pagecomponents/Footer';
import Head from "next/head";
import { client } from "../../utils/sanity";
import { urlFor } from "../../utils/tools";
import BlockContent from '@sanity/block-content-to-react'
import {EmailShareButton,EmailIcon,FacebookShareButton,FacebookIcon,WhatsappShareButton,WhatsappIcon,TwitterShareButton,TwitterIcon,LinkedinShareButton,LinkedinIcon} from 'react-share'
import axios from 'axios'
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import {toast} from 'react-toastify'
import moment from 'moment';
import {Context} from '../../context/index'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export const Post = ({data, title, image, postId, blogurl, category, nav, preview, pageSlug}) => {

    const classes = useStyles();

    const [loading, setLoading] = useState(false);

    // user state
    const {state} = useContext(Context);
    const { user } = state;

    const [loadingCmt, setLoadingCmt] = useState(false);

    const [displayCmt, setDisplayCmt] = useState(false);
    
    const [isliked,setIsliked] = useState(false);
    const [message,setMessage] = useState('');
    const [btnloading,setbtnloading] = useState(false);
    const [open,setopen] = useState(false);

    const [comment, setComment] = useState('');

    const [comments, setComments] = useState([]);

    const [replyComments, setReplyComments] = useState([]);

    const [replyCmt, setReplyCmt] = useState('')

    const [cmntId, setCmntId] = useState('');


    const [openModal, setOpenModal] = useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // for focusing comment section from blog page
    useEffect(()=>{
        if(window.location.hash === "#comment"){
            loadComments()
            .then(()=>{
                const elmnt = document.getElementById("comment");
                if(!elmnt){
                    return
                }
                elmnt.scrollIntoView(false);
            })          
        }
    },[displayCmt]);

    const [isSaved, setIsSaved] = useState(false);

    // Like section starts
    // get the curret use liked posts

    useEffect(async()=>{
   
        const response = await fetch(`/api/userlikedposts`)
        const data = await response.json()
        if(data){
            checkIsLikedPost(data)
        }
        if(user){
            const savedResponse = await fetch(`/api/user/saved/posts`)
            const savedPostData = await savedResponse.json()
            if(savedPostData){
                checkIsSavedPost(savedPostData)
            }
        }
    },[user]);

    const checkIsLikedPost =(data)=>{

        if(!data || data.length < 1){
            setIsliked(false)
            return
        }
        for(let i in data){
            if(data[i].postId == postId && data[i].status==true){
                setIsliked(true)
                return
            }
        }
    }

    const checkIsSavedPost = (data) => {
        if(!data || data.length < 1){
            setIsSaved(false)
            return
        }
        for(let i in data){
            if(data[i].postId === postId && data[i].userId === user._id){
                setIsSaved(true)
                return
            }
        }
    }

    //this function is for liking the post
    const likePost = ()=>{
        setIsliked(true)
        fetch('/api/likeblogpost',{
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
        .then(res=>{
            if(res.ok){
                setIsliked(true)
                setbtnloading(false)
            }  
            return res.json()          
        })
        .then(data=>{
            toast.success(data.success);
            return
        })
        .catch(err=>{
            setIsliked(false);
            toast.error("Something went wrong, Please try again");
            console.log(err);
            setbtnloading(false);
        })
    }

    //this function is for unlike a liked post

    const unlikePost = ()=>{
        setIsliked(false)
        fetch('/api/unlikeblogposts',{
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
        .then(res=>{
            if(res.ok){
                setIsliked(false);
                setbtnloading(false);
            }
        return res.json()
            
        })
        .then(data=>{
            toast.error(data.success)
            return
        })
        .catch(err=>{
            setIsliked(true)
            toast.error("Something went wrong, Please try again.")
            console.log(err);
            setbtnloading(false);
        })
    }

    //if the post is already liked it will call the dislike function

    const handleLike = ()=>{
        setbtnloading(true);
        if(!user){
            toast.error("You should login first to like the post")
            setbtnloading(false);
            return
        }
        if(isliked){
            unlikePost();
        }else{
            likePost();
        }
    }

    // like section ends

    useEffect(()=>{
        setTimeout(() => {
            setMessage('')
        }, 3000);
    },[isliked]);

    // Saved Post section start

    const handleSavedPost = async () => {
        if(!user){
            toast.error("You should login first to like the post")
            return
        }
        setIsSaved(!isSaved)
        try {
            const {data} = await axios.post(`/api/save/post`, {
                userId: user._id,
                postId,
                pageName: title,
                pageSlug
            })
            toast.success(data.success);
        } catch (error) {
            console.log("Saved Error", error)
            toast.error(error.response.data)
        }
    }

    // Share section start

    const handleToggleShare = () => {
        setopen(!open)
    }

    const shareComponent = () => (
        <>
            <EmailShareButton style={{margin:'10px'}} subject={title} url={blogurl}>
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
            <LinkedinShareButton style={{margin:'10px'}} title={title} url={blogurl}>
                <LinkedinIcon />
            </LinkedinShareButton>
        </>
    )

    // Share section End

    // Comment section Starts

    const handleCloseModal = () => {
        setReplyComments([]);
        setCmntId('');
        setOpenModal(false);
    };

    const loadComments = async() => {
        try {
            setLoadingCmt(true);
            const {data} = await axios.post(`/api/getComments`, {
                postId
            })
            setComments(data);
            setLoadingCmt(false);
            setDisplayCmt(true);
        } catch (error) {
            setLoading(false);
            setLoadingCmt(false);
            setDisplayCmt(false);
            console.log("Error from login", error);
            //toast.error(error);
        }
    }

    const handleChangeComment = (e) => {
        setComment(e.target.value);
    }

    const clickCommentSubmit = async(e) => {
        e.preventDefault();
        if(user){
            try {
                const {data} = await axios.post(`/api/createComment`, {
                    userId:user._id,
                    postId:postId,
                    message:comment,
                    postName: title
                })
                setComment('');
                loadComments()    
            } catch (error) {
                console.log("Error from login", error);
                toast.error(error.response.data);
            }

        }
        else {
            toast.error("You must login to add comments");
        }
        
    }

    const addComment = () => {
        return (
            <form onSubmit={clickCommentSubmit} id="comment">  
                <h2 className="mt-10 mb-4 text-4xl lg:text-6xl leading-tight">Add a Comment:</h2>        
                <textarea onChange={e => handleChangeComment(e)} value={comment} className="form-control" rows="8" placeholder="write some comments" required />
                <center>
                    <br/>
                    <button className="btn btn-success">Comment</button>
                </center>
            </form>
        )
    }

    const clickReplyCommentSubmit = async(e) => {
        e.preventDefault()
        var tempCmtId = cmntId;
        if(user){
            try {
                setLoading(true);
                const {data} = await axios.post(`/api/createReplyComment`, {
                    userId:user._id,
                    postId:postId,
                    commentId:tempCmtId,
                    message: replyCmt,
                    postName: title
                })
                setReplyCmt('');
                setComment('');
                /* loadComments(); */
                loadReplyComments(tempCmtId)
            } catch (error) {
                console.log("err", error);
                setLoading(false);
                toast.error(error.response.data);
            }
        }
        else {
            toast.error("You must login to add comments");
        }   
    }

    const loadReplyComments = async(commentId) => {
        try {
            const {data} = await axios.post(`/api/getReplyComments`, {
                commentId
            })
            setReplyComments(data);
            setCmntId(commentId)
            setOpenModal(true);
            setLoading(false);
            /* setCheckReply(true); */
        } catch (error) {
            console.log("lload reply err", error);
            setLoading(false);
        }
    }

    const handleClickOpenModal = (id) => {
        setReplyComments([])
        setCmntId('');
        loadReplyComments(id)
    };

    const handleChangeForReplyComment = event => {
        setReplyCmt(event.target.value);
    }

    const showComments = () => {
        return (
            <>
                <h2 className="mt-10 mb-4 text-4xl lg:text-6xl leading-tight">{comments.length} Comments:</h2>
                <Paper style={{ padding: "40px 20px" }}>
                    {comments.map((s) => (
                            <div key={s._id}>
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item>
                                        <Avatar alt="User Logo" src='/images/userlogo.png' />
                                    </Grid>
                                    <Grid justifycontent="left" item xs zeroMinWidth>
                                        <h4 style={{ margin: 0, textAlign: "left" }}>{s.userId.firstName+' '+s.userId.lastName}</h4>
                                        <p style={{ textAlign: "left" }}>
                                            {s.message}
                                        </p>
                                        
                                        <span style={{textAlign: "left", color:'blue', cursor:'pointer'}} onClick={() => handleClickOpenModal(s._id)} >Reply | View Replies</span>
                                                          
                                       {/*  {s.isReply ? <p style={{ textAlign: "left", color: 'red', cursor:'pointer' }} >View {s.replyCount} Replies</p> :null } */}
                                        <p style={{ textAlign: "left", color: "gray" }}>
                                        posted {moment(s.createdAt).fromNow()}
                                        </p>
                                       
                                    </Grid>
                                </Grid>
                                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                            </div>
                    ))}
                    
                </Paper>
            </>
        )
    }

    const showReplyCommentsModal = () => {
        return (
            <>
                <Dialog scroll="body" fullWidth={true} maxWidth="md" fullScreen={fullScreen} open={openModal} onClose={handleCloseModal} aria-labelledby="responsive-dialog-title">
                    <DialogTitle variant="h1" id="responsive-dialog-title"><b>Reply Comments</b></DialogTitle>
                    <DialogContent>
                        <DialogContentText variant="h3">
                            Add a Reply Comment:
                        </DialogContentText>
                        <div className="row">
                            <div className="col-md-12">
                                <form onSubmit={clickReplyCommentSubmit}>
                                    <textarea onChange={(e) => handleChangeForReplyComment(e)} value={replyCmt} className="form-control" rows="2" placeholder="write some comments" required/>
                                    <br/>
                                    <button className="btn btn-success">Reply</button>
                                </form>    
                            </div>
                        </div>   

                        <div className="row">
                            <div className="col-md-12">

                            {loading && <div className={classes.root}>
                                <LinearProgress />
                            </div>}

                            <Paper style={{ padding: "40px 20px" }}>
                                    {replyComments.length >=1 ? replyComments.map((s) => (
                                            <div key={s._id}>
                                                <Grid container wrap="nowrap" spacing={2}>
                                                    <Grid item>
                                                        <Avatar alt="User Logo" src='/images/userlogo.png' />
                                                    </Grid>
                                                    <Grid justifycontent="left" item xs zeroMinWidth>
                                                        <h4 style={{ margin: 0, textAlign: "left" }}>{s.userId.firstName+' '+s.userId.lastName}</h4>
                                                        <p style={{ textAlign: "left" }}>
                                                            {s.message}
                                                        </p>
                                                        <p style={{ textAlign: "left", color: "gray" }}>
                                                        posted {moment(s.createdAt).fromNow()}
                                                        </p>                                 
                                                    </Grid>
                                                </Grid>
                                                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                                            </div>
                                    )) : <h4>No replies</h4>}                
                                </Paper>

                            </div>
                        </div>
                        
                    </DialogContent>
                    <DialogActions>
                    <button onClick={() => handleCloseModal()} className="btn btn-success">
                        Close Reply Comments
                    </button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    const mapSection1 = (item, i) => (
        <div key={i} className="col-12 post">
            {item.mainimage && 
            <div className="post__thumb">
                <img src={urlFor(item.mainimage)} alt="" />          
            </div>}
            <div>
                <div className="post_head">
                {(data.heading && Number(i) === 0) && <h2 className="title">{data.heading}</h2>}
                    <div className="post-details">
                        {i === 0 && <div className="post_sehdule">
                            <img src="/images/logo.svg" alt="" />
                            <p className="post_cat">
                                Projekt Indigo
                            </p>
                            <p className="post_date">{moment(data._createdAt).format('LL')}</p>
                        </div>}
                        {item.subHeading && <h3 className="sub_heading">{item.subHeading}</h3>}
                    </div>
                </div>
                <div className="post__footer">
                   {/*  <h3>The Genuine Good</h3>
                    <p>Organic cotton often gets the popular vote for its many facets of friendliness. From the complete refusal of GMOs (genetically modified organisms) at the birth stage, avoiding fertilisers and pesticides for growth, saving water and energy till the end, it has a pretty healthy lifespan. While many of these life choices have their own downsides, the most surefire change is seen in the water impact. Organic cotton directly reduces the impact on our natural water resources as the crops are 80% rain-fed. Considering it uses no chemicals, it causes 98% less water pollution as well.</p> */}
                    <BlockContent blocks={item.description} />
                </div>
            </div>
        </div>
    )

    const mapSection2 = (item,i) => {
        return (
            <div key={i} className="col-12 post post-change">
                {item.mainimage && 
                    <div className="post__thumb">
                        <img src={urlFor(item.mainimage)} alt="" />          
                    </div>
                }
                    <div>
                        <div className="post_head">
                        {item.subHeading && 
                            <div className="post-details">
                                <h3 className="sub_heading">{item.subHeading}</h3>
                            </div>
                        }
                            <div className="post__footer">
                                <BlockContent blocks={item.description} />
                            </div>
                        </div>
                    </div>
            </div>
        )
    }

    return (
        <>
           {/*  <TopNav /> */}
           <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Indigo | Story</title>
            </Head>
            <div className="main_banner_new about_us_banner story_banner">
                <Navbar nav={nav} />
                <div className="banner ">
                    <div id="bannerWrapper" className="banner-wrapper">
                    <div className="bg-img_about">
                        <img src={urlFor(image)} alt="" />
                    </div>
                        <div className="container-fluid">
                            <div className="banner-inner row">
                                <div className="left-side col-md-6">
                                    <h6>{category && category.length && category[0].title}</h6>
                                    <h1>{title}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section story-page">
                <div className="container-fluid">
                    
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                {data.maincomponents && data.maincomponents.map((s,i) => (
                                    mapSection1(s,i)
                                   /*  i%2 === 0 ? mapSection1(s,i) : mapSection2(s,i) */
                                ))}
                              
                            </div>
                        </div>
                    </div>

                    {user !== null && <div className="row">
                        <div className="col-md-12 text-center">
                            <div>
                                <span style={{cursor:'pointer', margin:'20px'}} >
                                    {isliked ? <img style={{borderRadius:'50%',background:'#40b36c'}} onClick={()=>handleLike()} src="/images/clapping.svg" alt="" width="40px" height="auto" />
                                    :<img onClick={()=>handleLike()} src="/images/clapping.svg" alt="" width="40px" height="auto" />
                                    }
                                </span>
                                <span style={{cursor:'pointer', margin:'20px'}} onClick={() => loadComments()}>
                                    <img src="/images/chat.svg" alt="" width="40px" height="auto" />
                                </span>
                                <span onClick={() => handleToggleShare()} style={{cursor:'pointer', margin:'20px'}} >
                                    <img src="/images/forward.svg" alt="" width="40px" height="auto" />
                                </span>
                                <span style={{cursor:'pointer', margin:'20px'}} >
                                    {isSaved ? <img style={{borderRadius:'50%',background:'#40b36c'}} onClick={()=>handleSavedPost()} src="/images/bookmark2.svg" alt="" width="40px" height="auto" />
                                    :<img onClick={()=>handleSavedPost()} src="/images/bookmark2.svg" alt="" width="40px" height="auto" />
                                    }
                                </span>
                               
                            </div>                 
                        </div>
                        {message}
                        {loadingCmt && <div className={classes.root}>
                                <LinearProgress />
                        </div>}
                        <div className="row">
                            {open && <div className="col-md-12 text-center">
                                <br/>
                                {shareComponent()}
                            </div>}
                            <div className="col-md-12">
                                { (displayCmt && addComment())}
                                {(displayCmt) && (comments.length >=1 ?  showComments() : <h2>No comments found!</h2>)} 
                                {showReplyCommentsModal()}  
                                
                            </div>                        
                        </div>
                    </div>}
                </div>
            </div>

            <Footer />
           
        </>
    )
}

export const getServerSideProps = async pageContext => {

    let nav = await client.fetch(`*[_id=="navbar"]{navlinks[]->}`);
    const pageSlug = pageContext.query.slug;
    const pageurl = process.env.DOMAIN+pageContext.req.url;
    if(!pageSlug){
        return {
            notFound: true
        }
    }
    const query = encodeURIComponent(`*[_type == "post" && slug.current == "${pageSlug}"]{..., categories[]->}`);
    const url = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${query}`;

    const result = await fetch(url).then(res => res.json());
    const post = result.result[0];
    let preview = pageContext.preview ? pageContext.preview : null
    if(!post){
        return {
            notFound: true,
            
        }
    } else {
        return {
            props: {
                data:post,
                title: post.title,
                image: post.mainImage,
                postId:post._id,
                blogurl:pageurl,
                category: post.categories,
                nav,
                preview,
                pageSlug
            }
        }
    }
}

export default Post
