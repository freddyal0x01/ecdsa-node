const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

async function signMessage(message, privateKey) {
    const signature = await secp.sign(message, privateKey, { recovered: true });
    return signature;
}

(async () => {
    const myArgs = process.argv.slice(2);
    const [msg, privateKey] = myArgs;

    const [sig, recoveryBit] = await signMessage(msg, privateKey);
    console.log('signature: ', toHex(sig));
    console.log('recoveryBit: ', recoveryBit);
})();
