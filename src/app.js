import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import socket from './socket.js'; 

const app = express();

app.use(express.static(`${__dirname}/public`));

const httpServer = app.listen(8080, () => {
    console.log('Listening on port 8080');
});

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

socket.connect(httpServer);