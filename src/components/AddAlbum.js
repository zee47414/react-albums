import React from 'react'
import {Link} from "react-router-dom";
import Navbar from "./Navbar";
const addAlbum = (props) => {

//function to get all the input like user id nad password
const getAlbumFormData  = () => {
    const userId = document.getElementById('aaform-userid-inp').value ;
    const Title = document.getElementById('aaform-userid-inp').value ;
    props.addAlbumToList(Number(userId),Title)
}  


    return (
        
        <>
        {/* navbar*/}
        <Navbar path="/" page="Home" />
  
  
        <div className='addalbum-container'>
          <div className='addalbum-form'>
            <h4>Enter New Album Details</h4>
            {/* input container for user id and title*/ }
            <div className='inp-container'>
              Enter User Id :
              <input id='aaform-userid-inp' type="number" />
            </div>
            <div className='inp-container'>
              Enter Album Title :
              <input id='aaform-title-inp' type="text" />
            </div>
            <div>
                {/* using link on click to getalbumform data*/}
              <Link to="/"><button onClick={getAlbumFormData}>Add To List</button></Link>
            </div>
          </div>
        </div>
      </>
  )
}

export default addAlbum;