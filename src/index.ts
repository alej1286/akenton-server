import express, { Application} from 'express';
import indexRoutes from './routes/index';
require('dotenv').config()
const cors = require('cors')


const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(indexRoutes);
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'),()=>{
console.log(`Server on PORT ${app.get('port')}`)
});