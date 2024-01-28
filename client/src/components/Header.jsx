import React from "react";
import { Navbar, TextInput, Button, Dropdown, Avatar, DropdownItem } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon,FaSun } from "react-icons/fa";
import { useSelector,useDispatch } from "react-redux";
import {toggleTheme} from '../redux/theme/theme.js'

import { signoutSuccess } from "../redux/user/user.slice.js";
function Header() {
  const path = useLocation().pathname;
  const  currentuser  = useSelector((state) => state.user. currentUser?.data);
  const {theme}=useSelector(state=>state.theme)
  const dispatch=useDispatch()
   
  const handlesignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else dispatch(signoutSuccess());
    } catch (error) {
      console.log("error occured in signout");
    }
  };
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span
          className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500  to-pink-500 
                           rounded-lg text-white"
        >
          Umesh's
        </span>{" "}
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        ></TextInput>
      </form>
      <Button className="w-12 h-10 lg:hidden " color="grey" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="grey" pill onClick={()=>dispatch(toggleTheme())}>
         {
          theme=="light"? <FaMoon />:<FaSun/>
         }
        </Button>
        {currentuser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user_avatar"
                img={currentuser.profilePicture}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                     @{currentuser.username}
              </span>
              <span className="block text-sm font-medium truncate">
                     {currentuser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <Dropdown.Divider></Dropdown.Divider>
            <DropdownItem onClick={handlesignout}>Sign out</DropdownItem>
          </Dropdown>

        ) : (
          <Link to="/signin">
            <Button gradientDuoTone="purpleToBlue" pill outline>
              {" "}
              Sign in
            </Button>
          </Link>
        )}

        <Navbar.Toggle></Navbar.Toggle>
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">about</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/project"} as={"div"}>
          <Link to="/project">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
