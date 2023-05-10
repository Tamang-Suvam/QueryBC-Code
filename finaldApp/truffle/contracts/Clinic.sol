// SPDX-License-Identifier: MIT
pragma solidity >= 0.4.22 <0.9.0;

// Using Doctor and Patient Contracts here as well
import "./Doctor.sol";
import "./Patient.sol";

// Let's inherit from both the Doctor and Patient Smart Contracts
contract Clinic {
    // So to deploy Clinic contract first the doctor and patient contracts should have been deployed first.
    // The Clinic constructor takes in as input the doctorContract and patientContract address
    address doctorContractAddress;
    address patientContractAddress;

    constructor(
      address DoctorContractAddress,
      address PatientContractAddress
    ){
        doctorContractAddress = DoctorContractAddress;
        patientContractAddress = PatientContractAddress;
    }

    // This structure would capture the clinic entity
    struct ClinicDetails {
        address id;
        string name;
        string location;
        string password;
    }

    struct doctorNaturalJoinPatientResult {
        string doctorName;
        address doctorID;
        string patientName;
        address patientID;
        string clinicName;
        string department;
    }

    struct DoctorDetails {
        address id;
        string name;
        string clinicName;
        string department;
        string password;
    }

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
        string department;
        string password;
    }

    
    // mapping(string => uint) countHelper; 

    // // the below structure is needed to perform the natural join operation
    // struct doctorDetails {
    //     address id;
    //     string name;
    //     string clinicName;
    //     string department;
    //     string password;
    // }

    // // The following structure hold the result of the doctor natural join patient table
    // struct doctorNaturalJoinPatientResult {
    //     string doctorName;
    //     address doctorID;
    //     string patientName;
    //     address patientID;
    //     string department;
    // }

    // All the data structures used for storing clinic details defined 
    mapping (address => ClinicDetails) public clinics;
    address[] clinicAddress;
    
    // All the events to be emitted here
    event ClinicAdded(address indexed clinicId, string clinicName);
    event DoctorAdded(address indexed doctorId);
    event PatientAdded(address indexed patientId);

    // All the modifiers used have been defined below
    modifier senderIsClinic {
        require(clinics[msg.sender].id == msg.sender, "Clinic does not exist");
        _;
    }

    // All the method definition below
    function addClinic(string memory _clinicName, address _address, string memory _location, string memory _password) public {
        require(clinics[_address].id != _address, "This clinic already exists.");
        ClinicDetails memory clinic = ClinicDetails(_address, _clinicName,_location, _password);
        clinics[_address] = clinic; 
        clinicAddress.push(_address);

        emit ClinicAdded(_address, _clinicName);
    }

    function checkClinic(address clinicid, string memory _password) public view returns (bool) {
        if(clinics[clinicid].id == clinicid && 
                (keccak256(abi.encodePacked(clinics[clinicid].password)) == keccak256(abi.encodePacked(_password)))) {
                return true;
        } 
        return false;
    }

    function clinicAddDoctor(address _doctorId, string memory _doctorName, string memory _clinicName, address _clinicAddress, string memory _dept, string memory _password) 
           senderIsClinic public {
        Doctor doctorContract = Doctor(doctorContractAddress);
        doctorContract.addDoctor(_doctorId, _doctorName, _clinicName, _clinicAddress, _dept, _password);
        emit DoctorAdded(_doctorId);
    }

    // Clinics too can add patients
    function clinicAddPatient(address _patientId, string memory _name, address _clinicID, string memory _department, string memory _password) public senderIsClinic{
        Patient patientContract = Patient(patientContractAddress);
    
        patientContract.addPatient(_patientId, _name, _clinicID, _department, _password);
    
        emit PatientAdded(_patientId);
    }

    // The function can be called by client rto observe all the available clinics throughout the system
    function getRegisteredClinics() public view returns(ClinicDetails [] memory) {
        ClinicDetails[] memory clinicArray = new ClinicDetails[](clinicAddress.length);
        
        for(uint i = 0; i < clinicAddress.length; i++) {
            clinicArray[i] = clinics[clinicAddress[i]];
        }
        
        return clinicArray;
    }

    // The function can be used by patients to view all the clinics available in a particular location
    function getRegisteredClinicsByLocation(string memory location) public view returns (ClinicDetails[] memory) {
        ClinicDetails[] memory clinicArray = new ClinicDetails[](clinicAddress.length);
        uint count = 0;

        for (uint i = 0; i < clinicAddress.length; i++) {
            if (keccak256(abi.encodePacked(clinics[clinicAddress[i]].location)) == keccak256(abi.encodePacked(location))) {
                clinicArray[count] = clinics[clinicAddress[i]];
                count++;
            }
        }

        // Resize the array length to count
        if (count < clinicArray.length) {
            assembly {
                mstore(clinicArray, count)
            }
        }

        return clinicArray;
    }

    function doctorNaturalJoinPatient(address account) public view returns(doctorNaturalJoinPatientResult [] memory) {
        Doctor doctorContract = Doctor(doctorContractAddress);
        Patient patientContract = Patient(patientContractAddress);

        // Fetching all the registered doctors in the system
        Doctor.DoctorDetails[] memory doctors = doctorContract.getRegisteredDoctors(account);
        Clinic.DoctorDetails[] memory registeredDoctors = new Clinic.DoctorDetails[](doctors.length);

        for (uint256 i = 0; i < doctors.length; i++) {
            registeredDoctors[i] = Clinic.DoctorDetails(doctors[i].id, doctors[i].name, doctors[i].clinicName, doctors[i].department, doctors[i].password);
        }

        // Fetching all the registered patients in the system
        Patient.PatientDetails[] memory patients = patientContract.getRegisteredPatients(account);
        Clinic.PatientDetails[] memory registeredPatients = new Clinic.PatientDetails[](patients.length);

        for (uint256 i = 0; i < patients.length; i++) {
            registeredPatients[i] = Clinic.PatientDetails(patients[i].id, patients[i].name, patients[i].department, patients[i].password);
        }

        // doctorNaturalJoinPatientResult[] memory result = naturalJoin(registeredDoctors, registeredPatients);     
        // return result;

        uint leftLen = registeredDoctors.length;
        uint rightLen = registeredPatients.length;
        uint resultLen = 0;
        doctorNaturalJoinPatientResult[] memory result = new doctorNaturalJoinPatientResult[](leftLen + rightLen);
        
        for (uint i = 0; i < leftLen; i++) {
            for (uint j = 0; j < rightLen; j++) {
                if (keccak256(abi.encodePacked(registeredDoctors[i].department)) == keccak256(abi.encodePacked(registeredPatients[j].department))) {
                    result[resultLen].doctorID = registeredDoctors[i].id;
                    result[resultLen].doctorName = registeredDoctors[i].name;
                    result[resultLen].clinicName = registeredDoctors[i].clinicName;
                    result[resultLen].patientID = registeredPatients[j].id;
                    result[resultLen].patientName = registeredPatients[j].name;
                    result[resultLen].department = registeredPatients[j].department;
                    resultLen++;
                }
            }
        }

        assembly {
            mstore(result, resultLen)
        }
        return result;
    }

    // function naturalJoin(DoctorDetails[] memory left, PatientDetails[] memory right) public pure returns (doctorNaturalJoinPatientResult[] memory) {
    //     uint leftLen = left.length;
    //     uint rightLen = right.length;
    //     uint resultLen = 0;
    //     doctorNaturalJoinPatientResult[] memory result = new doctorNaturalJoinPatientResult[](leftLen + rightLen);
        
    //     for (uint i = 0; i < leftLen; i++) {
    //         for (uint j = 0; j < rightLen; j++) {
    //             if (keccak256(abi.encodePacked(left[i].department)) == keccak256(abi.encodePacked(right[j].department))) {
    //                 result[resultLen].doctorID = left[i].id;
    //                 result[resultLen].doctorName = left[i].name;
    //                 result[resultLen].clinicName = left[i].clinicName;
    //                 result[resultLen].patientID = right[j].id;
    //                 result[resultLen].patientName = right[j].name;
    //                 result[resultLen].department = right[j].department;
    //                 resultLen++;
    //             }
    //         }
    //     }

    //     assembly {
    //         mstore(result, resultLen)
    //     }
    //     return result;
    // }
} 
