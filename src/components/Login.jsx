import React, { useState } from "react";
import Card from "@material-ui/core/Card/Card";
import { CardHeader, Button, Input, Grid } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const auth = btoa(`${userId}:${password}`);
    // console.log(auth);

    axios
      .get("https://cws0b.sse.codesandbox.io/login", {
        headers: {
          authorization: auth
        }
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          const data = { data: res.data[0], loggedIn: true };

          localStorage.setItem("userLoggedIn", JSON.stringify(data));

          history.push("/home");
        } else {
          alert("wrong username and password");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("wrong username and password");
      });
  };
  return (
    <>
      <Grid direction="row" container>
        <div className="wrapper">
          <Card className="LoginCard">
            <CardHeader title="Login" />
            <Input
              placeholder="Please enter Login Id"
              type="text"
              className="margin10"
              required
              value={userId}
              onChange={(e) => {
                e.preventDefault();
                setUserId(e.target.value);
              }}
            />
            <Input
              placeholder="Please enter Password"
              type="password"
              value={password}
              className="margin10"
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
            />
            <Button
              variant="contained"
              style={{ backgroundColor: "#9dbcd4" }}
              className="margin10"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Card>
        </div>
      </Grid>
    </>
  );
};

export default Login;
