import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function Card() {
    const [first,setFirst] = useState([])
    const [sum,setSum] =useState(0)
    const nav = useNavigate()
    useEffect(() => {
        const fun = async () => {
            const res = await axios.get('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products')
            let f = localStorage.getItem('id').split(',').map(Number)
            let empty =[]
            let s =0
            for(let j in res.data.data){
                if(f.includes(res.data.data[j].id)){
                    empty.push(res.data.data[j])
                    s +=res.data.data[j].price
                    
                }
            }
            setSum(s)
            setFirst(empty)

        }
        fun()
    },[])
    const hand =()=>{
        nav('/')
    }
    return (
        <div>
        <h1>your Cart...</h1>
        <h2 style={{color:'blue',cursor:'pointer'}} onClick={hand}>Back To Home Page</h2>
        <h1>Total Amount :{sum}</h1>
            <div className='grid-temp'>
                {first.map((e) => {
                    return (
                        <div className='content-grid'>
                            <p><span>Title : </span>{e.title}</p>
                            <p><span>brand : </span>{e.brand}</p>
                            <img src={e.image} />
                            <p><span>Price : </span>{e.price}</p>
                            <p><span>category : </span>{e.category}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
