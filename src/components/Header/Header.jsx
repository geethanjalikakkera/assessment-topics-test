import { AppBar, Button, Toolbar, Typography, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";

import useStyles from "./styles";

const Header = ({ onSearch }) => {
  const classes = useStyles();
  const [value, setValue] = useState("");

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Topics
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={value}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <Button variant="outlined" className={classes.button} onClick={() => onSearch(value)}>
            Submit
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
