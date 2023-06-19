import React from "react";
import { useQuery } from "react-query";
import "./Scroller.css";
import { getRandomImages } from "../../backend";
import ImageScroller from "../ImageScroller";

// const data = {
//   message: [
//     // "N0836779",
//     // "N0876216",
//     // "N0792748",
//     // "N0339456",
//     // "P06098",
//     // "P08722",
//     // "N0922021",
//     // "P05496",
//     "N0383334",
//     "P05988",
//   ],
// };

const Center = ({ children }) => (
  <div
    style={{
      position: "absolute",
      margin: "auto",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      width: "200px",
      height: "200px",
    }}
  >
    {children}
  </div>
);

function ScrollerPage() {
  // Using the hook
  const { data, error, isLoading } = useQuery(
    ["randomImages", 10],
    getRandomImages
  );
  // Error and Loading states
  if (error) return <Center>Request Failed</Center>;
  if (isLoading) return <Center>Loading...</Center>;
  return (
    <div className="App">
      <header className="App-header">
        {/* <Image id={"P08722"} /> */}
        <ImageScroller imageIds={data?.message} />
        {/* <Images /> */}
        {/* <p>Scanning...</p> */}
      </header>
    </div>
  );
}

export default ScrollerPage;
