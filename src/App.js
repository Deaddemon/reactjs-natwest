
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import StateTreemap from "./stateWiseSummary/StateTreemap";
import "./styles.css";
import WeatherApp from "./weatherApp/weatherApp";
import CityChart from "./stateWiseSummary/CityChart";

export default function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<WeatherApp />} />
        <Route exact path="/state" element={<StateTreemap />} />
        <Route path="/city-chart/:state" element={<CityChart/>} />
        {/* <Route path="/city-chart/:state" render={(props) => <CityChart {...props} />} /> */}
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   {/* <WeatherApp /> */}
    //   <StateTreemap/>
    // </div>
  );
}
