import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import HttpService from "../services/HttpService";

export default function LoginPage() {

  const [userId, setUserId] = useState(".");
  const [password, setPassword] = useState(".");
  const [loginFail, setLoginFail] = useState(false);
  const [remember, setRemember] = useState("off");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    useEffect(() => {
        const token = localStorage.getItem("loginToken");
        if (token !== null) {
          navigate('/chat');
        }
    });

  const handleLoginPressed = () => {
    HttpService.login(userId, password, remember)
    .then((response) => {
      console.log(response);
      navigate('/chat');
    })
    .catch((error) => {
      console.dir(error);
      setLoginFail(true);
    })
  }

    return(
    <div style={{height: '100%',
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "center",
                 flexDirection: "column"}}>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
      noValidate
      autoComplete="off"
    >
        <TextField
          required
          className="input-field"
          label="Username"
          onChange={(event) => {setUserId(event.target.value)}}
          error={userId === ""}
          helperText={userId === "" ? 'Username required' : ' '}
        />
        <TextField
          required
          className="input-field"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(event) => {setPassword(event.target.value)}}
          error={password === ""}
          helperText={password === "" ? 'Password required' : ' '}
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff className="vis-icon"/> : <Visibility className="vis-icon"/>}
                </IconButton>
              </InputAdornment>
          }}
        />
        <FormControlLabel 
          className="checkbox"
          control={<Checkbox />}
          label="Remember Login"
          onChange={(event) => {setRemember(event.target.value)}}
          labelPlacement="start"
        />
    </Box>
    {loginFail === true ? <p style = {{color: "red"}}>Invalid username or password</p> : null}
      <Button variant="contained" onClick={handleLoginPressed}>Login</Button>
    <p>Don't have an account? 
      <Link to="/register">
        <Button variant="text">Sign Up</Button>
      </Link> 
    </p>
    </div>
    );
}