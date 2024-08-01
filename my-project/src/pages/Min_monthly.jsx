import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoNewspaperOutline } from "react-icons/io5";
import useScrollToTop from "../components/useScrollToTop.jsx"
function MinMonthly() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionToggle = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };
  useScrollToTop();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !firstName || !lastName) {
      return toast.error('Please fill in all fields');
    }
    try {
      const response = await fetch('/api/addMonthlySubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName, lastName }),
      });
      const data = await response.json();
      if(response.status=== 200) {
        toast.success('Subscribed successfully');
        setEmail('');
        setFirstName('');
        setLastName('');
      } else {
        toast.error('An error occurred');
        setEmail('');
        setFirstName('');
        setLastName('');
      }
    } catch (error) {
      console.error(error);
      setEmail('');
      setFirstName('');
      setLastName('');
      toast.error('An error occurred');
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row p-8 font-roboto">
        {/* Left Section */}
        <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md mr-4">
          <div className="flex items-center mb-4 gap-3">
            <IoNewspaperOutline className='w-8 h-8 m-1' />
            <h1 className="md:text-2xl text-xl font-extrabold">5-MIN MONTHLY</h1>
          </div>
          <h2 className="md:text-4xl text-3xl font-bold mb-2">
            Spend 5 mins reading and sound smart the entire month
          </h2>
          <p className="text-gray-700 text-lg">
            The average reading speed, according to Wikipedia, is 250 words per minute. So here goes a monthly roundup of in less than 1250 words. Promise, no more. And no, the links don’t count – that’s additional reading.
          </p>
        </div>

        {/* Right Section */}
        <div className="md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md mt-8 md:mt-0">
          <h3 className="text-xl font-semibold mb-4">5-Min Monthly</h3>
          <p className="mb-4">Sign-up to receive newsletter via email</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              type="text"
              placeholder="First Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              type="text"
              placeholder="Last Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <p className="text-gray-600 text-sm">
              We will only contact you with the newsletter and the occasional special email. You can unsubscribe anytime.
            </p>
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded mt-2"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
      <div className=''>
        <div className='flex items-center text-center justify-center p-10'>
          <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 uppercase">Archives</button>
        </div>
        <div>
          {/* <h1 className='max-w-5xl px-12  py-4 text-4xl'>2024</h1> */}
          {/* <div id="accordion-collapse" data-accordion="collapse">
            <AccordionItem
              id="1"
              title="January 2024"
              content="First one of the year, covering these topics and more:"
              isOpen={openAccordion === '1'}
              onToggle={() => handleAccordionToggle('1')}
            />
            <AccordionItem
              id="2"
              title="February - March 2024"
              content="This is published late for a February (or early for a March update, depending on how you want to view it)"
              isOpen={openAccordion === '2'}
              onToggle={() => handleAccordionToggle('2')}
            />
            <AccordionItem
              id="3"
              title="April 2024"
              content="U.S. EPA MY 2027+ Light- and Medium-duty Multipollutant Rule"
              isOpen={openAccordion === '3'}
              onToggle={() => handleAccordionToggle('3')}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

function AccordionItem({ id, title, content, isOpen, onToggle }) {
  return (
    <div className='px-12'>
      <h2 id={`accordion-collapse-heading-${id}`}>
        <button
          type="button"
          className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 ${isOpen ? 'rounded-t-xl' : ''} focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3`}
          data-accordion-target={`#accordion-collapse-body-${id}`}
          aria-expanded={isOpen}
          aria-controls={`accordion-collapse-body-${id}`}
          onClick={onToggle}
        >
          <span>{title}</span>
          <svg data-accordion-icon className={`w-3 h-3 ${isOpen ? 'rotate-180' : ''} shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
          </svg>
        </button>
      </h2>
      <div id={`accordion-collapse-body-${id}`} className={`${isOpen ? '' : 'hidden'}`} aria-labelledby={`accordion-collapse-heading-${id}`}>
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <p className="mb-2 text-gray-500 dark:text-gray-400">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default MinMonthly;
