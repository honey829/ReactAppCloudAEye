import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const Admin = (props) => {
  let provAdmin = props.option;
  const classes = useStyles();
  console.log(provAdmin);
  return (
    <Card style={{ marginTop: "10px" }}>
      <CardHeader
        title="Provisions"
        subheader="Added provisions of all the users"
      />
      <CardContent>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell align="right">Provisions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {provAdmin.map((el, index) => {
                let name = atob(el.auth).split(":")[0];
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell align="right">{el.provision}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default Admin;
