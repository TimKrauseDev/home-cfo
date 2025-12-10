import { CalendarDate } from '@internationalized/date'

export class DateUtils {
  static validateYear (year: number): boolean {
    return year >= 1900 && year <= 2100
  }

  static calendarDateToUTCDate (date: CalendarDate): Date {
    return new Date(Date.UTC(date.year, date.month - 1, date.day))
  }

  static calendarDateToUTCDateISO (date: CalendarDate): string {
    return new Date(Date.UTC(date.year, date.month - 1, date.day)).toISOString()
  }

  static UTCDateISOToCalendarDate (isoString: string): CalendarDate {
    const date = new Date(isoString)
    return new CalendarDate(
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      date.getUTCDate()
    )
  }

  static tableColumnDateFormat (isoString: string): string {
    if (!isoString) return ''

    return new Date(isoString).toLocaleDateString('en-US', {
      dateStyle: 'medium',
      timeZone: 'UTC'
    })

  }
}
