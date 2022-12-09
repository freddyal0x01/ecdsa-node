const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function generateRandomKeys() {
    const privateKey = secp.utils.randomPrivateKey();

    const publicKey = secp.getPublicKey(privateKey);

    const pubKey = publicKey.slice(1);
    const keccakHash = keccak256(pubKey);
    const ethAddress = keccakHash.slice(-20);

    const hexPrivKey = toHex(privateKey)
    const hexPublicKey = toHex(publicKey);
    const hexEthAddress = `0x${toHex(ethAddress)}`;

    return { hexPrivKey, hexPublicKey, hexEthAddress };
}

const { hexPrivKey, hexPublicKey, hexEthAddress } = generateRandomKeys();

console.log(`Private Key: ${hexPrivKey}`);
console.log(`Public Key: ${hexPublicKey}`);
console.log(`Ethereum Address: ${hexEthAddress}`);
