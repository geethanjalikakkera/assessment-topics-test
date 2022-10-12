import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
