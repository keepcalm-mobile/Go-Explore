
class EventsBridge {
    static arComponent = null;
    static arScene = null;
    static mapRef = null;
    static arScreenRef = null;
    static arSceneCurrentNavigationItem = null;
    static currentPlacesData = [];

    static currentLocation = {
        latitude: 25.2864106,
        longitude: 51.5271888
    };

    static updateLocation(location) {
        currentLocation = location;

        console.log("EventsBridge, location:");
        console.log(currentLocation);

        if (this.mapRef != null) {
            this.mapRef.setLocation(location);
        }

        if (this.arScreenRef != null) {
            this.arScreenRef.setPosition(location);
        }
    }
}

export default EventsBridge;
