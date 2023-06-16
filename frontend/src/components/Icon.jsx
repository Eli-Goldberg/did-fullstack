import React from "react";
import { GiPistolGun, GiPincers } from "react-icons/gi";
import { ImWrench } from "react-icons/im";
import { RiKnifeFill } from "react-icons/ri";
import { RxScissors } from "react-icons/rx";

const Icon = ({ type }) => {
  const style = { color: "red" };

  switch (type) {
    case "gun":
      return <GiPistolGun style={style} />;
    case "wrench":
      return <ImWrench style={style} />;
    case "knife":
      return <RiKnifeFill style={style} />;
    case "scissors":
      return <RxScissors style={style} />;
    case "pliers":
      return <GiPincers style={style} />;
    default:
      
      return null;
  }
};

export default Icon;
