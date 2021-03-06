import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: '/',
    name: 'HOME',
    type: 'link',
    icon: 'home'
  },
  {
    state: 'daylight',
    name: 'DayLight',
    type: 'link',
    icon: 'highlight'
  },
  {
    state: 'feed',
    name: 'TimeLine',
    type: 'link',
    icon: 'timeline'
  },
  {
    state: 'equipe',
    name: 'Equipes',
    type: 'link',
    icon: 'group'
  },

  {
    state: 'ranking',
    name: 'Ranking',
    type: 'link',
    icon: 'equalizer'
  }
  
];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu) {
    MENUITEMS.push(menu);
  }
}
