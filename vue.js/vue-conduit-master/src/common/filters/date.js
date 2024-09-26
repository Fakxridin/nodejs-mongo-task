import { format } from 'date-fns';

export default function (date, dateFormat = 'MMM d, y') {
  return format(new Date(date), dateFormat);
}
