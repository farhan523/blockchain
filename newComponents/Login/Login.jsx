import React, { useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import { CirclesWithBar } from "react-loader-spinner";
import { useRouter } from 'next/navigation'
import baseUrl from "@/baseUrl/url";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorEmail, setEmailError] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [loader,setLoader] = useState(false)

    const router = useRouter()

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
            identifier: email,
            password: password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            let response = await fetch(`${baseUrl}/api/auth/local/`, requestOptions);
            let data = await response.json();
            console.log(data);
            if (data.error) {
                toast.error(data.error.message);
            } else {
                localStorage.setItem("token", data.jwt);
                localStorage.setItem("uid",data.user.id);
                toast.success("successfully login");
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
        if (email.length == 0) {
            setEmailError("Email address required");
            return;
        }
        if (!validateEmail(email)) {
            setEmailError("Email address is invalid");
            return;
        }

        if (password.length < 3) return setErrorPassword("Password length must be at least 3");

        submitForm();
    }

    return (
        <div className="" style={{ display: "flex" }}>
            <div className={styles.left}>
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/Vsq1_kewchQ?autoplay=1&controls=0&modestbranding=1"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
            <div className={styles.right}>
                <div className={styles.rightChild}>
                    <h1 style={{ fontWeight: "bold", marginBottom: 30 }}>USER LOGIN</h1>
                    <input
                        required={true}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError("");
                        }}
                        placeholder="Email Address"
                        type="email"
                        style={{ backgroundColor: "#eae6ff", width: "80%", padding: "7px 10px", borderRadius: 18 }}
                    />
                    <p style={{ textAlign: "left", marginBottom: 20, color: "red" }}>{errorEmail}</p>
                    <input
                        required={true}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrorPassword("");
                        }}
                        placeholder="Password"
                        type="Password"
                        style={{ backgroundColor: "#eae6ff", width: "80%", padding: "7px 10px", borderRadius: 18 }}
                    />
                    <p style={{ textAlign: "left", marginBottom: 20, marginLeft: 20, color: "red" }}>{errorPassword}</p>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-around"}}>
                        <h2 onClick={submitUserData} style={{marginLeft:20,marginRight:5, cursor: "pointer", backgroundColor: "#6352ec", padding: "5px 40px", borderRadius: 20, color: "white" }}>
                            LOGIN
                        </h2>
                        <CirclesWithBar height="30" width="30" color="#6352EC" outerCircleColor="#6352EC" innerCircleColor="#6352EC" barColor="#6352EC" ariaLabel="circles-with-bar-loading" wrapperStyle={{}} wrapperClass="" visible={loader} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
