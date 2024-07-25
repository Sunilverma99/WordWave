import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <motion.h1 
          className="text-4xl font-bold text-center text-black dark:text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h1>
        <div className='flex flex-col gap-4 lg:flex-row lg:gap-8'>
          <motion.div 
            className='w-full  rounded-lg p-4'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img className='w-full h-auto rounded-lg' src="https://images.pexels.com/photos/6803523/pexels-photo-6803523.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
          </motion.div>
          <motion.div 
            className="bg-opacity-75 p-8 w-full lg:w-1/2 rounded-lg shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
              At Marklytics, we don't just solve problems - we ignite transformations. Our team of passionate strategists and industry veterans empowers businesses to achieve exponential results.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
              Here's our secret sauce:
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
              <strong>Data & AI:</strong> We unlock the power of your data, delivering actionable insights to optimize operations and fuel data-driven decisions that propel you ahead of the competition.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
              <strong>CO2 Engineering:</strong> We navigate the complexities of carbon reduction, crafting sustainable solutions that empower you to achieve your CO2 neutrality goals and become a sustainability leader.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
              <strong>Go-to-Market Strategies:</strong> We craft winning go-to-market plans that ensure your product or service reaches the perfect audience, fast, driving rapid market adoption and dominating your space.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
              Website: <a href="https://www.marklytics.co.uk/" className="text-blue-500">https://www.marklytics.co.uk/</a>
            </p>
           
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
