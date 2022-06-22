import React,{useState , useEffect} from 'react'
import './style.css'
import { Button , Input , message , Upload , Modal } from 'antd'
import { UploadOutlined } from '@ant-design/icons';


export default function Content({data , getSubCategory, getSubCategoryData ,handleJson}) {
    const[ subCategory , setSubCategory]= useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    console.log(handleJson , 'dataaaaaa')

const handleSubCategory=()=>{
    getSubCategory(true);
    getSubCategoryData(data.subCategories);
}

// useEffect(()=>{
//   handleJson('oooooooo');
// })
 const handleDelete= () =>{
  fetch(`http://13.57.185.250:8000/api/category/${data.id }`, {
     
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
    async function fetchData() {
      const response = await fetch('http://13.57.185.250:8000/api/category');
      const json = await response.json();
     
     setSubCategory(json.categories);
    }
    fetchData();
  })
  // handleJson(subCategory);
 }

 const showModal = () => {
  setIsModalVisible(true);
};

const handleOk = () => {
  setIsModalVisible(false);
};

const handleCancel = () => {
  setIsModalVisible(false);
};

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

async function fetchData() {
  const response = await fetch('http://13.57.185.250:8000/api/category');
  const json = await response.json();
 
  setSubCategory(json.categories);
}

const handleClick = () =>{
  fetch(`http://13.57.185.250:8000/api/category/${data.id }`, {
     
    // Adding method type
    method: "PATCH",
     
    // Adding body or contents to send
    body: JSON.stringify({
      name: "Updated",
      desc: "Basic mindfulness meditation is the practice of paying attention to the present moment with an accepting, nonjudgmental disposition",
      coverImage: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/attachment_75094405.jpg",
    }),
     
    // Adding headers to the request
    headers: {
        "Content-type": 'application/json',
        "FIREBASE_AUTH_TOKEN":localStorage.getItem('authToken')
    }
}).then((response)=>{
 
  fetchData();
})
}

  return (
    
    <div className='container'>
    <div className='flex'>
    <div className='circle'>
    <img src={data.coverImage}  style={{width:'50px' , height:'30px' , marginLeft:'25px' , marginTop:'30px'}}/>
    </div>
    <div style={{margin:'12px'}}>
    <div className='med' >{data.name}</div>
    <div  className='containerText' >15</div>
    <div className='containerText'>{data.updatedAt}</div>
    </div>
    </div>
    <div className='crud'>
      <Button className='delete' onClick={handleDelete}>Delete</Button>
      <Button className='edit' onClick ={showModal}>Edit</Button>
      <Button className='view' onClick={handleSubCategory}>View</Button>
    </div>
    <div>
    <Modal  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
    <h3>Add Sub Category</h3>
    <p>Name</p>
    <Input className='search' placeholder="Search"   />
    <p>About</p>
    <Input className='search' placeholder="Search"   />
    <div>
    <div>
      <Upload {...props} >
      <Button icon={<UploadOutlined />} style={{height:'100px', width:'250px'}}>Upload png only</Button>
      </Upload>
    </div>
      <Button>Cancal</Button>
      <Button onClick={handleClick} >Create</Button>
    </div>
  </Modal>
     </div>
    </div>
  )
}

