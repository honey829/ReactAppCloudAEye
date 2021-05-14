import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Divider,
  Toolbar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import Header from "./Header";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Users from "./Users";
import Admin from "./Admin";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: 240,
    flexShrink: 0
  },
  drawerPaper: {
    width: 240
  },
  drawerContainer: {
    overflow: "auto"
  },
  content: {
    flexGrow: 1
  },
  formControl: {
    margin: 8,
    minWidth: 120
  }
}));

export const Home = (props) => {
  const history = useHistory();

  // const [provision, setProvision] = useState("");

  const classes = useStyles();
  const [provisions, setProv] = useState([]);
  const [provAdmin, setProvAdmin] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userLoggedIn"));

    if (user !== null) {
      axios
        .get("https://cws0b.sse.codesandbox.io/provision", {
          headers: {
            authorization: user.data.auth
          }
        })
        .then((res) => {
          setProv(res.data);
        })
        .catch((err) => {
          localStorage.setItem("provisionError", true);
          console.log(`error in use effect ${err}`);
        });

      if (user.data.admin === true) {
        axios
          .get("https://cws0b.sse.codesandbox.io/provisionAll")
          .then((res) => {
            setProvAdmin(res.data);
          })
          .catch((err) => {
            localStorage.setItem("provisionError", true);
            console.log(`error in use effect ${err}`);
          });
      }
    } else {
      history.push("/");
    }

    if (localStorage.getItem("userLoggedIn") !== null) {
      if (
        JSON.parse(localStorage.getItem("userLoggedIn")).data.admin === true
      ) {
        setCheck(true);
      } else {
        setCheck(false);
      }
    }
  }, []);

  const [check, setCheck] = useState(Boolean);

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <Header />

        <Drawer variant="permanent" className={classes.drawer}>
          <Toolbar />
          <List>
            <ListItem>
              <ListItemText primary={"Provision"} />
            </ListItem>
            <ListItem button>
              <ListItemText secondary={"Provision Access"} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={"Security"} />
            </ListItem>
            <ListItem button>
              <ListItemText secondary={"Network Access"} />
            </ListItem>
          </List>
        </Drawer>
        <main>
          <Toolbar />
          {check ? <Admin option={provAdmin} /> : <Users option={provisions} />}
        </main>
      </div>
    </>
  );
};

export default Home;
