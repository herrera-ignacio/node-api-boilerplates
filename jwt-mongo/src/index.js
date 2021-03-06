import dotenv from 'dotenv';
import App from './app';
import { IndexRoute, NoteRoute } from './routes';

dotenv.config();

const app = new App([new IndexRoute(), new NoteRoute()]);

app.listen();
