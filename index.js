const express = require("express");
const app = express();

// Twilio envia x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("Verdente online ✅");
});

app.post("/sms", (req, res) => {
  const body = (req.body.Body || "").trim();

  // Resposta em TwiML (Twilio entende isso e manda SMS de volta)
  const reply = `✅ Verdente recebeu: "${body}"`;

  res.set("Content-Type", "text/xml");
  res.status(200).send(`
    <Response>
      <Message>${reply}</Message>
    </Response>
  `);

  console.log("Inbound SMS:", { from: req.body.From, body });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Verdente listening on", PORT));
