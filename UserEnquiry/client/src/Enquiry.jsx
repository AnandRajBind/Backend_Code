import React from 'react'
import { EnquiryList } from './enquiry/EnquiryList.jsx';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';

export const Enquiry = () => {
  let [enquiryList, setEnquiryList] = useState([]);
  let [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  let saveEnquiry = (e) => {
    // alert("Enquiry Saved Successfully");
    e.preventDefault();


    // let formData = {
    //   name: e.target.name.value,
    //   email: e.target.email.value,
    //   phone: e.target.phone.value,
    //   message: e.target.message.value
    // }

    axios.post('http://localhost:3000/api/website/enquiry/insert', formData).then((res) => {

      toast.success("Enquiry Saved Successfully")
      console.log("Enquiry saved successfully:", res.data);

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      }); // Reset form data after successful submission
      getAllEnquiry(); // Refresh the enquiry list
    })
  }
  let getAllEnquiry = () => {
    axios.get('http://localhost:3000/api/website/enquiry/view')
      .then((res) => {
        return res.data
      }).then((finalData) => {
        if (finalData.status) {
          setEnquiryList(finalData.enquiryList);
        }
      })
  }


  let getValue = (e) => {
    let inputName = e.target.name;// name , email, phone, message
    let inputValue = e.target.value; // value of the input field
    let oldData = { ...formData };

    oldData[inputName] = inputValue; // update the specific field in the formData object
    setFormData(oldData); // update the state with the new formData
    console.log(inputName)
  }

  useEffect(()=>{
    getAllEnquiry();
  },[])
  return (
    <div>
      <ToastContainer />
      <h1 className='text-[40px] py-6 text-center font-bold'>User Enquiry </h1>
      <div className='grid grid-cols-[30%_auto] p-4 gap-4'>
        {/* // Left Side */}
        <div className="bg-gray-200 p-4">
          <h2 className='text-[20px] font-bold'>Enquary Form</h2>
          <form className="py-3 font-semibold " onSubmit={saveEnquiry}>
            <div className="py-3 font-semibold ">
              <label htmlFor="name" >Your Name</label>
              <input onChange={getValue} value={formData.name} type="text" name='name' className="border border-gray-300 rounded p-2 w-full" placeholder='Enter Your Name' />
            </div>
            <div className="py-3 ">
              <label htmlFor="name" >Your Email</label>
              <input onChange={getValue} value={formData.email} type="text" name='email' className="border border-gray-300 rounded p-2 w-full" placeholder='Enter Your Email' />
            </div>
            <div className="py-3 ">
              <label htmlFor="name" >Phone Number</label>
              <input onChange={getValue} value={formData.phone} type="text" name='phone' className="border border-gray-300 rounded p-2 w-full" placeholder='Enter Your phone number' />
            </div>
            <div className="py-3 ">
              <label htmlFor="name" >Your Message</label>
              <textarea onChange={getValue} value={formData.message} className="border border-gray-300 rounded p-2 w-full" placeholder='Enter Your message' name="message" ></textarea>
            </div>

            <div className="py-3 bg-amber-400 rounded">
              <button type='submit' className='w-[100%]'>Save</button>
            </div>
          </form>
        </div>
        <EnquiryList  data={enquiryList} getAllEnquiry={getAllEnquiry}/>
      </div>
    </div>
  )
}
