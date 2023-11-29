import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
// import RecordList from "./components/recordList";
// import Edit from "./components/edit";
import Select from "./components/select";
import Create from "./components/create";
import Signin from "./components/signin";
import Mingle from "./components/mingle";
 const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route path="/" element={<Home/>}/>
       {/* <Route path="/edit/:id" element={<Edit />} /> */}
       <Route path="/select" element={<Select/>}/>
       <Route path="/create" element={<Create />} />
       <Route path="/signin" element={<Signin/>}/>
       <Route path="/mingle" element={<Mingle/>}/>
     </Routes>
   </div>
 );
};
 export default App;