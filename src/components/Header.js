import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  {Link} from 'react-router-dom';
import './Header.css'
import { useAuth } from "./AuthContext";
const Header = () => {
   
    const { isLoggedIn, logout } = useAuth();
    const handleLogout = () => {
        // You can perform additional logout logic here if needed
        toast.success("Logout Successful");
        logout(); // Update the login state in the AuthContext
      };
      {!isLoggedIn && <Link className='LoginButton' to="/login">Login</Link>}
          {isLoggedIn && <button className='LogoutButton' onClick={handleLogout}>Logout</button>}
     return (
        <header id="ur02">
            <div className='navbar'>
            
                <div id="ur01">
                    <img src="./mv2.png"/>
                </div>
                <div className='navbar-links'>
                    {/* <Link className='LoginButton' to="/login">Login</Link> */}
                    {!isLoggedIn && <Link className='LoginButton' to="/login">Login</Link>}

                    {!isLoggedIn && <Link className="SignUpButton" to="/signup">SignUp</Link>}
                    <Link className='HomeButton' to="/">Home</Link>
                    {isLoggedIn && <Link className="MoviesButton" to="/movies">Movies</Link>}
                    {isLoggedIn && <Link className="WishlistButton" to="/wishlist">Wishlist</Link>}
                    {isLoggedIn && <button className="LogoutButton" onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </header>
        
    )
}

export default Header;