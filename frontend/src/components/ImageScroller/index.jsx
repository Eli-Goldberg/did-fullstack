import React from "react";
import PropTypes from "prop-types";
import "./ImageScroller.css";
import { buildImgUrl } from "../../config";

export function Image({ id, isDangerous }) {
  return (
    <img
      key={id}
      src={buildImgUrl(id)}
      alt=""
      className={`scroll-image ${isDangerous ? "active" : ""}`}
    />
  );
}

Image.defaultProps = {
  isDangerous: true,
};

Image.propTypes = {
  id: PropTypes.string.isRequired,
  isDangerous: PropTypes.bool,
};

function ImageScroller({ ids }) {
  return (
    <div className="scroller">
      <div className="inner">
        {ids.concat(ids).map((id) => (
          <Image id={id} />
        ))}
      </div>
    </div>
  );
}

export default ImageScroller;

ImageScroller.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
};
