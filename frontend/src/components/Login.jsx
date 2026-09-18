import { useContext, useState } from "react";
import { loginUser } from "../services/authService";
import api from "../services/api";
import AuthContext from "../context/AuthContext";

function Login(){
    const { setIsAuthenticated, setUser } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

function handleSubmit(event) {
  event.preventDefault();

  const userData = {
    email,
    password
  };

  loginUser(userData)
  .then((response) => {
  console.log("Login successful:", response.data);
  
localStorage.setItem("token", response.data.token);
localStorage.setItem("user", JSON.stringify(response.data));

setIsAuthenticated(true);
setUser(response.data);
  setIsAuthenticated(true);
  console.log("Authenticated:", true);
  setUser(response.data);

  api.get("/api/applications/my-applications")
    .then((response) => {
      console.log("My applications:", response.data);
    })
    .catch((error) => {
      console.error("Applications request failed:", error);
    });
})

}

    return(
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

            <input type = "email"
                   placeholder="Enter Email"
                   value={email}
                   onChange={(Event)=> setEmail(Event.target.value)} />
                    <p>                


                    </p>

            <input type="password"
                   placeholder="enter password"
                   value={password} 
                   onChange={(Event)=> setPassword(Event.target.value)}   />  
                <p>                          
                    
                        </p>

           <button type="submit">Login</button>

           </form>

        </div>


    );
}
  export default Login