import React from 'react';
import NavBar from './component/NavBar';
import HomePageBody from './component/HomePageBody';
import { useState , useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseInit';
function App() {
  
  const [user, setUser] = useState(null);
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
    
      <NavBar user = {user}/>
      <HomePageBody user = {user}/>
      

    </>

  );
}

export default App;
