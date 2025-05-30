import CryptoJS from "crypto-js";
import LZString from "lz-string";
const keysmart = process.env.REACT_APP_KEY_DECRYPT_SMART;

const isBase64 = (str) => {
  try {
    // Validasi string Base64
    return btoa(atob(str)) === str;
  } catch (error) {
    return false;
  }
};

const decryptKeysAndValues = (encryptedData) => {
  const keyUtf8 = CryptoJS.enc.Utf8.parse(keysmart);
  const iv = CryptoJS.enc.Utf8.parse("\0".repeat(16));

  const decryptedData = {};

  for (const [encryptedKey, encryptedValue] of Object.entries(encryptedData)) {
    try {
      // Dekripsi key jika terlihat terenkripsi
      const decryptedKey = isBase64(encryptedKey)
        ? CryptoJS.AES.decrypt(encryptedKey, keyUtf8, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          }).toString(CryptoJS.enc.Utf8)
        : encryptedKey;

      // Dekripsi value jika terlihat terenkripsi
      const decryptedValue = isBase64(encryptedValue)
        ? CryptoJS.AES.decrypt(encryptedValue, keyUtf8, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          }).toString(CryptoJS.enc.Utf8)
        : encryptedValue;

      // Simpan hasil
      decryptedData[decryptedKey || "Invalid Key"] =
        decryptedValue || "Invalid Value";
    } catch (error) {
      console.error(`Error decrypting pair: ${encryptedKey}`, error);
      decryptedData["Invalid Key"] = "Decryption failed";
    }
  }

  return decryptedData;
};

function stringDecrypt(key, encryptedString) {
  // Hash the key using SHA-256
  const keyHash = CryptoJS.enc.Hex.parse(CryptoJS.SHA256(key).toString());
  // Generate the initialization vector (IV) - the first 16 bytes of the hashed key
  const iv = CryptoJS.enc.Hex.parse(
    CryptoJS.SHA256(key).toString().substring(0, 32)
  );
  // Decrypt the string
  const bytes = CryptoJS.AES.decrypt(encryptedString, keyHash, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}

// Fungsi Decrpyt Compress
const decryptJSON = (data) => {
  try {
    // Step 1: Decompress
    const decompressedBase64 = LZString.decompressFromBase64(data);

    // Step 2: Decrypt
    if (decompressedBase64) {
      const decryptedString = stringDecrypt(keysmart, decompressedBase64);
      console.log("Decrypted String:", decryptedString);
      return decryptedString;
    } else {
      console.error("Failed to decompress string. Check the input format.");
      return null;
    }
  } catch (error) {
    console.error("Error during decryption:", error);
    return null;
  }
};

// Fungsi Encrpyt Compress
function stringEncrypt(key, plainText) {
  // Hash the key using SHA-256
  const keyHash = CryptoJS.enc.Hex.parse(CryptoJS.SHA256(key).toString());
  // Generate the initialization vector (IV) - the first 16 bytes of the hashed key
  const iv = CryptoJS.enc.Hex.parse(
    CryptoJS.SHA256(key).toString().substring(0, 32)
  );
  // Encrypt the string
  const encrypted = CryptoJS.AES.encrypt(plainText, keyHash, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

const encryptJSON = (data) => {
  try {
    // Step 1: Convert JSON data to string if necessary
    const jsonString = typeof data === "string" ? data : JSON.stringify(data);

    // Step 2: Encrypt the string
    const encryptedString = stringEncrypt(keysmart, jsonString);

    // Step 3: Compress the encrypted string
    const compressedBase64 = LZString.compressToBase64(encryptedString);

    // Return the final compressed and encrypted result
    console.log("Encrypted and Compressed String:", compressedBase64);
    return compressedBase64;
  } catch (error) {
    console.error("Error during encryption:", error);
    return null;
  }
};

export { decryptKeysAndValues, decryptJSON, encryptJSON };
