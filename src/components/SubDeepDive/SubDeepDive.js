import React,{useEffect, useState} from 'react'
import './style.css';
import { Button , Input , Space, Tag, Modal , message , Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import Table from '../Table/Table'

function SubDeepDive({trackData , categoryId ,subCategoryId}) {
    const[tracks , setTracks]=useState([]);
    const[searchResult , setSearchResult]=useState([]);
    const [searchValue , setSearchValue] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [title , setTitle]= useState('');
    const [artist , setArtist]= useState('');
    const [tags , setTags]= useState('');
    const [description , setDescription]= useState('');

    async function fetchData() {
    console.log('fffffff')
    const response = await fetch(`http://13.57.185.250:8000/api/tracks?subCategoryId=${subCategoryId}`);
    const json = await response.json();

    setTracks(json.tracks);
    
  }
  
  useEffect(() => {
    fetchData();
  }, []);
  

  const handleSearchChage=(e)=>{
    setSearchValue(e.target.value);

  }

  useEffect(() => {
    if(searchValue.length !== ' '){
      const newContactList= tracks.filter((item)=>{
        return item.title.toLowerCase().includes(searchValue.toLowerCase())
        
      });
      console.log(newContactList , 'checking cccccccc')
      setSearchResult(newContactList);
     }else{
       setSearchResult(tracks);
     }
  }, [tracks,searchValue]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

  const props = {
    beforeUpload: (file) => {
      const isPNG = file.type === 'image/jpeg';
  
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
  
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  const handleClick = () =>{
    
     fetch("http://13.57.185.250:8000/api/tracks", {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
      title: title,
      artist:artist,
      tags:["hindi","bollywood","romantic"],
      desc:description,
      audioTrack:"https://allayya-tracks.s3.us-west-1.amazonaws.com/allayya-track-Mast+Nazron+Se_320%28PagalWorld.com.se%29.mp3",
      thumbnailImage:"https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/attachment_75094405.jpg",
      subCategoryId:subCategoryId
    }),
     
    // Adding headers to the request
    headers: {
        "Content-type": 'application/json',
        "FIREBASE_AUTH_TOKEN":localStorage.getItem('authToken')
    }
}).then((response) =>{
  
  fetchData();
  setIsModalVisible(false);
  setArtist('');
  setTags('');
  setDescription('');
  setTitle('');

})
  }
  // const tracksRes = [];
  // useEffect(()=>{
    
  //   if(tracks.length > 0){
  //     tracksRes= tracks;
  //   }
  // },[tracks] )
  
console.log(tracks,'tttttttttttt')
 

 
  return (
      <div>
    <div className='flex'>
      <div className='track-details'>
      <img src={trackData.coverImage} alt='img' className='track-details'/>
      
      </div>
      <div className='track-info'>
        <p className='name'>{trackData.name}</p>
        <div className='update'>{trackData.createdAt}</div>
        <p className='music-details'>{trackData.desc}</p>
        <div style={{margin:'10px' , display:'flex'  , justifyContent:'flex-start'}}>
        <Button className='edit'>Edit</Button>
        <div style={{margin:'15px'}}></div>
        <Button className='delete'>Delete</Button>
        </div>
        
      </div>
    
    </div>
    <div>
        <p className='sub-name'> Name</p>
        <div className='space' >
            <Input className='search' placeholder="Search" name='searchValue' value={searchValue} onChange={handleSearchChage} />
            <Button className='addNew'  type='primary' onClick={showModal} >Add New</Button>
        </div>
        
         <div className='table'>
         <Table tracks={ searchValue.length < 1 ? tracks : searchResult }/>
         </div>
    
    </div>
    <div>
      <Modal  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
      <p className='bold-style'>Uplaod Tracks</p>
      <p className='name'>Title</p>
      <Input className='search search-two' placeholder="Search" name='title' value={title} onChange={handleTittle} />
      <p className='name'>Artist</p>
      <Input className='search search-two' placeholder="Search" name='artist' value={artist} onChange={handleArtist} />
      <p className='name'>Tags</p>
      <Input className='search search-two' placeholder="Search" name='tags' value={tags} onChange={handleTags} />
      <p className='name'>Description</p>
      <Input className='search search-two' placeholder="Search" name='description' value={description} onChange={handleDes}  />
      <div>
      <div>
       <Upload {...props} >
        <Button icon={<UploadOutlined />}  style={{ marginTop:'10px', marginLeft : '50px',height:'100px', width:'250px' , border: '1px dashed #AAAAAA',borderRadius: '6px'}}>Upload png only</Button>
       </Upload>
      </div>
      <div style={{marginLeft:'300px' , marginTop:'10px' , display:'flex' , justifyContent:'space-around'}}>
        <Button className='button-white' onClick={handleCancel}>Cancal</Button>
        <Button className='button-orange' onClick={handleClick}>Create</Button>
      </div>
      </div>
    </Modal>
     </div>
        
    </div>
  )
}

export default SubDeepDive


