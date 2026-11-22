interface Rule {
  pattern: RegExp;
  message: string;
}

const NAME: Rule = {
  pattern: /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё-]*$/,
  message: "Латиница или кириллица, первая буква заглавная, без пробелов и цифр",
};

const PASSWORD: Rule = {
  pattern: /^(?=.*[A-ZА-ЯЁ])(?=.*\d).{8,40}$/,
  message: "От 8 до 40 символов, минимум одна заглавная буква и цифра",
};

const RULES: Record<string, Rule> = {
  first_name: NAME,
  second_name: NAME,
  login: {
    pattern: /^(?=.*[A-Za-z])[A-Za-z0-9_-]{3,20}$/,
    message: "От 3 до 20 символов, латиница, без пробелов, не только цифры",
  },
  email: {
    pattern: /^[\w.+-]+@[A-Za-z0-9-]*[A-Za-z][A-Za-z0-9-]*(\.[A-Za-z0-9-]+)*\.[A-Za-z]+$/,
    message: "Некорректный email",
  },
  password: PASSWORD,
  oldPassword: PASSWORD,
  newPassword: PASSWORD,
  password_repeat: PASSWORD,
  newPasswordRepeat: PASSWORD,
  phone: {
    pattern: /^\+?\d{10,15}$/,
    message: "От 10 до 15 цифр, может начинаться с плюса",
  },
  message: {
    pattern: /\S/,
    message: "Сообщение не должно быть пустым",
  },
};

export function validateField(name: string, value: string): string | null {
  const rule = RULES[name];

  if (!rule) {
    return null;
  }

  return rule.pattern.test(value) ? null : rule.message;
}
