const { handleGenerateNewShortURL, handleRedirectToURL, handleGetAnalytics } = require("../controllers/url");

const router = require("express").Router();

router.post("/",handleGenerateNewShortURL);
router.get("/:shortId",handleRedirectToURL);
router.get("/analytics/:shortId",handleGetAnalytics);

module.exports = router;