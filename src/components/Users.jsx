import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardActions,
  Button,
  makeStyles,
  List,
  ListItem
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";

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

const Users = (props) => {
  const [provision, setProvision] = useState("");
  let provisions = props.option;

  const handleAddingProv = () => {
    const user = JSON.parse(localStorage.getItem("userLoggedIn"));
    let data = {
      provision: provision
    };

    if (provision === "") {
      alert("Please select a container");
    } else {
      axios
        .post("https://cws0b.sse.codesandbox.io/provision", data, {
          headers: {
            authorization: user.data.auth
          }
        })
        .then((res) => {
          console.log(res);
          if (res.data.data === "ok") {
            setTimeout(() => {
              alert("Provision given successfully");
            }, 100);
          }
        });
    }
  };

  const classes = useStyles();
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" color="textSecondary">
            To add please select a provision
          </Typography>
          <FormControl className={classes.formControl}>
            <InputLabel> Provisions </InputLabel>
            <Select
              value={provision}
              onChange={(e) => {
                e.preventDefault();
                setProvision(e.target.value);
              }}
            >
              {["", "EK2", "ECB", "ECM"].map((el) => {
                if (el === "") {
                  return (
                    <MenuItem key={0} value={el}>
                      {"None"}
                    </MenuItem>
                  );
                } else {
                  return (
                    <MenuItem key={el} value={el}>
                      {el}
                    </MenuItem>
                  );
                }
              })}
            </Select>
          </FormControl>
        </CardContent>
        <CardActions>
          <Button color="secondary" onClick={handleAddingProv}>
            Add
          </Button>
        </CardActions>
      </Card>

      <Card style={{ marginTop: "10px" }}>
        <CardHeader title="Provisions" subheader="Added provisions" />
        <CardContent>
          {provisions.map((el, index) => {
            return (
              <List key={index}>
                <ListItem>{el.provision}</ListItem>
              </List>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
};

export default Users;
