import React from "react";
import { FaHandsHelping } from "react-icons/fa";
import { GoSponsorTiers } from "react-icons/go";
import { IoReorderThree } from "react-icons/io5";
import useScrollToTop from "../components/useScrollToTop.jsx"
function Sponsors() {
  useScrollToTop();
  return (
    <div>
      <div className="flex flex-col md:flex-row p-8 bg-gray-50 rounded-lg shadow-lg">
        {/* Left Section */}
        <div className="md:w-2/3 p-6">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">Sponsors</h1>
          <p className="text-xl mb-6 text-gray-700 leading-relaxed">
            This website aims to deliver unbiased information about technologies
            and policies for sustainable transportation. The website content is
            viewed by a diverse group of industry professionals, executives, and
            regulators, and the newsletter goes out to thousands of subscribers
            – a growing list.
          </p>
          <p className="text-2xl font-semibold mb-4 text-gray-800">
            Consider sponsoring for the following reasons:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li className="mb-3">
              <span className="font-semibold text-gray-800">
                Visibility for your organization:
              </span>{" "}
              Your organization will be listed on the website and any content
              going out to subscribers.
            </li>
            <li className="mb-3">
              <span className="font-semibold text-gray-800">
                Get the word out on your technology:
              </span>{" "}
              We will work with you on preparing a post summarizing and
              highlighting your technology pertinent to transport
              decarbonization.
            </li>
            <li className="mb-3">
              <span className="font-semibold text-gray-800">
                Get a seat at the table:
              </span>{" "}
              Your questions and suggestions on improving the content will get
              priority, and you will be given access to details on content
              posted on the website.
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="md:w-1/3 p-6 flex justify-center items-center">
          <div className="relative w-full h-64 md:h-auto bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://t3.ftcdn.net/jpg/02/48/02/66/360_F_248026677_KWGNFxZJuS4xvnpGGVeRbUVOJecVfctp.jpg"
              alt="Sponsors Welcome"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              {/* <h2 className="text-2xl font-bold text-white">SPONSORS WELCOME</h2> */}
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-wrap justify-around p-8 bg-gray-50 rounded-lg shadow-lg">
        <div>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <FaHandsHelping className="w-12 h-12 mb-2 " />
            <a href="#">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Support
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Visit our website for a step-by-step guide on how to certify your
              weekly benefits:
            </p>
            <button
              type="button"
              class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Support
            </button>
          </div>
        </div>
        <div>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <GoSponsorTiers className="w-12 h-12 mb-2 " />
            <a href="#">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Sponsor
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Go to this step by step guideline process on how to certify for
              your weekly benefits:
            </p>
            <button
              type="button"
              class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Support
            </button>
          </div>
        </div>
        <div>
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <IoReorderThree className="w-12 h-12 mb-2 " />
            <a href="#">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Champion
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Go to this step by step guideline process on how to certify for
              your weekly benefits:
            </p>
            <a
              href="#"
              class="inline-flex font-medium items-center text-blue-600 hover:underline"
            >
              <button
                type="button"
                class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Support
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center p-8 bg-gray-50 rounded-lg shadow-lg">
        <h1 className=" text-3xl">Our Sponsors</h1>
        <p className=" font-thin text-sm">Thank you to our sponsors – consider joining them !</p>
      </div>
    </div>
  );
}

export default Sponsors;
