import  React from 'react';
import {useState} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";

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

const defaultTheme = createTheme();

export default function SignIn() {

  //const history = useHistory();
  const [openAlert, setOpenAlert] = React.useState(false);
  //const [openAlertError, setOpenAlertError] = React.useState(false);
  const [MensajeAccion, setMensajeAccion] = React.useState('');
  const [errores, setErrores] = useState([]);
  const [severityAlert, setseverityAlert] = useState("error");


  const [formData, setFormData] = useState({
    // Inicia el estado con los campos del formulario
    nombre: '',
    apellido: '',
    username: '',
    email: '',
    password: ''
  });
  const URL = 'http://localhost:3010/api/users/login';

  const handleNew = () => {

    //setOpenAlert(false);
    setErrores([]);

    setFormData({
      nombre: '',
      apellido: '',
      username: '',
      email: '',
      password: ''
    });
 

  };

  const handleChange = (e) => {
    // Actualiza el estado cuando se cambia un campo del formulario
    setFormData({
      ...formData,
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
    axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setMensajeAccion("Seregisteo con exito");
        setOpenAlert(true);
        setseverityAlert("success");
        handleNew();
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
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
      <Snackbar autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openAlert} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={severityAlert} sx={{ width: '100%' }}>
          {MensajeAccion}
        </Alert>
      </Snackbar>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              error={getErrorByPath(errores,'email') !== ''}
              value={formData ? formData.email : ''}
              onChange={handleChange}
              helperText={getErrorByPath(errores,'email')}
              autoComplete="email"
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
              error={getErrorByPath(errores,'password') !== ''}
              value={formData ? formData.password : ''}
              onChange={handleChange}
              helperText={getErrorByPath(errores,'password')}
              autoComplete="current-password"
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
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
