import { ChangeEvent, FC, memo } from 'react';

import './toggle-slider.css';

interface IToggleSliderProps {
  id: string;
  checked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ToggleSlider: FC<IToggleSliderProps> = memo(({ id, checked, onChange }) => {
  return (
    <label className="toggle" htmlFor={id}>
      <input className="toggle__switch" type="checkbox" id={id} checked={checked} onChange={onChange} />
      <div className="toggle__slider toggle__slider--round"></div>
    </label>
  );
});
