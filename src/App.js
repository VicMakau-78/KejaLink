import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Getproducts from './Components/Getproducts';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Addproducts from './Components/Addproducts';
import Makepayment from './Components/Makepayment';
import Notfound from './Components/Notfound';


function App() {
  return (

    <Router>
      <div className="App">
        <header className="App-header">
        <h2>Welcome to KejaLink- The Epitome of Housing Luxury</h2>
        </header>  

        <nav>

          <Link to="/"  className='btn btn-primary btn-sm m-1'> Home</Link>

          <Link to="/addproducts" className='btn btn-success btn-sm m-1' >Add products</Link>

          <Link to="/signin" className='btn btn-danger btn-sm m-1' >Signin</Link>

          <Link to="/signup" className='btn btn-info btn-sm m-1' >Signup</Link>

        </nav>
    
        <Routes>
            <Route path='/' element={<Getproducts />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/addproducts' element={<Addproducts />} />
            <Route path='/makepayment' element={<Makepayment />} />
            <Route path='*' element={<Notfound />} />
            
         </Routes>
        </div>
      </Router>
  );
}

export default App;
