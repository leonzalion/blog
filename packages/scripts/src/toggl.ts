import { got } from 'got';

await got.get('https://api.track.toggl.com/reports/api/v2/summary');