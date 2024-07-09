import React, { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { useState } from "react";
import validator from 'validator';
import { getUserFromCookie, saveUserOnCookie } from "../../cookies/cookies";
import { subscribeToSite } from "../../server/auth";
import { editUserDetails, getUser } from "../../server/db/userDB";
const Subscribe=(props)=>{
    const user=getUserFromCookie()
    const [inputClasses, setInputClasses] = useState(["", "", "", "", ""]);
    const [invalidMessages, setInvalidMessages] = useState(["", "", "", "", ""]);
    const [placeHolders,setPlaceHolders] = useState(["Username","Adress","Email","Password","Repeat on password"])
    const [validInputs, setValidInputs] = useState([false, false, false, false, false]);
    const [email, setEmail] = useState("");
    const [adress, setadress] = useState("");
    const [password, setPassword] = useState("");    
    const [passwordAgain, setPasswordAgain] = useState("");
    const [username, setUsername] = useState("");
    

    const navigate = useNavigate();

    const isFormInvalid = () => {
        return validInputs.includes(false);
        
    };
    useEffect(() => {

        if(user){
            setEmail(user.email)
            setPassword(user.password)
            setPasswordAgain(user.password)
            setadress(user.adress)
            setUsername(user.name)
        }
        return () => {
    
        };
      },[]);

    const validateInput = (
        value,
        inputindex,
        isValueValidFunc,
        setValue,
        missingValueMessage,
        invalidValueMessage
    ) => {
        const setStateOfInputs = (message, inputClass, isvalidInput) => {
            const newInavlidMessages = [...invalidMessages];
            const newInputClasses = [...inputClasses];
            const newValidInputs = [...validInputs];
            newInavlidMessages[inputindex] = message;
            setInvalidMessages(newInavlidMessages);
            newInputClasses[inputindex] = inputClass;
            setInputClasses(newInputClasses);
            newValidInputs[inputindex] = isvalidInput;
            setValidInputs(newValidInputs);
        };

        if (value.length > 0) {
            if (isValueValidFunc(value)) {
                setStateOfInputs("", "", true);
                setValue(value);
            } else {
                setStateOfInputs(invalidValueMessage, "input-invalid", false);
            }
        } else {
            setStateOfInputs(missingValueMessage, "input-invalid", false);
        }
    };

    const onBlurUsername = (event) => {
        const newUsername = event.target.value.trim();
        const isUsenamevalid = (value) => {
            return value.toLowerCase() !== "moshe";
        };
        validateInput(
            newUsername,
            0,
            isUsenamevalid,
            setUsername,
            "You must enter username",
            "Username could not be MOSHE!!!"
        );
    };

    const onBlurAdress = (event) => {
        const newAdress = event.target.value.trim();
        const isAdressValid = (value) => {
            return value.length>5;
        };
        validateInput(
            newAdress,
            1,
            isAdressValid,
            setadress,
            "You must enter your adress",
            "Adress invalid"
        );
    };

    const onBlurEmail = (event) => {
        const newEmail = event.target.value.trim();

        validateInput(
            newEmail,
            2,
            validator.isEmail,
            setEmail,
            "You must enter your email",
            "Email invalid"
        );
    };

    const onBlurPassword = (event) => {
        const newPassword = event.target.value.trim();
        const isPasswordValid = (value) => {
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
            return passwordRegex.test(value);
        };
        validateInput(
            newPassword,
            3,
            isPasswordValid,
            setPassword,
            "You must enter password",
            "Password must contain capital and regular characters, numbers and must have at least 6 characters"
        );
        console.log(password);
    };

    const onBlurPasswordRepeated = (event) => {
        const passwordRepeated = event.target.value.trim();
        const isPasswordRepeatedValid = (value) => {
            return password === passwordRepeated;
        };
        validateInput(
            passwordRepeated,
            4,
            isPasswordRepeatedValid,
            () => { },
            "You must enter again your password",
            "The two passwords not identical"
        );
    };

    const onSubmitform = (event) => {
        event.preventDefault();
        console.log("subscribeForm", {
            username,
            adress,
            email,
            password
        });
        if(user){
            editUserDetails({name:username,email,adress ,password}).
            then(() => getUser(email,password)).
            then((userData)=>saveUserOnCookie(userData.data)
                    ).catch((err) => {
                    if (err.message === "EMAIL_EXISTS") {
                        setInputClasses(["", "", "input-invalid", "", ""]);
                        setInvalidMessages(["", "", "Mail exist.", "", ""]);
                        setValidInputs([true, true, false, true, true]);
                    }
                    })
                       navigate("/");   
        }else{
        subscribeToSite(username,email,adress, password).
        then(() => getUser(email,password)).
        then((userData)=>saveUserOnCookie(userData.data)
                ).catch((err) => {
                    console.log(err.message);
                if (err.message ==="EMAIL_EXIST") {
                    console.log("succes");
                    setInputClasses(["", "", "input-invalid", "", ""]);
                    setInvalidMessages(["", "", "Mail exist.", "", ""]);
                    setValidInputs([true, true, false, true, true]);
                }else{
                   navigate("/");                        
                }
                })

    };            
        }



    const onClickLogin = () => {
        props.setIsLoginMode(true);
    };

    return (
        <div className="subscribe_container">
        <div className="subscribe_modal">
        <div className="login-form">
          <h3>Subscribe</h3>
            <form onSubmit={ onSubmitform }>
                <label>User name</label>    
                <input placeholder={placeHolders[0]} className={ inputClasses[0] } value={username} onChange={(event)=>{setUsername(event.target.value)}} onBlur={ onBlurUsername }></input>
                {invalidMessages[0] !== "" && <div className="invalid-message">{ invalidMessages[0] }</div>}

                <label>Adress</label>                
                <input placeholder={placeHolders[1]} type="text" className={ inputClasses[1] } value={adress} onChange={(event)=>{setadress(event.target.value)}} onBlur={ onBlurAdress } />
                {invalidMessages[1] !== "" && <div className="invalid-message">{ invalidMessages[1] }</div> }

                <label>Email</label>
                <input placeholder={placeHolders[2]} className={ inputClasses[2] } value={email} onChange={(event)=>{setEmail(event.target.value)}} onBlur={ onBlurEmail } />
                { invalidMessages[2] !== "" && <div className="invalid-message">{ invalidMessages[2] }</div> }

                <label>Password</label>
                <input type="password" placeholder={placeHolders[3]} className={ inputClasses[3] } value={password} onChange={(event)=>{setPassword(event.target.value)}} onBlur={ onBlurPassword } />
                {  invalidMessages[3] !== "" && <div className="invalid-message">{ invalidMessages[3] }</div> }

                <label>Password again</label>
                <input type="password" placeholder={placeHolders[4]} className={ inputClasses[4] } value={passwordAgain} onChange={(event)=>{setPasswordAgain(event.target.value)}}  onBlur={ onBlurPasswordRepeated } />
                { invalidMessages[4] !== "" && <div className="invalid-message">{ invalidMessages[4] }</div> }

                <div className="login-form__nav">
                  {!user?<button type="submit" disabled={ isFormInvalid() }>Submit</button> : <button type="submit">Edit</button>}  
                 {!user &&   <div onClick={onClickLogin}>Login</div>}
                </div>
            </form>
        </div>
        </div>
        </div>
    );
};



export default Subscribe;