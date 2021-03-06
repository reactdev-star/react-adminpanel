import Point from './Point.js';
import Game from '../model/Game';

export default class DrawConflict {
    static isConflict(actionCircleCenter,actionCircleRadius,listVisionMarker=null) { // on verifie que le marker ne se trouve pas dans une zone de vison d'un autre marker
        if(listVisionMarker == null)
        {
            listVisionMarker = [];
            Game.getInstance().Items.forEach(item => {
                if(item.toMapElement)listVisionMarker.push(item.toMapElement());
            });
            Game.getInstance().Flags.forEach(flag => {
                if(flag.toMapElement)listVisionMarker.push(flag.toMapElement());
            });
        }
        var result = false;
        listVisionMarker.forEach((m) => {
            var visionMarker = m.actionCircle;
            var pointVisionMarker = new Point(visionMarker.center);
            var pointNewMarker = new Point(actionCircleCenter);
            if (pointVisionMarker.distanceTo(pointNewMarker) <= (visionMarker.radius + actionCircleRadius)) {
                result = true;
                return;
            }
        });
        return result;
    }

    static isInRegion(regions, marker) { // on verifie que le marker se trouve bien dans une region
        var point = new Point(marker.position);
        var result =false;
        for (const regionCoordinates of regions.entries()) {
            var Coordinates = regionCoordinates[1].getPath().getArray();
            result = false;
            var j = Coordinates.length - 1;
            for (var i = 0; i < Coordinates.length; i++)
            {
                if (((new Point(Coordinates[i])).y < point.y && (new Point(Coordinates[j])).y >= point.y) || ((new Point(Coordinates[j])).y < point.y && (new Point(Coordinates[i])).y >= point.y))
                {
                    if ((new Point(Coordinates[i])).x+ (point.y - (new Point(Coordinates[i])).y) / ((new Point(Coordinates[j])).y - (new Point(Coordinates[i])).y) * ((new Point(Coordinates[j])).x - (new Point(Coordinates[i])).x) < point.x)
                    {
                        result = !result;
                    }
                }
                j = i;
            }
            if(result === true)
            {
                break;
            }
        };
        return result;
    }
}