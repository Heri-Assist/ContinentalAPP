import { useEffect, useState } from 'react';
import { check, request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { Platform } from 'react-native';

// Define los tipos para location y error
type Location = {
  latitude: number;
  longitude: number;
};

type GeoError = {
  code: number;
  message: string;
};

export const useGeolocation = () => {
  // Especifica los tipos para location y error
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<GeoError | null>(null);

  useEffect(() => {
    const checkLocationPermission = async () => {
      const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      const locationPermissionStatus = await check(permission);
     
      if (locationPermissionStatus === 'denied') {
        const requestLocationPermissionStatus = await request(permission);

        if (requestLocationPermissionStatus === 'granted') {
          // Ahora puedes llamar a Geolocation.getCurrentPosition
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
            },
            (error) => {
              setError(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        }
      } else if (locationPermissionStatus === 'granted') {
        // Ya tienes permiso, puedes llamar a Geolocation.getCurrentPosition directamente
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            setError(error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    };

    checkLocationPermission();
  }, []);

  return { location, error };
};