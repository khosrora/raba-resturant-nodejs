exports.isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    return next();
}

exports.authenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/");
    }
    return next();
}

exports.auth = (req, res, next) => {
    if (req.user) {
        auth = true;
        next();
    } else {
        auth = false;
        next();
    }
}



exports.isAdmin = (req, res, next) => {
    if (req.user.isAdmin === false) {
        res.redirect("/")
    } else {
        next();
    }
}

exports.isUser = (req, res, next) => {
    if (req.user.isAdmin === true) {
        res.redirect("/")
    } else {
        next();
    }
}



