import React from "react";
import axios from "axios";
import swal from "sweetalert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const OnChangeValue = (e) => {
    const { value, name } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const navigate = useNavigate();

  function loginNow(data) {
    axios
      .post(`${SERVER_URL}/api/login`, data)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("Authorization", response.data.token);
          swal({
            title: "Success!",
            text: "Login Successful!",
            icon: "success",
            button: "Dashboard!",
          }).then(() => {
            navigate("/");
          });
        }
      })
      .catch((error) => {
        console.log(error.response);
        swal("Error!", error.response.data.error, "error");
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = data;
    let formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    loginNow(formdata);
  }

  const classes = useStyles();

  return (
    <Container
      style={{ backgroundColor: "#ffffffaa", borderRadius: "15px" }}
      component="main"
      maxWidth="xs"
    >
      {
        //CheckForLogin()
      }
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            onChange={OnChangeValue}
            fullWidth
            id="email"
            value={data.email}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            onChange={OnChangeValue}
            value={data.password}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
