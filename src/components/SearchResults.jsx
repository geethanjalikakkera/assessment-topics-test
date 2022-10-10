import { gql, useQuery } from "@apollo/client";
import {
  Avatar,
  Chip,
  List,
  Typography,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";

import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    // backgroundColor: theme.palette.background.paper,
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
    width: "100%"
  }
}));

const GET_GIT_TOPICS = gql`
  query SearchTopics($search: String!) {
    search(query: $search, type: REPOSITORY, first: 10) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            stargazers {
              totalCount
            }
            resourcePath
            repositoryTopics(first: 10) {
              totalCount
              nodes {
                topic {
                  name
                  stargazerCount
                  relatedTopics {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

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
    //updateSearchTerm(newTopic);
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
  //debug the result if needed
  console.debug("RESULT:", data);

  return (
    <React.Fragment>
      {data &&
        data.search.edges &&
        data.search.edges.map((edge, index) => (
          <List className={classes.list}>
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
