import React from "react";
import { useParams } from "react-router-dom";
import { buildImgUrl } from "../config";
import "./ViewImage.css";

const ViewImage = () => {
  const { imageId } = useParams();
  return (
    <div className="img-wrapper">
      <img src={buildImgUrl(imageId)} alt="" />
      Hello
    </div>
  );
};

export default ViewImage;
