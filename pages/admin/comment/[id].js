import { useState, useEffect } from 'react'
import AdminRoute from '../../../pagecomponents/routes/AdminRoute'
import AdminLayout from '../../../pagecomponents/layout/admin/AdminLayout'
import { useRouter } from 'next/router'
import {toast} from 'react-toastify'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

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

    const [loading, setLoading] = useState(true);

    const [comment, setComment] = useState([]);

    const [replyComments, setReplyComments] = useState([]);

    const loadComment = async(id) => {
        try {
            let { data } = await axios.post(`/api/getUserComment`, {
                id
            })
            console.log("data", data)
            setComment(data);
            loadReplyComments(data._id)
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

        } catch (error) {
            console.log("error", error)
            setLoading(false);
            toast.error(error.response.data);
        }
    };

    useEffect(() => {
        if(id){
            loadComment(id)
        }
    },[id])

    const showCommentDetails = () => (
        <div className="card mb-4 bord-line">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                        <h2>{comment.postName}</h2>
                        <h3>{comment.message}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Reply By</th>
                                    <th>Comment</th>
                                    <th>Commented At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {replyComments.length && replyComments.map((s) => (
                                    <tr key={s._id}>
                                        <td>{s.userId.firstName+" "+s.userId.lastName}</td>
                                        <td>{s.message}</td>
                                        <td>{s.createdAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )

    return (

        <AdminRoute>
            <AdminLayout>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                        <h2 style={{textAlign:'center', color:"#106eea"}}>Comment Details</h2>
                        {(!loading && comment._id) && showCommentDetails()}
                        </div>
                    </div>
                </div>
                <Backdrop className={classes.backdrop} open={loading} >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </AdminLayout>
        </AdminRoute>
    )
}

export default CommentDetails
