import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

// JSON Data Structure
export interface WeatherPayload {
	stations: WeatherStationPayload[]
}

export interface WeatherStationPayload {
	id: string // I will supply this id

	// position data
	latitude: number
	longitude: number

	// data
	pressure: number
	temperature: number
	humidity: number
	uv: number
	ir: number
	moisture: number

	accel: {
		x: number
		y: number
		z: number
	}
	angVelocity: {
		x: number
		y: number
		z: number
	}
}

export interface WeatherStation {
	id: string
	name: string
	weatherData: WeatherData[]
}
 
export interface WeatherData {
	latitude: number
	longitude: number
	pressure: number
	temperature: number
	humidity: number
	co2: number
	dust: number
	wind: number
	uv: number
	ir: number
	moisture: number
	accelX: number
	accelY: number
	accelZ: number
	angVelX: number
	angVelY: number
	angVelZ: number
	timeTaken: Date
}

export async function GET() {
	const prisma = new PrismaClient();

	const data = await prisma.station.findMany({
		include: {
			weatherData: {
				orderBy: {
					timeTaken: "desc"
				},
				where: {
					timeTaken: {
						gte: new Date(new Date().getMilliseconds() - 1000 * 60 * 60 * 24 * 3) // Last 3 days
					}
				}
			}
		}
	})

	const aggregatedStations: WeatherStation[] = [];

	// Aggregate
	for(const station of data) {
		const aggregatedData: WeatherData[] = [];
		const groupedData: { [key: string]: WeatherData[] } = {};

		// Group data by 30-minute intervals
		for (const entry of station.weatherData) {
			const date = new Date(entry.timeTaken);
			const minutes = date.getMinutes() < 30 ? "00" : "30"; // Round to nearest 30-minute mark
			const timeKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(date.getHours()).padStart(2, "0")}:${minutes}`;

			if (!groupedData[timeKey]) {
				groupedData[timeKey] = [];
			}
			groupedData[timeKey].push(entry);
		}

		// Compute averages for each minute
		for (const [minute, entries] of Object.entries(groupedData)) {
			const avgEntry = entries.reduce(
				(acc, curr) => {
					acc.latitude += curr.latitude;
					acc.longitude += curr.longitude;
					acc.pressure += curr.pressure;
					acc.temperature += curr.temperature;
					acc.humidity += curr.humidity;
					acc.co2 += curr.co2;
					acc.dust += curr.dust;
					acc.wind += curr.wind;
					acc.uv += curr.uv;
					acc.ir += curr.ir;
					acc.moisture += curr.moisture;
					acc.accelX += curr.accelX;
					acc.accelY += curr.accelY;
					acc.accelZ += curr.accelZ;
					acc.angVelX += curr.angVelX;
					acc.angVelY += curr.angVelY;
					acc.angVelZ += curr.angVelZ;
					return acc;
				},
				{
					latitude: 0,
					longitude: 0,
					pressure: 0,
					temperature: 0,
					humidity: 0,
					co2: 0,
					dust: 0,
					wind: 0,
					uv: 0,
					ir: 0,
					moisture: 0,
					accelX: 0,
					accelY: 0,
					accelZ: 0,
					angVelX: 0,
					angVelY: 0,
					angVelZ: 0,
					timeTaken: new Date(minute + ":00"), // Set to the start of the minute
				}
			);

			const count: number = entries.length;

			(Object.keys(avgEntry) as Array<keyof WeatherData>).forEach((key) => {
				if (key !== "timeTaken" && typeof avgEntry[key] === "number")
					avgEntry[key] /= count; // Compute averages
			});

			aggregatedData.push(avgEntry);
		}

		aggregatedStations.push({
			id: station.id,
			name: station.name,
			weatherData: aggregatedData
		});

		console.log(aggregatedData.length)
	}

	return new NextResponse(JSON.stringify(data), { status: 200 })
}

export async function POST(req: Request) {
	const key = req.headers.get("Authorization")
	if (key !== "Bearer " + process.env.KEY)
		return new NextResponse("Unauthorized", { status: 401 })

	const data: WeatherPayload = await req.json()
	const prisma = new PrismaClient();

	for (const station of data.stations) {
		console.log(station)
		await prisma.weatherData.create({
			data: {
				latitude: station.latitude,
				longitude: station.longitude,
				stationId: station.id,
				pressure: Math.random() * (900 - 600) + 600, // 600-900 Pa (very low compared to Earth)
				temperature: station.temperature,
				humidity: station.humidity,
				co2: Math.random() * (960000 - 950000) + 950000, // 95-96% CO2 (in ppm)
				dust: Math.random() * (1.5 - 0.1) + 0.1, // Arbitrary dust levels (scaled 0.1-1.5 for variability)
				light: Math.random() * (600 - 200) + 200, // Solar radiation in W/m² (Mars gets ~200-600 W/m²)
				wind: Math.random() * 50, // Mars wind speeds range from 2-50 m/s
				uv: station.uv,
				ir: station.ir,
				moisture: station.moisture,
				accelX: station.accel.x,
				accelY: station.accel.y,
				accelZ: station.accel.z,
				angVelX: station.angVelocity.x,
				angVelY: station.angVelocity.y,
				angVelZ: station.angVelocity.z,
				timeTaken: new Date(),
			}
		}).then(() => {
			console.log("Data saved for station " + station.id)
		}).catch((error) => {
			console.error(error.stack)
		})
	}

	return new NextResponse("Data saved", { status: 200 })
}