const axiosCacheAdapter = require('axios-cache-adapter');
const bodyParser = require('body-parser');
const config = require('config')

const express = require('express'); 

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
let id = 0;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

  const logger = createLogger({
    level: 'debug',
    format: combine(
      label({ label: 'main' }), timestamp(),
      myFormat
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
      new transports.Console()
    ]
  });

const api = axiosCacheAdapter.setup({
    cache: {
      maxAge: 0.5 * 60 * 1000
    }
  })

let events = [];

app.post('/events', function (req, res) {
    
    const nombre = req.body['nombre'];
    const tipo = req.body['tipo'];
    const fecha = req.body['fecha'];
    const lugar = req.body['lugar'];

    let inserEvent = {}; 

    inserEvent['nombre'] = nombre; 
    inserEvent['tipo'] = tipo; 
    inserEvent['fecha'] = fecha; 
    inserEvent['lugar'] = lugar; 
    

    for (let value of Object.values(inserEvent)) {
        if (value === undefined || value.trim().length === 0) {
          res.status(400).send();
          return
        }
      }

    for (let key of Object.keys(req.body)) {
    if (inserEvent[key] === undefined) {
    const value = req.body[key].trim();

    if (value.length === 0) {
        res.status(400).send();
        return;
    }

    inserEvent[key] = value;
    }
}
    events.push(inserEvent);
    id++;
    res.send(inserEvent);
  
});

app.get('/events', (req, res) => {
const queryKey = req.query['?key=999111222'];

if (queryKey !== queryKey) {
    res.status(400).send('¡NO puedes chaval!');
    return;
}

if (tipoEvento !== undefined) {
    filteredData = tipoEvento.filter(item =>  tipoEvento);
}

if (filteredData.length === 0) {
    res.status(404).send('No hay datos para tu búsqueda, prueba otro dia');
    return;
}

});

const port = config.get('server.port');

app.listen(port, function () {
  logger.info(`Starting points of interest application listening on port ${port}`);
});