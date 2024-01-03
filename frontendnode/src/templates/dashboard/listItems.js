import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';

import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import Libros from './Libros';
import Dashboard from './Dashboard';
import Usuario from './Usuarios';

const handleLogout = () => {
  // Borrar el token del Local Storage
  localStorage.removeItem('token');
  
  // Aquí podrías realizar otras tareas de limpieza si es necesario
  
  // Redirigir a la página de inicio de sesión u otra página relevante
  window.location.href = '/login';
};
export const mainListItems = (
  
  <React.Fragment>
    <ListItemButton component={Link} to="/dashboard" element={<Dashboard />}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboard/libros" element={<Libros />}>
      <ListItemIcon>
        <BookIcon />
      </ListItemIcon>
      <ListItemText primary="Libros" />
    </ListItemButton>
    <ListItemButton  component={Link} to="/dashboard/usuarios" element={<Usuario />}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Salir" onClick={handleLogout} />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <Link to="/" style={{ textDecoration: 'none' }}>
      <ListItemText primary="Ir a Pagina" /></Link>
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
