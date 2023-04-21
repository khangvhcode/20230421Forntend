import React from 'react';
import Switch from 'react-switch';

interface Props {
  defaultChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
}

const SlideToggle: React.FC<Props> = ({ defaultChecked, onChange }) => {
  const [isChecked, setIsChecked] = React.useState(defaultChecked || false);

  const handleToggleChange = (checked: boolean) => {
    setIsChecked(checked);
    onChange?.(checked);
  };

  return (
    <Switch checked={isChecked} onChange={handleToggleChange} />
  );
};

export default SlideToggle;
