# Messenger

Веб-мессенджер — учебный проект Яндекс Практикума (Middle Frontend).

- Сайт: https://6ab95297e447e700084c8841--clever-fudge-648096.netlify.app/

## Стек

- TypeScript (strict)
- Vite
- Handlebars
- SCSS
- ESLint (typescript-eslint), Stylelint (stylelint-config-standard-scss), EditorConfig
- Архитектура — [Feature-Sliced Design](https://feature-sliced.design/) + MVC

## Функциональность

- Компонентный подход: базовый класс `Block` с жизненным циклом (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`) и перерисовкой при изменении props через `setProps`. Компоненты встраиваются в шаблоны как `{{{Input ...}}}`.
- Переиспользуемые компоненты: `Input`, `Button`, `Form`, `Message`.
- Валидация форм: единый модуль с правилами на регулярных выражениях (`shared/lib/validation`), проверка по `blur` и при `submit`.
- При отправке любой формы объект с данными выводится в `console.log`, страница не перезагружается.
- MVC:
  - **View** — `Block` и страницы, разметка через Handlebars;
  - **Model** — сервисы данных в `entities/*/model` (`userService`, `chatService`, `messageService`);
  - **Controller** — `entities/*/model/controller.ts` (`userController`, `chatController`, `messageController`): принимают данные из форм, обновляют сервисы и управляют навигацией.

## Страницы

| Путь | Страница |
|---|---|
| `/` | навигация по всем страницам |
| `/login` | вход |
| `/register` | регистрация |
| `/messenger` | список чатов и переписка |
| `/settings` | профиль |
| `/settings/edit` | изменение данных профиля |
| `/settings/password` | изменение пароля |
| `/500` | ошибка сервера |
| любой другой | 404 |

## Установка и запуск

Нужен Node.js 22 (см. `.nvmrc`).

```bash
npm install
```

| Команда | Что делает |
|---|---|
| `npm run dev` | сервер разработки с автообновлением |
| `npm run build` | проверка типов и сборка в `dist` |
| `npm run start` | сборка и запуск собранной версии на порту 3000 |
| `npm run lint` | все проверки: типы (`tsc --noEmit`), ESLint и Stylelint |
| `npm run lint:types` | только проверка типов |
| `npm run lint:scripts` | только ESLint |
| `npm run lint:styles` | только Stylelint |

## Структура

```
src/
  app/       — точка входа, роутинг, глобальные стили
  pages/     — страницы
  widgets/   — крупные блоки интерфейса (сайдбар, окно чата)
  features/  — действия пользователя (вход, отправка сообщения, добавление пользователя)
  entities/  — сущности (чат, сообщение, пользователь): ui, моки (api), сервисы и контроллеры (model)
  shared/    — Block, валидация, навигация, переиспользуемые компоненты, иконки, конфиг
```
