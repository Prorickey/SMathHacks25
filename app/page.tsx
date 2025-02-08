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

	const [navbarOpen, setNavbarOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<string>("data");

	const iconSize = 55
	return (
		<main className={"flex flex-row"}>
			<div id={"nav"} className={"flex flex-row gap-x-2 h-[100vh] p-2 items-start"}>
				<div className={"flex flex-col gap-y-4"}>
					<button onClick={() => setNavbarOpen(!navbarOpen)}>
						<Image
							src={"/favicon.png"}
							alt={"Mars"}
							className={"hover:bg-[#474747] rounded-md p-1"}
							width={iconSize}
							height={iconSize}/>
					</button>
					<NavIcon id={"reagent-bottle"} />
					<NavIcon id={"wind"} />
					<NavIcon id={"earthquake"} />
				</div>
				{
					navbarOpen && (
						<div className={"flex flex-col gap-y-2"}>
							<h1 className={`text-3xl font-bold`}>MarsWeather</h1>
							<p>test</p>
						</div>
					)
				}
			</div>
		</main>
	);
}

function NavIcon({ id, callback }: { id: string, callback: () => Promise<void> | undefined }) {

	const iconSize = 55

	return (
		<Image
			src={`/${id}.svg`}
			alt={id.toUpperCase()}
			className={"hover:bg-[#474747] rounded-md p-1"}
			width={iconSize}
			height={iconSize} />
	)
}

function WindInfoPanel() {
	return (
		<>

		</>
	)
}