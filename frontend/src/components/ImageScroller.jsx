import React from "react";
import "./ImageScroller.css";
import Image from "./Image";

const ImageScroller = ({ imageIds }) => {
  const newImageIds = imageIds.concat(imageIds);

  return (
    <div id="scroller" className="scroller">
      <div className="inner">
        {newImageIds.map((imageId, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Image key={`${imageId}-${index}`} imageId={imageId} />
        ))}
      </div>
    </div>
  );
};

export default ImageScroller;
