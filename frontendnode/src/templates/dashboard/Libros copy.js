import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems } from './listItems';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
//import Dashboard from "../dashboard/Dashboard";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListLibros from "../../components/libros/ListLibros";
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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function DashboardLibros() {
  const [open, setOpen] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [MensajeDialog, setMensajeDialog] = useState('');
  const [MensajeAccion, setMensajeAccion] = useState('');
  const [severityAlert, setseverityAlert] = useState("error");

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const URL = 'http://localhost:3010/api/auth/protected';
  //const [token, setToken] = useState(null);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };
  const handleLogout = () => {
    // Borrar el token del Local Storage
    localStorage.removeItem('token');
    
    // Aquí podrías realizar otras tareas de limpieza si es necesario
    
    // Redirigir a la página de inicio de sesión u otra página relevante
    window.location.href = '/login';
  };

  useEffect(() => {

    const storedToken = localStorage.getItem('token');

    // Verificar si el token existe en el Local Storage
    if (storedToken) {
      //setToken(storedToken);
      axios.get(URL, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        },
      })
        .then(response => {
          console.log(response.data.user);
          setMensajeAccion(`Bienvenido libros: ${response.data.user.nombre} ${response.data.user.apellido}`);
          setOpenAlert(false);
          setseverityAlert("success");
        })
        .catch(error => {
          //console.log(error);
          if(error.response.data==="Forbidden"){
            setOpenDialog(true)
            setMensajeDialog("No tiene autorización para el acceso a esta página inicie sección para validar el acceso")
            setMensajeAccion("Accesos no autorizado");
          }else if(error.response.data.message){
            setMensajeAccion(error.response.data.message);
          }else{
          setMensajeAccion("Se genero un error");}
          setOpenAlert(true);
          setseverityAlert("warning");
        });
    } else {
      
      console.warn('No se encontró un token en el Local Storage');
      setOpenDialog(true)
            setMensajeDialog("No tiene autorización para el acceso a esta página inicie sección para validar el acceso")
            setMensajeAccion("Accesos no autorizado");
      //setToken(null);
    }

  
  }, []); 

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
      <Dialog
        open={openDialog}    
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Aviso"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {MensajeDialog}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleLogout} autoFocus>
            Login
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openAlert} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={severityAlert} sx={{ width: '100%' }}>
          {MensajeAccion}
        </Alert>
      </Snackbar>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {/* {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <ListLibros/>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
