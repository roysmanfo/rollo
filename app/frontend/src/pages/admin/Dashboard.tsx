import React from 'react';
/*import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
*/
export default function Dashboard(){
  return <p>No dashboard</p>
}
/*
function _Dashboard() {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    // Initialize the map when the component mounts
    const map = L.map('map', {
      center: [51.505, -0.09], // Default center of the map
      zoom: 13,
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Function to fetch live coordinates
    const fetchCoordinates = async () => {
      try {
        // Replace with your API URL for fetching live coordinates
        const response = await fetch('/api/coordinates');
        const data = await response.json();
        setCoordinates(data); // Assuming the data is an array of {lat, lon} objects
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    // Fetch coordinates on component mount
    fetchCoordinates();

    // Render markers on the map
    const renderMarkers = () => {
      coordinates.forEach((coord) => {
        L.marker([coord.lat, coord.lon]).addTo(map).bindPopup(`<b>Location:</b> ${coord.name}`);
      });
    };

    // Watch for changes in coordinates to update markers
    useEffect(() => {
      if (coordinates.length > 0) {
        renderMarkers();
      }
    }, [coordinates]);

    // Clean up the map when the component unmounts
    return () => {
      map.remove();
    };
  }, [coordinates]);

  return (
    <>
      <main>
        <h1>Dashboard</h1>
        <div id="map" style={{ height: '500px' }}></div>
      </main>
    </>
  );
}
*/
