import { Box, Container } from '@chakra-ui/react'
import { LatLng, marker, Routing } from 'leaflet';
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { getCoordinates } from '../services/coordinateServices';
import { getUserData } from '../utils/tokenHelper';
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "lrm-google";
import { markerIcon } from '../utils/constants';
import Loading from '../components/Loading';


const HomePage = () => {
    const [position, setPosition] = useState<LatLng | null>(null);
    const [waypoints, setWaypoints] = useState<LatLng[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const user = getUserData();

    const LocationPosition = () => {
        const map = useMap();

        useEffect(() => {
            if (!position) {
                map.locate().on("locationfound", function (e) {
                    setPosition(e.latlng);
                    map.flyTo(e.latlng, map.getZoom());
                });
            }
        }, [map]);

        return <></>;
    }
    const RoutingMachine = () => {
        const map = useMap();

        useEffect(() => {
            Routing.control({
                waypoints: waypoints,
                router: Routing.osrmv1({
                    serviceUrl: `http://router.project-osrm.org/route/v1/`
                }),
                plan: Routing.plan(waypoints, {
                    createMarker: function (i, wp) {
                        return marker(wp.latLng, {
                            draggable: true,
                            icon: markerIcon
                        });
                    },
                    routeWhileDragging: true
                }),
                show: true,
                addWaypoints: true,
                routeWhileDragging: false,
                fitSelectedRoutes: true,
                showAlternatives: true
            }).addTo(map);
        }, [map]);
        return <></>;

    }

    const fetchCoordinates = async () => {
        setIsLoading(true)
        if (user?.id) {
            await getCoordinates(user.id)
                .then((res) => {
                    setIsLoading(false)
                    let newCoords = [];
                    if (position)
                        newCoords.push(position);
                    setWaypoints([...newCoords, ...res.coordinates])
                }).catch((err) => {
                    setIsLoading(false)
                });
        }

    }

    useEffect(() => {
        fetchCoordinates()
    }, [])


    if (isLoading) {
        return <Loading />
    }

    return (
        <Container maxW={'full'} p="4" fontSize={'18px'}>
            <Box mt="5" rounded={'lg'} boxShadow="base">
                <MapContainer
                    center={[50.67061219799306, 7.144693026839972]}
                    zoom={13}
                    scrollWheelZoom
                    style={{ height: "100vh" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationPosition />
                    <RoutingMachine />
                </MapContainer>
            </Box>
        </Container>
    )
}

export default HomePage