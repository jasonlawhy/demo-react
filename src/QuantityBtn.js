import { useContext, useState } from "react" //使用useState時要import
import { CartContext } from "./CartContext"

export default function QuantityBtn({productInfo}) {  // Step2: 接番個props

  const {cartItems, setCartItems} = useContext(CartContext)  //讀取cartContext, 但要再輸入番CartContext的值, 可在CartContext.Provider搵到兩個值[cartItems, setCartItems]

  //Check購物車有沒有新增該產品
  let productIndexInCart = cartItems.findIndex((element)=> {
    return element.id === productInfo.id
  })
  //findIndex(JS內建function)會有兩個結果
  //1.如果在購物車內找到產品 => 會返回索引位置 e.g. 0 1 2 3 
  //2.如果產品沒有被加入到購物車 => 返回 -1


  let [numInCart, setnumInCart] = useState(
    (productIndexInCart===-1)? 0 : cartItems[productIndexInCart].quantity)  //首先let一個變數, 例如叫numInCart等如useState, (記得使用useState時要import番useState),
                                               //回是一個array所以要比[], numInCart係State的名字, 第2個參數是function (setnumInCart),
                                               //useState起始值為0
    const handleAdd = ()=>{                    // const functionName = (參數, 可以有/可以無) => {function內容}
        
        if(productIndexInCart===-1)
        {
            //如購物車本身沒有, 在cartItems array中加一個新的element(object)
            setCartItems(
              [{
                "id":productInfo.id,
                "name": productInfo.name,
                "image": productInfo.image,
                "price": productInfo.price,
                "description:": productInfo.description,
                "quantity": 1
              }, 
              ...cartItems] 
            )
        }
        else
        {
            //如購物車本身有, 只加quantity
          let newCartArray = [...cartItems]
          newCartArray[productIndexInCart].quantity++
          setCartItems(newCartArray)

        }
        setnumInCart(numInCart+1)
    } 
    const handleSubtract = ()=>{
        if(cartItems[productIndexInCart].quantity===1)
        {
            //購物單只剩一件的話, remove object
            let newCartArray = [...cartItems]
            newCartArray.splice(productIndexInCart, 1) //在產品身身處的index位, 刪除1個element
            setCartItems(newCartArray)
        }
        else
        { 
            //只減數量
            let newCartArray = [...cartItems]
            newCartArray[productIndexInCart].quantity--
            setCartItems(newCartArray)
        }
        setnumInCart(numInCart-1)
    }


  return (
    <div className="addToCart">
        {
            (numInCart === 0) ?                            // 使用 ? 和 : 進行條件判斷（類似 if...else）; 語法：條件 ? 成立時的內容 : 不成立時的內容                                
            <div onClick={handleAdd}>加入購物車</div> :     // onClick用黎create個制, handleAdd係一個event handler
            <div>
                <span onClick={handleSubtract}>-</span>
                {numInCart} 件
                <span onClick={handleAdd}>+</span>
            </div>
        }
    </div>
  )
}
