export interface ArticleEntry {
	slug: string;
	title: string;
	dateCreated: Date;
}

export interface ArticleEntryData extends ArticleEntry {
	content: string;
}

/**
	Map of article slugs to article listings
*/
export type ArticlesMetadata = Record<string, ArticleEntry>;

export interface DailyTimeblockEntryData {
	dateString: string;
	content: string;
}

export type DailyTimeblocksData = Record<string, DailyTimeblockEntryData>;

/**
	Array of date strings
*/
export type DailyTimeblocksMetadata = { dateStrings: string[] };

export interface TaskListSnapshotEntry {
	dateString: string;
}

/**
	Each date string is associate with a task list snapshot.
*/
export type TaskListSnapshotsMetadata = Record<string, TaskListSnapshotEntry>;

export interface TaskData {
	description: string;
	completed: boolean;
	deadline?: string;
	deadlineNotes: string;
}

export type TaskListSnapshotData = {
	dateString: string;
	tasks: TaskData[];
};
