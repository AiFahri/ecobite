<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fake Realtime Tracking</title>
    <script src="https://cdn.jsdelivr.net/npm/leaflet/dist/leaflet.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet/dist/leaflet.css" />
    <style>
        #map {
            height: 500px;
            margin-bottom: 20px;
        }
        .input-group {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <h1>Fake Realtime Tracking</h1>
    <div id="map"></div>
    <div>
        <div class="input-group">
            <label for="latitude">Latitude:</label>
            <input type="number" id="latitude" step="0.000001" placeholder="Enter latitude">
        </div>
        <div class="input-group">
            <label for="longitude">Longitude:</label>
            <input type="number" id="longitude" step="0.000001" placeholder="Enter longitude">
        </div>
        <button id="update-location">Update Location</button>
    </div>

    <script>
        const map = L.map('map').setView([-7.2575, 112.7521], 13); // Default Surabaya

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        let marker = L.marker([-7.2575, 112.7521]).addTo(map); // Default marker

        // Update location on button click
        document.getElementById('update-location').addEventListener('click', () => {
            const latitude = parseFloat(document.getElementById('latitude').value);
            const longitude = parseFloat(document.getElementById('longitude').value);

            if (isNaN(latitude) || isNaN(longitude)) {
                alert('Please enter valid latitude and longitude!');
                return;
            }

            // Update marker position
            marker.setLatLng([latitude, longitude]);
            map.setView([latitude, longitude], 13); // Center map on new location
        });
    </script>
</body>
</html>
