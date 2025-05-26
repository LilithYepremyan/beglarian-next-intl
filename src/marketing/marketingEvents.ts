const marketingEvents = {
  cart: {
    confirm: {
      ya: 'new-store_cart-confirm',
      gt: 'cart_confirm',
      fb: 'Lead',
      pt: 'lead',
    },
    add: {
      ya: 'new-store_add-to-cart',
      gt: 'add_to_cart',
      fb: 'AddToCart',
      pt: 'addtocart',
    },
  },
  viewPage: {
    ya: 'new-store_page-view',
    gt: 'page_view',
    fb: 'PageView',
    pt: 'pagevisit',
  },
  registration: {
    success: {
      ya: 'new-store_registartion',
      gt: 'sign_up',
      fb: 'CompleteRegistration',
      pt: 'signup',
    },
  },
};

export default marketingEvents;
