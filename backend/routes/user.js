const router = require("express").Router();
const { handleUserSignup,handleUserLogin } = require("../controllers/user");

router.post("/",handleUserSignup);
router.post("/login",handleUserLogin);

module.exports = router;