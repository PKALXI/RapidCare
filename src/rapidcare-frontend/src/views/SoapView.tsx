import React from 'react';
//import { IClassifiedData, ILabResult } from '../models/poc';



const SoapView: React.FC = () => {

    return (    
        <div className="col-span-2 m-10"> 
         <div className="bg-gray-50 p-6 rounded shadow"> 
          <div className="flex justify-between mb-6">
            <div className="flex items-start mt-10 ml-0"> 
              <button className="bg-green-500 text-white px-4 py-2 rounded w-48">Start Recording</button>
            </div>
            <div className="flex flex-col items-center space-x-10"> 
            <h2 className="absolute top-1/2 left-1/2 transform -translate-x-[150%] -translate-y-[400%] font-bold text-lg">SOAP Note</h2>
              <div className="w-3/4">
                <div className="flex items-center mb-4"> <p className='mr-4'><strong>Practitioner:</strong></p>
                  <textarea className="w-96 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                </div>
                <div className="flex items-center mb-4"> <p className='mr-4'><strong>Date:</strong></p>
                  <textarea className="w-96 h-12 border p-2 rounded overflow-hidden" placeholder="Type Here.."></textarea>
                </div>
              </div>
            </div> 
          </div>
        </div>
        <div className="space-y-4 mt-10">
          <div> 
            <h3 className='font-bold'>Subjective Assessment</h3>
            <div className='mt-5'>
              <label className="block mb-1 font-medium">Symptoms</label>
              <textarea className="w-full border p-2 rounded" placeholder="Type Here.."></textarea>
            </div>
            <div className='mt-2'>
              <label className="block mb-1 font-medium">Allergies</label>
              <textarea className="w-full border p-2 rounded" placeholder="Type Here.."></textarea>
            </div>
            <div className='mt-2'>
              <label className="block mb-1 font-medium">Medications (if applicable)</label>
              <textarea className="w-full border p-2 rounded" placeholder="Type Here.."></textarea>
            </div>
            <div className='mt-2'>
              <label className="block mb-1 font-medium">Past Medical History</label>
              <textarea className="w-full border p-2 rounded" placeholder="Type Here.."></textarea>
            </div>
            <div className='mt-2'>
              <label className="block mb-1 font-medium">Last meal</label>
              <textarea className="w-full border p-2 rounded" placeholder="Type Here.."></textarea>
            </div>
          </div>
          <div>
            <h3 className='font-bold'>Objective Assessment</h3>
            <div className='mt-5'>
              <label className='block mb-1 font-medium'>Breathing</label>
              <textarea className="w-full border p-2 rounded" placeholder="Type Here.."></textarea>
            </div>
            <div className='mt-2'>
              <label className='block mb-1 font-medium'>Circulation</label>
              <textarea className="w-full border p-2 rounded" placeholder="Type Here.."></textarea>
            </div>
            <div className='mt-2'>
              <label className='block mb-1 font-medium'>Skin Type</label>
              <textarea className="w-full border p-2 rounded" placeholder="Type Here.."></textarea>
            </div>
            <div className='mt-2'>
              <label className='block mb-1 font-medium'>Head-to-Toe check</label>
              <textarea className="w-full border p-2 rounded" placeholder="Type Here.."></textarea>
            </div>
            <div className='mt-2'>
              <label className='block mb-1 font-medium'>Level of Consciousness</label>
              <textarea className="w-full border p-2 rounded" placeholder="Type Here.."></textarea>
            </div>
          </div>
          <div>
            <h3 className='font-bold'>Assessment Summary</h3>
            <div className='mt-5'>
              <label className='block mb-1 font-medium'>Situation arising as a result of previous problem</label>
              <textarea className="w-full border p-2 rounded" placeholder="Type Here.."></textarea>
            </div>
          </div>
          <div>
            <h3 className='font-bold'>Plan</h3>
            <div className='mt-5'>
              <label className='block mb-1 font-medium'>Care</label>
              <textarea className='w-full border p-2 rounded' placeholder="Type Here.."></textarea>
            </div>
            <div className='mt-2'>
              <label className='block mb-1 font-medium'>Monitor Health</label>
              <textarea className='w-full border p-2 rounded' placeholder="Type Here.."></textarea>
            </div>
            <div className='mt-2'>
              <label className='block mb-1 font-medium'>What are the do's and donts for the patient?</label>
              <textarea className='w-full border p-2 rounded' placeholder="Type Here.."></textarea>
            </div>
          </div>

          <div className="flex justify-between mt-6">
              <button className="bg-green-500 text-white px-4 py-2 rounded">Edit Note</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded">Save Note</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded">Back to profile</button>
          </div>
        </div>
      </div>     
    );
};
export default SoapView

