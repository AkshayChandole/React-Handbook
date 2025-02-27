import ProgressBar from "../components/ProgressBar/ProgressBar";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Progress Bar</h1>

      <h4>Progress Bar with percentage</h4>
      <ProgressBar progressValue={50} />
      <h4>Progress Bar without percentage</h4>
      <ProgressBar progressValue={80} showProgressPercentage={false} />
    </div>
  );
}
