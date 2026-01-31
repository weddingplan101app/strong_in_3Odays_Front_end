import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(
  input?: string | number | Date | null,
  options?: Intl.DateTimeFormatOptions & { locale?: string }
) {
  if (!input) return '-'
  const date = input instanceof Date ? input : new Date(input)
  if (isNaN(date.getTime())) return '-'
  const { locale, ...fmtOptions } = options ?? {}
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }
  const mergedOptions = { ...defaultOptions, ...fmtOptions }
  return new Intl.DateTimeFormat(locale ?? undefined, mergedOptions).format(date)
}
