import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

import Header from "../components/Header/Header";
import SearchResult from "../components/SearchResults/SearchResults";

const useStyles = makeStyles(() => ({
  results: {
    marginTop: '100px',
  },
  headerText: {
    textAlign: 'center',
  }
}));

function App() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
        <Header onSearch={(value) => setSearchTerm(value)} />
        <div className={classes.results}>
        {searchTerm && <Typography variant="body2" className={classes.headerText}>TOPIC: <span>{searchTerm}</span></Typography>}
        <SearchResult value={searchTerm} onChange={(value) => setSearchTerm(value)}/>
        </div>
      </div>
  );
}

export default App;
