const express = require('express');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
const cors=require('cors');
 
const app = express();
const PORT = 3000;
const mongoURI="mongodb+srv://sougataghar47:sitonmeloba69@cluster0.fllgfxo.mongodb.net/crud?retryWrites=true&w=majority&appName=Cluster0"
var store = new MongoDBStore({
    uri: mongoURI,
    collection: 'sessions'
  });
  app.use(cors({
    origin: 'https://mern-front-kohl.vercel.app', // frontend URL
    credentials: true,
  }));
  app.use(session({
    secret: 'This is a secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
      secure: true,          // required for cross-site cookies
      sameSite: 'none' 
    },
    store: store,
    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: true,
    saveUninitialized: true
  }));
  app.get('/home', (req,res) => {
    req.session.user = {
        id: '123',
        name: 'Alice',
      };
      res.json({msg:'Set cookies'})
  })
app.get('/users', (req, res) => {
    res.json([{ id: 1, name: 'Alice' }]);
  });
 
app.get('/users/:id', (req,res) => {
    res.json({ id: req.params.id });
})
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
 