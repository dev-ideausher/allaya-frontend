import React,{useState , useEffect} from 'react'
import './style.css'
import { Button , Input , message , Upload , Modal } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import swal from 'sweetalert';


export default function Content({data , getSubCategory, getSubCategoryData ,handleJson , handleCategoryId , handleEditData}) {
    const[ subCategory , setSubCategory]= useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ subName , setSubName] = useState('');
    const [ subDes , setSubDes] = useState('');
    
    localStorage.setItem( 'Category' , data.id);

  
    async function fetchDataSubCategory() {
  
      const response = await fetch(`http://13.57.185.250:8000/api/category/${data.id}`);
      const json = await response.json();
     
      getSubCategoryData(json?.category?.subCategories);
    }
const handleSubCategory=()=>{
    fetchDataSubCategory()
    getSubCategory(true);
    handleCategoryId(data.id);
}

useEffect(()=>{
  setSubName(data.name);
  setSubDes(data.desc)
},[])
 const handleDelete= () =>{
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
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
        handleJson(json.categories)
        if(json ){
          swal(" Your file has been deleted!", {
            icon: "success",
          });
        }
      //  setSubCategory(json.categories);
      }
      fetchData();
    })
      
    } 
  });

  
  // ;
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
  // setSubCategory([]);
  setSubCategory(json.categories);
}

const handleClick = () =>{
  fetch(`http://13.57.185.250:8000/api/category/${data.id }`, {
     
    // Adding method type
    method: "PATCH",
     
    // Adding body or contents to send
    body: JSON.stringify({
      name: subName,
      desc: subDes,
      coverImage: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/attachment_75094405.jpg",
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
    handleJson(json.categories)
   
  }
  fetchData();
})
}
const handleSubName=(e)=>{
   setSubName(e.target.value);
}

const handleDesName=(e)=>{
  setSubDes(e.target.value);
}

  return (
    
    <div className='container'>
    <div className='flex'>
    <div className='circle'>
    <img src={data.coverImage} />
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
    <h2> Edit Category</h2>
    <p className='edit-category'>Name</p>
    <Input className='search-edit-category' placeholder="name" name='subName'  value={subName}  onChange={handleSubName}/>
    <p className='edit-category pd'>About</p>
    <Input className='search-edit-category' placeholder="Search" name='subDes' value={subDes}  onChange={handleDesName} />
    <div>
    <div>
      <Upload {...props} >
      <Button icon={<UploadOutlined />} style={{height:'100px', width:'250px' , marginLeft:'100px' , marginTop:'20px' , marginBottom:'10px'}}>Upload png only</Button>
      </Upload>
    </div>
    <div style={{marginLeft:'300px' , marginTop:'10px' , display:'flex' , justifyContent:'space-around'}}>
    <Button className='button-white'>Cancal</Button>
    <div></div>
    <Button className='button-orange' onClick={handleClick} >Create</Button>
    </div>
    </div>
  </Modal>
     </div>
    </div>
  )
}

