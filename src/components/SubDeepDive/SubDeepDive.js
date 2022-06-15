import React,{useEffect, useState} from 'react'
import './style.css';
import { Button , Input , Space, Tag, Modal} from 'antd';
import "antd/dist/antd.css";
import Table from '../Table/Table'

function SubDeepDive({trackData}) {
    const[tracks , setTracks]=useState([]);
    const[searchResult , setSearchResult]=useState([]);
    const [searchValue , setSearchValue] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

 async function fetchData() {
    const response = await fetch('http://13.57.185.250:8000/api/tracks?subCategoryId=62a086f8b2d9256900e55233');
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
        <div>
        <Button className='edit'>Edit</Button>
        <Button className='delete'>Delete</Button>
        </div>
        
      </div>
    
    </div>
    <div>
        <p> Name</p>
        <div className='space' >
            <Input className='search' placeholder="Search" name='searchValue' value={searchValue} onChange={handleSearchChage} />
            <Button className='addNew'  type='primary' onClick={showModal} >Add New</Button>
        </div>
    <Table tracks={ searchValue.length < 1 ? tracks : searchResult }/>
    </div>
    <div>
      <Modal  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <h3>Uplaod Tracks</h3>
      <p>Title</p>
      <Input className='search' placeholder="Search" name='searchValue'  />
      <p>Artist</p>
      <Input className='search' placeholder="Search" name='searchValue'  />
      <p>Tags</p>
      <Input className='search' placeholder="Search" name='searchValue'  />
      <p>Description</p>
      <Input className='search' placeholder="Search" name='searchValue'  />
      <div>
       <Button>Cancal</Button>
       <Button>Create</Button>
      </div>
    </Modal>
     </div>
        
    </div>
  )
}

export default SubDeepDive

