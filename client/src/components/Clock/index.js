import React from "react";
import { ReactComponent as CenterDot } from "../../icons/clock-assets/CenterDot.svg";
import { ReactComponent as ClockFrame } from "../../icons/clock-assets/ClockFrame.svg";
import { ReactComponent as ClockHand } from "../../icons/clock-assets/ClockHand.svg";
import "./styles.css";

const Clock = ({ isLoading }) => {
  return (
    <div className="clock-holder">
      <div className="clock-frame">
        <ClockFrame />
      </div>
      <div className="clock-hand-holder">
        <div
          style={{
            animationDirection: `${isLoading ? "reverse" : "normal"}`,
            animationTimingFunction: `${isLoading ? "linear" : ""}`,
          }}
          className="clock-hand"
        >
          <ClockHand width="40px" />
        </div>
      </div>
      <div className="clock-hand-holder">
        <div
          style={{
            animationDirection: `${isLoading ? "reverse" : "normal"}`,
          }}
          className="clock-hand-2"
        >
          <ClockHand width="40px" />
        </div>
      </div>
      <div className="center-dot">
        <CenterDot width="12px" />
      </div>
    </div>
  );
};

export default Clock;
