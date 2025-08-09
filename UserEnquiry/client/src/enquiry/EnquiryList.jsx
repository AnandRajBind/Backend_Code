import React from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';


export function EnquiryList({ data, setFormData,  getAllEnquiry  }) {

  let deleteRow = (delid) => {

    Swal.fire({
      title: 'Are you sure?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/api/website/enquiry/delete/${delid}`).then((res) => {
          toast.success(" Deleted Successfully", res);
          getAllEnquiry();
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  let editRow = (edited) => {

    axios.get(`http://localhost:3000/api/website/enquiry/single/${edited}`).then((res) => {
      let data = res.data
      setFormData(data.enquiry)
      console.log("Edit mode form data"+data.enquiry);
    })
  }
  return (
    <div className="bg-gray-200 p-4">
      <h2 className='text-[20px] font-bold'>Enquary list</h2>
      <table>
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 border">Sr No</th>
            <th class="px-4 py-2 border">Name</th>
            <th class="px-4 py-2 border">Email</th>
            <th class="px-4 py-2 border">Phone</th>
            <th class="px-4 py-2 border">Message</th>
            <th class="px-4 py-2 border">Edit</th>
            <th class="px-4 py-2 border">Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr class="hover:bg-gray-50">
            <td class="px-4 py-2 border">1</td>
            <td class="px-4 py-2 border">Apple MacBook Pro 17"</td>
            <td class="px-4 py-2 border">Laptop</td>
            <td class="px-4 py-2 border">$2999</td>
            <td class="px-4 py-2 border">hii</td>
            <td class="px-4 py-2 border text-blue-600 hover:underline cursor-pointer">Edit</td>
            <td class="px-4 py-2 border text-blue-600 hover:underline cursor-pointer">Delete</td>
          </tr> */}

          {
            data.length >= 1 ? data.map((item, index) => {
              return (
                <>
                  <tr key={index} class="hover:bg-gray-50">
                    <td class="px-4 py-2 border">{index + 1}</td>
                    <td class="px-4 py-2 border"> {item.name}</td>
                    <td class="px-4 py-2 border">{item.email}</td>
                    <td class="px-4 py-2 border">{item.phone}</td>
                    <td class="px-4 py-2 border">{item.message}</td>
                    <td onClick={() => editRow(item._id)} className="bg-blue-500 px-4 py-2 border text-white hover:underline cursor-pointer">Edit</td>
                    <td onClick={() => deleteRow(item._id)} className="px-4 py-2 border bg-red-500 text-white hover:underline cursor-pointer">Delete</td>
                  </tr>
                </>
              )
            })
              :
              <tr className='bg-white dark:bg-gray-700'>
                <td colSpan={7} className='text-center py-4'>No Data Found</td>
              </tr>
          }
        </tbody>
      </table>
    </div>
  )
}
