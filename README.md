# bit Tecnologies

Официальный сайт технологической компании bit Tecnologies. Создан с использованием Astro и Tailwind CSS для максимальной производительности.

## О проекте

- **Framework**: Astro (Static mode)
- **Styling**: Tailwind CSS
- **Target**: Развертывание на Cloudflare Pages
- **Theme**: Dark theme по умолчанию
- **Оптимизация**: Минимальные анимации, быстрая загрузка

## Структура проекта

```
src/
├── layouts/
│   └── Layout.astro          # Основной шаблон с Header/Footer
├── pages/
│   └── index.astro           # Главная страница
├── components/               # Переиспользуемые компоненты
├── styles/                   # Глобальные стили
└── assets/                   # Изображения и ресурсы
```

## Разработка

### Требования

- Node.js 18+
- npm или yarn

### Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр сборки
npm run preview
```

### Настройка

1. **GitHub Releases для скачивания APK**:

   Замените `https://github.com/USER/REPO/releases/latest/download/app.apk` на ваш реальный URL в файлах:
   - `src/pages/index.astro` (2 места)

2. **OpenGraph изображение**:

   Замените `public/og-bit-hub.svg` на реальное изображение 1200x630px

3. **SEO мета-данные**:

   Отредактируйте title и description в `src/pages/index.astro`

## Развертывание

### Cloudflare Pages

1. Подключите репозиторий к Cloudflare Pages
2. Настройте build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
3. Deploy!

### Другие платформы

Сайт можно развернуть на любой статической платформе:
- Vercel
- Netlify
- GitHub Pages
- Surge.sh

## Оптимизация

- Используются системные шрифты для скорости
- Минимальные CSS без лишних зависимостей
- SVG иконки вместо шрифтовых иконок
- Lazy loading для изображений через Astro Image
- Оптимизированный Tailwind конфиг

## Адаптивность

- Mobile-first подход
- Тестирование на устройствах от 320px шириной
- Оптимизация для Mi A2 Lite и других бюджетных устройств

## Лицензия

© 2026 bit Tecnologies. Все права защищены.