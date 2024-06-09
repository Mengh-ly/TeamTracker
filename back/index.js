const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());

app.use(express.json()); 

const db = require('./db'); 

const defaultroute = require('./routes/default/default');
app.use('/api/default', defaultroute);

const login = require('./routes/auth/login');
app.use('/api/login', login);

const register = require('./routes/auth/register');
app.use('/api/register', register);

const userGetData = require('./routes/user/user');
app.use('/api/user', userGetData);

const creategroupe = require('./routes/groupe/groupe');
app.use('/api/creategroupe', creategroupe);

const checkGroupe = require('./routes/user/checkGroupe');
app.use('/api/checkgroupe', checkGroupe);

const checkleader = require('./routes/groupe/checkleader');
app.use('/api/checkleader', checkleader);

const deletegroupe = require('./routes/groupe/deletegroupe');
app.use('/api/deletegroupe', deletegroupe);

const leavegroupe = require('./routes/groupe/leavegroupe');
app.use('/api/leavegroupe', leavegroupe);

const gettitlegroupe = require('./routes/user/getTitleGroupe');
app.use('/api/gettitlegroupe', gettitlegroupe);

const membreGroupe = require('./routes/groupe/membregroupe');
app.use('/api/membregroupe', membreGroupe);

const checkPlanning = require('./routes/planning/checkplanning');
app.use('/api/checkplanning', checkPlanning);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});