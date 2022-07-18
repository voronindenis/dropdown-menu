import * as React from 'react';

import { Edit, Share2, Trash2 } from 'react-feather';

import { DropdownMenu, IDropdownMenu } from '../../components/DropdownMenu';

import './MainPage.css';

const options: IDropdownMenu['options'] = [
  { id: '1', label: 'Поделиться в социальных сетях', Icon: Share2, onClick: () => { console.log('Могут не понять') } },
  { id: '2', label: 'Редактировать страницу', Icon: Edit, onClick: () => { console.log('Сегодня не стоит') } },
  { id: '3', label: 'Удалить страницу', Icon: Trash2, onClick: () => { console.log('Ну и ладно!') } },
];

export const MainPage: React.FC = () => (
  <div className="main-page">
    <DropdownMenu options={options} position="top-left" />
    <DropdownMenu options={options} position="top-right" />
    <DropdownMenu options={options} position="middle-left" size="normal" />
    <DropdownMenu options={options} position="middle-right" size="normal" />
    <DropdownMenu options={options} position="bottom-left" size="large" />
    <DropdownMenu options={options} position="bottom-right" size="large" />
  </div>
);
