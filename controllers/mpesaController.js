const axios = require("axios");
require("dotenv").config();

let consumer_key = process.env.CONSUMER_KEY;
let consumer_secret = process.env.CONSUMER_SECRET;
let url = process.env.ACCESS_TOKEN_URL;
let registerUrl = process.env.REGISTER_URL;
let shortCode = process.env.SHORTCODE;
let confirmationUrl = process.env.CONFIRMATION_URL;
let validationUrl = process.env.VALIDATION_URL;
let simulateUrl = process.env.SIMULATE_URL;
const getAccessToken = async () => {
  const auth = Buffer.from(`${consumer_key}:${consumer_secret}`).toString(
    "base64"
  );
  const response = await axios.get(url, {
    headers: { Authorization: `Basic ${auth}` },
  });
  return response.data.access_token;
};

const registerUrls = async () => {
  const accessToken = await getAccessToken();
  const response = await axios.post(
    registerUrl,
    {
      ShortCode: shortCode,
      ResponseType: "Completed",
      ConfirmationURL: confirmationUrl,
      ValidationURL: validationUrl,
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  console.log(response.data, 'data');
  return response.data;
};


// simulateUrl
// simulate  the transcation

const simulateTransaction = async (amount, phoneNumber, reference) => {
  const accessToken = await getAccessToken();
  const response = await axios.post(
    simulateUrl,
    {
      ShortCode: shortCode,
      CommandID: "CustomerPayBillOnline",
      Amount: amount,
      Msisdn: phoneNumber,
      BillRefNumber: reference,
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
};

module.exports = { getAccessToken, registerUrls, simulateTransaction };
