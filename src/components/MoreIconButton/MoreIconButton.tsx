import * as React from 'react';

import { MoreVertical } from 'react-feather';

import './MoreIconButton.css';

export interface IMoreIconButton {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: 'small' | 'normal' | 'large';
}

export const MoreIconButton = React.forwardRef<HTMLDivElement, IMoreIconButton>(({ onClick, size = 'small' }, buttonRef) => (
  <div className={`buttonWrapper ${size}`} ref={buttonRef}>
    <button className={`button ${size}`} onClick={onClick}>
      <MoreVertical size={size === 'small' ? '24' : size === 'normal' ? '48' : '96' }/>
    </button>
  </div>
));
