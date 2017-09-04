import React from "react";
import PropTypes from "prop-types";

import cls from "./App.css";

function ImageInput(props) {
  return (
    <div className={cls.input}>
      <input type="file" onChange={props.onChange} />
    </div>
  );
}

ImageInput.propTypes = {
  onChange: PropTypes.func,
};

ImageInput.defaultProps = {
  onChange: () => {},
};

export default ImageInput;
