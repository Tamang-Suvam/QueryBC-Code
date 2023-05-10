// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;
import "./Patient.sol";

contract Doctor { 

  address patientContractAddress;

  constructor(address PatientContractAddress) {
    patientContractAddress = PatientContractAddress;
  }

  struct DoctorDetails {
    address id;
    string name;
    string clinicName;
    address clinicAddress;
    string department;
    string password;
  }

  mapping (address => DoctorDetails) public doctors;
  address[] doctorAddress;
  
  event PatientAdded(address indexed patientId);
  event RecordAdded(string _cid, address _patientId, string _patientName, string _doctorName, address _doctorId,
                    string symptoms, string diagnostic, string department, uint256 time); 

  modifier senderIsDoctor(address doctorID) {
    require(doctors[doctorID].id == doctorID, "Sender is not a doctor");
    _;
  }

  function addDoctor(address _doctorId, string memory _doctorName, string memory _clinicName, address _clinicAddress, string memory _dept, string memory _password) 
           public {
    require(doctors[_doctorId].id != _doctorId, "This doctor already exists.");

    DoctorDetails memory doctor = DoctorDetails(_doctorId, _doctorName, _clinicName, _clinicAddress, _dept, _password);
    doctors[_doctorId] = doctor;
    doctorAddress.push(_doctorId);
  }
  
  function checkDoctor(address _doctorId, string memory _password) public view returns (bool) {
    if (doctors[_doctorId].id == _doctorId && 
            keccak256(abi.encodePacked(doctors[_doctorId].password)) == keccak256(abi.encodePacked(_password))) {
              return true;
    }

    return false;
  }

  function doctorAddPatient(address _patientId, string memory _name, address _clinicID, string memory _department, string memory _password) public {
    Patient patientContract = Patient(patientContractAddress);
    
    patientContract.addPatient(_patientId, _name, _clinicID, _department, _password);
    
    emit PatientAdded(_patientId);
  }
  
  function doctorAddRecord(string memory _cid, address _patientId, string memory _patientName, string memory _doctorName, 
                     address _doctorId, string memory symptoms, string memory diagnostic, string memory department) public
                     senderIsDoctor(_doctorId){
    uint256 time = block.timestamp;
    Patient patientContract = Patient(patientContractAddress);
    
    patientContract.addRecord(_cid, _patientId, _patientName, _doctorName, _doctorId, symptoms, diagnostic, department, time);
    
    emit RecordAdded(_cid, _patientId, _patientName, _doctorName, _doctorId, symptoms, diagnostic, department, time);
  } 

  // function doctorGetPatientRecords(address _patientId) public view {
  //  Patient patientContract = Patient(patientContractAddress);
    
  //  patientContract.getRecords(_patientId);
  // } 
  
  function getRegisteredDoctors(address clinicID) public view returns(DoctorDetails [] memory) {
    DoctorDetails[] memory doctorArray = new DoctorDetails[](doctorAddress.length);
    uint count = 0;
    
    for(uint i = 0; i < doctorAddress.length; i++) {
      if(doctors[doctorAddress[i]].clinicAddress == clinicID) {
        doctorArray[count] = doctors[doctorAddress[i]];
        count++;
      }
    }

    if (count < doctorArray.length) {
        assembly {
            mstore(doctorArray, count)
        }
    }
    
    return doctorArray;
  }

  // function getAllDoctors() public view returns(DoctorDetails [] memory) {
    // DoctorDetails[] memory doctorArray = new DoctorDetails[](doctorAddress.length);
    
    // for(uint i = 0; i < doctorAddress.length; i++) {
    //   doctorArray[i] = doctors[doctorAddress[i]];
    // }

    // return doctorArray;
  // }

  function getDoctorsCount() public view returns(uint) {
    return doctorAddress.length;
  }

  // function getRegisteredDoctorsByDept(string memory deptName) public view returns(DoctorDetails [] memory, uint) {
  //   DoctorDetails[] memory doctorArray = new DoctorDetails[](doctorAddress.length);
  //   uint length = 0;
    
  //   for(uint i = 0; i < doctorAddress.length; i++) {
  //     if (keccak256(abi.encodePacked(doctors[doctorAddress[i]].department)) == keccak256(abi.encodePacked(deptName))) {
  //       // doctorArray.push(doctorAddress[i]);
  //       doctorArray[i] = (doctors[doctorAddress[i]]);
  //       length = i;
  //     }
  //   }
  //   return (doctorArray[:length + 1], length + 1);
  // }
  
  function getRegisteredDoctorsByDept(address clinicID, string memory deptName) public view returns (DoctorDetails[] memory) {
    DoctorDetails[] memory doctorArray = new DoctorDetails[](doctorAddress.length);
    uint count = 0;

    for (uint i = 0; i < doctorAddress.length; i++) {
        if (doctors[doctorAddress[i]].clinicAddress == clinicID && (keccak256(abi.encodePacked(doctors[doctorAddress[i]].department)) == keccak256(abi.encodePacked(deptName)))) {
            doctorArray[count] = doctors[doctorAddress[i]];
            count++;
        }
    }

    // Resize the array length to count
    if (count < doctorArray.length) {
        assembly {
            mstore(doctorArray, count)
        }
    }

    return doctorArray;
  }

  function getRegisteredDoctorsByClinicName(string memory clinicName) public view returns (DoctorDetails[] memory) {
    DoctorDetails[] memory doctorArray = new DoctorDetails[](doctorAddress.length);
    uint count = 0;

    for (uint i = 0; i < doctorAddress.length; i++) {
        if (keccak256(abi.encodePacked(doctors[doctorAddress[i]].clinicName)) == keccak256(abi.encodePacked(clinicName))) {
            doctorArray[count] = doctors[doctorAddress[i]];
            count++;
        }
    }

    // Resize the array length to count
    if (count < doctorArray.length) {
        assembly {
            mstore(doctorArray, count)
        }
    }

    return doctorArray;
  }

  function getRegisteredDoctorsByClinicNameAndDepartment(string memory clinicName, string memory deptName) public view returns (DoctorDetails[] memory) {
    DoctorDetails[] memory doctorArray = new DoctorDetails[](doctorAddress.length);
    uint count = 0;

    for (uint i = 0; i < doctorAddress.length; i++) {
        if (keccak256(abi.encodePacked(doctors[doctorAddress[i]].department)) == keccak256(abi.encodePacked(deptName)) && 
            keccak256(abi.encodePacked(doctors[doctorAddress[i]].clinicName)) == keccak256(abi.encodePacked(clinicName))) {
            doctorArray[count] = doctors[doctorAddress[i]];
            count++;
        }
    }

    // Resize the array length to count
    if (count < doctorArray.length) {
        assembly {
            mstore(doctorArray, count)
        }
    }

    return doctorArray;
  }
//   function doctorTreatedPatient(address _patientId) public view returns(Doctor [] memory) {
//     if(patientContract.doPatientExists(_patientId)) {
//         patientRecords = patientContract.getRecords(_patientId);
//         Doctor[] memory doctorArray = new Doctor[](patientRecords[msg.sender].records.length);
//         for(uint i = 0; i < patientRecords[msg.sender].records.length; i++) {
//         doctorArray[i] = doctors[patientRecords[msg.sender].records[i].doctorId];
//         }
//         return doctorArray;
//     } else {
//         return "The Patient doesn't exist!";
//     }
//   }
} 
