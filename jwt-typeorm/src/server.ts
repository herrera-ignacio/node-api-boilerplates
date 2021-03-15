import 'dotenv/config';
import { App } from './app';
import { IndexRoute } from './common/routes';
import { UsersRoute } from './entities/users';
import { NotesRoute } from './entities/notes';

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new NotesRoute(),
]);

app.listen();
