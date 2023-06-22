import React, { useState, useEffect } from "react";
import HttpService from "../services/HttpService";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from "@mui/material/IconButton";
import { useLocation, useNavigate } from "react-router-dom";

const RegisterPage = (props) => {

  const [userId, setUserId] = useState(".");
  const [password, setPassword] = useState(".");
  const [passwordConfirm, setPasswordConfirm] = useState(".");
  const [nickname, setNickname] = useState(".");
  const [realname, setRealname] = useState(".");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = () => {
    if (password === passwordConfirm) {
      HttpService.register(userId, password, nickname, realname)
        .then((response) => {
          console.dir(response);
          navigate('/chat');
        })
    }
    
  }

  const location = useLocation();

  useEffect(() => {
    props.setPath(location.pathname);
  });

    return(
      <div style={{
        height: '100%',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
        }}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          marginBottom: "2vh",
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
            label="Nickname"
            onChange={(event) => {setNickname(event.target.value)}}
            error={nickname === ""}
            helperText={nickname === "" ? 'Nickname required' : ' '}
          />
          <TextField
            required
            className="input-field"
            label="Real Name"
            onChange={(event) => {setRealname(event.target.value)}}
            error={realname === ""}
            helperText={realname === "" ? 'Realname required' : ' '}
          />
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
            color={password.length < 8 ? "warning" : "success"}
            error={password === ""}
            helperText={(password === "" && 'Password required') || (password.length < 8 && 'Password must be at least 8 characters') }
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff className="vis-icon" /> : <Visibility className="vis-icon"/>}
                  </IconButton>
                </InputAdornment>
            }}
          />
          <TextField
            required
            className="input-field"
            label="Password Confirm"
            type={showPassword ? 'text' : 'password'}
            onChange={(event) => {setPasswordConfirm(event.target.value)}}
            error={passwordConfirm === ""}
            helperText={(passwordConfirm === "" && 'Confirmation of password required') || (password !== passwordConfirm && 'Passwords must match')}
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
      </Box>
      <Button variant="contained" onClick={handleRegister} sx={{marginBottom: "2vh"}}>Register</Button>
      </div>
    );
}

export default RegisterPage;