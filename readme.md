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
  - articles/
    - json/
      - <a list of generated JSON files representing the blog articles>
  - task-list-snapshots/
    - json/
      - <a list of generated JSON files representing my task list snapshots>
  - daily-timeblocks/
    - json/
      - <a list of generated JSON files representing my daily timeblocks>
  - uploads/
    - json/
      - <various media uploads (e.g. images) associated with content>
```

This file structure is then committed to Git and is pushed to the `netlify` branch of the GitHub repo. The Netlify site is configured to automatically update the website whenever the `netlify` branch is changed. Because the `netlify` branch will already contain the bundled website assets, the build script on `netlify` only needs to update the files in their CDN. This makes the Netlify build scripts run very quickly, preventing us from exceeding Netlify's build minutes quota.
