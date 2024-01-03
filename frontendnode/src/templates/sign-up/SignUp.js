import  React from 'react';
import {useState} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
//import { useHistory } from 'react-router-dom';



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        jmvarguez
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


export default function SignUp() {
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
  const URL = 'http://localhost:3010/api/auth/user';

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


  
  const handleSubmit = (event) => {
    event.preventDefault();
    /*const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });*/
    
    axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setMensajeAccion("Se registro con exito");
        setOpenAlert(true);
        setseverityAlert("success");
        handleNew();
        window.location.href = '/login';
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

  return (
    <ThemeProvider theme={darkTheme}>
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
            
Inscribirse
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={getErrorByPath(errores,'nombre') !== ''}
                  autoComplete="given-name"
                  name="nombre"
                  required
                  fullWidth
                  id="nombre"
                  value={formData ? formData.nombre : ''}
                  onChange={handleChange}
                  label="Nombre"
                  autoFocus
                  helperText={getErrorByPath(errores,'nombre')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={getErrorByPath(errores,'apellido') !== ''}
                  required
                  fullWidth
                  id="apellido"
                  value={formData ? formData.apellido : ''}
                  onChange={handleChange}
                  label="Apellido"
                  name="apellido"
                  autoComplete="family-name"
                  helperText={getErrorByPath(errores,'apellido')}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  error={getErrorByPath(errores,'username') !== ''}
                  required
                  fullWidth
                  id="username"
                  value={formData ? formData.username : ''}
                  onChange={handleChange}
                  label="Nombre de usuario"
                  name="username"
                  autoComplete="family-name"
                  helperText={getErrorByPath(errores,'username')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={getErrorByPath(errores,'email') !== ''}
                  required
                  fullWidth
                  id="email"
                  value={formData ? formData.email : ''}
                  onChange={handleChange}
                  label="Dirección de correo"
                  name="email"
                  autoComplete="email"
                  helperText={getErrorByPath(errores,'email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={getErrorByPath(errores,'password') !== ''}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formData ? formData.password : ''}
                  onChange={handleChange}
                  autoComplete="new-password"
                  helperText={getErrorByPath(errores,'password')}
                />
              </Grid>
      
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              
Inscribirse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
