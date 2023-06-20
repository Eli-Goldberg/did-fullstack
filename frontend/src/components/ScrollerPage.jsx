import React from "react";
import { useQuery } from "react-query";
import "./ScrollerPage.css";
import { getRandomImages } from "../backend";
import ImageScroller from "./Scroller";
import Center from "./Center";

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
        <ImageScroller imageIds={data?.imageIds} />
        {/* <Images /> */}
        {/* <p>Scanning...</p> */}
      </header>
    </div>
  );
}

export default ScrollerPage;
