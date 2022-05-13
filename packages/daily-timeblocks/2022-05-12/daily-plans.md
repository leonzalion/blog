# Thursday, May 12, 2022

## Daily Plans (v1)

### Target

- [ ] Update Cold Turkey email times based on new Evening Routine
- [ ] Find a better way to organize this backlog (maybe port it into Notion and interact with Notion API to display some of them live on the blog?)
- [ ] Create a generic `run-bin` script for `@leonzalion/configs` that follows the `./src/bin/x.ts` convention
- [ ] Create a generic command that encompasses `lint`, `prettier`, and `typecheck` so I don't need to repeatedly specify it in the scripts of every package.json
- [ ] Move voice memos onto backlog
- [ ] fix skip ci script when new timeblock is created
  - [ ] Consider making the daily timeblock list page dynamic instead of statically built
- [ ] Fix discord-email-tunnel double-send bug

### Reach

- [ ] Create GitHub Actions workflow for discord-email-tunnel on fly.io
- [ ] Look into web worker cache-refresh functionality like Vue docs (since I still have caching issues with Netlify)
- [ ] Create `markdown-it` playground
- [ ] Finish setting up Docker containers for Precommit

## Daily Plans (v2)

### Target

- [x] Update Cold Turkey email times on MacBook based on new Evening Routine
- [x] Update Cold Turkey email times on Desktop based on new Evening Routine
- [ ] Move voice memos onto backlog
- [ ] Flush out/experiment with my portable backpack-desk idea (since I got access to cardboard!), a fun project I have in mind for learning mechanical/computer engineering while still being pretty useful for me

### Backlog

#### Prioritized

- [ ] Create a generic `run-bin` script for `@leonzalion/configs` that follows the `./src/bin/x.ts` convention
- [x] Create a generic command that encompasses `lint`, `prettier`, and `typecheck` so I don't need to repeatedly specify it in the scripts of every package.json
- [x] Fix discord-email-tunnel double-send bug
- [ ] Diff functionality in Daily Timeblock (will likely depend on `markdown-it` playground)
- [ ] Rename `@leonzalion/configs` and add documentation on how to use it
- [ ] Create `markdown-it` playground
- [ ] Consider setting a deadline for all my small, side-projects (Precommit will be my main project once exams are over). Make sure I don't get sucked into the trap of working on a billion small projects instead of one big project and taking the big project as far as possible (set a minimum limit to how much I must work on the big project every day). But, I do want to finish all my productivity utilities for my productivity workflow that will support me throughout the gap year (AdminControl, ProjectPure, etc.)
- [ ] Toggl integration in Daily Timeblock
  - [ ] Make backlog hidden on blog by default (or better, make all headers toggleable)
- [ ] Polish up reactive emails to the point where I can challenge myself to try and set up a meeting with Google asking whether it's possible to get better API support for dynamically changing emails instead of having to resort to browser automation

#### Backburner

- [ ] Write article about thoughts on the worrying business model which is dependent on time spent on the service rather than value gained from the service
- [ ] Digital Minimalism talks about social media presenting a falsely overpositive portrayal of people's lives which is discouraging towards others; think about how I can try and avoid that aspect with my projects
- [ ] Digital minimalism mentions "philosophy of technology use"; think about what my philosophy of technology use is
- [ ] Write an article about minimalism
- [ ] Search for whether there exists a product similar to an AirTag but beeps really loudly whenever it moves out of range of a separate device
- [ ] Consider buying a smart lock for my room from the outside as part of an experiment
- [ ] Article about my plan for my gap year (ultralearning with entrepreneurship?) and my productivity experiments (e.g. admin control, daily timeblocking, precommitments) throughout the year to make the most out of it
- [ ] Think about implementing friction with AdminControl based on time + effort (e.g. Cold Turkey text block) instead of requiring parents (but parents still have a way to provide password in case I need it immediately)
  - [ ] What about the encryption key stored as a blurry/cryptic message that requires effort to manually enter (e.g. captchas or even using images to represent text; anything that a computer can't do quickly and requires time and effort from my end)
- [ ] Find a way to take Cornell notes in Notion (hidden answer/explanation column and visible term/question column)
- [ ] Think about how reactive emails would work when using in-person, written emails (make it easy/possible to generate an email on a phone/Apple Watch app? Have backup, extra emails that can be reassigned later on? have a generic, static email for this purpose?)
- [ ] Finish up vue3-spinners (hard because I need to fix up compile-vue-sfc, which is a significant challenge)
- [ ] Finish up a very basic browser extension + Node proxy prototype for ProjectPure
- [ ] Change build script for AdminControl to avoid using pnpm shamefully-hoist (e.g. symlinking/cloning the project folder into a separate directory when running `pnpm run compile`)
- [ ] Make a wrapper for daily timeblocks that will auto-commit whenever file is updated
- [ ] Create a "sort of" checkbox markdown parser for daily goals on blog
- [ ] Finish writing "Internet Intention" article
- [ ] Fix blog loading screen when loading article
- [ ] Specify a standard notation when writing timeblocks (e.g. a ~ b = if finished a, do b)
- [ ] Make sure AdminControl keeps track of previous screen time passwords somewhere in case it goes wrong
- [ ] Create some Neovim configs that get me comfortable working in Neovim (e.g. pane shortcuts, etc.)
- [ ] Compile AdminControl so I can download it on my Mac
- [ ] Create a website for AdminControl
- [ ] Make changing screen time passcode toggleable on AdminControl
- [ ] Fix AdminControl bitwarden integration where it creates a folder and keeps track of changes instead of overwriting
- [ ] Linter/formatter for Daily Timeblock files?
- [ ] Create npm helper packages for managing pseudo-monorepos (where some packages of the monorepo are in their own repos), decide whether this is even a good idea or not
- [ ] Consider learning the streaming API so I can create my own streaming software eventually (without having to depend on heavy OBS and also not worry about mic being unmuted)
- [ ] Apply to Google Internship
- [ ] Find better ways to set alarms (maybe a small Google Voice app utility to set a bunch of alarms in quick succession?)
- [ ] Think about/look into how many people *really* get distracted by social media and the Internet
- [ ] Incorporate some of the ideas during my conversation with George in my Internet Intention article; there should be friction/a barrier for accessing entertainment online (e.g. paying for entertainment), and things that are productive should be frictionless/free to access
- [ ] Think about whether I want to be able to record voice memos to append to my blog (e.g. when I'm out and can't write stuff down on my blog, but still would like to be able to dynamically update it instantly? idk)
- [ ] Buy more scotch tape
- [ ] Think of whether I want a way to update my timeblock via my phone (app, offline mode?)
- [ ] Apple Health sleep tracking integration in Daily Timeblock
- [ ] Apple Watch App for blog (i.e. displaying daily timeblock on apple watch and/or notifications)
- [ ] Precommit should have a notification symbol that's not invasive; e.g. facebook turned theirs blue to red to attract more attention, meanwhile github has a blue color that I literally never click on; this should also be the case with Precommit such that you only see new notifications when you are intentionally looking at new notifications and otherwise you should feel free to ignore it
- [ ] Make print-double-sided faster (and applescript-utils in general)
- [ ] Fix yabai on MacBook Air
- [x] In AdminControl, what if the password is inputted like 1 character every 30 seconds; this would make it so that it's hard to just "copy-paste" the password somewhere else since it would abort any time it doesn't detect secure input
- [ ] Create a background app utility that always git pulls when connected to Internet/when it detects a change to the remote GitHub repository
- [ ] Reply to Pulley email
- [ ] Create a way to sort Backlog entries by type/project

### Upstream

- [ ] Migrate browser configurations to Google Chrome when Yabai bug is fixed in Chrome Beta
