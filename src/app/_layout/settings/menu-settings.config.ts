// Default menu settings configurations

export interface MenuItem {
  title: string;
  icon: string;
  page: string;
  isExternalLink?: boolean;
  issupportExternalLink?: boolean;
  badge: { type: string, value: string };
  submenu: {
    items: Partial<MenuItem>[];
  };
  section: string;
}

export interface MenuConfig {
  horizontal_menu: {
    items: Partial<MenuItem>[]
  };
  vertical_menu: {
    items: Partial<MenuItem>[]
  };
}

export const MenuSettingsConfig: MenuConfig = {
  horizontal_menu: {
    items: [
      {
        title: 'Changelog',
        icon: 'la-file',
        page: '/changelog',
        badge: { type: 'badge-danger', value: '2.7' }
      },
      {
        title: 'Dashboards',
        icon: 'la-file',
        page: '/dashboards',
        badge: { type: 'la-television', value: '2.7' }
      },
      {
        title: 'Templates',
        icon: 'la-television',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Horizontal',
              page: 'null'
            },
            {
              title: 'Vertical',
              page: 'null'
            },
          ]
        }
      },
      {
        title: 'Raise Support',
        icon: 'la-support',
        page: 'https://pixinvent.ticksy.com/',
        isExternalLink: true
      },
      {
        title: 'Documentaion',
        icon: 'la-text-height',
        page: 'https://modern-admin-docs.web.app/html/ltr/documentation/index.html',
        isExternalLink: true,
      }
    ]
  },
  vertical_menu: {
    items: [
      {
        title: 'Changelog',
        icon: 'la-file',
        page: '/changelog',
        badge: { type: 'badge-danger', value: '1.0' }
      },
      {
        title: 'Dashboards',
        icon: 'la-television',
        page: '/dashboards'
      },
      {
        title: 'Agentes ',
        icon: 'la-group',
        page: '/agents'
      },
      {
        title: 'Eventos',
        icon: 'la-space-shuttle',
        page: '/events'
      },
      { section: 'SUPPORT', icon: 'la-ellipsis-h' },
      {
        title: 'Suporte',
        icon: 'la-support',
        page: 'https://wa.link/e4yjnm',
        isExternalLink: true
      },
      {
        title: 'Documentação',
        icon: 'la-text-height',
        page: '',
        isExternalLink: true,
      }
    ]
  }

};





