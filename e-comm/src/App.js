import { useEffect, useState,useRef } from 'react';
import './App.css';
import axios from 'axios'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
function App() {
  const nav =useNavigate()
  const [first1, setfirst1] = useState([])
  const [Second, setSecond] = useState(null)
  const [four, setfour] = useState(null)
  const uRef = useRef()
  const urefSec =useRef()
  const [Third, setThird] = useState({
    roadster: false,
    blackberrys: false,
    vanheusen: false,
    allensolly: false,
    twills: false
  })
  const [filterCat,setfilterCat] =useState(false)
  const [pagination, setpagination] = useState(false)
  const [filterBar,setfilterBar] =useState(false)
  const [filter, setfilter] = useState([])
  const [filterC, setfilterC] = useState([])
  const [pageNo, setPageNo] = useState(0)
  const [idLoc] = useState([])
  const [Fbrand, setFbrand] = useState({
    men: false,
    womem: false,
    HomeDecor: false,
    Kids: false
  })
  const fun = async() => {
    await axios('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products')
      .then((e) => { setfirst1(e.data.data); console.log(e.data.data) })
      .catch((e) => console.log(e))
  }
  const handleChange = (event, value) => {
    setPageNo(value);
    console.log(value)
    fun()
  };
  useEffect(() => {
    fun()
  }, [])
  const onChangeFun = async(e) => {
    setfilterCat(true)
    await fun()
    toast.success(`Filtered by Brand ${e.target.value}`)
    uRef.current.value=''
    urefSec.current.value=''
    let flit = e.target.value
    let newFilter = first1.filter((e) => e.brand == flit)
    setfilter([...newFilter,...filter])
    console.log(filter)
    setpagination(false)
  }
  const filterbyCa = async(e)=>{
    await fun()
    toast.success(`Filtered by Category ${e.target.value}`)
    uRef.current.value=''
    urefSec.current.value=''
    setfilterBar(true)
    setfilterCat(false)
    let cate = e.target.value
    console.log(cate)
    let arr =first1.filter((e)=>e.category ===cate)
    setfilterC([...arr,...filterC])
    console.log(filterC)
    setpagination(false)
  }
  const handler =async()=>{
    toast.success(`Filtered by Price Range From ${Second} to ${four}`)
    setpagination(true)
    const res =await axios.get('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products')
    let n =res.data.data.filter((e)=>e.price >Second && e.price <four)
    setfirst1(n)
  }
  const addcard =(e)=>{
    if(idLoc.includes(e)){
      return toast.error('You have already added this into your card')
    }
    toast.success('Added')
    idLoc.push(e)
    localStorage.setItem('id',idLoc)
    console.log(localStorage.getItem('id').split(','))
  }
  const card =()=>{
    nav('/card')
  }
  return (
    <>
      <h1>E-Commerce</h1>
      <h2 onClick={card} style={{color:'blue',cursor:'pointer'}}>Go To Cart</h2>
      <div className="product-container">
        <div className='filter-container'>
          <div>
            <h1>Filter by Brand</h1>
            <div><input type={'checkbox'} value='roadster' onChange={onChangeFun} /><span>roadster</span></div>
            <div><input type={'checkbox'} value='blackberrys' onChange={onChangeFun} />blackberrys</div>
            <div><input type={'checkbox'} value='van-heusen' onChange={onChangeFun} />van-heusen</div>
            <div><input type={'checkbox'} value='allen-solly' onChange={onChangeFun} />allen-solly</div>
            <div><input type={'checkbox'} value='twills' onChange={onChangeFun} />twills</div>
          </div>
          <div>
            <h1>Filter by Category</h1>
            <div><input type={'checkbox'} value='men' onChange={filterbyCa}/><span>Men</span></div>
            <div><input type={'checkbox'} value='women' onChange={filterbyCa}/>Women</div>
            <div><input type={'checkbox'} value='homedecor' onChange={filterbyCa}/>HomeDecor</div>
            <div><input type={'checkbox'} value='kids' onChange={filterbyCa}/>Kids</div>
          </div>
          <div>
            <h1>Filter by Price Range</h1>
            <input type="text" placeholder='From...' ref={uRef} onChange={(e)=>setSecond(e.target.value)}/><input type="text" placeholder='To...' ref={urefSec} onChange={(e)=>setfour(e.target.value)}/>
            <div>
              <button onClick={handler}>Filter</button>
            </div>
          </div>
        </div>
        <div>
          {filter.length == 0 && !filterBar? <div>
            <div className='grid-temp'>
              {first1.slice(pageNo, pageNo + 12).map((e) => {
                return (
                  <div className='content-grid'>
                    <p><span>Title : </span>{e.title}</p>
                    <p><span>brand : </span>{e.brand}</p>
                    <img src={e.image} />
                    <p><span>Price : </span>{e.price}</p>
                    <p><span>category : </span>{e.category}</p>
                    <button onClick={()=>addcard(e.id)}>Add To Cart</button>
                  </div>
                )
              })}
            </div>
            { pagination ===false ?<Stack spacing={2} marginLeft={'200px'} width={'600px'}>
              {/* <Typography>Page: {pageNo}</Typography> */}
              <Pagination count={10} page={pageNo} onChange={handleChange} shape="rounded" />
            </Stack>:''}
          </div> : filter.length >0 ?<div className='grid-temp'>
            {filter.map((e) => {
              return (
                <div className='content-grid'>
                  <p><span>Title : </span>{e.title}</p>
                  <p><span>brand : </span>{e.brand}</p>
                  <img src={e.image} />
                  <p><span>Price : </span>{e.price}</p>
                  <p><span>category : </span>{e.category}</p>
                  <button>Add To Cart</button>
                </div>
              )
            })}
          </div>:<div className='grid-temp'>
            {filterC.map((e) => {
              return (
                <div className='content-grid'>
                  <p><span>Title : </span>{e.title}</p>
                  <p><span>brand : </span>{e.brand}</p>
                  <img src={e.image} />
                  <p><span>Price : </span>{e.price}</p>
                  <p><span>category : </span>{e.category}</p>
                  <button>Add To Cart</button>
                </div>
              )
            })}
          </div>}
        </div>
      </div>
    </>
  );
}

export default App;
