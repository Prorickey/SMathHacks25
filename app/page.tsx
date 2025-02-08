"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import {WeatherStation} from "@/app/api/route";

export default function Home() {

	const [data, setData] = useState<WeatherStation[]>([]);

	useEffect(() => {
		setTimeout(() => {
			fetch("/api").then((res) => res.json()).then((data) => {
				setData(data);
			})
		}, 5000)
	}, []);

	return (
		<main>
			<div className={"p-2 flex flex-row items-center gap-x-4"}>
				<Image
					src={"/favicon.png"}
					alt={"Mars"}
					width={50}
					height={50} />
				<h1 className={`text-4xl font-bold`}>Mars Weather Dashboard</h1>
			</div>
		</main>
	);
}
