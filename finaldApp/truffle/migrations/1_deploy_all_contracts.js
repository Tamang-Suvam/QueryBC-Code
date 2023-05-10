// var QueryManager = artifacts.require("QueryManager");
var Clinic = artifacts.require("Clinic");
var Doctor = artifacts.require("Doctor");
var Patient = artifacts.require("Patient");

module.exports = async function(deployer) {
    await deployer.deploy(Patient)
    await deployer.deploy(Doctor, Patient.address)
    await deployer.deploy(Clinic, Doctor.address, Patient.address)
    // await deployer.deploy(QueryManager, Clinic.address, Doctor.address, Patient.address)
};