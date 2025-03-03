// Fetch and display visitor's information
document.addEventListener("DOMContentLoaded", () => {
    // Display User Agent
    const userAgent = navigator.userAgent;
    document.body.innerHTML += `<p>User Agent: ${userAgent}</p>`;

    // Display Screen and Viewport Information
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    document.body.innerHTML += `<p>Screen: ${screenWidth}x${screenHeight}</p>`;
    document.body.innerHTML += `<p>Viewport: ${viewportWidth}x${viewportHeight}</p>`;

    // Display Browser Language
    const language = navigator.language;
    document.body.innerHTML += `<p>Language: ${language}</p>`;

    // Display Online Status
    const onlineStatus = navigator.onLine ? "Online" : "Offline";
    document.body.innerHTML += `<p>Connection: ${onlineStatus}</p>`;

    // Check if Geolocation is supported and get location (with user consent)
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            document.body.innerHTML += `<p>Location: Latitude ${latitude}, Longitude ${longitude}</p>`;
        }, () => {
            document.body.innerHTML += `<p>Location: User denied permission</p>`;
        });
    } else {
        document.body.innerHTML += `<p>Location: Not supported</p>`;
    }
});
