# Blog Server

The blog server is mainly used for API integrations, **and the main website must not be dependent on the server to function.** This is so that if the server ever goes down, the website should still function as normal.

## Functions

### Notion Integration

Every minute, the blog server retrieves the current state of the "Tasks" database in Notion, and checks to see if there's any changes between the current tasks and the tasks stored in the GitHub repository. If there is, it makes an automated commit to synchronize the tasks in GitHub with the tasks in Notion.

### Toggl Integration

Every 5 minutes, the blog server retrieves information from the Toggl API. <!-- TODO -->
