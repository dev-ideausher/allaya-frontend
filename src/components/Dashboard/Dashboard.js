import React,{useState , useEffect} from 'react'
import './dashboard.css'
import Header from '../Header/Header';
import { Input ,Button , Space } from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import Content from '../Content/Content';
import SubContent from '../SubContent/SubContent';
import SubDeepDive from '../SubDeepDive/SubDeepDive';

export default function () {
  const[categories , setCategories]=useState([]);
  const[checkSub , setCheckSub]=useState(false);
  const[checkSubdeep , setCheckSubdeep]=useState(false);
  const [subCategory , setSubCategory] = useState([]);
  const[trackData , setTracKData]=useState([]);


 

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


  const prefix = (
    <SearchOutlined
      // style={{
      //   fontSize: 16,
      //   color: '#1890ff',
      // }}
    />
  )
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
       <div className= { checkSubdeep ? `remove`:`space`} >
         <Input className='search' placeholder="Search" />
         <Button className='addNew'  type='primary'>Add New</Button>
       </div>
       <div style={{display:'flex' , flexDirection:'row' , justifyContent:'flex-start' ,flexWrap:'wrap'}}>
       {
        checkSubdeep ?   <SubDeepDive  trackData={trackData} />
        : checkSub ? subCategory.map((item)=>{
          return(
            <SubContent  data={item} getSubDeepDive={getSubDeepDive} getTrackNameData={getTrackNameData} />
          )
          
        }) : categories.map((item)=>{
          return(
            <Content  data={item} getSubCategory={getSubCategory} getSubCategoryData={getSubCategoryData} />
          )
          
        })
       }
       </div>
      </div>
    </div>
  )
}
