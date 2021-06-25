import { useState, useEffect, forwardRef} from 'react'
import AdminRoute from '../../pagecomponents/routes/AdminRoute'
import AdminLayout from '../../pagecomponents/layout/admin/AdminLayout'
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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {toast} from 'react-toastify'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

const ManageUsers = () => {
    
    const classes = useStyles();

    const [ btnLoading, setBtnloading] = useState(true);

    const [open, setOpen] = useState(false);

    const [error, setError] = useState('');

    const [users, setUsers] = useState([])

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

    var columns = [
       
        {title: "id", field: "_id", hidden: true},
        {title: "First Name", field: "firstName", render: rowData => {return <Link href={`/admin/user/${rowData._id}`}><a>{rowData.firstName}</a></Link>}},
        {title: "Last name", field: "lastName"},
        {title: "Email", field: "email"},
        {title: "Product Category", field: "category"},
        {title: "Role", field: "role", render: rowData => {
            if(rowData.role === 0){
                return <span>Brand</span>
            }
            else if(rowData.role === 1){
                return <span>Manufacturer</span>
            }
            else if(rowData.role === 2){
                return <span>Admin</span>
            }
        }},
        {title: "Status", field: "status", render: rowData => {
            return rowData.status === 0 ? <span>Active</span> :
            <span>Deleted</span>
        }},
        {title: "Actions", render: rowData => <Link href={`/admin/user/edit/${rowData._id}`}><a><Edit /></a></Link>},
        {title: "",render: rowData => <span style={{color:"#106eea", cursor:'pointer'}} onClick={() => destroy(rowData._id)}><DeleteOutline /></span>},
    ]

    const loadUsers = async () => {
        try {
            let { data } = await axios.get(`/api/users/list`)
            console.log("data",data)
            setUsers(data);
            setBtnloading(false);
            setError('');
            setOpen(false);

        } catch (error) {
            setBtnloading(false);
            setError(error.response.data);
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const destroy = async(userId) => {
        if(window.confirm("Do you want to delete this user?")){
            
            try {
                setBtnloading(true);
                let { data } = await axios.put(`/api/update/user/status`, {
                    userId,
                })
                toast.success("User successfully deleted.")
                setOpen(false);
                loadUsers()
            } catch (error) {
                setError(error.response.data);
                setOpen(true);
            }
        }
    }


    return (
        <AdminRoute>
        <AdminLayout>

            <div className="row">     
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            
                                    <h4 className="card-title" style={{textAlign:'center', color:"#106eea"}}>Manage Users</h4>

                                    <MaterialTable
                                    title=""/* {<Link to='/admin/add/user'>Add new user</Link>} */
                                    columns={columns}
                                    isLoading={btnLoading}
                                    data={users}
                                    icons={tableIcons}
                                    options={{
                                        pageSize:10,                    
                                    }}
                                    localization={{ body:{ emptyDataSourceMessage:<h6>No users to display</h6> } }}
                                    />

                                    <div className={classes.root}>
                                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>                                             
                                            <Alert onClose={handleClose} severity="error">{error}</Alert>                                                                                  
                                        </Snackbar>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </AdminLayout>
        </AdminRoute>
    )
}

export default ManageUsers
