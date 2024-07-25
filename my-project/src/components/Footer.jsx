import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble ,BsLinkedin } from 'react-icons/bs';
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-black text-lg sm:text-xl font-semibold dark:text-white'
            >
              <img src="https://www.marklytics.co.uk/wp-content/uploads/2023/12/logomark0.png" className='w-44 h-12' alt="Marklytics Logo" />
            </Link>
            <p className='font-thin '>
              At Marklytics, we’re your strategic ally in the tech, data, and market landscape.
              With a focus on innovation and client <br/> success, we offer Data Science, AI <br/> Solutions,
              Market Research, Go-to- <br/>Market, and Sales & Marketing services.
            </p>
          </div>
          <div className='grid grid-cols-2 mt-4 px-8 sm:grid-cols-4 sm:gap-6'>
            <div>
              <Footer.Title className='text-black font-bold' title='Quick Links' />
              <Footer.LinkGroup col>
                <Footer.Link href='/'>Home</Footer.Link>
                <Footer.Link href='/about'>About Us</Footer.Link>
                <Footer.Link href='/contact'>Contact Us</Footer.Link>
                <Footer.Link href='/blog'>Blog</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title className='text-black font-bold' title='Services' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Co2 & Vehicle Engineering</Footer.Link>
                <Footer.Link href='#'>Planning & Benchmarking</Footer.Link>
                <Footer.Link href='#'>Sustainability & ESG</Footer.Link>
                <Footer.Link href='#'>Credits & Life Cycle</Footer.Link>
                <Footer.Link href='#'>DataScience & AI</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title className='text-black font-bold' title='Products' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Clean Fleet Analytics</Footer.Link>
                <Footer.Link href='#'>Drive 2 Zero Pathway</Footer.Link>
                <Footer.Link href='#'>Corporate Circular Carbon</Footer.Link>
                <Footer.Link href='#'>Carbon Credit Scenarist</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title className='text-black font-bold' title='Information' />
              <Footer.LinkGroup col>
                <Footer.Link href='mailto:info@marklytics.co.uk'><div className='flex items-center text-center gap-1'><MdEmail />info@marklytics.co.uk</div></Footer.Link>
                <Footer.Link href='tel:+447441368264'><div className='flex items-center text-center gap-1'><IoIosCall />+44 7441 368264</div></Footer.Link>
                <Footer.Link href='tel:+442045380310'><div className='flex items-center text-center gap-1'><IoIosCall />+44 204 538 0310</div></Footer.Link>
                <Footer.Link href='#'><div className='flex items-center text-center gap-1'><IoLocationSharp className='w-12 h-12' />IIfound BusinessHub, Forest House, 3rd floor, 16-20 Clements Road, Ilford, IG1 1BA, United Kingdom</div></Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="MARKLYTICS LTD. All Right Reserved ."
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='https://www.facebook.com/MarklyticsUK' icon={BsFacebook} />
            <Footer.Icon href='https://www.instagram.com/marklytics.co.uk/' icon={BsInstagram} />
            <Footer.Icon href='https://x.com/Marklyticsuk' icon={BsTwitter} />
            <Footer.Icon href='https://www.linkedin.com/company/marklytics' icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
