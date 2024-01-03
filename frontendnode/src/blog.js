import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './templates/blog/Header';
import MainFeaturedPost from './templates/blog/MainFeaturedPost';
import FeaturedPost from './templates/blog/FeaturedPost';
import Main from './templates/blog/Main';
import Sidebar from './templates/blog/Sidebar';
import Footer from './templates/blog/Footer';


const sections = [
  { title: 'Tecnología', url: '#' },
  { title: 'Diseño', url: '#' },
  { title: 'Cultura', url: '#' },
  { title: 'Negocios', url: '#' },
  { title: 'Política', url: '#' },
  { title: 'Opinión', url: '#' },
  { title: 'Ciencia', url: '#' },
  { title: 'Salud', url: '#' },
  { title: 'Estilo', url: '#' },
  { title: 'Viajes', url: '#' },
];

const mainFeaturedPost = {
  title: 'Título de una entrada destacada más larga del blog',
  description:
    'Múltiples líneas de texto que forman el titular, informando rápidamente y de manera eficiente a los nuevos lectores sobre lo más interesante en el contenido de esta entrada.',
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'descripción de la imagen principal',
  linkText: 'Seguir leyendo…',
};

const featuredPosts = [
  {
    title: 'Entrada destacada',
    date: 'Nov 12',
    description:
      'Esta es una tarjeta más amplia con texto de apoyo debajo como una introducción natural al contenido adicional.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Texto de la imagen',
  },
  {
    title: 'Título de la entrada',
    date: 'Nov 11',
    description:
      'Esta es una tarjeta más amplia con texto de apoyo debajo como una introducción natural al contenido adicional.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Texto de la imagen',
  },
];


const sidebar = {
  title: 'Acerca de',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'Marzo 2020', url: '#' },
    { title: 'Febrero 2020', url: '#' },
    { title: 'Enero 2020', url: '#' },
    { title: 'Noviembre 1999', url: '#' },
    { title: 'Octubre 1999', url: '#' },
    { title: 'Septiembre 1999', url: '#' },
    { title: 'Agosto 1999', url: '#' },
    { title: 'Julio 1999', url: '#' },
    { title: 'Junio 1999', url: '#' },
    { title: 'Mayo 1999', url: '#' },
    { title: 'Abril 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

// TODO remove, this demo shouldn't need to reset the theme.
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function blog() {
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="From the firehose"  />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
