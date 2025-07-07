const shortid = require("shortid");
const URL = require("../models/url.model");

const handleGenerateNewURL = async (req, res) => {
  let shortId;
  const body = req.body;
  if (!body || !body.url) {
    return res.status(400).json({ error: "URL is required" });
  }
  const existing = await URL.findOne({
    redirectURL: body.url,
    createdBy: req.user.id,
  });
  if (existing) {
    shortId = existing.shortID;
  } else {
    shortId = shortid();

    await URL.create({
      shortID: shortId,
      redirectURL: body.url,
      visitHistory: [],
      createdBy: req.user.id,
    });
  }

  const urls = await URL.find({ createdBy: req.user.id });
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  return res.render("home", { id: shortId, urls, baseUrl });
  //return res.status(200).json({id:shortId})
};

const handleGetAllURL = async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const urls =
    req.user.role === "normal"
      ? await URL.find({ createdBy: req.user.id })
      : await URL.find();
  return res.render("home", {
    id: null,
    baseUrl: `${req.protocol}://${req.get("host")}`,
    urls,
  });
};

const handleAnalytics = async (req, res) => {
  const { shortId } = req.params;
  const entry = await URL.findOne({ shortID: shortId });

  return res.status(200).json({
    TotalClicks: entry.visitHistory.length,
    Analytics: entry.visitHistory,
  });
};

const handleRedirectNewURL = async (req, res) => {
  const { shortId } = req.params;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortID: shortId },
      { $push: { visitHistory: { timeStamp: Date.now() } } },
      { new: true } // This ensures the updated document is returned
    );

    if (!entry) {
      // Return a 404 if the entry is not found
      return res.status(404).send("Short URL not found");
    }

    return res.redirect(entry.redirectURL);
  } catch (err) {
    // Log the error and send a response
    console.error("Error redirecting URL:", err);
    return res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  handleGenerateNewURL,
  handleGetAllURL,
  handleAnalytics,
  handleRedirectNewURL,
};
