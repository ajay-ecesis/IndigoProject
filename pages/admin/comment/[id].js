import { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import AdminRoute from '../../../pagecomponents/routes/AdminRoute'
import AdminLayout from '../../../pagecomponents/layout/admin/AdminLayout'
import { useRouter } from 'next/router'
import {toast} from 'react-toastify'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import moment from 'moment';
import {Context} from '../../../context/index'
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const CommentDetails = () => {

    const classes = useStyles();

    const router = useRouter()

    const { id } = router.query

    // user state
    const {state:{user}} = useContext(Context);

    const [loading, setLoading] = useState(true);

    const [loadingRemove, setLoadingRemove] = useState(false);

    const [comment, setComment] = useState([]);

    const [replyComments, setReplyComments] = useState([]);

    const [replyCmt, setReplyCmt] = useState('');

    const [btnloading, setBtnloading] = useState(false);

    const loadComment = async(id) => {
        try {
            let { data } = await axios.post(`/api/getUserComment`, {
                id
            })
            console.log("data", data)
            setComment(data);
            if(data){
                loadReplyComments(data._id)
            }
            else {
                setLoading(false);
            }  
        } catch (error) {
            console.log("error", error)
            setLoading(false);
            toast.error(error.response.data);
        }
    }

    const loadReplyComments = async (id) => {
        try {
            let { data } = await axios.post(`/api/getReplyComments`, {
                commentId: id
            })
            setReplyComments(data);
            setLoading(false);
            setBtnloading(false);
            setLoadingRemove(false);
        } catch (error) {
            console.log("error", error)
            setLoading(false);
            setBtnloading(false);
            setLoadingRemove(false);
            toast.error(error.response.data);
        }
    };

    useEffect(() => {
        if(id){
            loadComment(id)
        }
    },[id])

    const clickCommentSubmit = async(e) => {
        e.preventDefault();
        try {
            setBtnloading(true);
            const {data} = await axios.post(`/api/createReplyComment`, {
                userId: user._id,
                postId: comment.postId,
                commentId: comment._id,
                message: replyCmt,
                postName: comment.postName
            })
            setReplyCmt('');
            loadReplyComments(comment._id);
        } catch (error) {
            console.log("err", error);
            setBtnloading(false);
            toast.error(error.response.data);
        }
    }

    const removeComment = async(replyId) => {
        if(window.confirm(`Do you want to remove this comment?`)){   
            try {
                console.log("cmtId", replyId)
                setLoadingRemove(true);
                const {data} = await axios.post(`/api/remove/reply/comment`, {
                    id:replyId
                })
                if(data.success){
                    toast.success("Comment removed successfully!");
                    loadReplyComments(comment._id);
                }
            } catch (error) {
                setLoadingRemove(false);
                toast.error(error.response.data);
            }
        }
    }

    const showComment = () => (
        <div className="panel panel-default widget">
            <div className="panel-heading">
                <h4 className="panel-title">Comment</h4>
            </div>
            <div className="panel-body">
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-xs-2 col-md-1">
                                <img src="/images/userlogo.png" className="img-circle img-responsive" alt="" />
                            </div>
                            <div className="col-xs-10 col-md-11">         
                                <div className="mic-info">
                                    {comment.userId.firstName+" "+comment.userId.lastName}
                                </div>                                    
                                <div className="comment-text">
                                    {comment.message}
                                </div>
                                <div className="mic-info1">
                                    posted {moment(comment.createdAt).fromNow()}
                                </div>                           
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )

    const showAddReplyComment = () => (
        <>
            <h4>Add a Reply comment:</h4>
            <form onSubmit={clickCommentSubmit}>
                <textarea onChange={(e) => setReplyCmt(e.target.value)} value={replyCmt} className="form-control" rows="2" placeholder="write some comments" required/>
                <center>
                    <button style={{margin:'15px'}} disabled={btnloading} className="btn1 btn-success">{btnloading ? "Loading..." : "Reply"}</button>
                </center>
            </form>
        </>
    )

    const showReplyComments = () => (
                <div className="panel panel-default widget">
                    <div className="panel-heading">
                        <h4 className="panel-title">Reply Comments <span className="badge">{replyComments.length}</span></h4>
                    </div>
                    <div className="panel-body">
                        <ul className="list-group">
                            {replyComments.length ? replyComments.map((s) => (
                                  
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-xs-2 col-md-1">
                                            <img src="/images/userlogo.png" className="img-circle img-responsive" alt="" /></div>
                                        <div className="col-xs-8 col-md-10">
                                            <div>
                                                {/* <h3>Acm</h3> */}
                                                <div className="mic-info">
                                                {s.userId.firstName+" "+s.userId.lastName}
                                                </div>
                                            </div>
                                            <div className="comment-text">
                                                {s.message}
                                            </div>
                                            <div className="mic-info1">
                                                posted {moment(s.createdAt).fromNow()}
                                            </div>
                                        </div>
                                        <div className="col-xs-2 col-md-1">
                                            <span style={{cursor:'pointer', color:'red'}} onClick={() => removeComment(s._id)}><DeleteIcon /></span>
                                        </div>
                                    </div>
                                </li>
                            )) : <h2>No reply comments found</h2>}
                        </ul>
                    </div>
                </div>
    )

    const showNotFound = () => (
        <div className="row">
            <div className="col-md-12 text-center">
                <h1 style={{color:'red'}}>Comment Not Found!</h1>
            </div>
        </div>
    )

    return (

        <AdminRoute>
            <AdminLayout>
                    <Head>
                        <meta charSet="UTF-8" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Indigo | Admin-Comment Details</title>
                    </Head>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <h2 style={{textAlign:'center', color:"#106eea"}}>Comment Details</h2>                        
                            <div className="container">
                                <div className="row">
                                    {(!loading) && (comment ? showComment() : showNotFound())}
                                    {showAddReplyComment()}
                                    {(!loading) && (comment && showReplyComments())}
                                </div>
                            </div>   
                        </div>
                    </div>
                </div>
                <Backdrop className={classes.backdrop} open={loading} >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Backdrop className={classes.backdrop} open={loadingRemove} >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </AdminLayout>
        </AdminRoute>
    )
}

export default CommentDetails
