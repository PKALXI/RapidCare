import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addSoapNote } from "../redux/appActions";
import {IPatient, IProfileInfo, IAllergy, IPrescription} from "../models/model";
import MedicalHistory from './HealthcareProfessional/MedicalHistory';
import { createProfileProps  } from "../helpers/types";


const CreateProfile: React.FC<createProfileProps> = ({
  patient,
  profileInformation,
  allergies,
  prescriptions,
}) => {

    const [formData, setFormData] = useState<IProfileInfo>(profileInformation);
    const [allergy, setAllergies] = useState<IAllergy>(allergies);
    const [prescription, setPrescriptions] = useState<IPrescription>(prescriptions);
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormData({...formData, [name]: value });
    };

    const handleButtonClick = (action: string) => {
      console.log(`${action} button clicked`);
    };

    const handleClose = () => {
      console.log("handleClose triggered");
      setErrors({});
      console.log("Errors reset:", errors);
      setOpen(false);
    }

    const handleSave = () => {
      setErrors({});

       
      dispatch(addSoapNote(patient));
      setOpen(false);
    }

    return (
        <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-3/4 p-6">
              <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Create a new Patient Profile</h1>
                  <div className="space-x-2">
                        <button className="bg-blue-500 text-right px-4 py-2 rounded" onClick={() => handleButtonClick('Edit Profile')}>Edit Profile</button>
                        <button className="bg-green-500 text-right px-4 py-2 rounded" onClick={() => handleButtonClick('Close Profile')}>Close Profile</button>
                  </div>
              </div>
                {/* Demographics Section */}

                <div className="bg-white shadow rounded p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Demographics</h2>
                    <div className="grid grid-cols-2 gap-4">
                    <div className="w-3/4">
                      <div className="flex items-center mb-4"> <p className='mr-4'><strong>Name:</strong></p>
                        <textarea 
                          className="w-60 h-12 border p-2 rounded overflow-hidden" 
                          placeholder="Enter Name.." 
                          name="name" 
                          value={formData.demographics?.name}
                          onChange={handleInputChange}>
                        </textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4 w-60'><strong>Healthcard number:</strong></p>
                        <textarea 
                            className="w-60 h-12 border p-2 rounded overflow-hidden" 
                            placeholder="Enter Healthcard.." 
                            name="healthcard" 
                            value={formData.demographics?.healthcardNumber}
                            onChange={handleInputChange}>
                        </textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4'><strong>Age:</strong></p>
                        <textarea 
                              className="w-60 h-12 border p-2 rounded overflow-hidden" 
                              placeholder="Enter Age.." 
                              name="age" 
                              value={formData.demographics?.age}
                              onChange={handleInputChange}>
                        </textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4'><strong>Weight:</strong></p>
                        <textarea 
                              className="w-60 h-12 border p-2 rounded overflow-hidden" 
                              placeholder="Enter Weight.." 
                              name="weight" 
                              value={formData.demographics?.weight}
                              onChange={handleInputChange}>
                        </textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4'><strong>Gender:</strong></p>
                        <textarea 
                              className="w-60 h-12 border p-2 rounded overflow-hidden" 
                              placeholder="Enter Gender.." 
                              name="gender" 
                              value={formData.demographics?.gender}
                              onChange={handleInputChange}>
                        </textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4'><strong>Height:</strong></p>
                        <textarea 
                              className="w-60 h-12 border p-2 rounded overflow-hidden" 
                              placeholder="Enter Height.." 
                              name="height" 
                              value={formData.demographics?.height}
                              onChange={handleInputChange}>
                        </textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4 w-48'><strong>Date of Birth:</strong></p>
                        <textarea 
                              className="w-60 h-12 border p-2 rounded overflow-hidden" 
                              placeholder="Enter DOB.." 
                              name="DOB" 
                              value={formData.demographics?.dateOfBirth}
                              onChange={handleInputChange}>
                        </textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4 w-48'><strong>Marital Status:</strong></p>
                        <textarea 
                              className="w-60 h-12 border p-2 rounded overflow-hidden" 
                              placeholder="Enter Marital Status.." 
                              name="maritalstatus" 
                              value={formData.demographics?.maritalStatus}
                              onChange={handleInputChange}>
                        </textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4 w-48'><strong>Occupation:</strong></p>
                        <textarea 
                              className="w-60 h-12 border p-2 rounded overflow-hidden" 
                              placeholder="Enter Occupation.." 
                              name="occupation" 
                              value={formData.demographics?.occupation}
                              onChange={handleInputChange}>
                        </textarea>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insurance information */}

                    <div className="bg-white shadow rounded p-6 -mt-8">
                        <h2 className="text-xl font-bold mb-3">Insurance Information</h2>
                        <div className="w-3/4">
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Member ID:</strong></p>
                            <textarea 
                                className="w-60 h-12 border p-2 rounded overflow-hidden" 
                                placeholder="Enter memberID.." 
                                name="memberID" 
                                value={formData.insuranceInformation?.memberID}
                                onChange={handleInputChange}>
                          </textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Policy number:</strong></p>
                            <textarea 
                                  className="w-60 h-12 border p-2 rounded overflow-hidden" 
                                  placeholder="Enter Policy.." 
                                  name="policyNumber" 
                                  value={formData.insuranceInformation?.policyNumber}
                                  onChange={handleInputChange}>
                            </textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Provider:</strong></p>
                            <textarea 
                                  className="w-60 h-12 border p-2 rounded overflow-hidden" 
                                  placeholder="Enter Provider.." 
                                  name="provider" 
                                  value={formData.insuranceInformation?.provider}
                                  onChange={handleInputChange}>
                            </textarea>
                          </div>
                        </div>
                    </div>

                    {/* Contact Information */}

                    <div className="bg-white shadow rounded p-6">
                        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                        <div className="w-3/4">
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Email:</strong></p>
                            <textarea 
                                    className="w-60 h-12 border p-2 rounded overflow-hidden" 
                                    placeholder="Emter Email.." 
                                    name="email" 
                                    value={formData.contactInformation?.email}
                                    onChange={handleInputChange}>
                              </textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Contact number:</strong></p>
                            <textarea 
                                      className="w-60 h-12 border p-2 rounded overflow-hidden" 
                                      placeholder="Enter Contact.." 
                                      name="contact" 
                                      value={formData.contactInformation?.phone}
                                      onChange={handleInputChange}>
                                </textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Address:</strong></p>
                            <textarea 
                                      className="w-60 h-12 border p-2 rounded overflow-hidden" 
                                      placeholder="Enter Address.." 
                                      name="address" 
                                      value={formData.contactInformation?.address}
                                      onChange={handleInputChange}>
                                </textarea>
                          </div>
                        </div>
                    </div>

                    {/*Emergency Contact Information*/}

                    <div className="bg-white shadow rounded p-6">
                        <h2 className="text-xl font-bold mb-4">Emergency Contact Information</h2>
                        <div className="w-3/4">
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Name:</strong></p>
                            <textarea 
                                  className="w-60 h-12 border p-2 rounded overflow-hidden" 
                                  placeholder="Enter Emergency Contact.." 
                                  name="name" 
                                  value={formData.emergencyContact?.name}
                                  onChange={handleInputChange}>
                            </textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Relationship:</strong></p>
                            <textarea 
                                    className="w-60 h-12 border p-2 rounded overflow-hidden" 
                                    placeholder="Enter Relationship.." 
                                    name="relationship" 
                                    value={formData.emergencyContact?.relationship}
                                    onChange={handleInputChange}>
                              </textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Contact number:</strong></p>
                            <textarea 
                                    className="w-60 h-12 border p-2 rounded overflow-hidden" 
                                    placeholder="Enter Contact.." 
                                    name="contact" 
                                    value={formData.emergencyContact?.phone}
                                    onChange={handleInputChange}>
                              </textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Address:</strong></p>
                            <textarea 
                                    className="w-60 h-12 border p-2 rounded overflow-hidden" 
                                    placeholder="Enter Address.." 
                                    name="address" 
                                    value={formData.emergencyContact?.address}
                                    onChange={handleInputChange}>
                              </textarea>
                          </div>
                        </div>
                    </div>

                    {/*Allergies*/}

                    <div className="bg-white shadow rounded p-6">
                        <h2 className="text-xl font-bold mb-4">Allergies</h2>
                        <div className="w-3/4">
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Date:</strong></p>
                            <textarea 
                              className="w-60 h-12 border p-2 rounded overflow-hidden" 
                              placeholder="Enter Date.." 
                              name="date" 
                              value={allergy.date} 
                              onChange={handleInputChange}>
                          </textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Substance:</strong></p>
                            <textarea 
                                className="w-60 h-12 border p-2 rounded overflow-hidden" 
                                placeholder="Enter Substance.." 
                                name="substance" 
                                value={allergy.substance} 
                                onChange={handleInputChange}>
                            </textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Symptoms:</strong></p>
                            <textarea 
                                className="w-60 h-12 border p-2 rounded overflow-hidden" 
                                placeholder="Enter Symptoms.." 
                                name="symptoms" 
                                value={allergy.symptoms} 
                                onChange={handleInputChange}>
                            </textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Status:</strong></p>
                            <textarea 
                                className="w-60 h-12 border p-2 rounded overflow-hidden" 
                                placeholder="Enter status.." 
                                name="status" 
                                value={allergy.status} 
                                onChange={handleInputChange}>
                            </textarea>
                          </div>
                        </div>
                    </div>

                    {/*Prescriptions*/}

                    <div className="bg-white shadow rounded p-6">
                        <h2 className="text-xl font-bold mb-4">Prescription</h2>
                        <div className="w-3/4">
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Date:</strong></p>
                            <textarea 
                                className="w-60 h-12 border p-2 rounded overflow-hidden" 
                                placeholder="Enter date.." 
                                name="date" 
                                value={prescription.date} 
                                onChange={handleInputChange}>
                              </textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Medication:</strong></p>
                            <textarea 
                                className="w-60 h-12 border p-2 rounded overflow-hidden" 
                                placeholder="Enter medication.." 
                                name="medication" 
                                value={prescription.medication} 
                                onChange={handleInputChange}>
                              </textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Dosage:</strong></p>
                            <textarea 
                                className="w-60 h-12 border p-2 rounded overflow-hidden" 
                                placeholder="Enter dosage.." 
                                name="dosage" 
                                value={prescription.dosage} 
                                onChange={handleInputChange}>
                            </textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Status:</strong></p>
                            <textarea 
                                className="w-60 h-12 border p-2 rounded overflow-hidden" 
                                placeholder="Enter status.." 
                                name="status" 
                                value={prescription.status} 
                                onChange={handleInputChange}>
                              </textarea>
                          </div>
                        </div>
                    </div>

                    {/*Medical History*/}

                    <div className="bg-white shadow rounded p-6">
                        <h2 className="text-xl font-bold mb-4">Medical History</h2>
                        <div className="w-3/4">
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>History of presenting illness:</strong></p>
                            <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Past Medical History:</strong></p>
                            <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Family History (if applicable):</strong></p>
                            <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Physical examination:</strong></p>
                            <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Investigations:</strong></p>
                            <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Assessment:</strong></p>
                            <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                          </div> 
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Follow-up:</strong></p>
                            <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                          </div>         
                        </div>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="space-x-2">
                            <button className="bg-red-500 text-center px-4 py-2 rounded" onClick={() => handleButtonClick('Save Profile')}>Save Profile</button>
                      </div>
                    </div>
                  </div>
              </div>
    );
};
export default CreateProfile;
