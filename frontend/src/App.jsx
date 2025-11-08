import './App.css'
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import NavBar from './component/navbar';

function App() {

  return (
    <>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/cart' element={<CartPage/>}></Route>
        <Route path='/checkout' element={<CheckoutPage/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
