# Blog

The source code for [blog.leonzalion.com](https://blog.leonzalion.com).

## Workflow

### Branches

There are three main branches used for this blog: `dev`, `main`, and `netlify`.

The `dev` branch is where active development occurs, and the changes in the `dev` branch are not published live.

When the `dev` branch is in a state that is ready to be deployed live, the changes are rebased into the `main` branch. When these changes are pushed to the `main` branch on GitHub, a GitHub action workflow is triggered that will build the website using a custom build script (see [Building the Site](#building-the-site) for more information).

### Building the Site

The blog is built using a custom build script that creates a directory structure similar to the following:

```text
- index.html
- assets/
  - <the bundled HTML/CSS/JS assets that are sent to browsers>
- content/
  - daily-timeblocks/
    - <a list of generated JSON files representing the blog articles>
  - tasks/
    - <a list of generated JSON files representing my tasks>
  - daily-timeblocks/
    - <a list of generated JSON files representing my daily timeblocks>
```

This file structure is then committed to Git and is pushed to the `netlify` branch of the GitHub repo. The Netlify site is configured to automatically update the website whenever the `netlify` branch is changed. Because the `netlify` branch will already contain the bundled website assets, the build script on `netlify` only needs to update the files in their CDN. This makes the Netlify build scripts run very quickly, preventing us from exceeding Netlify's build minutes quota.

### Content Management System (CMS)

This blog uses [Netlify CMS](https://www.netlifycms.org) to host content. The way Netlify CMS works is that it syncs with the files in the GitHub repository, such that whenever a file is added to a certain folder in the GitHub repository, it triggers a Netlify build script which rebuilds the site.

However, rebuilding the site whenever there's only a content change each time is inefficient. Thus, it would be optimal if the folder structure of site was already production-ready, and updating a file in the Git repository wouldn't need any build step to deploy.

Thus, to solve this problem, the Netlify site is linked to a custom `netlify` branch on the Git repo which always contains the bundled assets in `packages/website/dist` that is ready to serve. In this branch, there will be a `packages/tasks/generated` folder which will contain a list of dynamically generated JSON files representing the Notion tasks which will be linked to Netlify CMS to host.

The script which dynamically generates these JSON files is hosted as a server on [fly.io](https://fly.io), which has a cron job scheduled to run every 5 minutes that synchronizes the tasks on GitHub with the tasks on Notion. If there are differences, the server uses the [`octokit GitHub SDK`](https://npm.im/octokit) to make changes to the `netlify` branch of the GitHub repository, which would then automatically trigger Netlify's "build" script (which just updates the files in their CDN).
