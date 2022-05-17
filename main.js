const {execSync} = require('child_process');
const {getInput} = require('@actions/core')
const {writeFileSync} = require('fs');

const licenseFilePath = "C:\\Program Files (x86)\\Eziriz\\.NET Reactor\\license.v3lic"
const dotreactorPath = "C:\\Program Files (x86)\\Eziriz\\.NET Reactor\\dotNET_Reactor.Console.exe"

function installDotreactor() {
  execSync('START /WAIT dnr_setup_latest_build.exe /silent');
}

function writeLicenseFile() {
  const licenseData = decodeBase64String(getInput('license'));
  writeFileSync(licenseFilePath, licenseData);
}

function decodeBase64String(string) {
  return Buffer.from(string, "base64").toString("utf-8");
}

function obfuscateFiles() {
  const projectPath = getInput('project_path');
  execSync(`"${dotreactorPath}" -project "${projectPath}"`);
}

exports.default = function () {
  installDotreactor();
  writeLicenseFile();
  obfuscateFiles();
}