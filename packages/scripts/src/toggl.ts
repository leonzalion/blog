import 'dotenv/config';

import { got } from 'got';
import process from 'node:process';

// Run `curl -u de7af5b48331ebfb1ad8e6ea74efaf3e:api_token -X GET https://api.track.toggl.com/api/v8/workspaces`

const workspaceId = '5987917';

const response = await got.get(
	'https://api.track.toggl.com/reports/api/v2/details',
	{
		searchParams: {
			workspace_id: workspaceId,
			user_agent: 'qhwml@leonzalion.com',
		},
		username: process.env.TOGGL_API_TOKEN,
		password: 'api_token',
	}
);

const data = JSON.parse(response.body) as Record<string, unknown>;
console.log(data);
