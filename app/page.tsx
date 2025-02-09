"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import {WeatherStation} from "@/app/api/route";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import WindSpeedChart from './WindSpeedChart';
import TemperatureChart from './TemperatureChart';
import HumidityChart from './HumidityChart';

export default function Home() {

	const [selectedNode, setSelectedNode] = useState<WeatherStation | null>(null);
	const [data, setData] = useState<WeatherStation[]>([]);

	useEffect(() => {
		setTimeout(() => {
			fetch("/api").then((res) => res.json()).then((data: WeatherStation[]) => {
				setData(data);
				console.log(data[0])
				setSelectedNode(data[0])
			})
		}, 5000)
	}, []);

	const [navbarOpen, setNavbarOpen] = useState(true); // TODO: Default false
	const [selectedItem, setSelectedItem] = useState<string>("station");

	return (
		<main className={"flex flex-row"}>
			<div id={"nav"} className={"flex flex-row gap-x-2 h-[100vh] p-2 items-start"}>
				<div className={"flex flex-col gap-y-4"}>
					<NavIcon id={"favicon.png"} callback={() => setNavbarOpen(!navbarOpen)} />
					<NavIcon id={"station.svg"} callback={() => {
						if(selectedItem == "station") setNavbarOpen(!navbarOpen)
						else {
							setNavbarOpen(true)
							setSelectedItem("station")
						}
					}} />
					<NavIcon id={"reagent-bottle.svg"} callback={() => {
						if(selectedItem == "data") setNavbarOpen(!navbarOpen)
						else {
							setNavbarOpen(true)
							setSelectedItem("data")
						}
					}} />
					<NavIcon id={"sunlight.svg"} callback={() => {
						if(selectedItem == "light") setNavbarOpen(!navbarOpen)
						else {
							setNavbarOpen(true)
							setSelectedItem("light")
						}
					}} />
					<NavIcon id={"wind.svg"} callback={() => {
						if(selectedItem == "wind") setNavbarOpen(!navbarOpen)
						else {
							setNavbarOpen(true)
							setSelectedItem("wind")
						}
					}} />
					<NavIcon id={"earthquake.svg"} callback={() => {
						if(selectedItem == "earthquake") setNavbarOpen(!navbarOpen)
						else {
							setNavbarOpen(true)
							setSelectedItem("earthquake")
						}
					}} />
				</div>
				{
					navbarOpen && (
						<div className={"flex flex-col gap-y-2"}>
							<h1 className={`text-3xl font-bold text-center`}>Mars Weather</h1>
							{ selectedItem == "station" && <StationInfoPanel /> }
							{ selectedItem == "data" && <DataInfoPanel /> }
							{ selectedItem == "wind" && <AirPanel windData={selectedNode?.weatherData.slice(-10).map(v => v.wind) || []} temperatureData={selectedNode?.weatherData.slice(-10).map(v => v.temperature) || []} humidityData={selectedNode?.weatherData.slice(-10).map(v => v.humidity) || []} /> }
							{ selectedItem == "earthquake" && <EarthquakeInfoPanel /> }
						</div>
					)
				}
			</div>
		</main>
	);
}



function NavIcon({ id, callback }: { id: string, callback: () => void }) {

	const iconSize = 55

	return (
		<button onClick={callback}>
			<Image
				src={`/${id}`}
				alt={id.toUpperCase()}
				className={"hover:bg-[#474747] rounded-md p-1"}
				width={iconSize}
				height={iconSize} />
		</button>
	)
}

function StationInfoPanel() {
	return (
		<>
			<h1 className={"text-center text-2xl underline underline-offset-2 decoration-amber-500"}>Station Info</h1>
		</>
	)
}

function DataInfoPanel() {
	return (
		<>
			<h1 className={"text-center text-2xl underline underline-offset-2 decoration-amber-500"}>General Info</h1>
		</>
	)
}

function LightPanel() {
	// Correlates with Acceleromter and Velocity measurements from gyroscope and accelerometer
	
	  return (
		<>
		  <h1 className={"text-center text-2xl underline underline-offset-2 decoration-amber-500"}>Light Wavelength Info</h1>
		</>
	  );
	}

function EarthquakeInfoPanel() {
// Correlates with Acceleromter and Velocity measurements from gyroscope and accelerometer

  return (
    <>
      <h1 className={"text-center text-2xl underline underline-offset-2 decoration-amber-500"}>Earthquake Info</h1>
    </>
  );
}


function AirPanel({ windData, temperatureData, humidityData }: { windData: number[], temperatureData: number[], humidityData: number[] }) {
	const maxWindSpeed = Math.max(...windData).toFixed(2);
	const minWindSpeed = Math.min(...windData).toFixed(2);
	const avgWindSpeed = (windData.reduce((a, b) => a + b, 0) / windData.length).toFixed(2);
	const maxTemperature = Math.max(...temperatureData).toFixed(2);
	const minTemperature = Math.min(...temperatureData).toFixed(2);
	const avgTemperature = (temperatureData.reduce((a, b) => a + b, 0) / temperatureData.length).toFixed(2);
	const maxHumidity = Math.max(...humidityData).toFixed(2);
	const minHumidity = Math.min(...humidityData).toFixed(2);
	const avgHumidity = (humidityData.reduce((a, b) => a + b, 0) / humidityData.length).toFixed(2);
  
	return (
	  <div className={"h-[90vh] overflow-y-auto  p-4"}> {/* Adjust the height and background color as needed */}
		<h1 className={"text-center text-2xl underline underline-offset-2 decoration-amber-500"}>Air Data</h1>
		<TemperatureChart data={temperatureData} />
		<div className={"h-[1px] bg-white w-[85%] mx-auto"}></div>
		<div className={"mt-4"}></div>
		<div className={"text-left"}>
		  <p className={"text-center text-lg"}>Average Temperature: {avgTemperature} °C</p>
		  <p className={"text-center text-lg"}>Max Temperature: {maxTemperature} °C</p>
		  <p className={"text-center text-lg"}>Min Temperature: {minTemperature} °C</p>
		</div>
		<HumidityChart data={humidityData} />
		<div className={"h-[1px] bg-white w-[85%] mx-auto"}></div>
		<div className={"mt-4"}></div>
		<div className={"text-left"}>
		  <p className={"text-center text-lg"}>Average Humidity: {avgHumidity} %</p>
		  <p className={"text-center text-lg"}>Max Humidity: {maxHumidity} %</p>
		  <p className={"text-center text-lg"}>Min Humidity: {minHumidity} %</p>
		</div>
		<WindSpeedChart data={windData} />
		<div className={"text-left"}>
		  <p className={"text-center text-lg"}>Average Wind Speed: {avgWindSpeed} km/h</p>
		  <p className={"text-center text-lg"}>Max Wind Speed: {maxWindSpeed} km/h</p>
		  <p className={"text-center text-lg"}>Min Wind Speed: {minWindSpeed} km/h</p>
		</div>
	  </div>
	);
  }
