const express = require("express")
const{handleGetAllURL,handleGenerateNewURL, handleAnalytics,handleRedirectNewURL} = require("../controllers/url.controller")
const router = express.Router()

router.post('/shorturl',handleGenerateNewURL)
router.get("/",handleGetAllURL)
router.get('/:shortId',handleRedirectNewURL)
router.get('/analytics/:shortId',handleAnalytics)

module.exports = router