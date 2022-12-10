const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

// imported functions
const { recoverKey, signatureVerified, getAddress } = require("./scripts/utils");

app.use(cors());
app.use(express.json());

// Test Addresses
const balances = {
  "0x432a80460acd02ca4baf2ea33d4b36ce053f5201": 100,
  "0xfb1064895dd39d82b5cdb8cf482bf9157af8e580": 50,
  "0x8c74f2232befd678f06cea9e74ee1e1036e09e30": 75,
};

const nonces = {
  "0x432a80460acd02ca4baf2ea33d4b36ce053f5201": 0,
  "0xfb1064895dd39d82b5cdb8cf482bf9157af8e580": 0,
  "0x8c74f2232befd678f06cea9e74ee1e1036e09e30": 0,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  const nonce = nonces[address] || 0;
  res.send({ balance, nonce });
});

const signatures = new Set();

app.post("/send", (req, res) => {

  const { sender, signature, recoveryBit, message, amount, recipient } = req.body;

  if (signatures.has(signature)) {
    res.status(403).send({ message: "Signature already processed" });
  }

  const publicKey = recoverKey(message, signature, parseInt(recoveryBit));

  const isValid = signatureVerified(signature, message, publicKey);

  if (!isValid) {
    res.status(401).send({ message: "Invalid Signature" });
  }

  sender = getAddress(publicKey);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    signatures.add(signature);
    nonces[sender]++;
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender], nonce: nonces[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
