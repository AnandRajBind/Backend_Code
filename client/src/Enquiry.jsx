import React from 'react'

export const Enquiry = () => {

  let saveEnquiry = (e) => {
    alert("Enquiry Saved Successfully");
    e.preventDefault();
  }

  return (
    <div>
      <h1 className='text-[40px] py-6 text-center font-bold'>User Enquiry </h1>

      <div className='grid grid-cols-[30%_auto]'>
        {/* // Left Side */}
        <div className="bg-gray-200 p-4">
          <h2 className='text-[20px] font-bold'>Enquary Form</h2>
          <form className="py-3 font-semibold " onSubmit={saveEnquiry}>
            <div className="py-3 font-semibold ">
              <label htmlFor="name" >Your Name</label>
              <input type="text" name='name' className="border border-gray-300 rounded p-2 w-full" placeholder='Enter Your Name' />
            </div>
            <div className="py-3 ">
              <label htmlFor="name" >Your Email</label>
              <input type="text" name='email' className="border border-gray-300 rounded p-2 w-full" placeholder='Enter Your Email' />
            </div>
            <div className="py-3 ">
              <label htmlFor="name" >Phone Number</label>
              <input type="text" name='phone' className="border border-gray-300 rounded p-2 w-full" placeholder='Enter Your phone number' />
            </div>
            <div className="py-3 ">
              <label htmlFor="name" >Your Message</label>
              <textarea className="border border-gray-300 rounded p-2 w-full" placeholder='Enter Your message' name="message" ></textarea>
            </div>

            <div className="py-3 bg-amber-400 rounded">
              <button type='submit' className='w-[100%]'>Save</button>
            </div>
          </form>
        </div>

        <div>
          <h2 className='text-[20px] font-bold'>Enquary list</h2>

        </div>
      </div>
    </div>
  )
}
