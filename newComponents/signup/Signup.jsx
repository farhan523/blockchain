import React,{useState} from 'react'
import styles from "./styles.module.css"
import { toast } from "react-toastify";
import { CirclesWithBar } from "react-loader-spinner";
import { useRouter } from 'next/navigation'

function Signup() {
  const [error,setError] = useState({});
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader,setLoader] = useState(false)

  const router = useRouter()


  function setErrorMessage(errorType,errorMessage){
      setError(() =>{
        return {
          [errorType] : errorMessage
        }
      })
  }
  
  const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  async function submitForm() {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        username: name,
        email:email,
        password: password
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        let response = await fetch("http://localhost:1337/api/auth/local/register", requestOptions);
        let data = await response.json();
        console.log(data);
        if (data.error) {
            toast.error(data.error.message);
        } else {
            localStorage.setItem("token", data.jwt);
            toast.success("successfully signup");
            toast.info("redirecting...");
            setTimeout(()=>{
                router.push("/home");
            },1000)

        }
    } catch (error) {
        console.log(error);
        toast.error("Network Error try Again");
    }finally{
      setLoader(false);
    }
}

  async function submitUserData() {
    if (name.length < 3) {
        setErrorMessage("nameError","name at least should be 3 character");
      return;
    }
    if (email.length == 0) {
          setErrorMessage("emailError","please enter email address");
        return;
    }
    if (!validateEmail(email)) {
          setErrorMessage("emailError","email address is invalid");
        return;
    }

    if (password.length < 6){
      return setErrorMessage("passwordError","Password length must be at least 6");
    }

    submitForm();
}


  return (
    <div className='' style={{display:"flex"}}>
        <div className={styles.left}>
        <iframe mute="1" width="100%" height="100%" src="https://www.youtube.com/embed/Vsq1_kewchQ?autoplay=1&controls=0&modestbranding=1" accessKey='false'  frameborder="0" allow="accelerometer; autoplay;  " allowfullscreen></iframe>

        </div>
        <div className={styles.right}>
            <div className={styles.rightChild}>
                <h1 style={{fontWeight:"bold",marginBottom:30}}>USER SIGNUP</h1>
                <input value={name} onChange={(e)=>setName(e.target.value)} placeholder='User Name' type='text' style={{backgroundColor:"#eae6ff",width:"80%", padding:"7px 10px", borderRadius:18}}/>
                <p style={{ textAlign: "left", marginBottom: 20, color: "red" }}>{ error.nameError ? error.nameError : null}</p>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email Address' type='text' style={{backgroundColor:"#eae6ff",width:"80%", padding:"7px 10px", borderRadius:18}}/>
                <p style={{ textAlign: "left", marginBottom: 20, color: "red" }}>{ error.emailError ? error.emailError : null}</p>
                <input value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Password' type='Password' style={{backgroundColor:"#eae6ff",width:"80%", padding:"7px 10px", borderRadius:18}}/>
                <p style={{ textAlign: "left", marginBottom: 20, color: "red" }}>{ error.passwordError ? error.passwordError : null}</p>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-around"}}>
                        <h2 onClick={submitUserData} style={{marginLeft:20,marginRight:5, cursor: "pointer", backgroundColor: "#6352ec", padding: "5px 40px", borderRadius: 20, color: "white" }}>
                            SIGNUP
                        </h2>
                        <CirclesWithBar height="30" width="30" color="#6352EC" outerCircleColor="#6352EC" innerCircleColor="#6352EC" barColor="#6352EC" ariaLabel="circles-with-bar-loading" wrapperStyle={{}} wrapperClass="" visible={loader} />
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Signup