/*
	A "listing" specifies the data that is given about a content type when a minimal information is needed to display basic information on a list.

	If the content type is not suffixed, it represents all the data that is associated with the content type.

	"metadata" describes the structure of `content/metadata/<content-type>.json`, which contains listings for all entries of the content
*/

export interface ArticleListing {
	slug: string;
	title: string;
	datePublished: string;
	lastEditedDate: string;
}

export interface Article extends ArticleListing {
	content: string;
}

/**
	Map of article slugs to article listings
*/
export type ArticlesMetadata = Record<string, ArticleListing>;

export interface DailyTimeblock {
	dateString: string;
	content: string;
}

export type DailyTimeblocksMetadata = { dateStrings: string[] };

export interface Task {
	description: string;
	completed: boolean;
	deadline?: string;
	deadlineNotes: string;
}

export interface TaskListSnapshotListing {
	dateString: string;
}

export interface TaskListSnapshot extends TaskListSnapshotListing {
	tasks: Task[];
}

/**
	Each date string is associated with a task list snapshot.
*/
export type TaskListSnapshotsMetadata = Record<string, TaskListSnapshotListing>;

export interface TogglTimeEntry {
	start: string;
	stop?: string;
	duration: number;
	description: string;
	at: string;
	activityType?: string;
}

export interface TogglDailyResult {
	dateString: string;
	timeEntries: TogglTimeEntry[],
	activityTypeTotals: {
		Precommit: number;
		Dialect: number;
		'Side Project': number;
		Leisure: number;
	}
}

/**
	Map of date strings to the Toggl Daily Result for that day.
*/
export type TogglDailyResultsMetadata = { dateStrings: string[]}
