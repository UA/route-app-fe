import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { LatLng } from "leaflet";
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { createCoordinate } from '../services/coordinateServices';
import { coordinateStore } from '../store/coordinateStore';
import "leaflet/dist/leaflet.css";
import AddMarker from './AddMarker';

const style = {
  map: {
    height: '400px',
    width: '100%'
  }
}


interface IProps {
}

const AddUserCoordinate: FC<IProps> = () => {
  const { isUserCoordinateOpen, userId, coordinate, handleUserCoordinateClose } = coordinateStore()
  const [data, setData] = useState<LatLng[]>([])
  const [position, setPosition] = useState<LatLng | null>(null);

  const toast = useToast()

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

  useEffect(() => {
    if (coordinate != null) {
      setData(coordinate.coordinates)
    }
  }, [coordinate])


  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (!userId) {
      toast({
        title: 'Error',
        description: "User not found",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top'
      })
      return
    }
    if (data.length === 0) {
      toast({
        title: 'Error',
        description: "Select a coordinate",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top'
      })
      return
    }
    await createCoordinate({
      coordinates: data,
      userId: userId
    }).then(() => {
      handleUserCoordinateClose()
    })
  }

  const setCoordinates = (e: LatLng[]) => {
    setData(e)
  }

  return (
    <Modal onClose={handleUserCoordinateClose} size={'xl'} isOpen={isUserCoordinateOpen}>
      <ModalOverlay />
      <form onSubmit={onSubmit}>
        <ModalContent>
          <ModalHeader>Add Coordinates</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MapContainer
              center={[50.67061219799306, 7.144693026839972]}
              zoom={13}
              scrollWheelZoom={true}
              style={style.map}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationPosition />
              <AddMarker data={data} setCoordinates={setCoordinates} />
            </MapContainer>,
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={() => handleUserCoordinateClose()}>Close</Button>
            <Button type='submit'>Add</Button>
          </ModalFooter>
        </ModalContent>
      </form>

    </Modal>
  )
}

export default AddUserCoordinate