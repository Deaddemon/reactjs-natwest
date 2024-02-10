
import React from 'react';
import { useLocation } from 'react-router-dom';
import { PieChart, Pie, Cell } from 'recharts';
import Table from 'react-bootstrap/Table';
import NavBar from '../common/Navbar.js';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4560'];

const CityChart = () => {
    const location = useLocation();
    const state = location.state;


    if (!state || !state.cities || state.cities.length === 0) {
        return <div>No city data available</div>;
    }


    const totalPopulation = state.cities.reduce((total, city) => total + city.population, 0);
    const cityPopulationPercentage = state.cities.map((city) => ({
        name: city.name,
        population: city.population,
        percentage: (((city.population / totalPopulation).toFixed(2)) * 100),
    }));





    return (

        <>
            <NavBar />
            <div style={{ margin: "10px" }}>
                <div className="cityCharts">

                    <div className='flex-item-left'>
                        <h1>{state.state}</h1>
                    </div>
                     <div className='flex-item-right' style={{ width: '100%', maxWidth: '600px', overflow: 'hidden' }}> {/* Adjust max-width as needed */}
                         <span> Population Distribution</span>
<div style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <PieChart width={500} height={500} style={{ maxWidth: '100%' }}> {/* Set initial width and height */}
                                <Pie
                                    data={cityPopulationPercentage}
                                    dataKey="percentage"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                >
                                    {cityPopulationPercentage.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>

                                      {cityPopulationPercentage.map((entry, index) => (
                                <span>
                                    <span style={{ color: COLORS[index % COLORS.length] }}>&#9632;</span>
                                     <span style={{ marginRight: '10px' }}>{entry.name}: {entry.percentage.toFixed(2)}%</span>
                                </span>
                                
                            ))}
                        </div>
                    </div>
                </div>


                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th> Name</th>
                            <th>Change</th>
                            <th>% Change</th>
                            <th>MarketCap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.symbols.map((symbol, i) => (
                            <tr key={i}>
                                <td>{symbol.Symbol}</td>
                                <td>{symbol.Name}</td>
                                <td className={symbol.Change < 0 ? 'negative' : ''}>{symbol.Change}</td>
                                <td className={symbol.ChangePercent < 0 ? 'negative' : ''}>{symbol.ChangePercent}</td>
                                <td>{symbol.MarketCap}</td>
                            </tr>
                        ))}
                    </tbody>

                </Table>


            </div>
        </>
    );
};

export default CityChart;
