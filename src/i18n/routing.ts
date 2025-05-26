import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'ru', 'fr', 'cn'],
 
  defaultLocale: 'en'
});