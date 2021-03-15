import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';
import { Route } from './common/interfaces';
import { errorMiddleware } from './common/middlewares';
import { PORT, NODE_ENV, FRONTEND_CORS_URL } from './config';

export class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = PORT;

    this.initializeMiddlewares();
    this.initializeDbConnection();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
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

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  private initializeDbConnection = (): void => {
    createConnection();
  };
}
