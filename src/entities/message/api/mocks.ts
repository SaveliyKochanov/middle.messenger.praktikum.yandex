export interface Message {
  id: number;
  text: string;
  time: string;
  my: boolean;
  checked?: boolean;
}

export interface MessageGroup {
  date: string;
  messages: Message[];
}

export const MESSAGE_GROUPS: MessageGroup[] = [
  {
    date: "17 июня",
    messages: [
      { id: 1, text: "Привет! Ты завтра в офисе?", time: "10:02", my: false },
      { id: 2, text: "Привет, да, буду с 11", time: "10:05", my: true, checked: true },
      { id: 3, text: "Отлично, тогда захвачу тебе книгу, которую обещал", time: "10:06", my: false },
      { id: 4, text: "Спасибо 🙌", time: "10:07", my: true, checked: true },
      { id: 5, text: "Кстати, скинь ссылку на тот репозиторий", time: "18:40", my: false },
      { id: 6, text: "https://github.com/yandex-praktikum/middle.messenger.praktikum.yandex/tree/sprint_1/client/src/widgets/chat-window", time: "18:42", my: true, checked: true }
    ]
  },
  {
    date: "18 июня",
    messages: [
      { id: 7, text: "Посмотрел, структура понятная. А почему виджеты отдельно от фич?", time: "09:15", my: false },
      {
        id: 8,
        text: "Виджет — это самостоятельный блок интерфейса, который собирает сущности и фичи вместе. Фича — одно действие пользователя: отправить сообщение, найти чат, добавить участника. Так проще переиспользовать и не тащить лишние зависимости.",
        time: "09:21",
        my: true,
        checked: true
      },
      { id: 9, text: "Логично", time: "09:22", my: false },
      { id: 10, text: "А стили где держишь?", time: "09:23", my: false },
      { id: 11, text: "Рядом с шаблоном, scss подключается в ui/index.ts", time: "09:25", my: true, checked: true },
      { id: 12, text: "Ок", time: "09:25", my: false }
    ]
  },
  {
    date: "19 июня",
    messages: [
      {
        id: 13,
        text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент просило Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.",
        time: "11:56",
        my: false
      },
      {
        id: 14,
        text: "Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
        time: "11:56",
        my: false
      },
      { id: 15, text: "Круто!", time: "12:00", my: true, checked: true },
      { id: 16, text: "Даже не знал, что их оставили на Луне", time: "12:01", my: true, checked: true },
      { id: 17, text: "Ага, ради экономии веса", time: "12:03", my: false }
    ]
  },
  {
    date: "Сегодня",
    messages: [
      { id: 18, text: "Ты видел новый макет?", time: "09:14", my: false },
      { id: 19, text: "Да, вечером посмотрю подробнее", time: "09:20", my: true, checked: true },
      { id: 20, text: "Там поменяли шапку чата и форму отправки", time: "09:21", my: false },
      { id: 21, text: "Строка\nс переносом\nв три строки", time: "09:30", my: false },
      { id: 22, text: "👍", time: "09:31", my: true }
    ]
  }
];
