import express from 'express';
import librosRoutes from './routes/libros.routes.js'
import indexRoutes from './routes/index.routes.js'
import autoresRoutes from './routes/autores.routes.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import cors  from 'cors';


//import autoresRoutes from './routes/autores.routes.js'
const app =express();
const corsOptions = {
    origin: ['http://localhost:3000','http://localhost:3010', 'https://react-jmvarguez.netlify.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Habilita el intercambio de cookies a través de dominios
  };
  
app.use(cors(corsOptions));
app.use(express.json())

app.use(indexRoutes)
app.use('/api',librosRoutes)
app.use('/api',autoresRoutes)
app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use((req, res, next) => {
    res.status(404).json({ message: "EndPoin no encontrado" });
});

export default app;