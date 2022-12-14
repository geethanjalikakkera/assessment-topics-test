import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./pages/App";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer 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`,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);
