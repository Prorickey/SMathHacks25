"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
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
							{ selectedItem == "wind" && <WindInfoPanel /> }
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