import {useContext,useState} from 'react'
import { Context } from '../context';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import {toast} from 'react-toastify'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

const ResetPassword = () => {

    const classes = useStyles();
    const {state:{user}} = useContext(Context);
    const [isloading,setisloading]  =  useState(false)

    const [values,setvalues]  = useState({
        current:'',
        password:'',
        password1:''
    });
    const {current,password,password1} = values;

    const handleChange = (e,field)=>{
        setvalues({...values,[field]:e.target.value})
    }

    const handleSubmit =async (e)=>{
            e.preventDefault();
            setisloading(true)
            try{
                let { data } = await axios.put(`/api/user/resetpassword`, {
                    current: current, 
                    password:password,
                    password1:password1
                })
                setisloading(false)
                toast.success("Successfully Updated");
                window.location.replace('/signin')
            }
            catch (error) {
                setisloading(false)
                toast.error(error.response.data);
            }
          
    }

    return (
                <>
                 <div style={{width:400}}>
                        <form className={classes.root} noValidate autoComplete="off" onSubmit={(e)=>handleSubmit(e)}>
                   
                   
                    <div>
                        <TextField
                        label="Enter current password"
                        variant="outlined"
                        size="small"
                        type='password'
                        fullWidth
                        value={current}
                        onChange={(e)=>handleChange(e,'current')}
                        />
                       
                    </div>
                    <div>
                        <TextField
                        label="Enter New password"
                        variant="outlined"
                        size="small"
                        type='password'
                        fullWidth
                        value={password}
                        onChange={(e)=>handleChange(e,'password')}
                        />
                       
                    </div>
                    <div>
                        <TextField
                        label="Repeat New password"
                        variant="outlined"
                        size="small"
                        type='password'
                        fullWidth
                        value={password1}
                        onChange={(e)=>handleChange(e,'password1')}
                        />
                       
                    </div>
                    <Button variant="contained" color="primary" type='submit' disabled={isloading}>{isloading ?'Loading' :'Change Password'}</Button>
                    </form>
                 </div>
         </>
    )
}

export default ResetPassword;