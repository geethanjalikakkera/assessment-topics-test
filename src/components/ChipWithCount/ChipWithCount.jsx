import { Avatar, Chip } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import React from "react";

import useStyles from "./styles";

const ChipWithCount = ({ title, count }) => {
  const classes = useStyles();
  return (
    <div className={classes.chips}>
      <h5 className={classes.title}>{title}</h5>
      <Chip
        size="small"
        className={classes.greenChip}
        avatar={
          <Avatar>
            <StarIcon className={classes.star} />
          </Avatar>
        }
        label={count}
      />
    </div>
  );
};

export default ChipWithCount;
