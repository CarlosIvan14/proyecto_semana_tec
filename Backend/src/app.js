import express from 'express';
import cors from 'cors';
import rutas from './routes/negocio_rutas.js';

const app = express();

//middlewares 
app.use(express.json());
app.use(cors()); // allows requests from anywhere

app.use('/api', rutas);

app.use((req, res)=>{
    res.status(404).json({
        mesagge: 'no se encontró esta ruta'
    })
});

export default app;