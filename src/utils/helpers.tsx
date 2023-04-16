import React from "react";
import { formatDistanceToNow, isToday, isYesterday } from "date-fns";

type Valuable<T> = { [K in keyof T as T[K] extends null | undefined ? never : K]: T[K] };

export function getValuable<T extends {}, V = Valuable<T>>(obj: T): V {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => !((typeof v === 'string' && !v.length) || v === null ||typeof v === 'undefined'),
    ),
  ) as V;
}

export function isObjectEmpty<T extends {}>(obj: T) {
  return Object.keys(obj).length === 0;
}

export function getDay(date: string) {
  const ruLocale = require("date-fns/locale/ru");
  const day = new Date(date);

  if (isToday(day)) {
    return "Сегодня";
  }

  if (isYesterday(day)) {
    return "Вчера";
  }

  return formatDistanceToNow(day, { addSuffix: true, locale: ruLocale });
};

export function getTime(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  return new Date(Date.parse(date)).toLocaleString("ru", options);
};
