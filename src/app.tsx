import { Sensors } from './components/sensors';
import { useSensors } from './hooks/sensors.hook';

export const App = () => {
  const { sensors, toggleConnection } = useSensors();

  return (
    <div>
      <Sensors sensors={sensors} onToggleConnection={toggleConnection} />
    </div>
  );
};
