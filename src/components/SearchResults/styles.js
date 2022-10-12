import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
  },
  list: {
    background: "gray",
    color: "white",
    margin: "16px",
  },
  inline: {
    display: "inline",
  },
  chip: {
    margin: "2px",
  },
  chips: {
    display: "flex",
  },
  greenChip: {
    marginTop: "13px",
    background: "green",
    marginLeft: "6px",
  },
  star: {
    color: "green",
  },
  title: {
    width: "100%",
  },
}));

export default useStyles;
