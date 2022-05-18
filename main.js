const {existsSync, writeFileSync} = require('fs');
const {execSync} = require('child_process');
const {getInput} = require('@actions/core');

const licenseFilePath = "./license.v3lic";

function writeLicenseFile() {
  console.log('[Set up license]');
  if (existsSync(licenseFilePath)) {
    console.log('- License already exists');
  } else {
    const licenseData = decodeBase64String(getInput('license'));
    console.log('- Writing license file...');
    writeFileSync(licenseFilePath, licenseData);
    console.log('- Done.');

    execSync(`dir`);
    execSync(`cd ..`);
    execSync(`dir`);
    execSync(`cd ..`);
    execSync(`dir`);
  }
}

function decodeBase64String(string) {
  console.log('- Decoding license');
  return Buffer.from(string, "base64").toString("utf-8");
}

writeLicenseFile();
