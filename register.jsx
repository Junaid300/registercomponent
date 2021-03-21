import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './SignUp.css';
import { Alert } from "@material-ui/lab";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector,connect} from 'react-redux';
import { setAlert } from '../actions/alert';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    
  },
 
  paper: {
    margin: theme.spacing(1, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
   
    margin: theme.spacing(3, 0, 2),
    backgroundColor:'#459F72',
    color:'#fff',
    fontSize:'18px',
    fontWeight:'bold'

    },
    linkText:{
      color:theme.palette.secondary.main,
     
    },
  
  
  sidebarColor:{
    backgroundColor:theme.palette.primary.main,
 
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    textAlign:'center'
  }
}));
const initialValues={
  userEmail:'',
  userName:'',
 
  userPassword:'',
  userConfirmPassword:'',
}


const validationSchema=Yup.object({
  userEmail:Yup.string().email('Invalid Email').required('Required'),
  userName:Yup.string().min(2, 'Too Short!')
  .max(50, 'Too Long!').required('Required'),
  userPassword:Yup.string().min(8, 'Too Short!').required('Required'),
  userConfirmPassword:Yup.string().required('Required').oneOf([Yup.ref('userPassword'), null], 'Passwords must match')
})
function SignUpSide({setAlert}) {
  
  const alertAction = useSelector(state=>state)
  
  const dispatch = useDispatch()
  const formik=useFormik({
    initialValues,
    onSubmit:async values=>{
      console.log("WORRKING??")
  
      const {url} = window['config']
         console.log(url)
         const userData={
           name:values.userEmail,
           email:values.userEmail,
           password:values.userPassword
         };   
          
        
        const config = {
          headers:{
            'Content-Type':'application/json'
          }
        }
        try{
        const result = await axios.post(url+'api/registeruser',userData,config)
        setAlert(result.data,"success")
        
      }
      catch(error)
      {
        setAlert("MESSAGE","error")
        console.log(error.message)
     
      }
      },
    validationSchema
  })

  const classes = useStyles();


  return (
    <Grid container component="main"  className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={false} md={5}  className={classes.sidebarColor} >
      <Typography component="h4" variant="h4" className="sideBarText"   >
           
           Your Project, we organize
          </Typography>
          </Grid>
      <Grid item xs={12} sm={12} md={7}  elevation={6} >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Sign Up
          </Typography>
         
          <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              onChange={formik.handleChange}
              value={formik.values.userEmail}
              onBlur={formik.handleBlur}
              fullWidth
              id="userEmail"
              label="Email Address"
              name="userEmail"
              autoComplete="email"
              
             
            />
             <div>
              {formik.errors.userEmail && formik.touched.userEmail ? (
                <Alert severity="error">{formik.errors.userEmail}</Alert>
              ) : null}
            </div>
             <TextField
              variant="outlined"
              margin="normal"
              onChange={formik.handleChange}
              value={formik.values.userName}
              onBlur={formik.handleBlur}
              required
              fullWidth
              id="userName"
              label="UserName"
              name="userName"
              autoComplete="user"
              
            />
 <div>
              {formik.errors.userName && formik.touched.userName ? (
                <Alert severity="error">{formik.errors.userName}</Alert>
              ) : null}
            </div>
            <TextField
              variant="outlined"
              margin="normal"
              onChange={formik.handleChange}
              value={formik.values.userPassword}
              onBlur={formik.handleBlur}
              required
              fullWidth
              name="userPassword"
              label="Password"
              type="password"
              id="userPassword"
             
            />
             <div>
              {formik.errors.userPassword && formik.touched.userPassword ? (
                <Alert severity="error">{formik.errors.userPassword}</Alert>
              ) : null}
            </div>
            <TextField
              variant="outlined"
              margin="normal"
              onChange={formik.handleChange}
              value={formik.values.userConfirmPassword}
              required
              onBlur={formik.handleBlur}
              fullWidth
              name="userConfirmPassword"
              label="Confirm Password"
              type="password"
              id="userConfirmPassword"
              autoComplete="current-password"
            />
             <div>
              {formik.values.userPassword!=formik.values.userConfirmPassword && formik.touched.userConfirmPassword ? (
                <Alert severity="error">"Password Not Match"</Alert>
              ) : null}
            </div>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
            
              type="submit"
             fullWidth
              variant="contained"
             
            color="primary"
            
            >
              Sign Up
            </Button>
            <Grid container style={{margin:'10px'}}>
              <Grid item xs >
                <Link style={{textDecoration:'none'}} 
                to="/"
                className={classes.linkText}
                variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item >
                <span >
                {"Don't have an account?"}
                </span>
                <Link to="/login" variant="body2" className={classes.linkText} style={{textDecoration:'none'}}>
                  Sign In
                </Link>
              </Grid>
            </Grid>
           
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
Register.proTypes={
  setAlert:propTypes.func.isRequired
}
export default connect(null,{setAlert})(SignUpSide)
