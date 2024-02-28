import { useState } from "react"

import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';

export default function Login() {
    const { isLoggedIn, login: authLogin } = useAuth();
    const navigate = useNavigate();

    const [login, setLogin] = useState({
        emailId: "",
        password: ""
    });
  

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLogin((login) =>( { ...login, [name]: value }));
    };

    const handleLogin = (event) => {
        event.preventDefault();
        //helper.login(login)
            // .then((response) => {
            //     console.log(response.data);
            //     sessionStorage.setItem("token", "Bearer " + response.data.token);
            //     navigate("/");
            // })
            axios.post("http://localhost:8090/api/v1/login/user",{
                emailId:login.emailId,
                password:login.password
            }).then((response)=>{
                //toast.success("Login Successfull");
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                   // title: 'Oops! Something went wrong!',
                    text: 'Login successfull',
                    showConfirmButton: true,
                    timer: 10000})
                localStorage.setItem("email",login.emailId);      
                localStorage.setItem("token","Bearer "+response.data.token);
                console.log(response);
                authLogin();
                // const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn") || "false");
                // console.log("dd",isLoggedIn);

                navigate("/dashboard");
            })
            .catch((error) => {
                // alert(error.response.data);
                toast.error("Login failed");
                console.log(error);
                console.log(error.response);
            });
    };
    
   return(
        <div id="overflowIssue" className="row justify-content-center pt-5">
            <div className="col-sm-3">
                <div className="card p-4" style={{backgroundColor:'#f9f9f9',borderRadius:'10px'}}>
                    <h1 className="text-center mb-3" style = {{color:"#333"}}>Login </h1>
                    <div className="form-group">
                        <label>Email address:</label>
                        <input type="email" className="form-control" placeholder="Enter email" name="emailId"
                        value={login.emailId}
                             onChange={handleChange}
                         />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" name="password"
                        value={login.password}
                           onChange={handleChange}
                         />
                    </div>
                    <button type="button" onClick={handleLogin} className="btn btn-primary mt-4">Login</button>
                </div>
            </div>
            <Footer />
        </div>
        
    )
}