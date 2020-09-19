export const displayMap = (locations) => {
	mapboxgl.accessToken =
		'pk.eyJ1Ijoia2FybWFueWEwMDciLCJhIjoiY2tmOGJvMTh5MGFwNzJ2bzg4bXloaWNmdiJ9.Et4AG74Esx8_yLuJcUXv7w';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/karmanya007/ckf8c6zwr0ci019ls43iipz4w',
		scrollZoom: false,
		// center: [-118.113491, 34.111745],
		// zoom: 10,
		// interactive: false
	});

	const bounds = new mapboxgl.LngLatBounds();

	locations.forEach((loc) => {
		const el = document.createElement('div');
		el.className = 'marker';

		new mapboxgl.Marker({
			element: el,
			anchor: 'bottom',
		})
			.setLngLat(loc.coordinates)
			.addTo(map);

		new mapboxgl.Popup({
			offset: 30,
		})
			.setLngLat(loc.coordinates)
			.setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
			.addTo(map);

		bounds.extend(loc.coordinates);
	});

	map.fitBounds(bounds, {
		padding: {
			top: 200,
			bottom: 150,
			left: 100,
			right: 100,
		},
	});
};
