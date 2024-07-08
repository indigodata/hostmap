import React from "react";
import { Typography } from "@mui/material";
import "./styles/App.css";
import HostMapUI from './components/HostMapUI';

function App(): React.JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h4" component="h1" gutterBottom>
          Host Map UI
        </Typography>
      </header>
      <main><HostMapUI /></main>
    </div>
  );
}

export default App;
