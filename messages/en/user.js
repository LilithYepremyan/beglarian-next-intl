export default {
  profile: {
    title: 'Your profile',
    saveButton: 'Save',
    cancelButton: 'Cancel',
    editButton: 'Edit Profile',
    fields: {
      firstName: {
        label: 'First name',
        placeholder: '',
      },
      secondName: {
        label: 'Second name',
        placeholder: '',
      },
      phone: {
        label: 'Phone number',
        placeholder: '',
      },
      email: {
        label: 'Email',
        placeholder: '',
      },
      vat: {
        label: 'VAT',
        placeholder: '',
      },
      deliveryAddress: {
        label: 'Delivery address',
        placeholder: '',
        description: 'Enter the address to which delivery will be made',
      },
      invoiceAddress: {
        label: 'Invoice address',
        placeholder: '',
        description:
          'Please provide the address you would like to be billed to if it is different from your shipping address. Otherwise you can leave the field blank',
      },
    },
  },
  orders: {
    title: 'Orders',
    orderCard: {
      status: 'Order status',
      composition: 'Order composition',
      date: 'Order date',
      updateDate: 'Update date',
      weight: 'Estimated weight',
      view: 'View Order',
    },
    placeholder: {
      title: 'Your orders list is empty',
      text: 'Take your time and explore our catalog to find the right fabric for you.',
      visitCatalog: 'Visit сatalog',
    },
  },
  order: {
    title: 'Order',
    summary: {
      yourOrder: 'Your order',
      status: 'Order status',
      count: "Fabrics' count",
      length: "Fabrics' length",
      weight: 'Estimated weight',
      total: 'Total',
    },
    fabricCard: {
      sum: 'Total',
    },
  },
  invoices: {
    title: 'Invoices',
    invoiceCard: {
      discount: 'Discount',
      date: 'Date',
      type: 'Order Type',
      view: 'View Invoice',
      payed: 'Payed',
      notPayed: 'Not payed',
    },
    placeholder: {
      title: 'Your invoices list is empty',
      text: 'Take your time and explore our catalog to find the right fabric for you.',
      visitCatalog: 'Visit сatalog',
    },
  },
  invoice: {
    title: 'Invoice',
    summary: {
      yourOrder: 'Your order',
      status: 'Order status',
      length: 'Length',
      balance: 'Balance',
      discount: 'Discount',
      packings: 'Packings',
      total: 'Total',
    },
  },
};
