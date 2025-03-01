import { useEffect, useState } from "react";
import "./TrafficLight.css";

const LIGHT_DURATIONS = {
  red: { duration: 5, statusText: "Stop 🛑" },
  green: { duration: 4, statusText: "Go 🟢" },
  yellow: { duration: 2, statusText: "Ready ⚠️" },
};

const lightSequence = ["red", "green", "yellow"]; // Define order of lights

const TrafficLight = () => {
  const [activeLight, setActiveLight] = useState(lightSequence[0]);
  const [timeLeft, setTimeLeft] = useState(LIGHT_DURATIONS[lightSequence[0]].duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 1) return prevTime - 1;

        // Get next light in sequence
        const nextLight =
          lightSequence[(lightSequence.indexOf(activeLight) + 1) % lightSequence.length];

        setActiveLight(nextLight);
        return LIGHT_DURATIONS[nextLight].duration;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval
  }, [activeLight]);

  return (
    <div className="traffic-light-container">
      <div className="traffic-light-board">
        <div className={`light ${activeLight === "red" ? "red" : ""}`} />
        <div className={`light ${activeLight === "yellow" ? "yellow" : ""}`} />
        <div className={`light ${activeLight === "green" ? "green" : ""}`} />
        <div className={`timer-box ${activeLight}-timer`}>
          {timeLeft.toString().padStart(2, "0")}
        </div>
      </div>
      <div className="traffic-light-status-text">
        {LIGHT_DURATIONS[activeLight].statusText}
      </div>
    </div>
  );
};

export default TrafficLight;
