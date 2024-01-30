import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Project from "./pages/Project.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Protected from "./components/Protected.jsx";
import Adminprotected from "./components/Adminprotected.jsx";
import CreatePost from "./pages/CreatePost.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route element={<Adminprotected/>}>
          <Route path="/create-post" element={<CreatePost/>}></Route>
        </Route>
        <Route path="/project" element={<Project />}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
