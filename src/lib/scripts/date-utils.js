import {
  parseDate, 
  parseAbsolute, 
  getLocalTimeZone,
} from '@internationalized/date';
import { 
  format, 
  formatDistance,
} from "date-fns";
import { ptBR } from 'date-fns/locale';

/**
 * Converts a standard JavaScript Date object into a localized calendar 
 * date object.
 * 
 * @param {Date} date - The JavaScript Date object to convert.
 * @returns {import('@internationalized/date').ZonedDateTime} 
 * The resulting localized date and time object.
 */
export const toCalendar = (date) => {
  return parseAbsolute(date.toISOString(), getLocalTimeZone())
}
/**
 * 
 * @param {import('@internationalized/date').ZonedDateTime} date 
 * @param {string} pattern 
 * @returns 
 */
export const formatDate = (date, pattern = "dd/MM/yy") => {
  return format(date.toDate(), pattern)
}

/**
 * Calculates the human-readable distance between two calendar 
 * dates in Portuguese (Brazil).
 * 
 * @param {import('@internationalized/date').ZonedDateTime} later 
 * - The more recent calendar date object.
 * @param {import('@internationalized/date').ZonedDateTime} earlier 
 * - The older calendar date object to compare against.
 * @returns {string} A localized, relative string representing the 
 * time distance (e.g., "há 3 dias", "em 2 meses").
 */
export const calendarDistance = (later, earlier) => {
  return formatDistance(
    later.toDate(),
    earlier.toDate(), { 
      addSuffix: true, 
      locale: ptBR
    }
  )
}
