import { useEffect, useState } from 'react';
import { ISensor } from '../types/sensor';
import { useWebsocket } from './websocket.hook';
import { SensorMessage } from '../types/sensor-message';

export const useSensors = () => {
  console.log('useSensors');
  const [sensors, setSensors] = useState<ISensor[] | []>([]);

  const ws = useWebsocket('ws://localhost:5001');

  const toggleConnection = (data: SensorMessage) => {
    ws?.send(JSON.stringify(data))
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('Message from server:', event.data);

      setSensors(prevState => {
        return [...prevState, event.data];
      })
    };

    // Add event listener for messages
    ws?.addEventListener('message', handleMessage);

    return () => {
      // Remove event listener for messages
      ws?.removeEventListener('message', handleMessage);
    };
  }, [ws]);

  return {
    sensors,
    toggleConnection,
  };
};
