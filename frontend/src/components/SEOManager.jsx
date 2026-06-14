import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://raf52-coffee.up.railway.app';

const seoMap = {
  '/': {
    title: 'RAF-52 Coffee — оборудование для кофеен',
    description:
      'Профессиональное кофейное оборудование RAF-52 Coffee: кофемашины, питчеры, темперы, весы и аксессуары для бариста.',
  },
  '/pitchers': {
    title: 'Питчеры для бариста — RAF-52 Coffee',
    description:
      'Профессиональные питчеры для вспенивания молока и приготовления кофейных напитков.',
  },
  '/tempers': {
    title: 'Темперы для кофе — RAF-52 Coffee',
    description:
      'Профессиональные темперы для равномерного уплотнения кофе и стабильной экстракции.',
  },
  '/scales': {
    title: 'Кофейные весы — RAF-52 Coffee',
    description:
      'Точные кофейные весы для бариста, кофейни и приготовления эспрессо.',
  },
  '/accessories': {
    title: 'Аксессуары для бариста — RAF-52 Coffee',
    description:
      'Аксессуары для бариста и кофейного оборудования: корзины, держатели и дополнительные элементы.',
  },
  '/coffee-machines': {
    title: 'Кофе машины для кофейни — RAF-52 Coffee',
    description:
      'Профессиональные кофемашины для кофеен, кафе, ресторанов и бариста.',
  },
  '/buy': {
    title: 'Где купить — RAF-52 Coffee',
    description:
      'Адреса и контакты магазинов-партнёров, где можно приобрести оборудование RAF-52 Coffee.',
  },
  '/feedback': {
    title: 'Связаться с нами — RAF-52 Coffee',
    description:
      'Оставьте заявку на консультацию по подбору профессионального кофейного оборудования.',
  },
  '/privacy': {
    title: 'Политика конфиденциальности — RAF-52 Coffee',
    description:
      'Политика обработки персональных данных и конфиденциальности сайта RAF-52 Coffee.',
  },
  '/login': {
    title: 'Вход — RAF-52 Coffee',
    description:
      'Вход в личный кабинет пользователя RAF-52 Coffee.',
  },
  '/register': {
    title: 'Регистрация — RAF-52 Coffee',
    description:
      'Создание аккаунта пользователя на сайте RAF-52 Coffee.',
  },
  '/cart': {
    title: 'Корзина — RAF-52 Coffee',
    description:
      'Корзина товаров RAF-52 Coffee.',
  },
  '/checkout': {
    title: 'Оформление заказа — RAF-52 Coffee',
    description:
      'Оформление заказа на кофейное оборудование RAF-52 Coffee.',
  },
  '/profile': {
    title: 'Личный кабинет — RAF-52 Coffee',
    description:
      'Личный кабинет пользователя RAF-52 Coffee.',
  },
  '/orders': {
    title: 'Мои заказы — RAF-52 Coffee',
    description:
      'История заказов пользователя RAF-52 Coffee.',
  },
};

const setMeta = (name, content) => {
  let tag = document.querySelector(`meta[name="${name}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
};

const setProperty = (property, content) => {
  let tag = document.querySelector(`meta[property="${property}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
};

const setCanonical = (href) => {
  let link = document.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
};

const SEOManager = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith('/product/')) {
      return;
    }

    const seo = seoMap[path] || {
      title: 'Страница не найдена — RAF-52 Coffee',
      description:
        'Запрашиваемая страница не найдена. Вернитесь на главную страницу RAF-52 Coffee.',
    };

    document.title = seo.title.slice(0, 60);

    setMeta('description', seo.description.slice(0, 160));
    setMeta('robots', path === '/cart' || path === '/checkout' || path === '/login' || path === '/register' || path === '/profile' || path === '/orders'
      ? 'noindex, nofollow'
      : 'index, follow'
    );

    const canonicalUrl = `${SITE_URL}${path}`;

    setCanonical(canonicalUrl);

    setProperty('og:title', seo.title);
    setProperty('og:description', seo.description);
    setProperty('og:url', canonicalUrl);
    setProperty('og:type', 'website');
    setProperty('og:site_name', 'RAF-52 Coffee');
  }, [location.pathname]);

  return null;
};

export default SEOManager;