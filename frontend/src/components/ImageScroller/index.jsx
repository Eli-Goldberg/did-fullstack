/* eslint-disable react/no-array-index-key */
import React from "react";
import "./ImageScroller.css";
import { buildImgUrl } from "../../config";
import Icon from "../Icon";

// const checkedImageIds = new Set();

const ImageScroller = ({ imageIds }) => {
  const newImageIds = imageIds.concat(imageIds);
  const isActive = true;
  const isScanning = true;

  return (
    <div id="scroller" className="scroller">
      <div className="inner">
        {newImageIds.map((imageId, index) => (
          <div
            key={`${imageId}-${index}`}
            className={`image-container ${isActive ? "active" : ""}`}
          >
            <img src={buildImgUrl(imageId)} alt="" className="scroll-image" />
            {isScanning && <div className="spinner" />}
            {isActive && (
              <div className="icons-container">
                <Icon type="gun" className="icon" />
                <Icon type="wrench" className="icon" />
                <Icon type="pliers" className="icon" />
                <Icon type="scissors" className="icon" />
                <Icon type="knife" className="icon" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageScroller;
