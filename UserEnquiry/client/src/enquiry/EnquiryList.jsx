import React from 'react'


export function EnquiryList() {
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
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-2 border">1</td>
            <td class="px-4 py-2 border">Apple MacBook Pro 17"</td>
            <td class="px-4 py-2 border">Laptop</td>
            <td class="px-4 py-2 border">$2999</td>
            <td class="px-4 py-2 border">hii</td>
            <td class="px-4 py-2 border text-blue-600 hover:underline cursor-pointer">Edit</td>
            <td class="px-4 py-2 border text-blue-600 hover:underline cursor-pointer">Delete</td>
          </tr>

        </tbody>
      </table>
    </div>
  )
}
