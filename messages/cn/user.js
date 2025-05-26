export default {
  profile: {
    title: '您的用户信息',
    saveButton: '保存',
    cancelButton: '取消',
    editButton: '编辑用户信息',
    fields: {
      firstName: {
        label: '名',
        placeholder: '',
      },
      secondName: {
        label: '姓',
        placeholder: '',
      },
      phone: {
        label: '电话号码',
        placeholder: '',
      },
      email: {
        label: '邮箱',
        placeholder: '',
      },
      vat: {
        label: '增值税',
        placeholder: '',
      },
      deliveryAddress: {
        label: '送货地址',
        placeholder: '',
        description: '请输入送货地址',
      },
      invoiceAddress: {
        label: '账单地址',
        placeholder: '',
        description: '如果您的账单地址与您的送货地址不同，请提供您想要的账单地址。否则您可以将该字段留空',
      },
    },
  },
  orders: {
    title: '订单',
    orderCard: {
      status: '订单状态',
      composition: '订单组成',
      date: '订货日期',
      updateDate: '更新日期',
      weight: '估算重量',
      view: '阅览日期',
    },
    placeholder: {
      title: '您的订单列表为空',
      text: '花点时间浏览我们的目录，找到适合您的面料。',
      visitCatalog: '访问目录',
    },
  },
  order: {
    title: '订单',
    summary: {
      yourOrder: '您的订单',
      status: '订单状态',
      count: '面料支数',
      length: '面料长度',
      weight: '估算重量',
      total: '合计',
    },
    fabricCard: {
      sum: '合计',
    },
  },
  invoices: {
    title: '发票',
    invoiceCard: {
      discount: '折扣',
      date: '日期',
      type: '订单类型',
      view: '阅览发票',
      payed: '已付款',
      notPayed: '未付款',
    },
    placeholder: {
      title: '您的发票列表为空',
      text: '花点时间浏览我们的目录，找到适合您的面料。',
      visitCatalog: '访问目录',
    },
  },
  invoice: {
    title: '发票',
    summary: {
      yourOrder: '您的订单',
      status: '订单状态',
      length: '长度',
      balance: '余额',
      discount: '折扣',
      packings: '包装',
      total: '合计',
    },
  },
};
