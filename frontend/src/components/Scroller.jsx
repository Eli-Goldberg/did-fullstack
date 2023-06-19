import React from "react";
import "./Scroller.css";
import ScrolledImage from "./ScrolledImage";

const ImageScroller = ({ imageIds }) => {
  const newImageIds = imageIds.concat(imageIds);

  return (
    <div id="scroller" className="scroller">
      <div className="inner">
        {newImageIds.map((imageId, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ScrolledImage key={`${imageId}-${index}`} imageId={imageId} />
        ))}
      </div>
    </div>
  );
};

export default ImageScroller;
