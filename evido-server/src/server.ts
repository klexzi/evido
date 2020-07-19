import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { Server as HttpServer } from 'http';

import schema from './schemas/index';

class Server {
  app: express.Application;
  apollo: ApolloServer;
  server: HttpServer;

  constructor() {
    this.app = express();
    this.apollo = new ApolloServer({
      schema,
      playground: true,
    });
    this._middleware();
    this._routes;
  }

  _middleware() {
    this.app.use(cors());
    this.app.use(logger('dev'));
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.apollo.applyMiddleware({ app: this.app });
  }

  _routes() {
    const router = express.Router();
    this.app.use('/', router);
  }

  start(cb = () => null) {
    const port = process.env.PORT || 4000;

    this.server = this.app.listen(port, () => {
      // tslint:disable-next-line
      console.log(`🔥 Server running on port ${port}...`);
      cb();
    });
  }

  stop(cb = () => null) {
    if (this.server) {
      this.server.close(cb);
    }
  }
}

export default new Server();
