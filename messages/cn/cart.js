export default {
  co2disclaimer: `感谢您的订单，此订单将减少<strong>{{ co2 }}</strong>公斤二氧化碳排放，<strong>{{ ch4 }}</strong>公斤甲烷排放，以及节约<strong>{{ water }}</strong>升水。了解更多。`,
  co2disclaimerShort: `感谢您的订单，此订单将减少<strong>{{ co2 }}</strong>公斤二氧化碳 烷排放，以及节约<strong>{{ water }}</strong>升水。了解更多。`,
  placeholder: {
    title: '您的购物车是空的',
    text: '仔细浏览我们的目录，发现您喜欢的面料。',
    visitCatalog: '访问面料目录',
    visitOrders: '浏览订单明细',
  },
  card: {
    total: '全部',
    delete: '从购物车里删除',
    edit: '编辑',
    sold: '售罄',
    disclaimer: '请注意，这块布料由多个切割组成',
    sample: '样布',
  },
  titles: {
    main: '购物车',
    changed: '有变更',
    sold: '售罄',
    samples: '样布',
    delivery: '交货计算',
  },
  promoCode: {
    found:
      '此优惠码为您提供 <strong>{{ currentDiscount }}</strong> 的折扣。最终价格将由经理确定，在确认订单后，他会与您联系。',
    placeholder: '输入促销代码',
    applyPromo: '应用促销代码',
    removePromo: '删除促销代码',
    error: '优惠码无效',
    info: '优惠码已应用。最终价格将由经理确定，在确认订单后，他会与您联系。',
  },
  checkout: {
    placeholder: {
      title: '没有找到订单或订单正在处理中',
      text: '请在订单列表中查询或联系客服经理',
    },
    title: '您的订单',
    count: '面料总数',
    cutsCount: '分切割段数',
    cutsDisclaimer: '请注意，您的购物车中有一种织物，由多个部分组成。',
    meters: '长度',
    weight: '重量',
    total: '总和',
    confirm: '确认订单',
    manager: '联系客服',
    delivery: '运输费用',
    minimumOrder: '最小起订数量',
    save: '下单',
    warehouse: '仓库地址: 144 Allée des Caillotières, 69400 Gleizé, France',
    dimensions: '尺寸',
    offer: '运输公司',
    offerNotFound: '找不到送货选项',
    backToCart: '返回购物车',
    next: '更远',
    pay: '支付',
  },
  info: `遗憾的是，您添加的某些面料目前无法订购或已更改供应情况。如果您有任何疑问，请联系我们的客服。`,
  clearCart: '清空购物车',
  thanks: {
    title: `感谢您的订货！`,
    text: `您的订单已经确认成功。我们的客服经理会尽快联络您商讨细节。`,
  },
  confirmation: {
    title: '您的订单已提交',
    text: '请完整填写下面表格以便我们出具正式发票。',
    manager: '联系客服',
    toCatalog: '浏览面料目录',
    toOrders: '浏览订单明细',
    firstName: {
      label: '名字',
    },
    secondName: {
      label: '姓氏',
    },
    delivery: {
      label: '配送',
      description: '请指定送货的国家，城市，地址和邮政编码',
      country: {
        label: '送货国家',
      },
      city: {
        label: '送货城市',
      },
      address: {
        label: '送货地址',
      },
      zipCode: {
        label: '邮政编码',
      },
    },
    invoice: {
      label: '开票地址',
      description: '请指定发票将发出的国家，城市，地址和邮政编码',
      country: {
        label: '国家',
      },
      city: {
        label: '城市',
      },
      address: {
        label: '地址',
      },
      zipCode: {
        label: '邮政编码',
      },
      sameAddress: `与送货地址相同。`,
    },
    paymentMethod: {
      label: '付款方式',
      description: '选择您希望的支付方式',
    },
    deliveryMethod: {
      label: '配送方式',
    },
    packageType: {
      label: '包装方式',
    },
    companyName: {
      label: '公司名称',
    },
    vat: {
      label: '增值税号',
      description: '填写您的增值税号（如适用）',
    },
    saveButton: '保存',
  },
};
