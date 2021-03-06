import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { httpErrorMiddleware } from './middlewares';

class App {
	constructor(routes) {
		this.app = express();
		this.port = process.env.PORT || 3000;
		this.dev = process.env.NODE_ENV === 'production' ? false : true; 

		this.setMiddlewares();
		this.setRoutes(routes);
		this.setErrorHandling();
	}

	listen() {
		this.app.listen((this.port), () => {
			console.log(`🚀 App listening on the port ${this.port}`);
		});
	}

	setRoutes(routes) {
		routes.forEach((route) => {
			this.app.use('', route.router);
		})
	}

	setErrorHandling() {
		this.app.use(httpErrorMiddleware);
	}

	setMiddlewares() {
		if (this.dev) {
			this.app.use(morgan('dev'));
			this.app.use(cors({ origin: `http://localhost:${this.port}`, credentials: true }));
		} else {
			this.app.use(morgan('combined'));
			this.app.use(helmet());
			this.app.use(cors({ origin: process.env.FRONTEND_CORS_URL, credentials: true }))
		}

		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}
}

export default App;
