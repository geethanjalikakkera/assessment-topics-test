import { useQuery } from "@apollo/client";
import {
  Chip,
  List,
  Typography,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React, {  useState } from "react";

import ChipWithCount from "../ChipWithCount/ChipWithCount";
import { GET_GIT_TOPICS } from "../../graphql/queries";
import useStyles from "./styles";

function SearchResult(props) {
  const classes = useStyles();
  let searchTerm = props.value;
  const [newTopic, setTopic] = useState(searchTerm);
  let search;

  //initialise the search phrase - whether from user clicking on a topi or key in from navbar top
  if (searchTerm === newTopic) {
    search = `${searchTerm} stars:>10000`; //only filter if stargazers are high to prevent junk
  } else {
    search = `${newTopic} stars:>10000`;
    searchTerm = newTopic;
    props.onChange(newTopic);
  }


  //parsing the search phase into the gql query
  const { loading, error, data } = useQuery(GET_GIT_TOPICS, {
    variables: { search },
  });

  if (loading) {
    return (
      <div>
        <i className="fa fa-spinner fa-spin mr-4" />
        <span>...Searching for {search}</span>
      </div>
    );
  }
  if (error) return `Error! ${error.message}`;

  return (
    <React.Fragment>
      {data &&
        data.search.edges &&
        data.search.edges.map((edge) => (
          <List key={edge.node.resourcePath} className={classes.list}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <ChipWithCount
                    title={edge.node.resourcePath}
                    count={edge.node.stargazers.totalCount}
                  />
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                    >
                      Related Topics:
                    </Typography>
                    &nbsp;
                    {edge.node.repositoryTopics.nodes.map((node, j) => (
                      <Chip
                        label={
                          <ChipWithCount
                            title={node.topic.name}
                            count={node.topic.stargazerCount}
                          />
                        }
                        className={classes.chip}
                        onClick={() => setTopic(node.topic.name)}
                      />
                    ))}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        ))}
    </React.Fragment>
  );
}

export default SearchResult;
