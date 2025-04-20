import QuantityBtn from './QuantityBtn'
import Title from './Title'
import {useParams, Link} from "react-router-dom" //useParams功能用作於讀取id(Product ID)
import { useState, useEffect } from 'react'

export default function ProductDetail() {

  let params = useParams() //useParams用法: 隨便let一個變數, 再等如番useParams功能，就可以用
  let [productDetail, setProductDetail] = useState(null)

  useEffect(()=>{
          //1: 沒有第2個參數時, component 每次render都會觸發useEffect function (記)
          //2: Dependency Array是空Array時, 只會第一次網頁render時會觸發
          //3: Dependency Array有變數時, 第一次網頁render時+指定的變數指改變時會觸發 --> 可用於檢查用戶輸入
          fetch('http://hoyinleung.github.io/demoapi/react-basic-product.json') //連api 
              .then(response => response.json())
              .then(data => {
                let productInfo = data.find(element=>{
                  return element.id === parseInt(params.id)  //強制將params.id轉做INT, 因為element.id return INT但params.id係一個string
                })
                setProductDetail(productInfo)
              })

      },[]) // <== Dependency Array(記)
  
  return (
    <div>
      {
        productDetail &&
        <div>
        <Title mainTitle={productDetail.name +'產品資料'} />
        <img src={process.env.PUBLIC_URL+'/image/'+productDetail.image} alt={productDetail.name} width="300" />
        <p>名稱: {productDetail.name}</p>
        <p>售價: {productDetail.price}</p>
        <p>描述: {productDetail.description}</p>
        <QuantityBtn productInfo={productDetail}/>
        </div>
      }


        <Link to="/">回到產品列表</Link>

    </div>
  )
}
