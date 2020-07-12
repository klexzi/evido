import Database from './database';
import Server from './server';

Database.connect();
Server.start();

const shutDown = cb => {
  Database.close(() => {
    Server.stop(cb);
  });
};

process.on('exit', shutDown.bind(null, process.exit));
process.on('SIGINT', shutDown.bind(null, process.exit));
process.on('uncaughtException', shutDown.bind(null, process.exit));
