import { useState, useEffect, forwardRef} from 'react'
import AdminRoute from '../../pagecomponents/routes/AdminRoute'
import AdminLayout from '../../pagecomponents/layout/admin/AdminLayout'
import Head from "next/head";
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
import Button from '@material-ui/core/Button';
import {toast} from 'react-toastify'
import Moment from 'react-moment';

const ManageMarkets = () => {

    const [ btnLoading, setBtnloading] = useState(true);

    const [markets, setMarkets] = useState([])

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
        {title: "Market Name", field: "marketName"},
        {title: "Added By", render: rowData => {return <span>{rowData.addedBy.firstName+" "+rowData.addedBy.lastName}</span>}},
        {title: "Status", field: "status", render: rowData => {
            return rowData.status === 0 ? <span>Active</span> :
            <span>Deleted</span>
        }},
        {title: "Created At", render: rowData => {return <Moment format='DD/MM/YYYY'>{rowData.createdAt}</Moment>}},
        {title: "Updated At", render: rowData => {return <Moment format='DD/MM/YYYY'>{rowData.updatedAt}</Moment>}},
        {title: "Actions", render: rowData => <Link href={`/admin/market/edit/${rowData._id}`}><a style={{color:"#106eea"}}><Edit /></a></Link>},
        {title: "",render: rowData => {
            if(rowData.status === 0){
                return <span style={{color:"red", cursor:'pointer'}} onClick={() => destroy(rowData._id, 1)}><DeleteOutline /></span>
            }
            else if(rowData.status === 1){
                return <h5 style={{color:"green", cursor:'pointer'}} onClick={() => destroy(rowData._id, 0)}>Activate</h5>
            }
        }},
    ]

    const loadMarket = async () => {
        try {
            let { data } = await axios.get(`/api/get/markets`)
            setMarkets(data);
            setBtnloading(false);
        } catch (error) {
            setBtnloading(false);
            toast.error(error.response.data);
        }
    };

    useEffect(() => {
        loadMarket()
    }, [])

    const destroy = async(id, status) => {
        var tempStatus = "";
        if(status === 0){
            tempStatus = "activate"
        }
        else if(status === 1){
            tempStatus = "delete"
        }
        if(window.confirm(`Do you want to ${tempStatus} this market?`)){   
            try {
                setBtnloading(true);
                let { data } = await axios.put(`/api/remove/market`, {
                    id, status
                })
                toast.success("Market successfully deleted.")
                loadMarket()
            } catch (error) {
                setBtnloading(false);
                console.log(error);
                toast.error(error.response.data);
            }
        }
    }

    return (
        <AdminRoute>
            <AdminLayout>
                <Head>
                        <meta charSet="UTF-8" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Indigo | Admin-Markets</title>
                </Head>
                <div className="row">     
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">                              
                                <h4 className="card-title" style={{textAlign:'center', color:"#106eea"}}>Manage Markets</h4>                          
                                        
                                <MaterialTable
                                    title={<Link href='/admin/market/add'><a style={{color:"#106eea"}}>Add New Market</a></Link>}
                                    columns={columns}
                                    isLoading={btnLoading}
                                    data={markets}
                                    icons={tableIcons}
                                    options={{
                                        pageSize:10,                    
                                    }}
                                    localization={{ body:{ emptyDataSourceMessage:<h6>No markets to display</h6> } }}
                                />

                            </div>
                        </div>
                    </div>
                </div>      
            </AdminLayout>
        </AdminRoute>
    )
}

export default ManageMarkets
