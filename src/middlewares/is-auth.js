const isAuth = (req, res, next) => {
    if (req.session.user /* && req.session.user.type == 'admin' */) return next();
    return res.status(403).send('NAO ESTA LOGADO');
}

module.exports = { isAuth };
