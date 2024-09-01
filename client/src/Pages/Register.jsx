import { useState } from "react";
import { register } from "../Services/Auth";


const Register = () => {
    

    const [data, setData] = useState({
       
        name:"",
        email:"",
        password:"",
        role:""
    })

    const handle = (e) => {
          
         const {name, value} = e.target
           setData({...data, [name]: value})
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const res = await  register(data);
        console.log(res);  
        // navigate("/login");
        setData({
                name:"",
                email:"",
                password:"",
                role:""
        }   
         )
    }

   

    return (<>
    
        <form onSubmit={handleSubmit} action="">
             
            <input type="text" name="name" placeholder="name" value={data.name} onChange={handle} id="" />  <br />
            <input type="text" name="email" placeholder="email" value={data.email} onChange={handle} id="" />  <br />
            <input type="password" name="password" placeholder="password" value={data.password} onChange={handle} id="" /> <br />
            <input type="text" name="role" placeholder="role" value={data.role}  onChange={handle} id="" />  <br />
            
               <button type="submit" >Submit</button>
         </form>
        
    
    </>)
}

export default Register;