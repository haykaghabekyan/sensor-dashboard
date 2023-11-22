import { Sensors } from './components/sensors';
import { useSensors } from './hooks/sensors.hook';

export const App = () => {
  const { sensors, toggleConnection } = useSensors();

  return <Sensors sensors={sensors} onToggleConnection={toggleConnection} />;
};
