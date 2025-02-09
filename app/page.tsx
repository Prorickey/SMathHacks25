"use client";

import NextImage from "next/image";
import {useEffect, useRef, useState} from "react";
import {WeatherStation} from "@/app/api/route";

export default function Home() {

	const [selectedNode, setSelectedNode] = useState<WeatherStation | null>(null);
	const [data, setData] = useState<WeatherStation[]>([]);

	useEffect(() => {
		setTimeout(() => {
			fetch("/api").then((res) => res.json()).then((data: WeatherStation[]) => {
				setData(data);
				setSelectedNode(data[0])
			})
		}, 5000)
	}, []);

	const [navbarOpen, setNavbarOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<string>("station");

	const range = {
		minX: 0,
		minY: 0,
		maxX: 0.2,
		maxY: 0.2
	}

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
		img.src = "/telescope.svg"; // Use the correct path (place SVG in `/public`)

		img.onload = () => {
			data.forEach((station) => {
				const x = station.weatherData[station.weatherData.length-1].latitude * 5 * canvas.width - 25
				const y = station.weatherData[station.weatherData.length-1].longitude * 5 * canvas.height - 25
				ctx.drawImage(img, x, y, 50, 50);
			})
		};

		// Function to handle canvas clicks
		const handleClick = (event: MouseEvent) => {
			if (!canvas || !ctx) return;

			const rect = canvas.getBoundingClientRect(); // Get canvas position
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
					<NavIcon id={"reagent-bottle.svg"} callback={() => {
						if(selectedItem == "data") setNavbarOpen(!navbarOpen)
						else {
							setNavbarOpen(true)
							setSelectedItem("data")
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
						<div className={"nav"}>
							<div className={"nav absolute flex flex-col gap-y-2 h-full top-0 p-2"}>
								<h1 className={`text-3xl font-bold text-center`}>Mars Weather: {selectedNode?.name}</h1>
								{selectedItem == "station" && <StationInfoPanel/>}
								{selectedItem == "data" && <DataInfoPanel/>}
								{selectedItem == "wind" && <WindInfoPanel/>}
								{selectedItem == "earthquake" && <EarthquakeInfoPanel/>}
							</div>
						</div>
					)
				}

				{ /* Map Selector */ }
				<div className={"w-[100vw] h-[100vh]"}>
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

function NavIcon({id, callback}: { id: string, callback: () => void }) {

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

function WindInfoPanel() {
	return (
		<>
			<h1 className={"text-center text-2xl underline underline-offset-2 decoration-amber-500"}>Wind Info</h1>
		</>
	)
}

function EarthquakeInfoPanel() {
	return (
		<>
			<h1 className={"text-center text-2xl underline underline-offset-2 decoration-amber-500"}>Earthquake Info</h1>
		</>
	)
}