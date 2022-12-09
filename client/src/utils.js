import secp from "ethereum-cryptography/secp256k1";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";


// TODO: Generate a signature, nonce, and recovery bit
// Done: 12-7-2022

export function hashMessage(message) {
    let bytes = utf8ToBytes(message);
    let hash = keccak256(bytes);
    return hash;
}

export function getAddress(publicKey) {
    const pubKey = publicKey.slice(1);
    const keccakHash = keccak256(pubKey);
    const ethAddress = keccakHash.slice(-20);
    const hexEthAddress = `0x${toHex(ethAddress)}`;
    return hexEthAddress;
}
