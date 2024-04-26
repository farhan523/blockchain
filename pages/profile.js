import { TrackingContext } from '@/Context/Tracking';
import Navbar from '@/newComponents/Navbar/Navbar';
import Profile from '@/newComponents/profile/Profile';
import React, { useContext } from 'react';


export default  () => {
  const {statistics} = useContext(TrackingContext);
  return (
    <>
        <Navbar currentPage={"Profile"}/>
        <Profile statistics={statistics}/>
    </>
        
  )
}
