class Utils {
    static degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    static  radiansToDegrees(radians) {
        return radians * (180/Math.PI);
    }

    static polarToCartesian(angle, radius) {
        let x,y;

        x = radius * Math.cos(Utils.degreesToRadians(angle));
        y = radius * Math.sin(Utils.degreesToRadians(angle));

        //console.log('polarToCartesian: angle = ' + angle + '  radius =  ' + radius + '   x = ' + x);

        return [x,y];
    }

    static cartesianToPolar(x, y){
        let distance = Math.sqrt(x*x + y*y);
        let radians = Math.atan2(y,x); //This takes y first
        let degrees = this.radiansToDegrees(radians);
        let polarCoor = { distance:distance, degrees:degrees };
        return polarCoor;
    }

    static getDistanceBetweenCoordinates(lat1, lon1, lat2, lon2) {
        const earthRadiusKm = 6371;

        const dLat = Utils.degreesToRadians(lat2-lat1);
        const dLon = Utils.degreesToRadians(lon2-lon1);

        lat1 = Utils.degreesToRadians(lat1);
        lat2 = Utils.degreesToRadians(lat2);

        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return (earthRadiusKm * c * 1000).toFixed(2); // meters, ex.: 102.04
    }
}

module.exports = Utils;
