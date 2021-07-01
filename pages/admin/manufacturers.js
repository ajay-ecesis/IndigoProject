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
import Moment from 'react-moment';
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

const ManageManufacturers = () => {

    const [ btnLoading, setBtnloading] = useState(true);

    const [manufacturers, setManufacturers] = useState([])

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
        {title: "Manufacturer Name", field: "supplierName", render: rowData => {return <Link href={`/admin/manufacturer/${rowData._id}`}><a style={{color:"#106eea"}}>{rowData.supplierName}</a></Link>}},
        {title: "Year", field: "year"},
        {title: "Product Category", field:'category'},
        {title: "No of Employees", field: "employees"},
        {title: "Speciality", field: "speciality"},
        {title: "Daily Capacity", field: "dailyCapacity"},
        {title: "Monthly Capacity", field: "monthlyCapacity"},
        {title: "Status", field: "status", render: rowData => {
            return rowData.userId.status === 0 ? <h6 style={{color:"green"}}>Active</h6> :
            <h6 style={{color:"red"}}>Deleted</h6>
        }},
        {title: "Created At", render: rowData => {return <Moment format='DD/MM/YYYY'>{rowData.createdAt}</Moment>}},
        {title: "Updated At", render: rowData => {return <Moment format='DD/MM/YYYY'>{rowData.updatedAt}</Moment>}},
        {title: "Actions", render: rowData => <Link href={`/admin/manufacturer/edit/${rowData._id}`}><a style={{color:"#106eea"}}><Edit /></a></Link>},
        {title: "",render: rowData => {
            if(rowData.userId.status === 0){
                return <span style={{color:"red", cursor:'pointer'}} onClick={() => destroy(rowData.userId._id, 1)}><DeleteOutline /></span>
            }
            else if(rowData.userId.status === 1){
                return <h5 style={{color:"green", cursor:'pointer'}} onClick={() => destroy(rowData.userId._id, 0)}>Activate</h5>
            }
        }},
    ]

    const loadManufacturers = async () => {
        try {
            let { data } = await axios.get(`/api/getManufacturers`)
            setManufacturers(data);
            setBtnloading(false);    
        } catch (error) {
            console.log("Error", error);
            setBtnloading(false);
            toast.error(error.response.data);
        }
    };

    useEffect(() => {
        loadManufacturers()
    }, [])

    const destroy = async(userId, status) => {
        var tempStatus = "";
        if(status === 0){
            tempStatus = "activate"
        }
        else if(status === 1){
            tempStatus = "delete"
        }
        if(window.confirm(`Do you want to ${tempStatus} this brand?`)){
            try {
                setBtnloading(true);
                let { data } = await axios.put(`/api/update/user/status`, {
                    userId, status
                })
                toast.success("Brand successfully deleted.")
                loadManufacturers()
            } catch (error) {
                setBtnloading(false);
                toast.error(error.response.data);
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
                                <h4 className="card-title" style={{textAlign:'center', color:"#106eea"}}>Manage Manufacturers</h4>
                                <MaterialTable
                                    title=""
                                    columns={columns}
                                    isLoading={btnLoading}
                                    data={manufacturers}
                                    icons={tableIcons}
                                    options={{
                                        pageSize:10,                    
                                    }}
                                    localization={{ body:{ emptyDataSourceMessage:<h6>No manufacturers to display</h6> } }}
                                />
                            </div>
                        </div>
                    </div>
                </div>    
            </AdminLayout>
        </AdminRoute>
    )
}

export default ManageManufacturers
