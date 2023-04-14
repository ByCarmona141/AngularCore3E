import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Menu',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [

      {
        id: 'customers',
        title: 'CRM',
        type: 'collapse',
        icon: 'feather icon-user',
        children: [
          {
            id: 'customer',
            title: 'Cliente',
            type: 'item',
            url: '/customer',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
          {
            id: 'quotation',
            title: 'Cotización',
            type: 'item',
            url: '/quotation',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
        ]
      },
      {
        id: 'providers',
        title: 'PROVEEDORES',
        type: 'collapse',
        icon: 'feather icon-user',
        children: [
          {
            id: 'provider',
            title: 'Proveedor',
            type: 'item',
            url: '/provider',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
          {
            id: 'typeProvider',
            title: 'Tipo de Proveedor',
            type: 'item',
            url: '/typeProvider',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
        ]
      },
      {
        id: 'productsAndServices',
        title: 'PRODUCTOS Y SERVICIOS',
        type: 'collapse',
        icon: 'feather icon-user',
        children: [
          {
            id: 'productAndService',
            title: 'Productos y Servicios',
            type: 'item',
            url: '/productAndService',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
          {
            id: 'categoryProductAndService',
            title: 'Categoría de Producto y Servicio',
            type: 'item',
            url: '/categoryProductAndService',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
          {
            id: 'packProductAndService',
            title: 'Pack de Productos y Servicio',
            type: 'item',
            url: '/packProductAndService',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
        ]
      },
      {
        id: 'catalogos',
        title: 'CATALOGOS',
        type: 'collapse',
        icon: 'feather icon-user',
        children: [
          {
            id: 'creditDays',
            title: 'Días de crédito',
            type: 'item',
            url: '/creditDays',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
          {
            id: 'location',
            title: 'Ubicación',
            type: 'item',
            url: '/location',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
          {
            id: 'typeService',
            title: 'Tipo de Servicio',
            type: 'item',
            url: '/typeService',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
          {
            id: 'typeTurn',
            title: 'Tipo de Turno',
            type: 'item',
            url: '/typeTurn',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
          {
            id: 'turn',
            title: 'Turno',
            type: 'item',
            url: '/turn',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
          {
            id: 'reportTemplate',
            title: 'Plantilla de Reporte',
            type: 'item',
            url: '/reportTemplate',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
          {
            id: 'reportTypeTemplate',
            title: 'Tipo de Plantilla de Reporte',
            type: 'item',
            url: '/reportTypeTemplate',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
        ]
      },
      /*{
        id: 'CRM',
        title: 'CRM',
        type: 'collapse',
        icon: 'feather icon-user',
        children: [
          {
            id: 'cotizador',
            title: 'Cotizador',
            type: 'item',
            url: '/cotizador',
            classes: 'nav-item',
            icon: 'feather icon-monitor'
          },
        ]
      },
      {
        id: 'MRP',
        title: 'MRP',
        type: 'item',
        url: '/mrp',
        classes: 'nav-item',
        icon: 'feather icon-user'
      },
      {
        id: 'HRM',
        title: 'HRM',
        type: 'item',
        url: '/hrm',
        classes: 'nav-item',
        icon: 'feather icon-user'
      },
      {
        id: 'Users',
        title: 'USERS',
        type: 'collapse',
        icon: 'feather icon-user',
        children: [
          {
            id: 'system-user',
            title: 'System User',
            type: 'item',
            url: '/systemUser',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
          {
            id: 'system-role',
            title: 'System Role',
            type: 'item',
            url: '/systemRole',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
          {
            id: 'system-privileges',
            title: 'System Privileges',
            type: 'item',
            url: '/systemPrivileges',
            classes: 'nav-item',
            icon: 'feather icon-user'
          }]
      },
      {
        id: 'employee',
        title: 'Employee',
        type: 'item',
        url: '/employee',
        classes: 'nav-item',
        icon: 'feather icon-user'
      },
      {
        id: 'type-employee',
        title: 'Type Employee',
        type: 'item',
        url: '/typeEmployee',
        classes: 'nav-item',
        icon: 'feather icon-user'
      },
      {
        id: 'repository',
        title: 'System Repository',
        type: 'item',
        url: '/systemRepository',
        classes: 'nav-item',
        icon: 'feather icon-user'
      },
      {
        id: 'system-log',
        title: 'System Log',
        type: 'item',
        url: '/systemLog',
        classes: 'nav-item',
        icon: 'feather icon-user'
      },
      {
        id: 'system-action',
        title: 'System Action',
        type: 'item',
        url: '/systemAction',
        classes: 'nav-item',
        icon: 'feather icon-user'
      },
      {
        id: 'VoBo',
        title: 'VoBo',
        type: 'collapse',
        icon: 'feather icon-user',
        children: [
          {
            id: 'process',
            title: 'Process',
            type: 'item',
            url: '/process',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
          {
            id: 'type-of-vobo',
            title: 'Type of VoBo',
            type: 'item',
            url: '/typeofVobo',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
          {
            id: 'vobo-log',
            title: 'VoBo Log',
            type: 'item',
            url: '/voboLog',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
          {
            id: 'vobo-process',
            title: 'VoBo Process',
            type: 'item',
            url: '/voboProcess',
            classes: 'nav-item',
            icon: 'feather icon-user'
          },
          {
            id: 'vobo-status',
            title: 'VoBo Status',
            type: 'item',
            url: '/voboStatus',
            classes: 'nav-item',
            icon: 'feather icon-user'
          }
        ]
      },
*/
      // {
      //   id: 'menu-level',
      //   title: 'Menu Levels',
      //   type: 'collapse',
      //   icon: 'feather icon-menu',
      //   children: [
      //     {
      //       id: 'menu-level-2.1',
      //       title: 'Menu Level 2.1',
      //       type: 'item',
      //       url: 'javascript:',
      //       external: true
      //     },
      //     {
      //       id: 'menu-level-2.2',
      //       title: 'Menu Level 2.2',
      //       type: 'collapse',
      //       children: [
      //         {
      //           id: 'menu-level-2.2.1',
      //           title: 'Menu Level 2.2.1',
      //           type: 'item',
      //           url: 'javascript:',
      //           external: true
      //         },
      //         {
      //           id: 'menu-level-2.2.2',
      //           title: 'Menu Level 2.2.2',
      //           type: 'item',
      //           url: 'javascript:',
      //           external: true
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  }
];

@Injectable()
export class NavigationItem {

  public get() {
    return NavigationItems;
  }
}
