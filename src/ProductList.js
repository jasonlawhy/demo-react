import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react' // React框架會內建一個工具包, 叫React Hook,          如果要用React.Fragment, 記得要先import React
import Title from './Title'
import QuantityBtn from './QuantityBtn'

export default function ProductList() {

    let [productList, setProductList] = useState([])
    let [input, setInput] = useState(['[]'])
    
    //一般請求API會用 "fetch(網址)"

    //useEffect, 如何觸發useEffect function
    useEffect(()=>{
        //1: 沒有第2個參數時, component 每次render都會觸發useEffect function (記)
        //2: Dependency Array是空Array時, 只會第一次網頁render時會觸發
        //3: Dependency Array有變數時, 第一次網頁render時+指定的變數指改變時會觸發 --> 可用於檢查用戶輸入
        fetch('http://hoyinleung.github.io/demoapi/react-basic-product.json') //連api 
            .then(response => response.json())
            .then(data => setProductList(data))

        console.log(productList)
    }) // <== Dependency Array(記)

    useEffect(()=>{
        if(input.length>4)
                console.log('good')
        else
            console.log('no good')
    },[input])
    
    //const [showProduct, setShowProduct] = useState(false) //顯示及隱藏產品代馬, showProduct是自定義的, setShowProduct是一個傳統命名方法要由set作開頭.
    
  return (
    //React Fragment
    <>
        <input type="text" onChange={e=>setInput(e.target.value)} />
        {/*showProduct && <button onClick={()=>{setShowProduct(false)}}>隱藏產品</button>*/}
        {/*!showProduct && <button onClick={()=>{setShowProduct(true)}}>顯示產品</button>*/}

        {/*<h1 style={{backgroundColor:'orange', borderBottom : '5px solid red'}}>請選擇要買的水果</h1>} {/*由於每一頁都會出現呢個h1 component，所以可以將它包裝為一個元件方便使用，詳細請睇Title.js*/}
        
        <Title mainTitle='React入門水果店' /> {/*在title中, 加一個自定義的props(特性), 例如叫mainTitle, 個值會係你想要的內容*/}
        
        <div>
            {
                productList.map(product=> (
                    <React.Fragment key={product.id}>  {/*React.Fragment可以減少網頁輸出帶來的負擔*/}
                        {[product.name]}<br/>
                        {[product.price]}元/件<br/>
                        <Link to={'/product/'+product.id}> {/* 點擊圖片可以連去相應的產品資料*/ }
                            <img src={process.env.PUBLIC_URL+'/image/'+product.image} alt={product.name} /> 
                        </Link>
                        <br/>
                        {[product.description]}<br/>
                        <QuantityBtn productInfo={product} />   {/*Step1: 要set番個props(productInfo)比QuantityBtn, 再係QuantityBtn.js接番個props*/}
                    </React.Fragment>
                        
                    ))
            }
        </div>
        </>
  )
}
