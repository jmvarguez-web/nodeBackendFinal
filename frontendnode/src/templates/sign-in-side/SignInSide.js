import  React from 'react';
import {useState} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
//import Dashboard from "../dashboard/Dashboard";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function SignInSide() {
    const [openAlert, setOpenAlert] = React.useState(false);
    const [MensajeAccion, setMensajeAccion] = React.useState('');
    const [errores, setErrores] = useState([]);
    const [severityAlert, setseverityAlert] = useState("error");

    const [loginSuccessful, setLoginSuccessful] = useState(false);
  
  
    const [formDatalogin, setFormDatalogin] = useState({
      // Inicia el estado con los campos del formulario
      email: '',
      password: ''
    });
    const URL = `http://localhost:3010/api/auth/login`;
  
    const handleNew = () => {
  
      //setOpenAlert(false);
      setErrores([]);
  
      setFormDatalogin({
        email: '',
        password: ''
      });
   
  
    };
  
    const handleChange = (e) => {
      // Actualiza el estado cuando se cambia un campo del formulario
      setFormDatalogin({
        ...formDatalogin,
        [e.target.name]: e.target.value,
      });
    };
  
    
    const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenAlert(false);
    };
  
   // Función para asociar errores con campos específicos
      const getErrorByPath = (error,path) => {
        let encontrado=false;
  
         // Verifica si 'errores' es un objeto
    if (typeof error !== 'object' || error === null) {
      console.log("Error: 'error' no es un objeto");
      return null;
    }
    encontrado = error.find((error, indice) => error.path === path);
    return encontrado ? encontrado.msg : '';
    
      };
  





      const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(URL, formDatalogin, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            console.log(response.data.token);

            setMensajeAccion("Se registeo con exito");
            setOpenAlert(true);
            setseverityAlert("success");
            handleNew();
            if(response.data.token){
              localStorage.setItem('token', response.data.token)
              setLoginSuccessful(true);
          } else {
              setLoginSuccessful(false);
              
          }
            //window.location.href = '/login';
          })
          .catch(error => {
            console.log(error.response.data.message);
            if(error.response.data.errors){
            setErrores(error.response.data.errors || []);}
            if(error.response.data.message){
              setMensajeAccion(error.response.data.message);
            }else{
            setMensajeAccion("Se genero un error");}
            setOpenAlert(true);
            setseverityAlert("warning");                  
          });
      };

  return (
    <>{loginSuccessful ? window.location.href = '/dashboard':<ThemeProvider theme={darkTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
      <Snackbar autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openAlert} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={severityAlert} sx={{ width: '100%' }}>
          {MensajeAccion}
        </Alert>
      </Snackbar>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={getErrorByPath(errores,'email') !== ''}
                value={formDatalogin ? formDatalogin.email : ''}
                onChange={handleChange}
                helperText={getErrorByPath(errores,'email')}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={getErrorByPath(errores,'password') !== ''}
                value={formDatalogin ? formDatalogin.password : ''}
                onChange={handleChange}
                helperText={getErrorByPath(errores,'password')}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>}</>
  );
}
