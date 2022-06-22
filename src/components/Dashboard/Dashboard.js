import React,{useState , useEffect} from 'react'
import './dashboard.css'
import Header from '../Header/Header';
import { Input ,Button , Space, Modal, Upload,message } from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import Content from '../Content/Content';
import SubContent from '../SubContent/SubContent';
import SubDeepDive from '../SubDeepDive/SubDeepDive';
import { UploadOutlined } from '@ant-design/icons';
import Dummy from '../Dummy';

export default function () {
  const[categories , setCategories]=useState([]);
  const[checkSub , setCheckSub]=useState(false);
  const[checkSubdeep , setCheckSubdeep]=useState(false);
  const [subCategory , setSubCategory] = useState([]);
  const[trackData , setTracKData]=useState([]);
  const[searchResult , setSearchResult]=useState([]);
  const[searchResultSub , setSearchResultSub]=useState([]);
  const [searchValue , setSearchValue] = useState('');
  const [searchValueSub , setSearchValueSub] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleSub, setIsModalVisibleSub] = useState(false);
  const [addNewTitleCategory , setAddNewTitleCategory]= useState('');
  const [addNewDesCategory , setAddNewDesCategory]= useState('');


 

 async function fetchData() {
  const response = await fetch('http://13.57.185.250:8000/api/category');
  const json = await response.json();
 
  setCategories(json.categories);
}

useEffect(() => {
  fetchData();
}, []);

const getSubCategory=(data)=>{
 
  setCheckSub(data);
}

const getSubDeepDive=(data)=>{
 
  setCheckSubdeep(data);
}

const getSubCategoryData=(data)=>{
  console.log(data, 'check data cominnng track');
  setSubCategory(data);

}

const getTrackNameData=(data)=>{
  console.log(data, 'check data cominnng track');
  setTracKData(data);
}

const handleSearchChage=(e)=>{
  setSearchValue(e.target.value);
}

const handleSearchSubChange=(e)=>{
  setSearchValueSub(e.target.value);
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

const showModalSub = () => {
  setIsModalVisibleSub(true);
};

const handleOkSub = () => {
  setIsModalVisibleSub(false);
};

const handleCancelSub = () => {
  setIsModalVisibleSub(false);
};

const handleJsonCategory = (dataComing) =>{
  console.log(dataComing,'vvvvvvvvvv')
  alert('rrrrrrrr')
  setCategories(dataComing);
}

useEffect(() => {
  if(searchValue.length !== ' '){
    const newContactList= categories.filter((item)=>{
      return item.name.toLowerCase().includes(searchValue.toLowerCase())
      
    });
    setSearchResult(newContactList);
   }else{
     setSearchResult(categories);
   }
}, [categories,searchValue]);

useEffect(() => {
  if(searchValueSub.length !== ' '){
    const newContactList= subCategory.filter((item)=>{
      return item.name.toLowerCase().includes(searchValueSub.toLowerCase())
      
    });
    console.log(newContactList , 'checking catogries');
    setSearchResultSub(newContactList);
    
   }else{
    
    setSearchResultSub(subCategory);
    
   }
}, [subCategory,searchValueSub]);

  const prefix = (
    <SearchOutlined
      // style={{
      //   fontSize: 16,
      //   color: '#1890ff',
      // }}
    />
  )

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

  const handleApi = ()=>{
    fetch("http://13.57.185.250:8000/api/category", {
     
      // Adding method type
      method: "POST",
       
      // Adding body or contents to send
      body: JSON.stringify({
        name: addNewTitleCategory,
       desc:   addNewDesCategory,
       coverImage: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/attachment_75094405.jpg"
      }),
       
      // Adding headers to the request
      headers: {
          "Content-type": 'application/json',
          "FIREBASE_AUTH_TOKEN":localStorage.getItem('authToken')
      }
  }).then((response)=>{
    if(response){
      fetchData();
      setAddNewDesCategory('');
  setAddNewTitleCategory('');
  setIsModalVisible(false);
    }
  })
  
  
  }

 
  
  console.log(localStorage.getItem('Category'), 'locallllll')

  const handleSubApi = () =>{
    console.log(localStorage.getItem('Category'), 'categotyyy cgeckinh')

    fetch("http://13.57.185.250:8000/api/sub-category", {
     
      // Adding method type
      method: "POST",
       
      // Adding body or contents to send
      body: JSON.stringify({
        categoryId: localStorage.getItem('Category'),
        name:"You can",
        desc:"Basic mindfulness meditation is the practice of paying attention to the present moment with an accepting, nonjudgmental disposition",
        coverImage: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/attachment_75094405.jpg"
      }),
       
      // Adding headers to the request
      headers: {
          "Content-type": 'application/json',
          "FIREBASE_AUTH_TOKEN":localStorage.getItem('authToken')
      }
  }).then((response)=>{
    if(response){
      fetchData();
    }
  })

  }

  const handleAddTitleCategory =(e)=>{
   setAddNewTitleCategory(e.target.value);
  }

  const handleAddDesCategory=(e)=>{
    setAddNewDesCategory(e.target.value);
  }
 
  return (
    <div style={{background: '#FDF2E6' , display : 'flex' , flexDirection:'row' , justifyContent:'space-between'}}>
      <div style={{ background: '#FDF2E6' , height: '1080px' , flex: 1}}>
      <div style={{display:'flex' , flexDirection: 'column' }}>
        <p style={{ marginRight:'15px',background: '#F89E53', borderRadius: '0px 8px 8px 0px', width: '200px', height: '20px' , display: 'flex' ,flexDirection: 'row', padding: '16px 20px 17px 44px'
       , alignItems:'center' , gap: '4px'}}>Dashboard</p>
        <p>App Users</p>
        <p>Content</p>
        <p>Notifications</p>
      </div>
      </div>
      <div style={{ background: 'white' , height: '1080px' , flex:6}}>
       <Header/>
       
       
       {
        checkSubdeep  ? null : checkSub ?(<div className= {`space`} >
        <Input className='search' placeholder="Search" value={searchValueSub} onChange={handleSearchSubChange} />
        <Button className='addNew'  type='primary' onClick={showModalSub}>Add New</Button>
        <div>
        <div>
          <Modal  visible={isModalVisibleSub} onOk={handleOkSub} onCancel={handleCancelSub} footer={null}>
          <h3>Add Sub Category</h3>
          <p>Name</p>
          <Input className='search' placeholder="Search" name='title'  />
          <p>About</p>
          <Input className='search' placeholder="Search" name='artist'  />
          <div>
          <div>
            <Upload {...props} >
            <Button icon={<UploadOutlined />} style={{height:'100px', width:'250px'}}>Upload png only</Button>
            </Upload>
          </div>
            <Button>Cancal</Button>
            <Button onClick={handleSubApi} >Create</Button>
          </div>
        </Modal>
     </div>
        </div>

      </div>) :  (  <div className='space' >
        <Input className='search' placeholder="Search" name='searchValue' value={searchValue} onChange={handleSearchChage} />
        <Button className='addNew'  type='primary'  onClick={showModal} >Add New</Button>
        <div>
           <Modal  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
           <h3>Add New Category</h3>
           <p>Name</p>
           <Input className='search' placeholder="Search" name='addNewTitleCategory' onChange={handleAddTitleCategory} value={addNewTitleCategory}  />
           <p>About</p>
           <Input className='search' placeholder="Search" name='addNewDesCategory' value={addNewDesCategory} onChange={handleAddDesCategory}/>
           <div>
           <div>
             <Upload {...props} >
             <Button icon={<UploadOutlined />} style={{height:'100px', width:'250px'}}>Upload png only</Button>
             </Upload>
           </div>
             <Button>Cancal</Button>
             <Button onClick={handleApi} >Create</Button>
           </div>
         </Modal>
        </div>
       </div>)
       }
     
       <div style={{display:'flex' , flexDirection:'row' , justifyContent:'flex-start' ,flexWrap:'wrap'}}>
       
       {
        checkSubdeep ?   <SubDeepDive  trackData={trackData} />
        : checkSub ? searchValueSub.length < 1 ? (subCategory.map((item)=>{
          return(
            <SubContent  data={item} getSubDeepDive={getSubDeepDive} getTrackNameData={getTrackNameData} />
          )
          
        })) :(searchResultSub.map((item)=>{
          return(
            <SubContent  data={item} getSubDeepDive={getSubDeepDive} getTrackNameData={getTrackNameData}  />
          )
          
        })) :  searchValue.length < 1 ? categories.map((item)=>{
          return(
            <Content  data={item} getSubCategory={getSubCategory} getSubCategoryData={getSubCategoryData} />
          )
          
        }) : searchResult.map((item)=>{
          return(
            
             <Content  data={item} getSubCategory={getSubCategory} getSubCategoryData={getSubCategoryData}  handleJson={handleJsonCategory}/>
          )
          
        })
       }
       </div>
       
      </div>
    </div>
  )
}
