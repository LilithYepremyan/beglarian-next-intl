export default {
  profile: {
    title: 'Ваш профиль',
    saveButton: 'Сохранить',
    cancelButton: 'Отменить',
    editButton: 'Редактировать профиль',
    fields: {
      firstName: {
        label: 'Имя',
        placeholder: '',
      },
      secondName: {
        label: 'Фамилия',
        placeholder: '',
      },
      phone: {
        label: 'Телефон',
        placeholder: '',
      },
      email: {
        label: 'Электронная почта',
        placeholder: '',
      },
      vat: {
        label: 'Номер НДС',
        placeholder: '',
      },
      deliveryAddress: {
        label: 'Адрес доставки',
        placeholder: '',
        description: 'Укажите адрес, на который будет осуществляться доставка',
      },
      invoiceAddress: {
        label: 'Адрес выставления счета',
        placeholder: '',
        description:
          'Укажите адрес, на который вам необходимо выставлять счет, если он отличается от адреса доставки. В противном случае можете оставить поле пустым',
      },
    },
  },
  orders: {
    title: 'Заказы',
    orderCard: {
      status: 'Статус заказа',
      composition: 'Состав',
      date: 'Дата заказа',
      updateDate: 'Дата обновления',
      view: 'Посмотреть заказ',
      weight: 'Примерный вес',
    },
    placeholder: {
      title: 'Ваш список заказов пуст',
      text: 'Не торопитесь и изучите наш каталог, чтобы найти подходящие для вас ткани',
      visitCatalog: 'Перейти в каталог',
    },
  },
  order: {
    title: 'Заказ',
    summary: {
      yourOrder: 'Ваш заказ',
      status: 'Статус заказа',
      count: 'Всего тканей',
      length: 'Всего метров',
      weight: 'Примерный вес',
      total: 'Итого',
    },
    fabricCard: {
      sum: 'Сумма',
    },
  },
  invoices: {
    title: 'Счета',
    invoiceCard: {
      discount: 'Скидка',
      date: 'Дата',
      type: 'Тип заказа',
      view: 'Посмотреть счет',
      payed: 'Оплачен',
      notPayed: 'Не оплачен',
    },
    placeholder: {
      title: 'Ваш список счетов пуст',
      text: 'Не торопитесь и изучите наш каталог, чтобы найти подходящие для вас ткани',
      visitCatalog: 'Перейти в каталог',
    },
  },
  invoice: {
    title: 'Счет',
    summary: {
      yourOrder: 'Ваш заказ',
      status: 'Статус',
      length: 'Всего метров',
      balance: 'Баланс',
      discount: 'Скидка',
      packings: 'Упаковки',
      total: 'Итого',
    },
  },
};
