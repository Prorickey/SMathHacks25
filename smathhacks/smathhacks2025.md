# SMathHacks2025

This page includes documentation for ARES-M: Atmospheric Remote Environmental System for Mars, submitted for the Hardware track at the  SMathHacks 2025 hackathon. Our team members include [**Richard Shan**](mailto:richardmshan@gmail.com), [**Aaditya Sah**](mailto:sah26a@ncssm.edu), [**Trevor Bedson**](mailto:bedson26t@ncssm.edu), and [**Josh Chilukuri**](mailto:chilukuri26j@ncssm.edu). ARES is a remote autonomous sensor suite for Mars, monitoring temperature, humidity, seismic activity, UV/IR, and soil moisture in real time to advance planetary science and environmental research. [**SMathHacks 2025**](https://smathhacks-2025.devpost.com/) was hosted 2/8/2025 to 2/9/2025.

<center>
<img src="../../pics/smathhacks.png" alt="SMathHacks Logo" width="350"/>
</center>

ARES is an integrated hardware-software solution featuring a remote sensor suite to detect temperature, humidity, seismic activity, and soil moisture monitoring on Mars. The nature of ARES' scalable mesh network deployment enables real-time environmental data acquisition across a distributed sensor array on multiple varied geographic locations simultaneously. A geospatially interactive interface allows users to access and analyze live telemetry along with a visualization of recently recorded data.

## Inspiration

The idea for ARES emerged from the need for a more efficient and scalable approach to environmental monitoring on Mars. Existing planetary weather stations such as NASA’s InSight lander and Curiosity’s REMS provide valuable atmospheric and seismic data but are limited in coverage and flexibility. InSight, for example, offers stationary readings from a single location, while Curiosity’s sensors can only gather data wherever the rover happens to be. These limitations pose challenges for understanding global weather patterns, seismic activity, and potential water presence on Mars. Given the planet’s extreme conditions—dust storms, drastic temperature shifts, and geological activity—there is a critical need for a distributed, autonomous sensor system capable of continuous real-time data collection across multiple locations.

<center>
<img src="../../smathhacks/pics/insightLander.jpg" alt="Insight Lander" width="550"/>
</center>

ARES was designed to address these challenges through a scalable mesh network of remote sensor pods that can be deployed across varied Martian terrain. These pods continuously monitor temperature, humidity, seismic activity, and soil moisture, providing high-resolution environmental data to researchers. AI integration allows for real-time processing, adaptive calibration, and anomaly detection, enhancing data accuracy and reliability in Mars’ harsh conditions. The system is paired with a geospatial visualization platform, enabling users to interact with a live map of Mars, click on sensor locations, and access real-time environmental data streams. Inspired by terrestrial meteorological and seismic networks, ARES brings a planetary-scale sensing solution to Mars, laying the groundwork for future habitat planning, climate research, and exploration missions.

## Ideation

Our initial vision for ARES was centered on creating a comprehensive atmospheric and environmental monitoring system, with a strong focus on air quality analysis. Originally, we planned to incorporate sensors for volatile organic compounds (VOC), carbon dioxide (CO₂), and particulate matter (PM2.5/PM10) to better understand Mars’ atmospheric composition and potential hazards. These sensors would have allowed us to analyze dust composition, detect trace gases, and assess air quality, providing insights into both habitability and long-term climate trends on the planet. However, we faced a lot of logistical challenges considering our timeframe was only 2 days long. Our ordered sensors did not arrive in time, and forced us to adapt our approach while maintaining the core functionality of the system.

To ensure that ARES remained a robust and scientifically valuable solution, we pivoted to include sunlight sensors (UV/IR) and seismic monitoring instead. This adjustment allowed us to capture even more important environmental data despite our sensors not being shipped properly. Specifically, ultraviolet and infrared radiation monitoring is particularly relevant for Martian exploration since it helps assess surface conditions, radiation exposure risks for future missions, and potential atmospheric dust interactions. The shift also streamlined our hardware integration as it allowed us to develop and assemble the entire device without having any uncertainty about parts. While our final implementation has slightly different measurements than my original plan, our central idea remains the same and our changes have only reinforced the robustness of ARES.

## CAD

Since we developed the entire device in only two days, we created a simple yet highly effective and theme-matching CAD model. We created a hexagonal case for our electronics, with spots on the top for the sunlight and temperature/humidity sensor, as those needed access to light or the air respectively. We created an opening on the bottom of the hexagonal case for the soil moisture sensor to be deployed from. Spikes were added on the bottom as a way for the device to mount into extraterrestrial soil when dropped from a decent height, and serves to secure the device in place. We notate the ARES name and Pod number on the top of each individual pod.

<center>
<img src="../pics/aresHomeView.jpg" alt="Ares Home View" width="450"/>
</center>

Internally, we designed mounts for the temperature/humidity sensor, sunlight sensor, and the MPU6050. The temperature/humidity sensor mount is shown on the left side of this image, and has a mesh on top of it so that the sensor is not completely exposed to the elements whilst also being able to access air for measuring humidity and temperature. The sunlight sensor mount is on the right side of this internal image, and faces directly upward into the sky to access the light. In production, we put a section of clear tape over the hole so that the sensor is protected while also being able to access its necessary measurements. The accelerometer and gyroscope sensor is mounted to the print directly, and is aided in contact area by the mount located in the upper right extrusion in this image. The servo is mounted in production directly to the print.

<center>
<img src="../pics/aresInternal.jpg" alt="Ares Internal View" width="450"/>
</center>

The locations for the temperature/humidity sensor and sunlight sensor are clearly visible in the top view of the design. The mesh underneath the Pod 1 label houses the temperature/humidity sensor. The small cutout above the ARES insignia is where the sunlight sensor is mounted, and protected by a tape-over.

<center>
<img src="../pics/aresTopView.jpg" alt="Ares Top View" width="450"/>
</center>

Finally, we added spikes on the bottom to act as stakes to secure the ARES Pod to the ground, and protect it in dangerous Martian conditions such as storms and earthquakes. It is important  that ARES is able to survive these events and continue transmitting data, as gathering data about these abnormalities is a key application of ARES.

<center>
<img src="../pics/aresBottomView.jpg" alt="Ares Bottom View" width="450"/>
</center>

## Electrical Engineering

Before beginning any electrical engineering, we first researched the pinouts of all the sensors that we were to use. We then assembled the entire circuit in a basic schematic to plan out everything. Unfortunately, during these two days we were unable to access a desktop CNC machine to mill a PCB, so we never ended up creating a board design and instead simply referred to the schematic during design and soldering.

<center>
<img src="../pics/wiringSchematic.jpg" alt="Schematic" width="750"/>
</center>

Before we assembled the finalized soldered circuit, we first tested using a test ESP32 Feather V2 board on a breadboard circuit. We used the same wiring that would be our final design, excluding the servo that was added in a later iteration.

<center>
<img src="../pics/featherBreadboard.jpg" alt="Breadboard circuit" width="450"/>
</center>

As the ESP32 Feather V2 board was NCSSM property, we switched over to a spare Xiao Seeed ESP32S3 chip that Richard had. We chose the ESP32 architecture due to its native Wi-Fi capabilities, as we knew we would send data over a wireless network to the frontend. This involved minor changes in our code. Here is what our final circuit looks like when it is integrated into the system.

<center>
<img src="../pics/integratedCircuit.jpg" alt="Final Circuit Integrated" width="600"/>
</center>

## Backend Software

We developed an Arduino script for the Xiao Seeed ESP32S3 to collect sensor data and send it to the frontend every 5 seconds.

## Frontend

## Integration

## Impact

## Future Work