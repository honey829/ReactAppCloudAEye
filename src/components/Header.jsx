import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography
} from "@material-ui/core";
import zIndex from "@material-ui/core/styles/zIndex";

import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  appBar: {
    zIndex: zIndex.drawer + 1
  },
  button: {
    marginLeft: "auto"
  }
});

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">
            {localStorage.getItem("userLoggedIn") !== null
              ? JSON.parse(localStorage.getItem("userLoggedIn")).data.name
              : ""}
          </Typography>
          <Button
            edge="start"
            color="inherit"
            className={classes.button}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
