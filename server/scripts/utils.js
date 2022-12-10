const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");


function recoverKey(message, signature, recoveryBit) {
    const publicKey = secp.recoverPublicKey(message, signature, recoveryBit);
    return publicKey;
}

function signatureVerified(signature, message, publicKey) {
    const isVerified = secp.verify(signature, message, publicKey);
    return isVerified;
}

function getAddress(publicKey) {
    const pubKey = publicKey.slice(1);
    const keccakHash = keccak256(pubKey);
    const ethAddress = keccakHash.slice(-20);
    const hexEthAddress = `0x${toHex(ethAddress)}`;
    return hexEthAddress;
}

module.exports = { recoverKey, signatureVerified, getAddress };