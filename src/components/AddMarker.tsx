import { LatLng } from "leaflet";
import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { markerIcon } from "../utils/constants";

interface IProps {
    data: LatLng[];
    setCoordinates: (e: LatLng[]) => void;
}

export default function AddMarker({ data, setCoordinates }: IProps) {
    const [coord, setPosition] = useState<LatLng[]>(data);

    useMapEvents({
        click: (e) => {
            const newCoord = [...coord, e.latlng]
            setPosition(newCoord);
            setCoordinates(newCoord)
        }
    });

    const removeMarker = (pos: LatLng) => {
        const newCoord = coord.filter((coord) => JSON.stringify(coord) !== JSON.stringify(pos))
        setPosition(newCoord);
        setCoordinates(newCoord)
    };

    return (
        <div>
            {coord.map((pos, idx) => (
                <Marker
                    key={`marker-${idx}`}
                    position={pos}
                    draggable={true}
                    icon={markerIcon}
                    eventHandlers={{
                        click: (e) => {
                            console.log(e.latlng);
                        }
                    }}
                >
                    <Popup>
                        <button type="button" onClick={() => removeMarker(pos)}>Remove marker</button>
                    </Popup>
                </Marker>
            ))}
        </div>
    );
}
