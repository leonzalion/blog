import dayjsOriginal from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
// Needed for type safety
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/utc.js';

dayjsOriginal.extend(utc);
dayjsOriginal.extend(timezone);
dayjsOriginal.tz.setDefault('America/Toronto');

export const dayjs = dayjsOriginal;
