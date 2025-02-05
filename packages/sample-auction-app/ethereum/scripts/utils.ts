import fs from "fs";
import hre from "hardhat";

export const networkName = hre.network.name;
console.log("networkName:", networkName);
export const chainId = hre.network.config.chainId;
console.log("chainId:", chainId);
export const addressListDirName = `${__dirname}/cache`;
export const addressListFileName = `${addressListDirName}/address.json`;

export const loadAddressList = () => {
  let json = "";
  if (!fs.existsSync(addressListDirName)) {
    // console.log(`Directory created successfully at ${addressListDirName}`);
  } else {
    // console.log(`Directory already exists at ${addressListDirName}`);
    json = fs.readFileSync(addressListFileName, "utf-8");
  }

  if (json === "") {
    json = "{}";
  }

  let addressList = JSON.parse(json);

  if (typeof addressList !== "object") {
    throw new Error("address.json is invalid form.");
  }

  return addressList;
};

export const storeAddressList = (addressList: any) => {
  if (!fs.existsSync(addressListDirName)) {
    fs.mkdirSync(addressListDirName, { recursive: true });
    // console.log(`Directory created successfully at ${addressListDirName}`);
  } else {
    // console.log(`Directory already exists at ${addressListDirName}`);
  }

  fs.writeFile(addressListFileName, JSON.stringify(addressList), (err: any) => {
    if (err) throw err;
    console.log("Update contract address");
  });
};

export const encodeIntmaxAddress = (intmaxAddress: string) => {
  if (!intmaxAddress.startsWith("0x")) {
    throw new Error("given intmaxAddress must have 0x-prefix.");
  }

  if (intmaxAddress.length > 66) {
    throw new Error("given intmaxAddress is too long.");
  }

  return "0x" + intmaxAddress.slice(2).padStart(64, "0");
};

export const decodeIntmaxAddress = (bytes: string) => {
  if (!bytes.startsWith("0x")) {
    throw new Error("given bytes must have 0x-prefix.");
  }

  return "0x" + bytes.slice(-16);
};
