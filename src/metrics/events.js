import { kebabCase } from 'lodash';

const rawEvents = {
  filters: {
    shown: 'Показ фильтров',
  },

  pagination: {
    itemsPerPageChange: 'Смена количества тканей на страницу',
  },

  menu: {
    shown: 'Показ меню',
  },

  contactUs: {
    shown: 'Показ кнопки связи',
    open: 'Открытие кнопки связи',
    close: 'Закрытие кнопки связи',
    telegram: 'Нажатие в Телеграм',
    email: 'Нажатие в Email',
    whatsApp: 'Нажатие в WhatsApp',
    weChat: 'Нажатие в WeChat',
  },

  contactsPage: {
    shown: 'Показ страницы контактов',
  },

  faqPage: {
    shown: 'Показ страницы FAQ',
    section: {
      shown: 'Показ конкретной секции',
    },
  },

  wishlistPage: {
    shown: 'Показ Вишлиста',
  },

  cartPage: {
    shown: 'Показ Корзины',
    confirm: 'Подтверждение Корзины',
    clear: 'Очистка Корзины',

    сartItem: {
      edit: 'Редактирование Ткани',
      delete: 'Удаление Ткани',
    },
  },

  checkoutPage: {
    shown: 'Показ Чекаута',
    save: 'Сохранение',
  },

  fabricsPage: {
    shown: 'Показ страницы Все ткани',
  },

  mailingsPage: {
    shown: 'Показ страницы Рассылок',
  },

  mailingPage: {
    shown: 'Показ страницы Определенной Рассылки',
  },

  loginPage: {
    shown: 'Показ страницы Логина',
    success: 'Успешный логин',

    form: {
      submit: 'Отправка формы логина',
      error: 'Ошибка после отправки формы логина',
      started: 'Начало заполнения формы',
    },

    createAccountButton: {
      click: 'Нажатие кнопки Создать Аккаунт',
    },

    restorePasswordButton: {
      click: 'Нажатие кнопки Восстановление пароля',
    },
  },

  registerPage: {
    shown: 'Показ страницы Регистрации',
    createPasswordRedirect: 'Редирект на создание пароля',
    loginRedirect: 'Редирект на логин',

    alreadyHaveAnAccountButton: {
      click: 'Нажатие кнопки Уже есть аккаунт',
    },

    form: {
      submit: 'Отправка формы регистрации',
      error: 'Ошибка после отправки формы регистрации',
      started: 'Начало заполнения формы',
    },
  },

  createPasswordPage: {
    success: 'Успешное создание пароля',
    shown: 'Показ страницы Создания Пароля',
  },

  passwordRecoveryPage: {
    shown: 'Показ страницы Восстановления Пароля',

    goBackButton: {
      click: 'Нажатие на кнопку Назад',
    },

    form: {
      submit: 'Отправка формы',
      error: 'Ошибка после отправки формы',
    },
  },

  newPasswordPage: {
    shown: 'Показ страницы нового пароля',
    form: {
      submit: 'Отправка формы',
      error: 'Ошибка после отправки формы',
    },
  },

  checkEmailPage: {
    shown: 'Показ страницы Проверьте почту',

    goBackButton: {
      click: 'Нажатие на кнопку Назад',
    },
  },

  topBanner: {
    closeIcon: {
      click: 'Нажатие на крестик закрыть топ баннер',
    },
    link: {
      click: 'Нажатие на линк в топ баннер',
    },
    shown: 'Показ топ баннера',
  },

  banner: {
    closeIcon: {
      click: 'Нажатие на крестик закрыть баннер',
    },
    link: {
      click: 'Нажатие на линк в баннер',
    },
    shown: 'Показ баннера',
  },

  navBanner: {
    button: {
      click: 'Нажатие на кнопку навигационного баннера',
    },
  },

  fabric: {
    details: {
      expand: 'Раскрытие деталей',
      collapse: 'Сокрытие деталей',
    },

    like: {
      set: 'Лайк',
      unset: 'Убрать лайк',
    },

    lengthPicker: {
      plus: 'Увеличение метража',
      minus: 'Уменьшение метража',
    },

    materialLabel: {
      tooltipShown: 'Показ тултипа состава',
      find: 'Использование функции поиска',
    },

    slider: {
      changed: 'Смена изображения ткани',
    },

    toggleSample: 'Переключение режима добавления образца',
    addToCart: 'Добавить в корзину',
    saveChanges: 'Сохранить изменения',
    goToCart: 'Перейти в корзину',
    copyLink: 'Скопировать линк',
  },

  modals: {
    loginRegister: {
      shown: 'Показ Модалки Войдите или Зарегистрируйтесь',
      loginButton: {
        click: 'Нажатие на кнопку логин',
      },
      registerButton: {
        click: 'Нажатие на кнопку регистрации',
      },
    },
    reservation: {
      shown: 'Показ Модалки Информация о бронировании ткани',
    },
    delivery: {
      shown: 'Показ Модалки Информация о доставке',
    },
    fabricChanged: {
      shown: 'Показ Модалки Информация о том, что наличие ткани изменилось',
    },
    fabric: {
      shown: 'Показ Модалки с изображениями и видео ткани',
      slider: {
        changed: 'Смена изображения ткани',
      },
    },
    addToCart: {
      shown: 'Показ Модалки Информация о том, ткань добавлена в корзину',
      goToCart: 'Нажатие Перейти в Корзину',
      continue: 'Нажатие Продолжить покупки',
    },
    support: {
      shown: 'Показ Модалки Помощи',
      sent: 'Отправка Реквеста помощи из модалки',
    },
    editCartItem: {
      shown: 'Показ Модалки редактирования позиции корзины',
    },
  },
};

function createEventsWithPaths(obj, parentPath = '') {
  const newObj = {};

  Object.keys(obj).forEach(key => {
    const kebabKey = kebabCase(key);
    const currentPath = parentPath ? `${parentPath}_${kebabKey}` : kebabKey;

    if (typeof obj[key] === 'object') {
      newObj[key] = createEventsWithPaths(obj[key], currentPath);
    } else {
      newObj[key] = currentPath.replace(/_([^_]*)$/, ':$1');
    }
  });

  return newObj;
}

const events = createEventsWithPaths(rawEvents);

export default events;
