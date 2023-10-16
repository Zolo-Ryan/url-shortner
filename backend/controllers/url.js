const shortid = require("shortid");
const URL = require("../models/url")

async function handleGenerateNewShortURL(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "Url is required"});

    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.render("home", {
        id: shortId,
    })
    // return res.status(201).json({ id : shortId});
}

async function handleRedirectToURL(req,res) {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate({
        shortId,
    },{
        $push : {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    });
    if(!entry) return res.status(400).json({error: "No such entry"})
    res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});

    if(!result) return res.status(400).json({error: "No such entry exists"});

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

module.exports = {
    handleGenerateNewShortURL,
    handleRedirectToURL,
    handleGetAnalytics,
}