const {existsSync, writeFileSync} = require('fs');
const {execSync} = require('child_process');
const {getInput} = require('@actions/core')

const licenseFilePath = "C:\\Program Files (x86)\\Eziriz\\.NET Reactor\\license.v3lic"
const dotreactorPath = "C:\\Program Files (x86)\\Eziriz\\.NET Reactor\\dotNET_Reactor.Console.exe"

function installDotreactor() {
  console.log('[Install .NET Reactor]')
  if (!existsSync(dotreactorPath)){
    console.log('- Installing...')
    execSync('START /WAIT dnr_setup_latest_build.exe /silent');
    console.log('- Done.')
  } else {
    console.log('- Already installed.')
  }
}

function writeLicenseFile() {
  console.log('[Set up license]')
  const licenseData = decodeBase64String(getInput('license'));
  console.log('- Writing license file...')
  writeFileSync(licenseFilePath, licenseData);
  console.log('- Done.')
}

function decodeBase64String(string) {
  console.log('- Decoding license')
  return Buffer.from(string, "base64").toString("utf-8");
}

exports.default = function () {
  installDotreactor();
  writeLicenseFile();
}