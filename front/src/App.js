import logo from './logo.svg';
import './App.css';
import Layout from './component/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import About from './component/About';
import Cart from './component/Cart';
import MyOrder from './component/Myorder';
import Checkout from './component/Checkout';
import Login from './component/Login';
import Signup from './component/Signup';
import UserTable from './component/UserTable';
import Admin from './component/Admin'
import Services from './component/Services';
import Events from './component/Events';
import Menu from './component/Menu';
import Book from './component/Book';
import Blog from './component/Blog';
import Team from './component/Team';
import Testimonial from './component/Testimonial';
import Contact from './component/Contact';
import Error from './component/Error';
import { ToastContainer, toast } from 'react-toastify';
import { CartProvider } from './component/CartProvider';
import AdminDashboard from './component/AdminDashboard';
import ContactUsTable from './component/ContactUsTable';
import OrderTable from './component/OrderTable';

function App() {
  return (
    <>
      <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path='/' element={<Layout></Layout>}>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/About' element={<About></About>}></Route>
            <Route path='/Services' element={<Services></Services>}></Route>
            <Route path='/Events' element={<Events></Events>}></Route>
            <Route path='/Menu' element={<Menu></Menu>}></Route>
            <Route path='/Book' element={<Book></Book>}></Route>
            <Route path='/Blog' element={<Blog></Blog>}></Route>
            <Route path='/Menu' element={<Menu></Menu>}></Route>
            <Route path="/Team" element={<Team />} />
            <Route path="/Testimonial" element={<Testimonial />} />
            <Route path="/Error" element={<Error />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path='/Cart' element={<Cart></Cart>}></Route>
            <Route path='/Myorder' element={<MyOrder></MyOrder>}></Route>
            <Route path="/Checkout" element={<Checkout></Checkout>} />
            <Route path="/Login" element={<Login></Login>} />
            <Route path="/Signup" element={<Signup></Signup>} />
            <Route path="/UserTable" element={<UserTable></UserTable>} />
            <Route path="/ContactUsTable" element={<ContactUsTable></ContactUsTable>} />
            <Route path="/OrderTable" element={<OrderTable></OrderTable>} />
            <Route path="/Admin" element={<Admin></Admin>} />
            <Route path="/AdminDashboard" element={<AdminDashboard></AdminDashboard>} />

          </Route></Routes>
          <ToastContainer />
          </CartProvider>
          </BrowserRouter>
    </>
  );
}

export default App;
