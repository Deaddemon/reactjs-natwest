import React, { useState } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { data } from './StateData';
import CityChart from './CityChart';
import { useNavigate, Navigate } from 'react-router-dom';
import NavBar from '../common/Navbar.js';

const StateTreemap = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);

  const navigate = useNavigate();

  const handleClick = (state) => {
    setSelectedState(state);
    console.log("test-StateTreemap", state);
    navigate(`/city-chart/${state.state}`, { state });
  };

  const colorScale = scaleLinear()
    .domain([0, max(data, (d) => d.temp)])
    .range(['blue', 'red']);

  return (

    <div>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "800px",
          // margin: "10px",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "5%",
        }}
      >
        {data.map((d, i) => (
          <div
            key={i}
            className="treenode"
            onMouseEnter={() => setHoveredState(d)}
            onMouseLeave={() => setHoveredState(null)}

          >
            <svg width="100%" height="100%">
              <g>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill={colorScale(d.temp)}
                  onClick={() => handleClick(d)}
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="black"
                  fontSize="14"
                >
                  {d.state}
                </text>
              </g>
            </svg>
            {hoveredState === d && (
              <div
                style={{
                  position: "absolute",
                  backgroundColor: "white",
                  border: "1px solid black",
                  padding: "5px",
                  zIndex: 1
                }}
              >
                <span>{d.state}</span>
                <hr></hr>
                <span>Temperature: {d.temp}</span>
                <br></br>
                <span>Population:  {
                  d.cities.reduce((totalPopulation, city) => totalPopulation + city.population, 0)
                }</span>



              </div>
            )}

          </div>
        ))}

      </div>

    </div>


  );
};


export default StateTreemap;