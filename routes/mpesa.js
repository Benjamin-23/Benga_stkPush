const router = require("express").Router()
const {
  getAccessToken,
  registerUrls,
  simulateTransaction,
} = require("../controllers/mpesaController.js");

router.post("/confirmation", (req, res) => {
  console.log("Confirmation received", req.body);
  res.json({ ResultsCode: 0, ResultsDesc: "success" });
});

router.post("/validation", async (req, res) => {
  getAccessToken();
  console.log("validation received");
  res.json({ ResultsCode: 0, ResultsDesc: "success" });
});

router.get("/register-urls", async (req, res) => {
  try {
    const response = await registerUrls();
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error, 'error');
    res.status(500).json({ error: error.message });
    // console.log(res.status(500).json({ error: error.message }));
  }
});

router.get("/simulate-payment", async (req, res) => {
  const { amount, phone, reference } = req.query;
  try {
    const response = await simulateTransaction(amount, phone, reference);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
