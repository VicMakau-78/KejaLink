import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Getproducts from './Components/Getproducts';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Addproducts from './Components/Addproducts';
import Makepayment from './Components/Makepayment';
import Notfound from './Components/Notfound';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import PrivateRoute from './Components/PrivateRoute';
import CompanyDashboard from './Components/CompanyDashboard';


function App() {
  return (

    <Router>

      <Navbar />

      <div className="App">
        <header className="App-header">
        <h2>Welcome to KejaLink- The Epitome of Housing Luxury</h2>
        </header>  
        
    
        <Routes>
            <Route path='/' element={<Getproducts />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            {/* COMPANY ONLY */}
            <Route 
              path='/addproducts' 
              element={
                <PrivateRoute role="company">
                  <Addproducts />
                </PrivateRoute>
              } 
            />

            {/* LOGGED IN USERS */}
            <Route 
              path='/makepayment' 
              element={
                <PrivateRoute>
                  <Makepayment />
                </PrivateRoute>
              } 
            />
            <Route 
              path='/company-dashboard' 
              element={
                <PrivateRoute role="company">
                  <CompanyDashboard />
                </PrivateRoute>
              } 
            />
            <Route path='*' element={<Notfound />} />
            
         </Routes>
         <Footer />
        </div>
      </Router>
  );
}

export default App;
