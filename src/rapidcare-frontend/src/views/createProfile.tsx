import React from 'react';

const CreateProfile = () => {

    const handleButtonClick = (action: string) => {
      console.log(`${action} button clicked`);
    };

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
                        <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4 w-60'><strong>Healthcard number:</strong></p>
                            <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4'><strong>Age:</strong></p>
                        <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4'><strong>Weight:</strong></p>
                        <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4'><strong>Gender:</strong></p>
                        <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4'><strong>Height:</strong></p>
                        <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4 w-48'><strong>Date of Birth:</strong></p>
                        <textarea className="w-80 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4 w-48'><strong>Marital Status:</strong></p>
                        <textarea className="w-80 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4 w-48'><strong>Occupation:</strong></p>
                        <textarea className="w-80 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insurance information */}

                    <div className="bg-white shadow rounded p-6 -mt-8">
                        <h2 className="text-xl font-bold mb-3">Insurance Information</h2>
                        <div className="w-3/4">
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Member ID:</strong></p>
                            <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Policy number:</strong></p>
                            <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Provider:</strong></p>
                            <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                          </div>
                        </div>
                    </div>

                    {/* Contact Information */}

                    <div className="bg-white shadow rounded p-6">
                        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                        <div className="w-3/4">
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Email:</strong></p>
                            <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Contact number:</strong></p>
                            <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Address:</strong></p>
                            <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                          </div>
                        </div>
                    </div>

                    {/*Emergency Contact Information*/}

                    <div className="bg-white shadow rounded p-6">
                        <h2 className="text-xl font-bold mb-4">Emergency Contact Information</h2>
                        <div className="w-3/4">
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Name:</strong></p>
                            <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Relationship:</strong></p>
                            <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Contact number:</strong></p>
                            <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Address:</strong></p>
                            <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
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
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Medications:</strong></p>
                            <div className="w-3.4">
                              <div className="flex items-center mb-4"> <p className='mr-4'><strong>Date:</strong></p>
                                <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                              </div>
                              <div className="flex items-center mb-4"> <p className='mr-4'><strong>Medication:</strong></p>
                                <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                              </div>
                              <div className="flex items-center mb-4"> <p className='mr-4'><strong>Dosage:</strong></p>
                                <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                              </div>
                              <div className="flex items-center mb-4"> <p className='mr-4'><strong>Status:</strong></p>
                                <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center mb-4"> <p className='mr-4'><strong>Allergies (if applicable):</strong></p>
                            <div className="w-3.4">
                              <div className="flex items-center mb-4"> <p className='mr-4'><strong>Date:</strong></p>
                                <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                              </div>
                              <div className="flex items-center mb-4"> <p className='mr-4'><strong>Substance:</strong></p>
                                <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                              </div>
                              <div className="flex items-center mb-4"> <p className='mr-4'><strong>Symptom:</strong></p>
                                <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                              </div>
                              <div className="flex items-center mb-4"> <p className='mr-4'><strong>Status:</strong></p>
                                <textarea className="w-60 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                              </div>
                            </div>
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
