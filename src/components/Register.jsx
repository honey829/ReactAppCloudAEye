import React, { useState } from "react";
import Card from "@material-ui/core/Card/Card";
import { CardHeader, Button, Input, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const history = useHistory();

  localStorage.clear();
  const handleRegister = () => {
    const auth = btoa(`${userId}:${password}`);
    console.log(auth);

    axios
      .post(
        "https://cws0b.sse.codesandbox.io/register",
        {
          name: name,
          mail: mail
        },
        {
          headers: {
            authorization: auth
          }
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("User Registered Successfully");
          history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Grid direction="row" container>
        <div className="wrapper">
          <Grid className="sub">
            <Typography variant="subtitle2">
              If you want to login please click here
            </Typography>

            <Button
              variant="contained"
              style={{ backgroundColor: "#9dbcd4", marginLeft: "5px" }}
              className="margin10"
              onClick={(e) => {
                e.preventDefault();
                history.push("/login");
              }}
            >
              Login
            </Button>
          </Grid>
          <Card className="LoginCard">
            <CardHeader title="Register" />

            <form className="form" onSubmit={handleRegister}>
              <Input
                placeholder="Please enter your name"
                type="text"
                className="margin10"
                value={name}
                required
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
              />
              <Input
                placeholder="Please enter your mail id"
                type="email"
                className="margin10"
                value={mail}
                required
                onChange={(e) => {
                  e.preventDefault();
                  setMail(e.target.value);
                }}
              />
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
                type="submit"
              >
                Register
              </Button>
            </form>
          </Card>
        </div>
      </Grid>
    </>
  );
};

export default Register;
