import App from './app';
import { IndexRoute, NoteRoute } from './routes';
import './database';

const app = new App([new IndexRoute(), new NoteRoute()]);

app.start();
