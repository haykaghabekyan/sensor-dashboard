import { ChangeEvent, FC, memo, useCallback } from 'react';
import { SensorType } from '../types/sensor';
import { CommandType } from '../types/command';
import { SensorMessageType } from '../types/sensor-message';
import { ToggleSlider } from './toggle-slider';

import './sensor-item.css';

interface ISensorItemProps {
  sensor: SensorType;
  onToggleConnection: (data: SensorMessageType) => void;
}

export const SensorItem: FC<ISensorItemProps> = memo(({ sensor, onToggleConnection }) => {
  const handleToggleConnection = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const command: CommandType = e.target.checked ? 'connect' : 'disconnect';

    onToggleConnection({
      id: sensor.id,
      command,
    });
  }, [sensor.id, onToggleConnection]);

  return (
    <li className="sensor-item">
      <div className={`sensor-item__container ${sensor.connected ? 'sensor-item__container--connected' : ''}`}>
        <div className="sensor-item__header">
          <h2>{sensor.name}</h2>
          <ToggleSlider id={`sensor-${sensor.id}`} onChange={handleToggleConnection} checked={sensor.connected} />
        </div>
        <div className="sensor-item__content">
          {sensor.connected ? <>{sensor.value} <span>{sensor.unit}</span></> : '-'}
        </div>
      </div>
    </li>
  );
});
