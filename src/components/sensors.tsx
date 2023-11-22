import { ChangeEvent, FC, useMemo, useState } from 'react';
import { ISensor } from '../types/sensor';
import { Command } from '../types/command';
import { SensorMessage } from '../types/sensor-message';

interface ISensorProps {
  sensor: ISensor;
  onToggleConnection: (data: SensorMessage) => void;
}

const Sensor: FC<ISensorProps> = ({ sensor, onToggleConnection }) => {
  const handleToggleConnection = (e: ChangeEvent<HTMLInputElement>) => {
    const command: Command = e.target.checked ? 'connect' : 'disconnect';

    onToggleConnection({
      id: sensor.id,
      command,
    });
  };

  return (
    <li>
      <label>
        Toggle connection <input type="checkbox" onChange={handleToggleConnection} />
      </label>
      {sensor.id} : {sensor.name}
    </li>
  );
};

interface ISensorsProps {
  sensors: ISensor[];
  onToggleConnection: (data: SensorMessage) => void;
}

export const Sensors: FC<ISensorsProps> = ({ sensors, onToggleConnection }) => {
  const [displayConnected, setDisplayConnected] = useState(false);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayConnected(e.target.checked);
  };

  const sensorsToDisplay = useMemo(() => {
    return sensors.filter(sensor => sensor.connected === displayConnected);
  }, [sensors, displayConnected]);

  return (
    <div>
      <label>
        Display connected only <input type="checkbox" onChange={handleFilterChange}/>
      </label>
      <ul>
        {sensorsToDisplay.map(sensor => <Sensor key={sensor.id} sensor={sensor} onToggleConnection={onToggleConnection} />)}
      </ul>
    </div>
  );
};
