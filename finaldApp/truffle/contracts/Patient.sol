// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Patient { 
  
  struct Record { 
    string cid;
    address patientId;
    address doctorId;
    string patientName;
    string doctorName;
    string symptoms;
    string diagnostic;
    string department;
    uint256 timeAdded;
  }

  struct PatientDetails {
    address id;
    string name;
    address clinicAddress;
    string department;
    string password;
  }

  struct PatientRecords {
    address id;
    Record[] records;
  }

  // The structure helps us in performing groupBy Clause
  struct groupBy {
      uint count;
      string doctorName;
  }

  mapping (address => PatientDetails) public patients;
  mapping (address => PatientRecords) public patientRecords;
  mapping(string => uint) countHelper; 

  address[] patientAddress;

  modifier patientExists(address patientId) {
    require(patients[patientId].id == patientId, "Patient does not exist");
    _;
  }
  
  function addPatient(address _patientId, string memory _name, address clinicID, string memory _department, string memory _password) public {
    require(patients[_patientId].id != _patientId, "This patient already exists.");
    
    PatientDetails memory patient = PatientDetails(_patientId, _name, clinicID, _department, _password);
    patients[_patientId] = patient;
    patientAddress.push(_patientId);
  }

  function addRecord(string memory _cid, address _patientId, string memory _patientName, string memory _doctorName, 
                     address _doctorId, string memory symptoms, string memory diagnostic, string memory department, 
                     uint256 time) public 
                     patientExists(_patientId){
    Record memory record = Record(_cid, _patientId, _doctorId, _patientName, _doctorName, symptoms, diagnostic, department, time);
    
    patientRecords[_patientId].records.push(record);
  } 

  // function getRecords(address _patientId) public view patientExists(_patientId) 
  // returns (Record[] memory) {
  //  return patientRecords[_patientId].records;
  // } 

  function checkPatient(address _patientId, string memory _password) public view returns (bool) {
    if (patients[_patientId].id == _patientId && 
            keccak256(abi.encodePacked(patients[_patientId].password)) == keccak256(abi.encodePacked(_password))) {
              return true;
    }
    
    return false;
  }

  function getRegisteredPatients(address clinicID) public view returns(PatientDetails [] memory) {
    PatientDetails[] memory patientArray = new PatientDetails[](patientAddress.length);
    uint count = 0;
    
    for(uint i = 0; i < patientAddress.length; i++) {
      if(patients[patientAddress[i]].clinicAddress == clinicID) {
        patientArray[count] = patients[patientAddress[i]];
        count++;
      }
    }
    
    if (count < patientArray.length) {
        assembly {
            mstore(patientArray, count)
        }
    }

    return patientArray;
  } 

  function getAllPatients() public view returns(PatientDetails [] memory) {
    PatientDetails[] memory patientArray = new PatientDetails[](patientAddress.length);
    
    for(uint i = 0; i < patientAddress.length; i++) {
      patientArray[i] = patients[patientAddress[i]];
    }

    return patientArray;
  }

  function getPatientsCount() public view returns(uint) {
    return patientAddress.length;
  }

  function getRegisteredPatientsRecordsByID(address patientID) public view patientExists(patientID) returns (Record[] memory) {
    return patientRecords[patientID].records;
  }

  function getRegisteredPatientsByDept(address _clinicAddress, string memory deptName) public view returns (PatientDetails[] memory) {
    PatientDetails[] memory patientArray = new PatientDetails[](patientAddress.length);
    uint count = 0;

    for (uint i = 0; i < patientAddress.length; i++) {
        if (patients[patientAddress[i]].clinicAddress == _clinicAddress && keccak256(abi.encodePacked(patients[patientAddress[i]].department)) == keccak256(abi.encodePacked(deptName))) {
            patientArray[count] = patients[patientAddress[i]];
            count++;
        }
    }

    // Resize the array length to count
    if (count < patientArray.length) {
        assembly {
            mstore(patientArray, count)
        }
    }

    return patientArray;
  }

  function groupByClause(address patientID) public view returns(groupBy[] memory) {
      Record[] memory records = getRegisteredPatientsRecordsByID(patientID);
      groupBy[] memory recordsFromGroupByClause = new groupBy[](records.length);
      uint256 counter = 0;

      for (uint256 i = 0; i < records.length; i++) {
          uint dummyCount = 0;
          if(records[i].patientId == patientID) {
              if(countHelper[records[i].doctorName] == 0) {
                  dummyCount += 1;
              } else {
                  dummyCount = dummyCount + countHelper[records[i].doctorName] + 1; 
              }
          }
          recordsFromGroupByClause[counter] = groupBy(dummyCount, records[i].doctorName);
          counter++;
      }
      assembly {
          mstore(recordsFromGroupByClause, counter)
      }
      return recordsFromGroupByClause;
  } 

  function getPatientRecordsFromSpecificDate(address patientID, uint time) public view returns(Record[] memory) {
    Record[] memory records = getRegisteredPatientsRecordsByID(patientID);
    Record[] memory resultRecords = new Record[](records.length);
    uint counter = 0;
    for(uint i = 0; i < records.length; i++) {
      if(records[i].timeAdded >= time) {
        resultRecords[counter] = records[i];
        counter++;
      }
    }
    assembly {
        mstore(resultRecords, counter)
    }
    return resultRecords;
  }
} 
