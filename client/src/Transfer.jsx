import { useState } from "react";
import { toHex } from 'ethereum-cryptography/utils';
import server from "./server";
import { hashMessage } from "./utils";

function Transfer({ address, setBalance, nonce, setNonce }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState(0);

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const message = toHex(
      hashMessage(
        JSON.stringify({
          recipient,
          amount: parseInt(sendAmount),
          nonce: parseInt(nonce),
        })
      )
    )

    try {
      const {
        data: { balance, nonce },
      } = await server.post(`send`, {
        sender: address,
        signature,
        recoveryBit,
        message,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
      setNonce(nonce)
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Message Hash
        <span>
          {
            toHex(
              hashMessage(
                JSON.stringify({
                  recipient,
                  amount: parseInt(sendAmount),
                  nonce: parseInt(nonce),
                })
              )
            )
          }
        </span>
      </label>

      <label>
        Wallet Signature
        <input
          placeholder="Type Signature"
          value={signature}
          onChange={setValue(setSignature)}
        >
        </input>
      </label>

      <label>
        Recovery Bit
        <input
          placeholder="Type Recovery Bit"
          value={recoveryBit}
          onChange={setValue(setRecoveryBit)}
        >
        </input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
