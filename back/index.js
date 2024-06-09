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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});