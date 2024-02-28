import axios from "axios";
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function SignUp() {
    
    
    const [username,setUserName] = useState();
    const [emailId,setEmailId] = useState();

    const [password,setPassword] = useState();
    const [error,setError]=useState("");
    const validateEmail=(emailId)=>{
        const regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(emailId);
    }
    const submitForm = async () => {
        if(!username || !emailId || !password){
            setError("All fields are required");
            
            return;
        }
        if(!validateEmail(emailId)){
            setError("Invalid email format");
            
            return;
        }
        // api call
        // try{
        //    const emailExistsResponse= await axios.get("http://localhost:8081/api/v2/user?email=${emailId}");
        //    if(emailExistsResponse.data.exists) {
        //     setError("Email already exists");
        //     alert("Email already exist");
        //     return;
        //    }
        
        try{
            const response = await axios.post("http://localhost:8081/api/v2/user",{
                username,
                emailId,
                password,
            });
            toast("Registration Succesfull")
            console.log("Registration Successfull",response.data);
        } catch(error){
            console.error("Registration failed", error.message);
        }
       
    }

    return(
        <div id="overflowIssue" className="row justify-content-center pt-5">
            <div className="col-sm-3">
                <div className="card p-4" style={{backgroundColor:'#f9f9f9',borderRadius:'10px'}}>
                    <h1 className="text-center mb-3" style = {{color:"#333"}}>SignUp </h1>
                    { error && <div className="alert alert-danger">{error}</div>}
                    <div className="form-group">
                        <label>username</label>
                        <input type="test" className="form-control" placeholder="Enter username" 
                            onChange={e=>setUserName(e.target.value)}
                        id="emailId" />
                    </div>
                    <div className="form-group mt-3">
                        <label>EmailId:</label>
                        <input type="email" className="form-control" placeholder="Enter emailId" 
                            onChange={e=>setEmailId(e.target.value)}
                        id="emailId" />
                    </div>

                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" 
                            onChange={e => setPassword(e.target.value)}
                        id="pwd" />
                    </div>
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Register</button>
                </div>
            </div>
        </div>
    )
}

