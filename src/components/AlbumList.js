import React from 'react'
import List from './list';
import Navbar from './Navbar';

//this function will get album lists and call list component for each list
const AlbumList = (props) => {
  return (
    <>
    {/* Navbar */}
    <Navbar page="Add Album" path="/add-album" />

    <div className='albums-list'>
        {/* use map method to iterate from list with a key to delete and update an album*/}
      {props.albums.map((album) => <List album={album} key={album.id} setUpdateAlbum={props.setUpdateAlbum} deleteAlbumFromList={props.deleteAlbumFromList} />)}
    </div>
  </>
  )
}

export default AlbumList;