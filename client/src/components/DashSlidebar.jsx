import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { useLocation, Link } from "react-router-dom";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import {  useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/user.slice.js";
function DashSlidebar() {
  const dispatch=useDispatch()
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlprams = new URLSearchParams(location.search);
    const tabFromUrl = urlprams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
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
   
      <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            
              <Link to='/dashboard?tab=profile'>
              <Sidebar.Item
                active={tab === "profile"}
                icon={HiUser}
                label={"user"}
                labelColor="dark"
                as='div'
                >
                Proofile
              </Sidebar.Item>
              </Link>
              
              <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handlesignout}>
                Sign Out
              </Sidebar.Item>
            
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
   
  );
}

export default DashSlidebar;
