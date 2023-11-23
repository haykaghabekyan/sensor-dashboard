import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { SensorItem } from './sensor-item';

import './sensors-list.css';
import { ToggleSlider } from './toggle-slider';
import { useSensors } from '../hooks/sensors.hook';

export const SensorsList: FC = () => {
  const { sensors, toggleConnection } = useSensors();
  const [displayConnected, setDisplayConnected] = useState(false);

  const handleFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDisplayConnected(e.target.checked);
  }, []);

  const sensorsToDisplay = useMemo(() => {
    return sensors.filter(sensor => sensor.connected === displayConnected || sensor.connected);
  }, [sensors, displayConnected]);

  return (
    <main className="sensors-dashboard">
      <div className="sensors-dashboard__toggle">
        <label className="sensors-dashboard__filter" htmlFor="toggle">All</label>
        <ToggleSlider id="toggle" onChange={handleFilterChange} />
        <label className="sensors-dashboard__filter" htmlFor="toggle">Only Connected</label>
      </div>
      <ul className="sensors-list">
        {sensorsToDisplay.map(sensor => <SensorItem key={sensor.id} sensor={sensor} onToggleConnection={toggleConnection} />)}
      </ul>
    </main>
  );
};
