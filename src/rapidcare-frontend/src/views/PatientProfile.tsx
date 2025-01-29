import React from 'react';

const PatientProfile: React.FC = () => {

    const handleButtonClick = (action: string) => {
      console.log(`${action} button clicked`);
    };

    return (
        <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-3/4 p-6">
              <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Profile Information</h1>
                  <div className="space-x-2">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleButtonClick('Edit Profile')}>Edit Profile</button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleButtonClick('Close Profile')}>Close Profile</button>
                  </div>
              </div>
                {/* Profile Tabs */}
                <div className="flex border-b mb-6">
                    <button className="px-4 py-2 border-b-2 border-blue-500 text-blue-500" onClick={() => handleButtonClick('Profie Information')}>Profile Information</button>
                    <button className="px-4 py-2 text-gray-600" onClick={() => handleButtonClick('Medical History')}>Medical History</button>
                    <button className="px-4 py-2 text-gray-600" onClick={() => handleButtonClick('Consultation Notes')}>Consultation Notes</button>
                    <button className="px-4 py-2 text-gray-600" onClick={() => handleButtonClick('Appointment History')}>Appointment History</button>
                    <button className="px-4 py-2 text-gray-600" onClick={() => handleButtonClick('Documents')}>Documents</button>
                </div>

                {/* Demographics Section */}
                <div className="bg-white shadow rounded p-6 mb-6">
                    <h2 className="text-lg font-bold mb-4">Demographics</h2>
                    <div className="grid grid-cols-2 gap-4">
                    <div className="w-3/4">
                      <div className="flex items-center mb-4"> <p className='mr-4'><strong>Name:</strong></p>
                        <textarea className="w-96 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4'><strong>Age:</strong></p>
                        <textarea className="w-96 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4'><strong>Weight:</strong></p>
                        <textarea className="w-96 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4'><strong>Gender:</strong></p>
                        <textarea className="w-96 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4'><strong>Height:</strong></p>
                        <textarea className="w-96 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4'><strong>Date of Birth:</strong></p>
                        <textarea className="w-96 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                      </div>
                      <div className="flex items-center mb-4"> <p className='mr-4'><strong>Marital Status:</strong></p>
                        <textarea className="w-96 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                {/* insurance information */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white shadow rounded p-6">
                        <h2 className="text-lg font-bold mb-4">Insurance Information</h2>
                        <p className="mb-4"><strong>Member ID:</strong></p>
                        <p className="mb-4"><strong>Policy Holder:</strong></p>
                        <p className="mb-4"><strong>Additional Info:</strong></p>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white shadow rounded p-6">
                        <h2 className="text-lg font-bold mb-4">Contact Information</h2>
                        <p className="mb-4"><strong>Email:</strong></p>
                        <p className="mb-4"><strong>Phone:</strong></p>
                        <p className="mb-4"><strong>Address:</strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;
