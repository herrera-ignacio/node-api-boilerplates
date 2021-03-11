import 'dotenv/config';
import { App } from './app';
import { IndexRoute } from './common/routes';
import { UsersRoute } from './entities/users';

const app = new App([new IndexRoute(), new UsersRoute()]);

app.listen();
