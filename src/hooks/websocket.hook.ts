import { useEffect, useRef } from 'react';
import { SensorType } from '../types/sensor';

export const useWebsocket = (url: string, handleMessage: (event: SensorType) => void) => {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket(url);
    const onMessage = (event: MessageEvent<string>) => {
      handleMessage(JSON.parse(event.data));
    };

    wsRef.current?.addEventListener('message', onMessage);

    return () => {
      wsRef.current?.removeEventListener('message', onMessage);

      wsRef.current?.close();
    };

  }, [handleMessage, url]);

  return wsRef.current;
};
