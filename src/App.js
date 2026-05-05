import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home';
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
import CompanyPage from './Components/CompanyPage';


function App() {
  return (

    <Router>

      <Navbar />

      <div className="App">
          <header className="App-header">
            <div className="glass-card">
              <p className="glass-eyebrow">Premium Real Estate</p>
              <h2>Welcome to <span>KejaLink</span></h2>
              <div className="glass-divider"></div>
              <p className="glass-sub">The Epitome of Housing Luxury</p>
            </div>
          </header>
        
        
    
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Getproducts />} />
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
            <Route path="/company" element={<CompanyPage />} />
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
