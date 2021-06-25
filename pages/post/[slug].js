import Navbar from '../../pagecomponents/Navbar';
import Footer from '../../pagecomponents/Footer';
import {useState, useEffect} from 'react'
import Head from "next/head";
import { client } from "../../utils/sanity";
import { urlFor } from "../../utils/tools";
import BlockContent from '@sanity/block-content-to-react'
import {EmailShareButton,EmailIcon,FacebookShareButton,FacebookIcon,WhatsappShareButton,WhatsappIcon,TwitterShareButton,TwitterIcon,LinkedinShareButton,LinkedinIcon} from 'react-share'
import axios from 'axios'
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import {toast} from 'react-toastify'
import moment from 'moment';
//import AddreplyComment from '../../components/AddreplyComment'

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

export const Post = ({data, title, image, postId, blogurl, category, nav}) => {

    const classes = useStyles();

    const [loading, setLoading] = useState(false);

    const [loadingCmt, setLoadingCmt] = useState(false);

    const [displayCmt, setDisplayCmt] = useState(false);

    const [imageUrl, setImageUrl] = useState('');
    
    const [isliked,setIsliked] = useState(false);
    const [message,setMessage] = useState('');
    const [btnloading,setbtnloading] = useState(false);
    const [open,setopen] = useState(false);

    const [comment, setComment] = useState('');

    const [comments, setComments] = useState([]);

    const [replyComments, setReplyComments] = useState([]);

    const [checkReply, setCheckReply] = useState(false);

    const [replyCmt, setReplyCmt] = useState('')

    const [cmntId, setCmntId] = useState('');


    const [openModal, setOpenModal] = useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleCloseModal = () => {
        setReplyComments([]);
        setCmntId('');
        setOpenModal(false);
    };

    /* useEffect(() => {
        const imgBuilder = imageUrlBuilder({
            projectId:'a4cdxjbi',
            dataset:'production',
        });

        setImageUrl(imgBuilder.image(image));
    },[image]) */


   

   const checkIsLikedPost =(data)=>{

        if(!data || data.length < 1){
            setIsliked(false)
            return
        }
        for(let i in data){
            if(data[i]._ref == postId){
                setIsliked(true)
                console.log("this post is liked") //should remove
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
            console.log(data)
            setMessage(data.success);
            toast.success(data.success);
        })
        .catch(err=>{
            setIsliked(false);
            setMessage("Something went wrong, Please try again");
            toast.success("Something went wrong, Please try again");
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
        console.log(data)
        setMessage(data.success);
        toast.success(data.success)
    })
    .catch(err=>{
        setIsliked(true)
        setMessage("Something went wrong, Please try again.");
        toast.success("Something went wrong, Please try again.")
        console.log(err);
        setbtnloading(false);
    })
}

//if the post is already liked it will call the dislike function

    const handleLike = ()=>{
        setbtnloading(true);
        if(!user){
            console.log("You should login first to like the post");
            setMessage("You should login first to like the post");
            toast.success("You should login first to like the post")
            setbtnloading(false);
            return
        }
        if(isliked){
            unlikePost();
        }else{
            likePost();
        }
    }

    useEffect(()=>{
        setTimeout(() => {
            setMessage('')
        }, 3000);
    },[isliked]);

    const handleCloseToggle = () => {
        setopen(!open)
    }
   const shareComponent = ()=>(
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

    const loadComments = async() => {
        try {
            setLoadingCmt(true);
            const {data} = await axios.post(`/api/getComments`, {
                postId
            })
            console.log("Comment data12", data);
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
                console.log("Hello man")
                const {data} = await axios.post(`/api/createComment`, {
                    user:user._id,
                    post:postId,
                    comment
                })
                console.log("data", data);
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

    /* const clickDeleteComment = async(id) => {
        if(user){
            try {
                console.log("Hello man")
                const {data} = await axios.post(`/api/deleteComment`, {
                    commentId:id
                })
                console.log("data", data);
                toast.success("Your comment removed successfully.");
                loadComments()    
            } catch (error) {
                console.log("Error from login", error);
                toast.error(error.response.data);
            }
        }
        else {
            toast.error("You must login to delete comments");
        }   
    }
 */
    const addComment = () => {
        return (
            <form onSubmit={clickCommentSubmit}>  
                <h2 className="mt-10 mb-4 text-4xl lg:text-6xl leading-tight">Add a Comment:</h2>        
                <textarea onChange={e => handleChangeComment(e)} value={comment} className="form-control" rows="8" placeholder="write some comments" required />
                <center>
                    <br/>
                    <button className="btn btn-success">Comment</button>
                </center>
            </form>
        )
    }

    /* const clickReplyCommentSubmit = async(id, replyCmt) => {
        console.log("Helloooo from reply cmt submit")
        console.log("Id", id);
        console.log("cmt", replyCmt)
        if(user){
            try {
                console.log("Hello man")
                const {data} = await axios.post(`/api/createReplyComment`, {
                    user:user._id,
                    post:postId,
                    commentId:id,
                    comment: replyCmt
                })
                console.log("data", data);
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
    } */

    const clickReplyCommentSubmit = async() => {
        var tempCmtId = cmntId;
        if(user){
            try {
                setLoading(true);
                console.log("Hello man")
                const {data} = await axios.post(`/api/createReplyComment`, {
                    user:user._id,
                    post:postId,
                    commentId:tempCmtId,
                    comment: replyCmt
                })
                console.log("data", data);
                setReplyCmt('');
                setComment('');
                loadComments();
                loadReplyComments(tempCmtId)
            } catch (error) {
                setLoading(false);
                console.log("Error from login", error);
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
            console.log("Comment data12", data);
            setReplyComments(data);
            setCmntId(commentId)
            setOpenModal(true);
            setLoading(false);
            /* setCheckReply(true); */
        } catch (error) {
            setLoading(false);
            console.log("Error from login", error);
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
                                        <Avatar alt="User Logo" src='/userlogo.png' />
                                    </Grid>
                                    <Grid justifycontent="left" item xs zeroMinWidth>
                                        <h4 style={{ margin: 0, textAlign: "left" }}>{s.writer.firstname+' '+s.writer.lastname}</h4>
                                        <p style={{ textAlign: "left" }}>
                                            {s.comment}
                                        </p>
                                        
                                        <span style={{textAlign: "left", color:'blue', cursor:'pointer'}} >Reply</span>
                                           {/*  <AddreplyComment id={s._id} clickComment={clickReplyCommentSubmit} />*/}
                                        
                                        {s.isReply ? <p style={{ textAlign: "left", color: 'red', cursor:'pointer' }} >View {s.replyCount} Replies</p> :null }
                                        <p style={{ textAlign: "left", color: "gray" }}>
                                        posted {moment(s._createdAt).fromNow()}
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

    /* const showReplyComments = () => {
        return (
            <>
                <Paper style={{ padding: "40px 20px" }}>
                    {replyComments.map((s) => (
                            <div key={s._id}>
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item>
                                        <Avatar alt="User Logo" src='/userlogo.png' />
                                    </Grid>
                                    <Grid justifycontent="left" item xs zeroMinWidth>
                                        <h4 style={{ margin: 0, textAlign: "left" }}>{s.writer.firstname+' '+s.writer.lastname}</h4>
                                        <p style={{ textAlign: "left" }}>
                                            {s.comment}
                                        </p>
                                        <p style={{ textAlign: "left" }}>
                                        <span style={{color:'blue', cursor:'pointer'}}>Reply</span>
                                        </p>
                                        {s.isReply ? <p style={{ textAlign: "left" }}>View Replies</p> :null }
                                        <p style={{ textAlign: "left", color: "gray" }}>
                                        posted {moment(s._createdAt).fromNow()}
                                        </p>                                 
                                    </Grid>
                                </Grid>
                                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                            </div>
                    ))}                
                </Paper>
            </>
        )
    } */

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
                                <textarea onChange={(e) => handleChangeForReplyComment(e)} value={replyCmt} className="form-control" rows="2" placeholder="write some comments" />
                                <br/>
                                <button  className="btn btn-success">Reply</button>
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
                                                        <Avatar alt="User Logo" src='/userlogo.png' />
                                                    </Grid>
                                                    <Grid justifycontent="left" item xs zeroMinWidth>
                                                        <h4 style={{ margin: 0, textAlign: "left" }}>{s.writer.firstname+' '+s.writer.lastname}</h4>
                                                        <p style={{ textAlign: "left" }}>
                                                            {s.comment}
                                                        </p>
                                                        {/* <p style={{ textAlign: "left" }}>
                                                        <span style={{color:'blue', cursor:'pointer'}}>Reply</span>
                                                        </p> */}
                                                        <p style={{ textAlign: "left", color: "gray" }}>
                                                        posted {moment(s._createdAt).fromNow()}
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
                    <button className="btn btn-success" color="primary">
                        Close Reply Comments
                    </button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    const mapSection1 = (item, i) => (
        <div key={i} className="col-12 post">
            <div className="post__thumb">
                <img src={urlFor(item.mainimage)} alt="" />          
            </div>
            <div>
                {console.log("ii", i)}
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
                <div className="post__thumb">
                    <img src={urlFor(item.mainimage)} alt="" /> 
                </div>
                    <div>
                        <div className="post_head">
                            {/* <div className="post__footer">
                                <h3>The Flip-side</h3>
                                <p>Organic cotton often gets the popular vote for its many facets of friendliness. From the complete refusal of GMOs (genetically modified organisms) at the birth stage, avoiding fertilisers and pesticides for growth, saving water and energy till the end, it has a pretty healthy lifespan. While many of these life choices have their own downsides, the most surefire change is seen in the water impact. Organic cotton directly reduces the impact on our natural water resources as the crops are 80% rain-fed. Considering it uses no chemicals, it causes 98% less water pollution as well.</p>
                            </div> */}
                            <div className="post-details">
                            {item.subHeading && <h3 className="sub_heading">{item.subHeading}</h3>}
                                {/* <p>While organic cotton depends mostly on rain-water, the same factor limits the area and timeline of its production. Most countries are dependent on importing organic cotton because their natural climate doesn’t support its cultivation. Moreover, the lower yield per hectare leads to increased pressure on land and other energy sources. Unless farming units support cotton production with the usage of completely renewable energy, they won’t be able to reduce the environmental impact greatly in the long run.

                                    Not to be progressively pessimistic, but in several instances, organic cotton meets chemical dyes and fabric enhancers. This renders the final garment not-so-organic. And when these garments end up in landfills as biodegradable waste, they stand a greater chance of polluting the land.</p> */}
                            </div>
                            <div className="post__footer">
                                <BlockContent blocks={item.description} />
                                {/* <h3>A More Sustainable Alternative</h3>
                                <p>An alternative path lies in zero-virgin cotton, which can be regenerated completely from recycled cotton yarns. Zero-virgin directly counters the flip sides of organic cotton, reducing the impact on fresh natural resources. And while its production process does involve chemicals, manufacturing units can reuse these chemicals as well. A comprehensive comparison of the impact created by both these materials is sure to end in favour of regenerated cotton. But very few manufacturing setups across the world are aware of this fairly new concept. Therefore it’s still in the process of meeting logistic perfection to emerge as a clear, better choice.</p> */}
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
            <Navbar nav={nav} />
            <div className="section story-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 section-head text-center">
                            <span className="heading__span">{category && category.length && category[0].title}</span>
                            <h2 className="heading">
                                {title}
                            </h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                {data.maincomponents && data.maincomponents.map((s,i) => (
                                    i%2 === 0 ? mapSection1(s,i) : mapSection2(s,i)
                                ))}
                               {/*  {mapSection1()}
                                {mapSection2()} */}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div>
                                <span style={{cursor:'pointer', margin:'20px'}} >
                                    <img src="/images/clapping.svg" alt="" width="40px" height="auto" />
                                </span>
                                <span style={{cursor:'pointer', margin:'20px'}} >
                                    <img src="/images/chat.svg" alt="" width="40px" height="auto" />
                                </span>
                                <span style={{cursor:'pointer', margin:'20px'}} >
                                    <img src="/images/forward.svg" alt="" width="40px" height="auto" />
                                </span>
                                <span style={{cursor:'pointer', margin:'20px'}}>
                                    <img src="/images/bookmark2.svg" alt="" width="40px" height="auto" />
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
                    </div>
                </div>
            </div>

            <Footer />
            {/* <div className={styles.main}>
                {imageUrl && <img className={styles.mainImage} src={imageUrl} alt="" />}

                <div className={styles.body}>
                    <BlockContent blocks={body} />
                </div>
                <div>
                <button disabled={btnloading} style={{border:'none',background:'none',cursor:'pointer'}} onClick={handleLike}><ThumbUpAltIcon fontSize={'large'} color={isliked ? 'primary' : 'action'} /></button>&nbsp;
                <button style={{border:'none',background:'none',cursor:'pointer'}} onClick={()=>setopen(true)} ><ShareIcon fontSize={'large'} /></button>
                {message}
                </div>
                <div>
                    {open && shareComponent()}
                    {user && <button onClick={() => loadComments()}>Show Comments</button>}
                    {user && addComment()}
                    {user && (comments.length >=1 ?  showComments() : <h2>No comments found!</h2>)}     
                    {showReplyCommentsModal()}           
                    
                </div>
            </div> */}
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
    const url = `https://a4cdxjbi.api.sanity.io/v1/data/query/production?query=${query}`;

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
                /* body: post.body, */
                postId:post._id,
                blogurl:pageurl,
                category: post.categories,
                nav,
                preview
            }
        }
    }
}

export default Post
