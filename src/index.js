const express = require('express');
const app = express();
const multer = require('multer');
const { User } = require('./models/User');


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

const callendarRoutes = require('./routes/callendar-routes');
// app.use('/home', callendarRoutes);

app.use('*', (req, res, next) => {
    console.log(`Request recebido para ${req.baseUrl} as ${new Date()}`);
    next();
})

app.get('/', (req, res) => {
    res.redirect('/login');
});


app.post('/cadastrar', upload.single('perfilpic'), async (req, res) => {
    console.log('CHEGUEI NA POSTAGEM');
    console.log({
        body: req.body,
        file: req.file.filename
    });
    // imagem?
    await User.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        perfilpic: 'images/' + req.file.filename
    })

    res.redirect('/login');
});

// const filmesRoutes = require('./routes/filmes-routes');
// app.use('/filmes', filmesRoutes);

const usersRoutes = require('./routes/user-routes');
app.use('/', usersRoutes);

app.use('*', (req, res) => {
    return res.status(404).send(`
        <h1>Sorry, not found!!!</h1>
        <a href="/filmes">VOLTAR</a>
    `);
})

const dbcon = require('./config/db-config');
console.log(dbcon);

const PORT = process.env.PORT;
// console.log({
//     PORT
// });
app.listen(PORT, () => console.log(`Server iniciado na porta ${PORT}`));

 