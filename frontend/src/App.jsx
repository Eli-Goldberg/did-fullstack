import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
// import { getTodos, postTodo } from '../my-api'

import "./App.css";
// import Image from './components/Image'
// import Images from "./components/Images";
import ImageScroller from "./components/ImageScroller";

const ids = [
  // "N0836779",
  // "N0876216",
  // "N0792748",
  // "N0339456",
  // "P06098",
  // "P08722",
  // "N0922021",
  // "P05496",
  "N0383334",
  "P05988",
];

const queryClient = new QueryClient();

function App() {
  // const query = useQuery('todos', getTodos)
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          {/* <Image id={"P08722"} /> */}
          <ImageScroller ids={ids} />
          {/* <Images /> */}
          <p>Scanning...</p>
        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;
