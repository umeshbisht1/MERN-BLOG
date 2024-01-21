import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "flowbite-react";
import {BsFacebook,BsInstagram ,BsTwitter, BsGithub, BsDribbble} from 'react-icons/bs'
export default function Footercom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className=" grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span
                className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500  to-pink-500 
                              rounded-lg text-white"
              >
                Sahand's
              </span>{" "}
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />

              <Footer.LinkGroup col>
                <Footer.Link
                  href="http://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener moreferrer"
                >
                  {" "}
                  100 js Projects
                </Footer.Link>
                <Footer.Link
                  href="http://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener moreferrer"
                >
                  {" "}
                  Sahand's blog
                </Footer.Link>
                <Footer.Link
                  href="http://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener moreferrer"
                >
                  {" "}
                  100 js Projects
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />

              <Footer.LinkGroup col>
                <Footer.Link
                  href=""
                  target="_blank"
                  rel="noopener moreferrer"
                >
                 
                  github
                </Footer.Link>
                <Footer.Link
                  href="http://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener moreferrer"
                >
                  Instagram
                </Footer.Link>
                <Footer.Link
                  href="http://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener moreferrer"
                >
                 Facebook
              
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="LEGAL" />

              <Footer.LinkGroup col>
                <Footer.Link
                  href="http://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener moreferrer"
                >
                  {" "}
                 Admin
                </Footer.Link>
                <Footer.Link
                  href="http://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener moreferrer"
                >
                  {" "}
                Term's and Condition
                </Footer.Link>
                <Footer.Link
                  href="http://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener moreferrer"
                >
                  {" "}
                 Privacy
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider></Footer.Divider>
        <div className=" w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright href="#" by="umesh singh bisht" year={new Date().getFullYear()}></Footer.Copyright>
           <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-between ">
           <Footer.Icon href="#" icon={BsFacebook}></Footer.Icon>
           <Footer.Icon href="#" icon={BsInstagram}></Footer.Icon>
           <Footer.Icon href="#" icon={BsGithub}></Footer.Icon>
           <Footer.Icon href="#" icon={BsTwitter}></Footer.Icon>
           <Footer.Icon href="#" icon={BsDribbble}></Footer.Icon>
           </div>
        </div>
      </div>
    </Footer>
  );
}
