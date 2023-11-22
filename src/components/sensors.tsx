import { ChangeEvent, FC, useMemo, useState } from 'react';
import { SensorType } from '../types/sensor';
import { CommandType } from '../types/command';
import { SensorMessageType } from '../types/sensor-message';

interface ISensorProps {
  sensor: SensorType;
  onToggleConnection: (data: SensorMessageType) => void;
}

const Sensor: FC<ISensorProps> = ({ sensor, onToggleConnection }) => {
  const handleToggleConnection = (e: ChangeEvent<HTMLInputElement>) => {
    const command: CommandType = e.target.checked ? 'connect' : 'disconnect';

    onToggleConnection({
      id: sensor.id,
      command,
    });
  };

  return (
    <li>
      <label>
        <input type="checkbox" checked={sensor.connected} onChange={handleToggleConnection} />
      </label>
      {sensor.name} {sensor.connected ? `- ${sensor.value} ${sensor.unit}` : ''}
    </li>
  );
};

interface ISensorsProps {
  sensors: SensorType[];
  onToggleConnection: (data: SensorMessageType) => void;
}

export const Sensors: FC<ISensorsProps> = ({ sensors, onToggleConnection }) => {
  const [displayConnected, setDisplayConnected] = useState(false);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayConnected(e.target.checked);
  };

  const sensorsToDisplay = useMemo(() => {
    return sensors.filter(sensor => sensor.connected === displayConnected || sensor.connected);
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
