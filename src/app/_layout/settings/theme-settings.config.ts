// Default theme settings configurations

export const ThemeSettingsConfig = {
  colorTheme: 'semi-dark', // light, semi-light, semi-dark, dark
  layout: {
    style: 'vertical', // style: 'vertical', horizontal,
    pattern: 'fixed' // fixed, boxed, static
  },
  menuColor: 'menu-dark', // Vertical: [menu-dark, menu-light] , Horizontal: [navbar-dark, navbar-light]
  navigation: 'menu-collapsible', // menu-collapsible, menu-accordation
  menu: 'expand', // collapse, expand
  header: 'fix', // fix, static
  footer: 'static', // fix, static
  customizer: 'on', // on ,off
  headerIcons: {
    maximize: 'on', // on, off
    search: 'on', // on, off
    internationalization: 'on', // on, off
    notification: 'on', // on, off
    email: 'on' // on, off
  },
  brand: {
    brand_name: 'Portal de Compras Públicas',
    logo: {
      type: 'internal', // internal, url
      value: 'assets/custom/images/logo-portal.png' // recommended location for custom images
      // type:'url',
      // value:'http://evolvision.com/wp-content/uploads/2018/01/envelope4-green.png'
    },
  },
  defaultTitleSuffix: 'Central de Eventos - Portal de Compras Públicas'
};
