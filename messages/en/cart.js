export default {
  co2disclaimer: `Thanks to this order, you will save <strong>{{ co2 }kg</strong> of CO2 emissions, <strong>{{ ch4 }}\xa0kg</strong> of CH4 emissions, and <strong>{{ water }}\xa0liters</strong> of water`,
  co2disclaimerShort: `Thanks to this order, you will save <strong>{{ co2 }}kg</strong> of CO2 emissions and <strong>{{ water }}\xa0liters</strong> of water`,
  placeholder: {
    title: 'Your cart is empty',
    text: 'Take your time and explore our catalog to find the right fabric for you.',
    visitCatalog: 'Visit сatalog',
    visitOrders: 'To orders list',
  },
  card: {
    total: 'Total',
    delete: 'Delete from cart',
    edit: 'Edit',
    sold: 'Sold out',
    disclaimer: 'Please note, this fabric consists of multiple cuts:',
    sample: 'Sample',
  },
  titles: {
    main: 'Cart',
    changed: 'Has changed',
    sold: 'Sold out',
    samples: 'Samples',
    delivery: 'Delivery calculation',
  },
  promoCode: {
    found:
      'This promo code gives you a discount of <strong>{{ currentDiscount }}</strong>. The final price will be determined by the manager, who will contact you after confirming the order.',
    placeholder: 'Enter promo code',
    applyPromo: 'Apply promo code',
    removePromo: 'Remove promo code',
    error: 'The promo code is invalid',
    info: 'Promo code applied. The final price will be determined by the manager, he will contact you after confirming the order',
  },
  checkout: {
    placeholder: {
      title: 'Order is not found or it is being processed',
      text: 'Please try to find it in the order list or contact the account manager',
    },
    title: 'Your order',
    count: 'Fabrics total',
    cutsCount: 'The number of cuts',
    cutsDisclaimer: 'Please note, there is fabric in your cart consisting of multiple cuts',
    meters: 'Length',
    weight: 'Weight',
    total: 'Total',
    confirm: 'Confirm order',
    manager: 'Contact manager',
    delivery: 'Delivery prices',
    minimumOrder: 'The minimum order is',
    save: 'Place an order',
    warehouse: 'Warehouse address: 144 Allée des Caillotières, 69400 Gleizé, France',
    dimensions: 'Dimensions',
    offer: 'Transport company',
    offerNotFound: 'No delivery options found',
    backToCart: 'Back to cart',
    next: 'Next',
    pay: 'Pay',
  },
  info: `Unfortunately, some of the fabrics you added are not currently available for order or have changed availability. If you have any questions or problems, please contact our customer service.`,
  clearCart: 'Clear cart',
  thanks: {
    title: `Thank you for your order!`,
    text: `Your order has been successfully confirmed. Our manager will contact you shortly to discuss the details.`,
  },
  confirmation: {
    title: 'Your order has been received',
    text: 'To promptly issue an invoice, please fill out the form below.',
    manager: 'Contact manager',
    toOrders: 'To orders list',
    toCatalog: 'To Catalog',
    firstName: {
      label: 'First Name',
    },
    secondName: {
      label: 'Last Name',
    },
    delivery: {
      label: 'Delivery',
      description: 'Specify the country, city, address, and postal code for delivery',
      country: {
        label: 'Delivery country',
      },
      city: {
        label: 'Delivery city',
      },
      address: {
        label: 'Delivery address',
      },
      zipCode: {
        label: 'Postal code',
      },
    },

    invoice: {
      label: 'Invoice Address',
      description: 'Specify the country, city, address, and zip code where the invoice will be issued',
      country: {
        label: 'Country',
      },
      city: {
        label: 'City',
      },
      address: {
        label: 'Address',
      },
      zipCode: {
        label: 'Postal code',
      },
      sameAddress: `Same as delivery address`,
    },

    paymentMethod: {
      label: 'Payment Method',
      description: 'Choose a preferable payment option to pay for the order',
    },
    deliveryMethod: {
      label: 'Delivery Method',
    },
    packageType: {
      label: 'Packaging Options',
    },
    companyName: {
      label: 'Company name(if you have it)',
    },
    vat: {
      label: 'VAT number',
      description: 'Enter your VAT number here (if you have it)',
    },
    saveButton: 'Save',
  },
};
