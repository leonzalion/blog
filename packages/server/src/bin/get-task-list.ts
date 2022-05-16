import { getDailyTimeblockFromNotion } from '@leonzalion-blog/content-scripts';
import { getTodayDateString } from '@leonzalion-blog/date-utils';

await getDailyTimeblockFromNotion({ dateString: getTodayDateString() });
