import React, { Component } from "react";
import {Routes,Route} from 'react-router-dom';
import AddAlbum from './AddAlbum';
import AlbumsList from './AlbumList';
import UpdateAlbum from './UpdateAlbum';

//export class app with a component extend
export default class App extends Component{
constructor(){
  super();
  this.state = {
    albums:[],
    updateAlbum: {}
  }
}
  //first function to call on when app get render
  componentDidMount = async ()=>{
    const albums = await fetch('https://jsonplaceholder.typicode.com/albums')
    .then((Response)=>Response.json())
    .then((json)=>json);
    this.setState({
      albums
    })
  }

  //fuction to delete an album
    deleteAlbumFromList = (id) =>
    {
      //fetch id from album list and delete
      fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, { method: 'DELETE', })
      const newAlbums = this.state.albums.filter((album) => album.id !== id);
      alert("your Album deleted successfully");
      this.setState({
        //display new albums after delete
        albums: newAlbums,
      })
    }

    //fucntion to update albums
    setUpdateAlbum = async(album)=>{
      this.setState({
        updateAlbum:album
      })
    }
      //function to update all update objects like title,userid,oldalbum
      updateAlbumInList = async (id,updateTitle,updateUserid,oldAlbum)=>{
        const albums =  this.state.albums;
        const index = albums.indexOf(oldAlbum);
        let updatedAlbum = [];
        if(id<100){
          updatedAlbum = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`,{
            method:'PUT',
            body: JSON.stringify({
              userId: updateUserid,
              id:id,
              title : updateTitle,
            }),
            headers:{
              'Content-type': 'application/json; charset=UTF-8',
            },
          }).then((response) => response.json()).then((json) => json);

        }else{
          updatedAlbum = {
            userId: updateUserid,
            id: id,
            title: updateTitle
          }
        }
        albums[index] = updatedAlbum;
        this.setState({
          albums: albums
        })
        alert("Update Successfully done")
      }
      addAlbumToList = (userId, title) => {
        fetch('https://jsonplaceholder.typicode.com/albums', {
          method: 'POST',
          body: JSON.stringify({
            userId: userId,
            id: this.state.count,
            title: title,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }).then((response) => response.json()).then((json) => json);
        const length = this.state.albums.length;
        const lastId = this.state.albums[length - 1].id;
        const album = {
          userId: userId,
          id: lastId + 1,
          title: title,
        }
        this.setState({
          albums: [...this.state.albums, album]
        })
        alert("New Album added successfully in the bottom");
}

render() {
  return (
    <>
      <Routes>
        <Route path='/' element={<AlbumsList albums={this.state.albums} setUpdateAlbum={this.setUpdateAlbum} deleteAlbumFromList={this.deleteAlbumFromList} />}></Route>
        <Route path='/add-album' element={<AddAlbum addAlbumToList={this.addAlbumToList} />}></Route>
        <Route path='/update-album' element={<UpdateAlbum album={this.state.updateAlbum} updateAlbumInList={this.updateAlbumInList} />}></Route>
      </Routes>
    </>
  )
}
}