const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

// imported functions
const { hashMessage, signMessage, recoverKey, signatureVerified, getAddress } = require("./scripts/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "0x432a80460acd02ca4baf2ea33d4b36ce053f5201": 100,
  // Private Key: aefd386be86021f42b299d1b51796e166f5d02670c5eec84c7ed626f38695dee
  // Public Key: 047dcd451103c8977ee3c4d6ca7be4c5580cf93bab8f1649db34060a886a07ad57b07792692e0c8a909fa0f9808cb959857fa8b31abde1b36afcf5182cdcb9298d
  "0xfb1064895dd39d82b5cdb8cf482bf9157af8e580": 50,
  // Private Key: 41817714571f8162bec2c4a0eb8e7eb22bdc39ccd09284502b119103978c7a38
  // Public Key: 04fd2717d060286c7aada2efa14adc86ce8edc3ea76aca52d1dd6274260b5d4efe71d97561d2b5ad1c3003fa8f8a889175eb5e8c44b66d6218cc7b4d29871b32f6
  "0x8c74f2232befd678f06cea9e74ee1e1036e09e30": 75,
  // Private Key: aedda98de2c280aa85339d2482cf0bfd5580c4bc6103210d9af4cd33645e3473
  // Public Key: 040e7752e669073ddb6c48a373f72f5f47ec446d93ddfabbfc79f66470cbae16d3b27642b0c64cd8f14f5028464c4be2433e8d4e0b48716359577e493abd9c8ae6
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

app.post("/send", (req, res) => {
  // TODO: Get a signature from the client-side application
  // Recover the public address from the signature
  // Make the public address your sender
  
  // Get the functions to work with the imported functions above, do after you set up client side for Transfer and Wallet Components

  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
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
