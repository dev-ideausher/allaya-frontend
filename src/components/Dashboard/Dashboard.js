import React,{useState , useEffect} from 'react'
import './dashboard.css'
import './loading.css'
import Header from '../Header/Header';
import { Input ,Button , Space, Modal, Upload,message } from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import Content from '../Content/Content';
import SubContent from '../SubContent/SubContent';
import SubDeepDive from '../SubDeepDive/SubDeepDive';
import { UploadOutlined } from '@ant-design/icons';
import Img from '../../assets/logo.png';


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
  const [ content , setContent] = useState(false);
  const [ dashboard , setDashboard] = useState(false);
  const [ app , setApp] = useState(false);
  const [ notification , setNotification] = useState(false); 
  const [ nameSubContent , setNameSubContent] = useState('')
  const [ desSubContent , setDesSubContent] = useState('')
  const [categoryId , setategoryId] = useState('')
  const [subCategoryId , setSubCategoryId] = useState('');
  const [ fetchSubCategory , setFetchSubCategory]= useState([])
  const [fileName , setFileName]= useState('')
  // const [isLoading, setIsLoading] = useState(false);


 
 async function fetchData() {
  const response = await fetch('http://13.57.185.250:8000/api/category');
  const json = await response.json();
  // console.log('fetch datat trigger' );
  setCategories(json.categories);
  // console.log('fetch datat trigger'  , json);
}





useEffect(() => {
  fetchData();
 
  
}, []);

// useEffect(() => {
//   fetchDataSubCategory();
  
// }, [categoryId,checkSub]);
  


const getSubCategory=(data)=>{
 
  setCheckSub(data);
}

const getSubDeepDive=(data)=>{
 
  setCheckSubdeep(data);
}

const getSubCategoryData=(data)=>{
  console.log(data , 'lllllllllllll')
   setSubCategory(data);

}

const getTrackNameData=(data)=>{
  
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
 
  setCategories(dataComing);
}

const handleNameSubContent=(e)=>{
  setNameSubContent(e.target.value);
}

const handleDesSubContent =(e)=>{
 setDesSubContent(e.target.value);
}

const handleEditData = (dataComing) =>{
  setCategories(dataComing)
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

  // const props = {
  //   beforeUpload: (file) => {
  //     const isPNG = file.type === 'image/jpeg';
  
  //     if (!isPNG) {
  //       message.error(`${file.name} is not a png file`);
  //     }
  
  //     return isPNG || Upload.LIST_IGNORE;
  //   },
  //   onChange: (info) => {
  //     console.log(info.fileList);
  //   },
  // };

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
  
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
        setFileName(info?.file?.name)
      }
  
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } 
    },
  };

  useEffect(()=>{
    fetchUploadFile()
  },[fileName.length >0])

  const fetchUploadFile =()=>{
    fetch("http://13.57.185.250:8000/api/file-upload", {
     
      // Adding method type
      method: "POST",
       
      // Adding body or contents to send
      body: JSON.stringify({
       file: fileName,
       type: 'category',
      }),
       
      // Adding headers to the request
      headers: {
          "Content-type": 'application/json',
          "FIREBASE_AUTH_TOKEN":localStorage.getItem('authToken')
      }
  }).then((response)=> console.log(response , 'response'))
  }

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



  const handleSubApi = () =>{
    
    fetch("http://13.57.185.250:8000/api/sub-category", {
     
      // Adding method type
      method: "POST",
       
      // Adding body or contents to send
      body: JSON.stringify({
        categoryId: `${categoryId.length > 0 ? categoryId : null }`,
        name: nameSubContent,
        desc: desSubContent,
        coverImage: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/12/attachment_75094405.jpg"
      }),
       
      // Adding headers to the request
      headers: {
          "Content-type": 'application/json',
          "FIREBASE_AUTH_TOKEN":localStorage.getItem('authToken')
      }
  }).then((response)=>{
    if(response){
      async function fetchDataSubCategory() {
  
        const response = await fetch(`http://13.57.185.250:8000/api/category/${categoryId}`);
        const json = await response.json();
       
        getSubCategoryData(json?.category?.subCategories);
        setIsModalVisibleSub(false);
      }
      
      fetchDataSubCategory();
      // window.location.reload()
    }
  })

  }

  const handleAddTitleCategory =(e)=>{
   setAddNewTitleCategory(e.target.value);
  }

  const handleAddDesCategory=(e)=>{
    setAddNewDesCategory(e.target.value);
  }
  const handleContent = () =>{
      setContent(true);
      setApp(false)
      setNotification(false)
      setDashboard(false)
  }

  const handleApp = () =>{
    setContent(false);
    setApp(true)
    setDashboard(false)
    setNotification(false)
} 

const handleNotify = () =>{
  setContent(false);
  setApp(false)
  setNotification(false)
  setNotification(true)
}

const handleDashboard = () =>{
  setContent(false);
  setApp(false)
  setDashboard(true)
  setNotification(false)
}

const handleCategoryId = (id) =>{
  setategoryId(id);
}

const handleSubCategory =(id)=>{
  setSubCategoryId(id);
}

 
  return (
    <div style={{background: '#FDF2E6' , display : 'flex' , flexDirection:'row' , justifyContent:'space-between'}}>
      <div style={{ background: '#FDF2E6' , height: '500px' , flex: 1}}>
      <div style={{display:'flex' , flexDirection: 'column' }}>
      <img src = {Img} alt='logo' height={50} width={150} style={{marginTop:'30px', marginBottom:'30px' , marginLeft:'20px'}}/>
        <div tabIndex={1} className={ dashboard ? 'orange-header': 'white-header'} onClick={handleDashboard} role='button'>Dashboard</div>
        <div tabIndex={1} className={ app ? 'orange-header': 'white-header'} onClick={handleApp} role='button'>App Users</div>
        <div tabIndex={1} className={ content ? 'orange-header': 'white-header'} onClick={handleContent} role='button'>Content</div>
        <div tabIndex={1} className={ notification ? 'orange-header': 'white-header'} onClick={handleNotify} role='button'>Notifications</div>
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
          <p className='bold-style'>Add Sub Category</p>
          <p className='name'>Name</p>
          <Input className='search search-two' placeholder="Search" name='nameSubContent' value={nameSubContent} onChange={handleNameSubContent} />
          <p className='name'>About</p>
          <Input className='search search-two' placeholder="Search" name='nameSubContent'value={desSubContent} onChange={handleDesSubContent} />
          <div>
          <div>
            <Upload {...props} >
            <Button icon={<UploadOutlined />} style={{ marginTop:'10px', marginLeft : '50px',height:'130px', width:'320px' , border: '1px dashed #AAAAAA',borderRadius: '6px'}}>Upload png only</Button>
            </Upload>
          </div>
          <div style={{marginLeft:'300px' , marginTop:'10px' , display:'flex' , justifyContent:'space-around'}}>
          <Button className='button-white'>Cancal</Button>
          <Button className='button-orange' onClick={handleSubApi} >Create</Button>
          </div>
          </div>
        </Modal>
     </div>
        </div>

      </div>) :  (  <div className='space' >
        <Input className='search' placeholder="Search" name='searchValue' value={searchValue} onChange={handleSearchChage} />
        <Button className='addNew'  type='primary'  onClick={showModal} >Add New</Button>
        <div>
           <Modal  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
           <p className='bold-style'>Add New Category</p>
           <p className='name'>Name</p>
           <Input className='search search-two' placeholder="Search" name='addNewTitleCategory' onChange={handleAddTitleCategory} value={addNewTitleCategory}  />
           <p className='name'>About</p>
           <Input className='search search-two' placeholder="Search" name='addNewDesCategory' value={addNewDesCategory} onChange={handleAddDesCategory} />
           <div>
           <div>
             <Upload {...props}  maxCount={1}>
             <Button icon={<UploadOutlined />} style={{ marginTop:'10px', marginLeft : '50px',height:'130px', width:'320px' , border: '1px dashed #AAAAAA',borderRadius: '6px'}}>Upload png only</Button>
             </Upload>
           </div>
           <div style={{marginLeft:'300px' , marginTop:'10px' , display:'flex' , justifyContent:'space-around'}}>
           <Button className='button-white' onClick={handleCancel}>Cancal</Button>
             <Button className='button-orange' onClick={handleApi}  >Create</Button>
           </div>
             
           </div>
         </Modal>
        </div>
       </div>)
       }
     
       <div   style={{display:'flex' , flexDirection:'row' , justifyContent:'flex-start' ,flexWrap:'wrap'}}>
       
       {
        checkSubdeep ?   <SubDeepDive  trackData={trackData} categoryId={categoryId} subCategoryId={subCategoryId}/>
        : checkSub ? searchValueSub.length < 1 ? (subCategory.map((item)=>{
          return(
            <SubContent  data={item} getSubDeepDive={getSubDeepDive} getTrackNameData={getTrackNameData}  getSubCategories={handleSubCategory} getSubCategoryData={getSubCategoryData} />
          )
          
        })) :(searchResultSub.map((item)=>{
          return(
            <SubContent  data={item} getSubDeepDive={getSubDeepDive} getTrackNameData={getTrackNameData} getSubCategories={handleSubCategory} getSubCategoryData={getSubCategoryData}  />
          )
          
        })) :  searchValue.length < 1 ? categories.map((item)=>{
          return(
            <Content  data={item} getSubCategory={getSubCategory} getSubCategoryData={getSubCategoryData} handleJson={handleJsonCategory} handleEditData={handleEditData} handleCategoryId={handleCategoryId} />
          )
          
        }) : searchResult.map((item)=>{
          return(
            
             <Content  data={item} getSubCategory={getSubCategory} getSubCategoryData={getSubCategoryData}  handleJson={handleJsonCategory} handleEditData={handleEditData} handleCategoryId={handleCategoryId}/>
          )
          
        })
       }
       </div>
       
      </div>
    </div>
  )
}
