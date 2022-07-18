import * as React from 'react';

import { Icon } from 'react-feather';

import { IMoreIconButton, MoreIconButton } from '../MoreIconButton';
import { Popper } from '../Popper';
import './DropdownMenu.css';

export interface IDropdownMenu {
  options: Array<{ id: string; label: string, Icon: Icon; onClick: () => void; }>
  position?: 'top-left' | 'top-right' | 'middle-left' | 'middle-right' | 'bottom-left' | 'bottom-right';
  size?: IMoreIconButton['size'];
}

export const DropdownMenu: React.FC<IDropdownMenu> = (props) => {
  const { options, position = 'top-left', size = 'small' } = props;

  const buttonRef = React.useRef<HTMLDivElement>(null);

  return (
    <menu className={`menu ${position} ${size}`}>
      <MoreIconButton ref={buttonRef} size={size}/>
      <Popper anchorRef={buttonRef}>
        <ul className="list">
          {
            options.map(({ id, label, Icon, onClick }) => (
              <li key={id} onClick={onClick}><span>{label}</span><Icon /></li>
            ))
          }
        </ul>
      </Popper>
    </menu>
  );
};
