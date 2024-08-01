import React from 'react'
import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import InputMask from 'react-input-mask';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
function Payment() {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focused: '',
  });
  const handleInputChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleFocusChange = (e) => {
    setCardDetails({
      ...cardDetails,
      focused: e.target.name,
    });
  };
  return (
    <div>
      <h1 className='text-4xl font-bold text-center p-4'>Sponsor Registration</h1>
      

<form className="w-full px-24 pb-5 mx-auto">
  <div className="mb-5 flex w-full justify-between gap-3">
   <div className='w-full'>
   <label htmlFor="firstName" className="block mb-2  text-sm font-medium text-gray-900 dark:text-white">First Name
   </label>
   <input type="first" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required />
   </div>
   <div className='w-full'>
   <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
   <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  required />
   </div>
  </div>
  <div className='mb-5'>
  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
  <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
  </div>
  <div className="mb-5">
  <label for="phone-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number:</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"/>
            </svg>
        </div>
        <input type="text" id="phone-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
    </div>  </div>
  <div className="mb-5">
    <label htmlFor="company-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
    <input type="name" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
  </div>
  
<h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Sponsorship Type</h3>
<ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div className="flex items-center ps-3">
            <input id="horizontal-list-radio-license" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Support </label>
        </div>
    </li>
    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div className="flex items-center ps-3">
            <input id="horizontal-list-radio-id" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label htmlFor="horizontal-list-radio-id" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sponsor</label>
        </div>
    </li>
    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div className="flex items-center ps-3">
            <input id="horizontal-list-radio-military" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label htmlFor="horizontal-list-radio-military" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Champion</label>
        </div>
    </li>
</ul>
<div className='p-4'>
<h1 >Total</h1>
<p className=' text-green-600'>$1000.00</p>
</div>
<div className="flex flex-col lg:flex-row items-center lg:space-x-4">
      
      <div className="mt-4 lg:mt-0 lg:w-1/2">
        <div className="mb-4">
          <input
            type="text"
            name="number"
            placeholder="Card Number"
            value={cardDetails.number}
            onChange={handleInputChange}
            onFocus={handleFocusChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Card Holder's Name"
            value={cardDetails.name}
            onChange={handleInputChange}
            onFocus={handleFocusChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="flex mb-4">
          <InputMask
            mask="99/99"
            maskChar=" "
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={cardDetails.expiry}
            onChange={handleInputChange}
            onFocus={handleFocusChange}
            className="p-2 border rounded w-1/2 mr-2"
          />
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            value={cardDetails.cvc}
            onChange={handleInputChange}
            onFocus={handleFocusChange}
            className="p-2 border rounded w-1/2"
          />
        </div>
       
      </div>
      <div className="lg:w-1/2">
        <Cards
          number={cardDetails.number}
          name={cardDetails.name}
          expiry={cardDetails.expiry}
          cvc={cardDetails.cvc}
          focused={cardDetails.focused}
        />
      </div>
    </div>
    <button
          type="button"
          className="bg-green-500 text-white p-2 mt-5 rounded w-full"
        >
          Submit
        </button>
</form>
    </div>
  )
}

export default Payment