"use client";

import NextImage from "next/image";
import {useEffect, useRef, useState} from "react";
import {WeatherStation} from "@/app/api/route";
import WindSpeedChart from './WindSpeedChart';
import TemperatureChart from './TemperatureChart';
import HumidityChart from './HumidityChart';
import InfraredChart from "./InfraredChart";
import UltravioletChart from "./UltravioletChart";
import SoilMoistureChart from "./SoilMoistureChart";
import CoordinateChart from "./CoordinateChart";
import AccelerationChart from "./AccelerationChart";
import VelocityChart from "./VelocityChart";

export default function Home() {

	const [selectedNode, setSelectedNode] = useState<WeatherStation | null>(null);
	const [data, setData] = useState<WeatherStation[]>([]);

	const fetchData = () => {
		fetch("/api").then((res) => res.json()).then(setData)
	}

	useEffect(() => {
		fetchData()
		setSelectedNode(data[0])
		setInterval(fetchData, 5000)
	}, []);

	const [navbarOpen, setNavbarOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<string>("station");

	/*const range = {
		minX: 0,
		minY: 0,
		maxX: 0.2,
		maxY: 0.2
	}*/

	const navRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = window.innerWidth - (navRef.current ? navRef.current.offsetWidth : 0);
		canvas.height = window.innerHeight;

		const img = new Image();
		img.src = "/telescope.svg";

		img.onload = () => {
			for (let station of data) {
				const x = station.weatherData[station.weatherData.length-1].latitude * 5 * canvas.width - 25
				const y = station.weatherData[station.weatherData.length-1].longitude * 5 * canvas.height - 25

				// Text box properties
				const text = station.name;
				ctx.font = "14px Arial";
				const paddingX = 10;
				const textWidth = ctx.measureText(text).width + 2 * paddingX;
				const textHeight = 20 + 2;
				const radius = 10;
				const xOffset = (ctx.measureText(text).width + 2 * paddingX) / 3

				// Draw rounded rectangle background
				ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
				ctx.beginPath();
				ctx.moveTo(x + xOffset - textWidth / 2 + radius, y - 30);
				ctx.lineTo(x + xOffset + textWidth / 2 - radius, y - 30);
				ctx.quadraticCurveTo(x + xOffset + textWidth / 2, y - 30, x + xOffset + textWidth / 2, y - 30 + radius);
				ctx.lineTo(x + xOffset + textWidth / 2, y - 30 + textHeight - radius);
				ctx.quadraticCurveTo(x + xOffset + textWidth / 2, y - 30 + textHeight, x + xOffset + textWidth / 2 - radius, y - 30 + textHeight);
				ctx.lineTo(x + xOffset - textWidth / 2 + radius, y - 30 + textHeight);
				ctx.quadraticCurveTo(x + xOffset - textWidth / 2, y - 30 + textHeight, x + xOffset - textWidth / 2, y - 30 + textHeight - radius);
				ctx.lineTo(x + xOffset - textWidth / 2, y - 30 + radius);
				ctx.quadraticCurveTo(x + xOffset - textWidth / 2, y - 30, x + xOffset - textWidth / 2 + radius, y - 30);
				ctx.closePath();
				ctx.fill();

				// Draw text
				ctx.fillStyle = "white";
				ctx.font = "14px Arial";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillText(text, x + xOffset, y - 20);

				ctx.drawImage(img, x, y, 50, 50);
			}
		};

		// Function to handle canvas clicks
		const handleClick = (event: MouseEvent) => {
			if (!canvas || !ctx) return;
			
			const rect = canvas.getBoundingClientRect();
			const clickX = event.clientX - rect.left;
			const clickY = event.clientY - rect.top;

			// Check if click is inside any image
			data.forEach((station) => {
				const x = station.weatherData[station.weatherData.length-1].latitude * 5 * canvas.width - 25
				const y = station.weatherData[station.weatherData.length-1].longitude * 5 * canvas.height - 25
				if (
					clickX >= x &&
					clickX <= x + 50 &&
					clickY >= y &&
					clickY <= y + 50
				) {
					setNavbarOpen(true)
					setSelectedNode(station);
				}
			});
		};

		canvas.addEventListener("click", handleClick);

		return () => {
			canvas.removeEventListener("click", handleClick);
		};
	}, [data]);

	return (
		<main className={"flex flex-row"}>
			<div className={"flex flex-row h-[100vh] items-start"}>
				{ /* Navbar Icons */ }
				<div className={"nav flex flex-col gap-y-4 p-2 h-[100vh] z-10"} ref={navRef}>
					<NavIcon id={"favicon.png"} callback={() => setNavbarOpen(!navbarOpen)} />
					<NavIcon id={"station.svg"} callback={() => {
						if(selectedItem == "station") setNavbarOpen(!navbarOpen)
						else {
							setNavbarOpen(true)
							setSelectedItem("station")
						}
					}} />
					<NavIcon id={"soil-moisture.svg"} callback={() => {
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
				
				
				

				{ /* Data area */ }
				{
					navbarOpen && (
						<div className={"nav z-10 h-full"}>
							<div className={"nav absolute flex flex-col gap-y-2 h-full top-0 p-2"}>
								<h1 className={`text-3xl font-bold text-center`}>Mars Weather Data</h1>
								<h1 className={"text-2xl font-semibold text-center"}>{selectedNode?.name} Station</h1>
								{ selectedItem == "station" && <StationInfoPanel latitudeData = {selectedNode?.weatherData.slice(-1).map(v => v.latitude) || []} longitudeData={selectedNode?.weatherData.slice(-1).map(v => v.longitude) || []} /> }
							  { selectedItem == "data" && <SoilMoisturePanel moistureData ={selectedNode?.weatherData.slice(-10).map(v => v.moisture) || []} singleMoistureData={selectedNode?.weatherData.slice(-1).map(v => parseFloat(v.latitude.toFixed(2)))|| []} />}
							  { selectedItem == "wind" && <AirPanel windData={selectedNode?.weatherData.slice(-10).map(v => v.wind) || []} temperatureData={selectedNode?.weatherData.slice(-10).map(v => v.temperature) || []} humidityData={selectedNode?.weatherData.slice(-10).map(v => v.humidity) || []} /> }
							  { selectedItem == "earthquake" && <EarthquakeInfoPanel accelxData={selectedNode?.weatherData.slice(-10).map(v => v.accelX) || []} accelyData={selectedNode?.weatherData.slice(-10).map(v => v.accelY) || []} accelzData={selectedNode?.weatherData.slice(-10).map(v => v.accelZ) || []} 
								angvxData={selectedNode?.weatherData.slice(-10).map(v => v.angVelX) || []} angvyData={selectedNode?.weatherData.slice(-10).map(v => v.angVelY) || []} angvzData={selectedNode?.weatherData.slice(-10).map(v => v.angVelZ) || []}/> }
							  { selectedItem == "light" && <LightPanel uvData={selectedNode?.weatherData.slice(-10).map(v => v.uv) || []} irData={selectedNode?.weatherData.slice(-10).map(v => v.ir) || []} /> }
							</div>
						</div>
					)
				}

				{ /* Map Selector */ }
				<div className={""}>
					<NextImage
						src={"/marsbackground.tif"}
						alt={"Mars"}
						className="resize w-[100vw] h-[100vh]"
						height={400}
						width={400} />
					<canvas ref={canvasRef} className="absolute top-0 right-0 overflow-hidden"></canvas>
				</div>
			</div>
		</main>
	);
}

function NavIcon({ id, callback }: { id: string, callback: () => void }) {

	const iconSize = 55

	return (
		<button onClick={callback}>
			<NextImage
				src={`/${id}`}
				alt={id.toUpperCase()}
				className={"hover:bg-[#474747] rounded-md p-1"}
				width={iconSize}
				height={iconSize}/>
		</button>
	)
}

function StationInfoPanel({ latitudeData, longitudeData }: { latitudeData: number[], longitudeData: number[] }) {
	return (
		<>
			<h1 className={"text-center text-2xl underline underline-offset-2 decoration-amber-500"}>Station Info</h1>
			<div className={"h-[0px] bg-white w-[85%] mx-auto"}></div>
			<h1 className={"text-center text-2xl font-mono fade-in"}>Latitude: {latitudeData}°</h1>
			<h1 className={"text-center text-2xl font-mono fade-in"}>Longitude: {longitudeData}°</h1>
			<CoordinateChart data={{ longitude: longitudeData, latitude: latitudeData }} />
		</>
	)
}

function SoilMoisturePanel({ moistureData, singleMoistureData}: { moistureData: number[], singleMoistureData: number[] }) {
	return (
		<>
			<h1 className={"text-center text-2xl underline underline-offset-2 decoration-amber-500"}>Soil Moisture</h1>
			<SoilMoistureChart data={moistureData} />
			<div className={"h-[1px] bg-white w-[85%] mx-auto"}></div>
			<h1 className={"text-center text-2xl font-mono fade-in"}>Current Moisture: {singleMoistureData}% </h1>
			
		</>
	)
}

function LightPanel({ irData, uvData }: { irData: number[], uvData: number[] }) {
	// Correlates with Ultraviolet measurements from UV sensor
	  return (
		<>
  		<div className={"h-full overflow-y-auto  p-4"}>
		<h1 className={"text-center text-2xl underline underline-offset-2 decoration-amber-500"}>Light Wavelength Data</h1>
		<InfraredChart data={irData} />
		<div className={"h-[1px] bg-white w-[85%] mx-auto"}></div>
		<div className={"mt-4"}></div>
		<div className={"text-left"}>
		</div>
		<UltravioletChart data={uvData} />
		<div className={"text-left"}>
		</div>
	  </div>
		</>
	  );
	}

function EarthquakeInfoPanel({accelxData, accelyData, accelzData, angvxData, angvyData, angvzData }: { accelxData: number[], accelyData: number[], accelzData: number[], angvxData: number[], angvyData: number[], angvzData: number[] }) {
  return (
    <>
      <h1 className={"text-center text-2xl underline underline-offset-2 decoration-amber-500"}>Earthquake Info</h1>
	  <h1 className={"text-center text-2xl"}>Earthquake State:</h1>
	  <AccelerationChart data={accelxData} />
	  <VelocityChart data={{x: accelxData, y: accelyData, z:accelzData }} />
	  
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
	  <div className={"h-full overflow-y-auto  p-4"}>
		<h1 className={"text-center text-2xl underline underline-offset-2 decoration-amber-500"}>Air Data</h1>
		<TemperatureChart data={temperatureData} />
		<div className={"h-[1px] bg-white w-[85%] mx-auto"}></div>
		<div className={"mt-4"}></div>
		<div className={"text-left"}>
		  <p className={"text-center text-2xl font-mono fade-in"}>Average Temperature: {avgTemperature} °C</p>
		  <p className={"text-center text-2xl font-mono fade-in"}>Max Temperature: {maxTemperature} °C</p>
		  <p className={"text-center text-2xl font-mono fade-in"}>Min Temperature: {minTemperature} °C</p>
		</div>
		<HumidityChart data={humidityData} />
		<div className={"h-[1px] bg-white w-[85%] mx-auto"}></div>
		<div className={"mt-4"}></div>
		<div className={"text-left"}>
		  <p className={"text-center text-2xl font-mono fade-in"}>Average Humidity: {avgHumidity} %</p>
		  <p className={"text-center text-2xl font-mono fade-in"}>Max Humidity: {maxHumidity} %</p>
		  <p className={"text-center text-2xl font-mono fade-in"}>Min Humidity: {minHumidity} %</p>
		</div>
		<WindSpeedChart data={windData} />
		<div className={"text-left"}>
		  <p className={"text-center text-2xl font-mono fade-in"}>Average Wind Speed: {avgWindSpeed} km/h</p>
		  <p className={"text-center text-2xl font-mono fade-in"}>Max Wind Speed: {maxWindSpeed} km/h</p>
		  <p className={"text-center text-2xl font-mono fade-in"}>Min Wind Speed: {minWindSpeed} km/h</p>
		</div>
	  </div>
	);
  }
