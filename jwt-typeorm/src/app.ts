import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import cors from 'cors';
import { Route } from './interfaces';
import { PORT, NODE_ENV, FRONTEND_CORS_URL } from './config';

export class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = PORT;

    this.initializeRoutes(routes);
    this.initializeMiddlewares();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  private initializeRoutes(routes: Route[]): void {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeMiddlewares(): void {
    if (NODE_ENV === 'production') {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(morgan('combined'));
      this.app.use(cors({ origin: FRONTEND_CORS_URL, credentials: true }));
    } else {
      this.app.use(morgan('dev'));
      this.app.use(cors({ origin: `http://localhost:${PORT}`, credentials: true }));
    }
  }
}
