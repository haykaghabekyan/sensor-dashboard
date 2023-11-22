import { useCallback, useState } from 'react';
import { SensorType } from '../types/sensor';
import { useWebsocket } from './websocket.hook';
import { SensorMessageType } from '../types/sensor-message';

export const useSensors = () => {
  const [sensors, setSensors] = useState<SensorType[]>([]);

  const handleMessage = useCallback((updatedSensor: SensorType) => {
    setSensors(prevState => {
      const newSensors: SensorType[] = [...prevState];

      const index = prevState.findIndex(s => updatedSensor.id === s.id);

      if (index === -1) {
        return [...newSensors, updatedSensor];
      } else {
        newSensors[index] = updatedSensor;
        return newSensors;
      }
    });
  }, []);

  const ws = useWebsocket(process.env.REACT_APP_WS_URL as string, handleMessage);

  const toggleConnection = useCallback((data: SensorMessageType) => {
    ws?.send(JSON.stringify(data));
  }, [ws]);

  return {
    sensors,
    toggleConnection,
  };
};
