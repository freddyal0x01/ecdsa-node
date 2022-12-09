const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const keccak256 = require("ethereum-cryptography/keccak");


// TODO: Generate a signature, nonce, and recovery bit
// Done: 12-7-2022

function hashMessage(message) {
    let bytes = utf8ToBytes(message);
    let hash = keccak256(bytes);
    return hash;
}

async function signMessage(message) {
    const hash = hashMessage(message);
    const signature = await secp.sign(hash, privKey, options ={
        recovered: true
    })
    return signature;
}

async function recoverKey(message, signature, recoveryBit) {
    const hash = hashMessage(message);
    const publicKey = secp.recoverPublicKey(hash, signature, recoveryBit);
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

module.exports = hashMessage, signMessage, recoverKey, signatureVerified, getAddress;