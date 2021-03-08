import App from './app';
import { IndexRoute, NoteRoute, UserRoute, AuthRoute } from './routes';
import './database';

const app = new App([
	new IndexRoute(),
	new NoteRoute(),
	new UserRoute(),
	new AuthRoute(),
]);

app.start();
