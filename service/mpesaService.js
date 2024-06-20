const axios = require("axios");

class MpesaService {
  constructor() {
    this.consumer_key = process.env.CONSUMER_KEY;
    this.consumer_secret = process.env.CONSUMER_SECRET;
    this.url = process.env.ACCESS_TOKEN;
    this.registerUrl = process.env.REGISTER_TOKEN;
    this.shortCode = process.env.SHORT_CODE;
    this.confirmationUrl = process.env.CONFIRMATION_URL;
    this.validationUrl = process.env.VALIDATION_URL;
    this.simulateUrl = process.env.SIMULATE_URL;
  }
}

const getAccessToken = async (req, res, next) => {
  // sandbox validation url

  //   from a buffer for the key and  secret

  let buffer = new Buffer.from(
    `${this.consumer_key} + ":" + ${this.consumer_secret}`
  );
  let auth = `Basic ${buffer.toString("base64")}`;

  try {
    let { data } = await axios.get(this.url, {
      headers: {
        Authorization: auth,
      },
    });
    console.log("token", data.access_token);
    return data.data.access_token;
  } catch (err) {
    return res.send({
      success: false,
      // message: err["response"], ["statusText"]
    });
  }
};

const registerUrls = async () => {
  const accessToken = await getAccessToken();
  const response = await axios.post(
    this.registerUrl,
    {
      ShortCode: this.shortCode,
      ResponseType: "Complete",
      ConfirmationURL: this.confirmationUrl,
      ValidationURL: this.validationUrl,
    },
    { headers: { Authotization: `Bearer ${accessToken}` } }
  );

  return response.data;
};

const simulateTransaction = async (amount, phoneNum, reference) => {
  const accessToken = await getAccessToken();
  const response = await axios.post(
    this.simulateUrl,
    {
      ShortCode: shortCode,
      CommandID: "CustomerPayBillOnline",
      Amount: amount,
      Msisdn: phoneNum,
      BillRefNumber: reference,
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
};

module.exports = { getAccessToken, MpesaService };
