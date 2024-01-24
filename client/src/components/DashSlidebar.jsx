import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { useLocation, Link } from "react-router-dom";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
function DashSlidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlprams = new URLSearchParams(location.search);
    const tabFromUrl = urlprams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
   
      <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            
              <Link to='/dashboard?tab=profile'>
              <Sidebar.Item
                active={tab === "profile"}
                icon={HiUser}
                label={"user"}
                labelColor="dark">
                Proofile
              </Sidebar.Item>
              </Link>
              
              <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
                Sign Out
              </Sidebar.Item>
            
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
   
  );
}

export default DashSlidebar;
