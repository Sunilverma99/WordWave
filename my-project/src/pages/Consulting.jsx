import React from 'react';
import { useState } from 'react';
import useScrollToTop from "../components/useScrollToTop.jsx"
import toast from 'react-hot-toast';
import { set } from 'mongoose';
function Consulting() {
    const[name,setName]=useState("");
 const[email,setEmail]=useState("");
const[subject,setSubject]=useState("");
const[message,setMessage]=useState("");
useScrollToTop();
const handleSubmit=async(e)=>{
    e.preventDefault();
    const data={name,email,subject,message};
     const res=await fetch("/api/client",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
     }
   )
   const resData=await res.json();
   if(resData.success||res.ok){
        toast.success("Your message has been sent successfully")
        setName("");
        setEmail("");   
        setSubject("");
        setMessage("");
   }else{
    toast.error("Something went wrong")
   }
}
    return (
    <>
        <div className="p-6 w-full mx-auto">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Consulting Services</h1>
                <p className="text-lg text-gray-600">Unlock the Power of Data with Marklytics</p>
            </header>

            <section className="mb-12">
                <p className="text-base text-gray-800">
                    At Marklytics, we believe in the transformative power of data. Our consulting services are designed to help you harness this power to drive growth, innovation, and efficiency within your organization. Whether you are just starting your data journey or looking to optimize your existing processes, our team of experts is here to assist you every step of the way.
                </p>
            </section>

            <section>
                <div className="space-y-8">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Data Strategy Development</h2>
                        <p><strong className="font-medium">Overview:</strong> We help you define a clear data strategy aligned with your business objectives.</p>
                        <p><strong className="font-medium">Deliverables:</strong> Strategic roadmap, implementation plan, KPI framework.</p>
                        <p><strong className="font-medium">Benefits:</strong> Improved decision-making, competitive advantage, and a robust data culture.</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Data Integration and Management</h2>
                        <p><strong className="font-medium">Overview:</strong> Seamlessly integrate diverse data sources and ensure data quality and consistency.</p>
                        <p><strong className="font-medium">Deliverables:</strong> Data integration plan, data governance framework, master data management.</p>
                        <p><strong className="font-medium">Benefits:</strong> Unified data view, enhanced data accuracy, and operational efficiency.</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Advanced Analytics and AI</h2>
                        <p><strong className="font-medium">Overview:</strong> Leverage advanced analytics and artificial intelligence to uncover hidden insights and drive innovation.</p>
                        <p><strong className="font-medium">Deliverables:</strong> Predictive models, machine learning algorithms, AI solutions.</p>
                        <p><strong className="font-medium">Benefits:</strong> Increased predictive accuracy, automation of complex processes, and data-driven innovation.</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Business Intelligence and Reporting</h2>
                        <p><strong className="font-medium">Overview:</strong> Transform raw data into meaningful insights and actionable intelligence.</p>
                        <p><strong className="font-medium">Deliverables:</strong> Interactive dashboards, custom reports, data visualization.</p>
                        <p><strong className="font-medium">Benefits:</strong> Enhanced reporting capabilities, better decision-making, and real-time insights.</p>
                    </div>
                </div>
            </section>
        </div>
        <div className="flex  w-full items-center justify-center py-16 bg-gray-900 text-white">
        <div className="text-center">        
                <p className="text-xl md:text-3xl mb-4">Stay informed</p>
            <p className="text-lg md:text-2xl mb-6">Information + Context + Judgment</p>
        </div>
    </div>
    <div className='p-4 text-center font-bold'>
    <h1 className='text-4xl'>Get in touch</h1>
    <p className='text-xl'>To engage our consulting service for your specific needs, get in touch –</p>
    </div>
    <div className='p-4  py-12 flex  justify-center'>
   
    <form onSubmit={handleSubmit} className="ml-auo max-w-4xl  space-y-4">
        <input type='text' onChange={(e)=>setName(e.target.value)} placeholder='Name'
            className="w-full rounded-md py-3 px-4 bg-gray-100 dark:text-black text-sm outline-[#007bff]" />
        <input type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Email'
            className="w-full rounded-md py-3 px-4 bg-gray-100 dark:text-black  text-sm outline-[#007bff]" />
        <input type='text' onChange={(e)=>setSubject(e.target.value)} placeholder='Subject'
            className="w-full rounded-md py-3 px-4 bg-gray-100 dark:text-black  text-sm outline-[#007bff]" />
        <textarea placeholder='Message' onChange={(e)=>setMessage(e.target.value)} rows="6"
            className="w-full rounded-md px-4 bg-gray-100 text-sm pt-3 dark:text-black  outline-[#007bff]"></textarea>
           <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded mt-2"
            >
              Send
            </button>
            
    </form>
    </div>
        </>
    );
}

export default Consulting;
