import "bootstrap/dist/css/bootstrap.min.css";
import  {BrowserRouter , Route , Routes,Navigate} from 'react-router-dom';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import Header from './components/Header.js';
import Home from "./components/Home.js";
import './style.css';
import Footer from "./components/Footer.js";
import { AuthProvider,useAuth } from "./components/AuthContext.js";
import Dashboard from "./components/Dashboard.js";
import Movies from "./components/Movies.js";
import Wishlist from "./components/Wishlist.js";

function App() {
  function PrivateRoute({ element }) {
    const { isLoggedIn } = useAuth();
  
    // Check if the user is logged in and hasn't logged out
    const isAuthorized = isLoggedIn && /* Add additional check if needed */ true;
  
    return isAuthorized ? element : <Navigate to="/login" />;
  }
 return (
  <div className="App1">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} />}
            />
             <Route
              path="/movies"
              element={<PrivateRoute element={<Movies />} />}
            />
             <Route
              path="/wishlist"
              element={<PrivateRoute element={<Wishlist />} />}
            />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
 )
}

export default App;