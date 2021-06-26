import { useState, useEffect, forwardRef} from 'react'
import BrandRoute from '../../pagecomponents/routes/BrandRoute'
import BrandLayout from '../../pagecomponents/layout/brand/BrandLayout'
import Link from 'next/link'
import axios from 'axios'
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {toast} from 'react-toastify'
import Moment from 'react-moment';

const SavedPosts = () => {

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    const [savedPosts, setSavedPosts] = useState([]);

    const [loading, setLoading] = useState(true);

    var columns = [
        {title:"id", field:"_id", hidden:true},
        {title: "Post Name", field: "postName", render: rowData => {return <Link  href={`/post/${rowData.postSlug}`}><a style={{color:"#106eea"}}>{rowData.postName}</a></Link>}},
        {title: "Created At", field: "createdAt", render: rowData => {return <Moment format='DD/MM/YYYY'>{rowData.createdAt}</Moment>}},
        {title: "Actions",render: rowData => <span style={{color:"#106eea", cursor:'pointer'}} onClick={() => destroy(rowData._id)}><DeleteOutline /></span>},
    ]

    const loadSavedPosts = async () => {
        try {
            const { data } = await axios.get(`/api/user/saved/posts`);
            console.log("Data", data);
            setSavedPosts(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data)
        }
    }

    useEffect(() => {
        loadSavedPosts();
    })

    const destroy = async(id) => {
        if(window.confirm("Do you want to remove this post rom your Saved Posts?")){      
            try {
                setLoading(true);
                let { data } = await axios.delete(`/api/user/saved/post`,{
                    id
                })
                toast.success("Post successfully remove from your Saved Posts.")
                setOpen(false);
                loadUsers()
            } catch (error) {
                toast.error(error.response.data);
                setOpen(true);
            }
        }
    }

    return (
        <BrandRoute>
            <BrandLayout>
                <div className="row">     
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">                             
                                <h4 className="card-title" style={{textAlign:'center', color:"#106eea"}}>Saved Posts</h4>
                                    <MaterialTable
                                        title=""/* {<Link to='/admin/add/user'>Add new user</Link>} */
                                        columns={columns}
                                        isLoading={loading}
                                        data={savedPosts}
                                        icons={tableIcons}
                                        options={{
                                            pageSize:10,                    
                                        }}
                                        localization={{ body:{ emptyDataSourceMessage:<h6>No Saved posts to display</h6> } }}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </BrandLayout>
        </BrandRoute>
    )
}

export default SavedPosts