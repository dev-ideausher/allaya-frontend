import React,{useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './sub.css'
import { Button } from 'antd'

export default function SubContent({data , getSubDeepDive , getTrackNameData}) {
    const[ subCategory , setSubCategory]= useState(false);
    let navigate = useNavigate();

const handleSubCategory=(data)=>{
  // console.log(data , 'valueee')
  getSubDeepDive(true);
  getTrackNameData(data)
    // navigate('/track')
    // getSubCategoryData(data.subCategories);
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
      <Button className='delete'>Delete</Button>
      <Button className='edit'>Edit</Button>
      <Button className='view' onClick={()=>handleSubCategory(data)}>View</Button>

    </div>
    </div>
  )
}