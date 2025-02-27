import { useEffect, useState } from "react";
import "./ProgressBar.css";

const ANIMATION_DURATION = 200;

const ProgressBar = ({ progressValue, showProgressPercentage = true }) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    let currentProgressValue = 0;
    const stepUpTime = ANIMATION_DURATION / 100;
    const stepUpAmount = progressValue / 100;

    const stepUpInterval = setInterval(() => {
      currentProgressValue += stepUpAmount;
      if (currentProgressValue >= progressValue) {
        currentProgressValue = progressValue;
      }
      setDisplayPercentage(currentProgressValue);
      if (currentProgressValue >= progressValue) {
        clearInterval(stepUpInterval);
      }
    }, stepUpTime);

    return () => {
      clearInterval(stepUpInterval);
    };
  }, [progressValue]);

  return (
    <div className="outer">
      <div
        className="inner"
        style={{
          width: `${displayPercentage}%`,
          color: displayPercentage < 5 ? "black" : "white",
        }}
      >
        {showProgressPercentage ? `${Math.round(displayPercentage)}%` : null}
      </div>
    </div>
  );
};

export default ProgressBar;
