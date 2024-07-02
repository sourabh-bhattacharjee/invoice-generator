import React from 'react';
import NavBar from './component/NavBar';
import HomePageBody from './component/HomePageBody';
import { useSelector } from 'react-redux';

function App() {
  const selComp = useSelector((state) => state.displayMainBody.value);
  console.log(selComp);
  return (
    <>
    
      <NavBar/>
      <HomePageBody/>
      {/* {selComp ==='first'?<HomePageBody/>:null} */}
      {/* {selComp ==='signupPage'?<SignupPage/>:null} */}

    </>

  );
}

export default App;
