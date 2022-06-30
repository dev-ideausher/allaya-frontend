  import React,{useState} from 'react';
  import swal from 'sweetalert';
  import './table.css'
  import Img1 from '../../assets/play.png';
  import Img2 from '../../assets/delete.png';
  import Img3 from '../../assets/edit.png';
  import AudioPlayer from "react-h5-audio-player";
 
  import {  Modal , Button , Input} from 'antd';

function Table({tracks , handleDeleteData ,handleEditTrackData }) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [audio , setAudio]= useState('https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3');
  const [audioName , setAudioName]= useState('')
  const [title , setTitle]= useState('');
  const [artist , setArtist]= useState('');
  const [tags , setTags]= useState('');
  const [description , setDescription]= useState('');
  const [ editDataTracks , setEditDataTracks] = useState([])
  
  

 
   
  const handlePlay = (val)=>{
    // console.log('playyy' , val)
    setAudio(val.audioTrack)
    setIsModalVisible(true);
    setAudioName(val.title);
      //  playAudio() 
            
    showModal()
    
  }

  const handleClickPrevious = () => {
    // setTrackIndex((currentTrack) =>
    //   currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1
    // );
  };

  const handleClickNext = () => {
    // setTrackIndex((currentTrack) =>
    //   currentTrack < musicTracks.length - 1 ? currentTrack + 1 : 0
    // );
  };

  

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModalEdit = () => {
    setIsModalVisibleEdit(true);
  };

  const handleOkEdit = () => {
    setIsModalVisibleEdit(false);
  };

  const handleCancelEdit = () => {
    setIsModalVisibleEdit(false);
  };

  const handleDelete = (val)=>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

          fetch(`http://13.57.185.250:8000/api/tracks/${val._id}`, {
           
            // Adding method type
            method: "PATCH",
             
            // Adding body or contents to send
            body: JSON.stringify({
              isDeleted: true,
            }),
             
            // Adding headers to the request
            headers: {
                "Content-type": 'application/json',
                "FIREBASE_AUTH_TOKEN":localStorage.getItem('authToken')
            }
        }).then((response)=>{
          if(response){
            async function fetchDataSubCategory() {
        
              const response = await fetch(`http://13.57.185.250:8000/api/tracks?subCategoryId=${val.subCategoryId}`);
              const json = await response.json();
             
              handleDeleteData(json?.tracks);
              // setIsModalVisibleSub(false);
            }
            fetchDataSubCategory();
            // window.location.reload()
          }
        })
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }

  const handleEdit=(val)=>{
    console.log(val , 'valueeeee')
    setEditDataTracks(val);
    setTitle(val.title);
    setArtist(val.artist)
    setTags(val.tags)
    setDescription(val.desc)
    showModalEdit()
  }

  const handleTittle=(e)=>{
    setTitle(e.target.value);
  }

  const handleArtist=(e)=>{
   setArtist(e.target.value);
  }
  const handleDes=(e)=>{
    setDescription(e.target.value);
  }
  const handleTags=(e)=>{
    setTags(e.target.value);
  }

  const handleCreate =()=>{
    fetch(`http://13.57.185.250:8000/api/tracks/${editDataTracks._id}`, {
           
      // Adding method type
      method: "PATCH",
       
      // Adding body or contents to send
      body: JSON.stringify({
         artist,
         title ,
        tags,
        desc: description,
      }),
       
      // Adding headers to the request
      headers: {
          "Content-type": 'application/json',
          "FIREBASE_AUTH_TOKEN":localStorage.getItem('authToken')
      }
  }).then((response)=>{
    if(response){
      async function fetchDataSubCategory() {
  
        const response = await fetch(`http://13.57.185.250:8000/api/tracks?subCategoryId=${editDataTracks.subCategoryId}`);
        const json = await response.json();
       
        handleEditTrackData(json?.tracks);
        // setIsModalVisibleSub(false);
      }
      fetchDataSubCategory();
      
    }
  })
  }


 console.log(audio , 'audio')


    return (
      <div className="App">
        <table>
          <tr className='header-table'>
            <th>Tittle</th>
            <th>Artist</th>
            <th>Tags</th>
            <th>Duration</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
          {tracks.map((val, key) => {
            return (
              <tr key={key}>
                <td><img  className='logo' src={val.thumbnailImage} alt='img'/> <span  style={{marginLeft:'10px'}}>{val.title}</span></td>
                <td>{val.artist}</td>
                <td>{val.tags}</td>
                <td>{val.updatedAt}</td>
                <td>{val.createdAt}</td>
                <td>
                 <div>
                 <button className="play-button" onClick={()=>handlePlay(val)}><img src = {Img1} alt='play' height={26} width={26}/></button>
                 <button className='delete-button' onClick={()=>handleDelete(val)}><img src = {Img2} alt='delete'  height={26} width={26}/></button>
                 <button className='edit-button' onClick={()=>handleEdit(val)}><img src = {Img3} alt ='edit' height={26} width={26} /></button>
                 </div>
                
                </td>
              </tr>
            )
          })}
        </table>
        <Modal title={audioName} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <div  >
        <audio controls>
        <source src={audio} type="audio/mp3"/>
       </audio>
      </div>
        </Modal>
     <Modal title="Basic Modal" visible={isModalVisibleEdit} onOk={handleOkEdit} onCancel={handleCancelEdit} footer={null}>
      <p>Title</p>
      <Input placeholder="Search" name='title' value={title} onChange={handleTittle} />
      <p>Artist</p>
      <Input  placeholder="Search" name='artist' value={artist} onChange={handleArtist} />
      <p>Tags</p>
      <Input  placeholder="Search" name='tags' value={tags} onChange={handleTags} />
      <p>Description</p>
      <Input 
       placeholder="Search" name='description' value={description} onChange={handleDes}  />
      <div>
     
      <div style={{marginLeft:'300px' , marginTop:'10px' , display:'flex' , justifyContent:'space-around'}}>
        <Button className='button-white' onClick={handleCancelEdit}>Cancal</Button>
        <Button className='button-orange' onClick={handleCreate}>Create</Button>
      </div>
      </div>
     </Modal>

      </div>
    );
  }
    
  export default Table;

  // http://13.57.185.250:8000/api/tracks/62b55cf6dcb28520017e211d  
  //  <div>
  //      <Upload {...props} >
  //      <Button icon={<UploadOutlined />}  style={{ marginTop:'10px', marginLeft : '50px',height:'100px', width:'250px' , border: '1px dashed #AAAAAA',borderRadius: '6px'}}>Upload png only</Button>
  //     </Upload>
  //    </div>

//   <AudioPlayer
//   // style={{ width: "300px" }}
//  style={{ borderRadius: "1rem" }}
//  autoPlay
//  layout="horizontal"
//  src={audio}
//  onPlay={(e) => console.log( 'aaaaaa')}
//  showSkipControls={true}
//  showJumpControls={false}
//  header={`Now playing: ${audioName}`}
//  // footer="All music from: www.bensound.com"
//  onClickPrevious={handleClickPrevious}
//  onClickNext={handleClickNext}
//  onEnded={handleClickNext}
//  // other props here
// />