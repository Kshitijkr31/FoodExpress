import React
, { useEffect, useState } 
from 'react'
import './List.css'
import axios from "axios"
import {toast} from "react-toastify"

const List = (
    {url}
) => {

  const [list,setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if (response.data.success){
      setList(response.data.data)
    }
    else
    {
      toast.error("Error")
    }
  }

  const removeFood = async(foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if (response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }


  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p style={{color:'black'}}>All Foods List</p>
    <div className="list-table">
      <div className="list-table-format title">
        <b className='btag'>Image</b>
        <b className='btag'>Name</b>
        <b className='btag'>Category</b>
        <b className='btag'>Price</b>
        <b className='btag'>Action</b>
      </div>
      {list.map((item,index)=>{
        return (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/`+item.image} alt="" />
            <p className='ptag'>{item.name}</p>
            <p className='ptag'>{item.category}</p>
            <p className='ptag'>₹ {item.price}</p>
            <p onClick={()=>removeFood(item._id)} className='cursorr'>X</p>
          </div>
        )
      })}
    </div>
    </div>
  )
}

export default List