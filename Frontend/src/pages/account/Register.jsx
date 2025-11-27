import { LockOutlined, Password } from "@mui/icons-material";
import { Avatar, Box, Button, CircularProgress, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import requests from "../../api/apiClient";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./accountSlice";

export default function RegisterPage() {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.account)
  const { register, handleSubmit, formState: {errors, isValid},  } = useForm({
    defaultValues:{
      username: "",
      email:"",
      password: ""
    }
  });

  const handleForm = (data) => {
    dispatch(registerUser(data))
  }

  return (
    <Container maxWidth="xs">
      <Paper sx={{padding:2}} elevation={2}>
        <Avatar sx={{mx: "auto",mb: 2, color: "white", bgcolor: "secondary.main" }}>
          <LockOutlined/>
        </Avatar>
        <Typography component="h1" variant="h5" sx={{textAlign:"center" , mb:2}}>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit(handleForm)} sx={{mb:2}}>
          <TextField 
            {...register("username", {
              required: "Username alanı zorunludur.",
              minLength: {
                value: 5,
                message: "Username en az 5 karakter olmalıdır."
              },
            })}
            label="Enter username" 
            size="small" 
            fullWidth  
            autoFocus 
            sx={{mb:2}}
            error={!!errors.username}
            helperText= {errors.username?.message}
          />

          <TextField 
            {...register("email", {
              required: "Email alanı zorunludur.",
              minLength: {
                value: 10,
                message: "Email en az 10 karakter olmalıdır."
              },
            })}
            label="Enter email" 
            size="small" 
            fullWidth   
            sx={{mb:2}}
            error={!!errors.email}
            helperText= {errors.email?.message}
          />

          <TextField 
            {...register("password", {
              required: "Password alanı zorunludur.",
              minLength: {
                value: 7,
                message: "Password en az 7 karakter olmalıdır."
              },
            })}
            type="password"
            label="Enter password" 
            size="small" 
            fullWidth  
            sx={{mb:2}}
            error={!!errors.password}
            helperText= {errors.password?.message}
          />

           <Button type="submit" variant="contained" color="secondary" fullWidth sx={{mt:1}} disabled={!isValid}>
                      {status === "pending" ? ( <CircularProgress size="25px"/> ) : ( "Sign up")}
                    </Button>
          
        </Box>
      </Paper>
    </Container>
  );
} 
