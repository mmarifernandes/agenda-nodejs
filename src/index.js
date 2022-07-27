const express = require('express');
const app = express();
const multer = require('multer');
const { User, UserDAO } = require('./models/User');
const bcrypt = require('bcrypt');


const upload = multer({ dest: 'public/images' });

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());

const session = require('express-session');
app.use(session({
    secret: 'chave secreta de criptografia',
    resave: false, 
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}))

app.use(express.static('public'));



app.use('*', (req, res, next) => {
    console.log(`Request recebido para ${req.baseUrl} as ${new Date()}`);
    next();
})

app.get('/', (req, res) => {
    res.redirect('/login');
});


app.post('/cadastrar', upload.single('perfilpic'), async (req, res) => {
    // console.log('CHEGUEI NA POSTAGEM');
    // console.log({
    //     body: req.body,
    //     file: req.file.filename
    // });
    // imagem?
    const senha = bcrypt.hashSync(req.body.senha, 10);
    const pessoa = {
          nome: req.body.nome,
              email: req.body.email,
              senha,
              perfilpic: 'images/' + req.file.filename
    }
    await UserDAO.cadastrar({
        nome: req.body.nome,
        email: req.body.email,
        senha,
        perfilpic: 'images/' + req.file.filename
    })
    req.session.user = pessoa
    console.log(req.session.user)
    res.redirect('/empresas');
});

// const filmesRoutes = require('./routes/filmes-routes');
// app.use('/filmes', filmesRoutes);
const empresasRoutes = require('./routes/empresa-routes');
app.use('/empresa', empresasRoutes);

const callendarRoutes = require('./routes/callendar-routes');
app.use('/agenda', callendarRoutes);

const usersRoutes = require('./routes/user-routes');
app.use('/', usersRoutes);

app.use('*', (req, res) => {
    return res.status(404).send(`
        <h1>Sorry, not found!!!</h1>
        <a href="/filmes">VOLTAR</a>
    `);
})

const dbcon = require('./config/connection-db');
console.log(dbcon);

const PORT = process.env.PORT;
// console.log({
//     PORT
// });
app.listen(PORT, () => console.log(`Server iniciado na porta ${PORT}`));

 