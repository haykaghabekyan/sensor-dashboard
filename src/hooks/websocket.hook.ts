import { useEffect, useRef } from 'react';

export const useWebsocket = (url: string) => {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket(url);

    return () => {
      wsRef.current?.close();
    };
  }, [url]);

  return wsRef.current;
};
