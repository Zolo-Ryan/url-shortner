const { getUser } = require("../service/auth");

function checkForAuthentication(req,res,next){
    // const authorizationHeaderValue = req.headers["authorizaion"];
    const tokenCookie = req.cookies?.uid;

    // if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer"))
        // next();

    if(!tokenCookie) next();

    // const token = authorizationHeaderValue.split("Bearer ")[1];
    const user = getUser(tokenCookie);

    req.user = user;
    return next();
}

function restrictTo(roles = []){
    return function(req,res,next){
        if(!req.user) return res.redirect("/");

        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

        next();
    }
}

// async function restrictToLoggedInUserOnly(req,res,next){
//     // const userUid = req.cookies?.uid;
    
//     const userUid = req.headers["authorization"];
//     // console.log(userUid);
    
//     if(!userUid) return res.redirect("/login");
//     const token = userUid.split("Bearer ")[1];
//     // const user = getUser(userUid);
//     const user = getUser(token);
//     if(!user) return res.redirect("/login");
    
//     req.user = user;
//     next();
// }

// async function checkAuth(req,res,next){
//     // const userUid = req.cookies?.uid;
    
//     const userUid = req.headers["authorization"];
//     const token = userUid.split("Bearer ")[1];
//     const user = getUser(token);

//     // const user = getUser(userUid);

//     req.user = user;
//     next();
// }

// module.exports = {
//     restrictToLoggedInUserOnly,
//     checkAuth
// }

module.exports = {
    checkForAuthentication,
    restrictTo
}