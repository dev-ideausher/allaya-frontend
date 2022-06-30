import React,{useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './sub.css'
import swal from 'sweetalert';

import { Button , Input , message , Upload , Modal } from 'antd'
import { UploadOutlined } from '@ant-design/icons';

export default function SubContent({data , getSubDeepDive , getTrackNameData , getSubCategories , getSubCategoryData}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ subEditName , setSubEditName] = useState('');
  const [ subEditDes , setSubEditDes] = useState('');
  const [editData , setEditData] = useState([]);

    let navigate = useNavigate();
     console.log(data , 'subcategory............')

    useEffect(()=>{
      setSubEditName(data.name);
      setSubEditDes(data.desc)
    },[])

const handleSubCategory=(data)=>{
  // console.log(data , 'valueee')
  getSubDeepDive(true);
  getTrackNameData(data);
   getSubCategories(data.id);
  
    // navigate('/track')
    // getSubCategoryData(data.subCategories);
}

 const handleDelete= (data) =>{
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      fetch(`http://13.57.185.250:8000/api/sub-category/${data.id}`, {
     
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
      async function fetchDataSubCategory() {
    
        const response = await fetch(`http://13.57.185.250:8000/api/category/${data.categoryId}`);
        const json = await response.json();
       
        getSubCategoryData(json?.category?.subCategories);

        if( json){
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        }
      }
      fetchDataSubCategory();
    
    })
     
    } 
  });
  
 
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

const handleEdit = () =>{
  
  fetch(`http://13.57.185.250:8000/api/sub-category/${editData.id }`, {
     
    // Adding method type
    method: "PATCH",
     
    // Adding body or contents to send
    body: JSON.stringify({
      name: subEditName,
      desc: subEditDes,
      coverImage: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/attachment_75094405.jpg",
    }),
     
    // Adding headers to the request
    headers: {
        "Content-type": 'application/json',
        "FIREBASE_AUTH_TOKEN":localStorage.getItem('authToken')
    }
}).then((response)=>{
  setIsModalVisible(false)
  async function fetchData() {
    const response = await fetch(`http://13.57.185.250:8000/api/category/${editData.categoryId}`);
    const json = await response.json();
    getSubCategoryData(json?.category?.subCategories);
   
    if(json){
      swal("Sub Category is edit succesfully", {
        icon: "success",
      });
    }
   
  }
  fetchData();
})
}

const handleSubEditName=(e)=>{
setSubEditName(e.target.value)
}

const handleDesEditDes=(e)=>{
  setSubEditDes(e.target.value)
}

const handleSubCategoryEdit=(data)=>{
  setEditData(data);
  showModal()

}

  return (
    <div className='container-two'>
    <div >
    <div >
    <img src={data.coverImage}  className='square'/>
    </div>
    <div style={{margin:'12px'}}>
    <div className='med' >{data.name}</div>
    <div  className='containerText' >15</div>
    <div className='containerText'>{data.updatedAt}</div>
    </div>
    </div>
    <div className='crud-two'>
      <Button className='delete two' onClick={()=>handleDelete(data)} >Delete</Button>
      <Button className='edit two' onClick={()=> handleSubCategoryEdit(data)}>Edit </Button>
      <Button className='view two' onClick={()=>handleSubCategory(data)}>View</Button>

    </div>
    <Modal  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
    <p className='edit-sub-category-bold'>Edit Sub Category</p>
    <p className='edit-sub-category'>Name</p>
    <Input className='search search-two' placeholder="name" name='subName'  value={subEditName}  onChange={handleSubEditName} />
    <p className='edit-sub-category'>About</p>
    <Input className='search search-two' placeholder="Search" name='subDes' value={subEditDes}  onChange={handleDesEditDes} />
    <div>
    <div>
      <Upload {...props} >
      <Button icon={<UploadOutlined />} style={{ marginTop:'10px', marginLeft : '50px',height:'130px', width:'320px' , border: '1px dashed #AAAAAA',borderRadius: '6px'}}>Upload png only</Button>
      </Upload>
    </div>
    <div style={{marginLeft:'300px' , marginTop:'10px' , display:'flex' , justifyContent:'space-around'}}>
    <Button className='button-white'>Cancal</Button>
    <Button className='button-orange' onClick={handleEdit} >Create</Button>
    </div>
     
    </div>
  </Modal>
    </div>
  )
}