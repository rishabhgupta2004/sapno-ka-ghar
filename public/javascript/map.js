const platform = new H.service.Platform({
    apikey: 'maptoken' // Replace 'YOUR_API_KEY_HERE' with your actual API key
});

const defaultLayers = platform.createDefaultLayers();
const map = new H.Map(
    document.getElementById("map"),
    defaultLayers.vector.normal.map,
    {
        center: { lat: 28.63576, lng: 77.22445 },
        zoom: 13,
        pixelRatio: window.devicePixelRatio || 1
    }
);

window.addEventListener("resize", () => map.getViewPort().resize());

const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
const ui = H.ui.UI.createDefault(map, defaultLayers);
