import React, { useState, useEffect } from "react";
import styled from "styled-components";
import devices from "../helpers/MediaQuery";
import DataTable, { createTheme as themetable } from 'react-data-table-component';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme as thememui } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import axios from "axios";
// import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import IconKey from '@mui/icons-material/Key';


const darkTheme = thememui({
  palette: {
    mode: 'dark',
  },
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SectionListProducts = styled.section`

display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	align-content: center;
gap: 30px;

@media only screen and ${devices.md}  {
    flex-wrap: wrap;
    flex-direction: row;
  }

  @media only screen and  ${devices.xl} {
    flex-direction: row;
  }
  @media only screen and ${devices["2xl"]} {
    flex-direction: row;
  }

`;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: '#000',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
};
themetable({
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  background: {
    default: '#002b36',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
}, 'dark');



const ListUusarios = ({ rowlibros }) => {

  const [libros, setLibros] = useState([]);
  const [open, setOpen] = useState(false);
  const [mostrarBotonNew, setMostrarBotonNew] = useState(true);
  const [mostrarBotonSave, setMostrarBotonSave] = useState(true);
  const [mostrarBotonEdit, setMostrarBotonEdit] = useState(true);
  const [mostrarBotonDelete, setMostrarBotonDelete] = useState(true);
  const [openAlert, setOpenAlert] = React.useState(false);
  //const [openAlertError, setOpenAlertError] = React.useState(false);
  const [MensajeAccion, setMensajeAccion] = React.useState('');

  const [openDialog, setOpenDialog] = useState(false);
  const [MensajeDialog, setMensajeDialog] = useState('');
  const [severityAlert, setseverityAlert] = useState("error");
  const [errores, setErrores] = useState([]);
  const [formDataUser, setFormDataUser] = useState({
    // Inicia el estado con los campos del formulario
    iduser: '',
    nombre: '',
    apellido: '',
    username: '',
    email: '',
    password: '',
    accion: 'list'
  });
  const URL = 'http://localhost:3010/api/users';


  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const handleCloseAlertError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleChange = (e) => {
    // Actualiza el estado cuando se cambia un campo del formulario
    setFormDataUser({
      ...formDataUser,
      [e.target.name]: e.target.value,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem('token');
    /**
     *
     * insertar nuevo registro
     *
     */


    axios.post(URL, formDataUser, {
      headers: {
        'Authorization': `Bearer ${storedToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {

        setOpenAlert(true);
        setMensajeAccion('Se ha registrado un nuevo usuario con clave: ' + response.data.id);
        setseverityAlert("success");
        handleNew();
        showDataUser();
      })
      .catch(error => {
        console.log(error.response.data.message);
            if(error.response.data.errors){
            setErrores(error.response.data.errors || []);}
            if(error.response.data.message){
              setMensajeAccion(error.response.data.message);
            }else{
            setMensajeAccion("Se genero un error");}
        setseverityAlert("warning");
        setOpenAlert(true);

      });




  };



  const handleNew = () => {

    setOpenAlert(false);
    setErrores([]);

    setFormDataUser({
      iduser: '',
      nombre: '',
      apellido: '',
      username: '',
      email: '',
      password: '',
    });
    setMostrarBotonNew(false);
    setMostrarBotonSave(true);
    setMostrarBotonEdit(false);
    setMostrarBotonDelete(false);
    console.log("nuevo");

  };

  const handleEdit = (libro) => {
    const storedToken = localStorage.getItem('token');
    /**
     *
     * Editar libro seleccionado
     *
     */


    axios.patch(URL + `/${formDataUser.iduser}`, formDataUser, {
      headers: {
        'Authorization': `Bearer ${storedToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setOpenAlert(true);
        console.log("editar",response.data);
        setMensajeAccion('Se ha editado el usuario con clave: ' + response.data.iduser);
        setseverityAlert("success");
        showDataUser();
      })
      .catch(error => {
        console.log(error.response.data.message);
        if(error.response.data.errors){
        setErrores(error.response.data.errors || []);}
        if(error.response.data.message){
          setMensajeAccion(error.response.data.message);
        }else{
        setMensajeAccion("Se genero un error");}
      
        setseverityAlert("warning");
        setOpenAlert(true);

      });


  };

  const handleDelete = (libro) => {
   
   /**
    *
    * Eliminar registro
    *
    */
   const storedToken = localStorage.getItem('token');
   axios.delete(URL + `/${formDataUser.iduser}`, formDataUser, {
    headers: {
      'Authorization': `Bearer ${storedToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      setOpenAlert(false);
     
      if(response.status===204){
        setOpenAlert(true);
        setMensajeAccion('Se ha Eliminado el usuario con clave: ',formDataUser.iduser );
        setseverityAlert("success");
        handleNew();
      }else{
        setOpenAlert(true);
        setMensajeAccion('No se pudo Eliminar el usuario con clave: ',formDataUser.iduser );
      }
      
      showDataUser();
    })
    .catch(error => {
      console.log(error.response.data.message);
      if(error.response.data.errors){
      setErrores(error.response.data.errors || []);}
      if(error.response.data.message){
        setMensajeAccion(error.response.data.message);
      }else{
      setMensajeAccion("Se genero un error");}
      setseverityAlert("warning");
      setOpenAlert(true);

    });

   

  };


  /**habre la modal del formulario con los datos del libro */
  const handleOpen = (libro) => {
    setErrores([]);
    setFormDataUser(libro);
    setOpenAlert(false);
    setMostrarBotonNew(true);
    setMostrarBotonSave(false);
    setMostrarBotonEdit(true);
    setMostrarBotonDelete(true);
    setOpen(true);
  };
  /**cierra modal */
  const handleClose = () => setOpen(false);



  const showDataUser = async () => {

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
          console.log(response);
          setLibros(response.data);
          //
          setMensajeAccion(`Lista de Usuarios`);
          setOpenAlert(true);
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

  }

  useEffect(() => {
    showDataUser();
  }, [])

  //3 - Configuramos las columns para Datatable

//iduser, nombre, apellido, username, email, password
  const columns = [
    {

      cell: (row) => <Button variant="contained" color="success" onClick={() => handleOpen(row)}>ver</Button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'ID',
      selector: row => row.iduser
    }, {
      name: 'NOMBRE',
      sortable: true,
      selector: row => row.nombre
    }, {
      name: 'APELLIDO',
      sortable: true,
      selector: row => row.apellido
    }, {
      name: 'USERNAME',
      selector: row => row.username
    }, {
      name: 'EMAIL',
      selector: row => row.email
    }

  ]
  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };



  //4 - Mostramos la data en DataTable
  return (
    <div> <SectionListProducts >
      <DataTable

        title="Lista de Usuarios"
        defaultSortFieldId={1}
        columns={columns}
        data={libros}
        theme="dark"
        pagination paginationComponentOptions={paginationComponentOptions}
        highlightOnHover
        pointerOnHover
      />

    </SectionListProducts>
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
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          handleCloseAlert();
          handleCloseAlertError();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <React.StrictMode>
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Typography id="modal-modal-title" variant="h4" >

              </Typography>

              <ThemeProvider theme={darkTheme}>
                <CssBaseline />

                <Typography variant="h6" >


                </Typography>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                <TextField
                  
                  id="iduser"
                  name="iduser"
                  label="Clave"
                  fullWidth
                  variant="filled"
                  value={formDataUser ? formDataUser.iduser : ''}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: true,
                  }}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  id="nombre"
                  name="nombre"
                  label="nombre"
                  fullWidth
                  value={formDataUser ? formDataUser.nombre : ''}
                  onChange={handleChange}
                  error={getErrorByPath(errores,'nombre') !== ''}
                  helperText={getErrorByPath(errores,'nombre')}
                  
                />
              </Grid>

          <Grid container spacing={4}></Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            
            id="apellido"
            name="apellido"
            label="apellido"
            fullWidth
            value={formDataUser ? formDataUser.apellido : ''}
            onChange={handleChange}
            error={getErrorByPath(errores,'apellido') !== ''}
            helperText={getErrorByPath(errores,'apellido')}
            />
          </Grid>
          <Grid item xs={12} >
            <TextField
            
            id="username"
            name="username"
            label="username"
            fullWidth
            value={formDataUser ? formDataUser.username : ''}
            onChange={handleChange}
            error={getErrorByPath(errores,'username') !== ''}
            helperText={getErrorByPath(errores,'username')}
            
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
            
            id="email"
            name="email"
            label="email"
            fullWidth
            value={formDataUser ? formDataUser.email : ''}
            onChange={handleChange}
            error={getErrorByPath(errores,'email') !== ''}
            helperText={getErrorByPath(errores,'email')}
            
            />
              </Grid>
              <Grid item xs={12}>
            <TextField
            
            id="password"
            name="password"
            label="Nueva contraseña"
            type="password"
            autoComplete="new-password" 
            fullWidth
            onChange={handleChange}
            error={getErrorByPath(errores,'password') !== ''}
            helperText={getErrorByPath(errores,'password')}
            
            />
              </Grid>

      
            </Grid>
                <Grid container spacing={4}>
                  <Grid item xs={3}>
                    {mostrarBotonSave && (
                      <Button type="submit" disabled={!mostrarBotonSave} variant="outlined" color="primary" sx={{ marginTop: '30px' }}>
                        GUARDAR
                      </Button>)}
                    {mostrarBotonNew && (
                      <Button disabled={!mostrarBotonNew} onClick={handleNew} variant="outlined" color="primary" sx={{ marginTop: '30px' }}>
                        Nuevo
                      </Button>)}
                  </Grid>
                  <Grid item xs={3}>
                    <Button disabled={!mostrarBotonEdit} onClick={() => handleEdit(formDataUser)} variant="outlined" color="primary" sx={{ marginTop: '30px' }}>
                      Editar
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button disabled={!mostrarBotonDelete} onClick={() => handleDelete(formDataUser)} variant="outlined" color="primary" sx={{ marginTop: '30px' }} >
                      Eliminar
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="outlined" onClick={handleClose} color="primary" sx={{ marginTop: '30px' }} >
                      Cancelar
                    </Button>
                  </Grid>
                </Grid></ThemeProvider>
            </form>
          </Box>

        </React.StrictMode>
      </Modal>
    </div>
  );
}


export default ListUusarios;

