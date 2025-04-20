import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductList from './ProductList';
import CheckOut from './CheckOut';
import ProductDetail from './ProductDetail';
import { CartContext } from './CartContext';
import { useState } from 'react';


function App() {
    
    const [cartItems, setCartItems] = useState([])

  return (
    <BrowserRouter>

      <CartContext.Provider value={{cartItems, setCartItems}}> {/*利用CartContext.Provider,包住成個Contant, 可讀取到CartContext的資料*/}
            
            <Link to ="/">首頁</Link>
            <Link to ="/checkout">賺物車</Link>
            <Link to ="/product">產品資料</Link>
            {/* 用link to 會好過用 a tag, 因為唔洗重新再load過個page */}
            
            <Routes>
                <Route path="/" element={<ProductList/>} /> 
                <Route path="/checkout" element={<CheckOut/>} />

                <Route path="/product" element={<ProductDetail/>}>
                  <Route path=":id" element={<ProductDetail/>} />  {/*用:id 去產生無限條path*/ }
                </Route>

                <Route path="*" element={<p>找不到頁面</p>} />
            </Routes>

      </CartContext.Provider>

    </BrowserRouter>
  );
}

export default App;
