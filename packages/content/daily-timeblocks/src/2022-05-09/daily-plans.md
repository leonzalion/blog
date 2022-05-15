# Monday, May 9, 2022

## Daily Plans

### Target

- [x] Set up & start gap year stream on Twitch
- [x] Learn a bit about memory palace
- [x] Set a reminder to bring a deck of cards every Friday to practice memory palace while on the car ride to gym
- [-] Create prototype of BetterChat, a on-the-fly "chat" app for posting stuff like links and images in limited "chat" places like Google Meet where you can't send images. Use WebRTC
  - [ ] I'll block Apple Mail once I create BetterChat
- [x] Find a way to not have to rebuild the site every single time I update it - create a script in the GitHub pages workflow to skip rebuilding if only the files in `packages/daily-timeblock` was changed

### Reach

- [ ] Update Cold Turkey email times based on new Evening Routine
- [ ] Move discord-email-tunnel onto fly.io
- [ ] Find a better way to organize this backlog (maybe port it into Notion and interact with Notion API to display some of them live on the blog?)
- [ ] Fix discord-email-tunnel image embeds on Apple Mail

### Backlog

#### Prioritized

- [ ] Flush out my portable backpack-desk idea (a fun project I have in mind for learning mechanical/computer engineering while still being pretty useful for me)
- [ ] Get a bunch of cardboard to build backpack-desk thingy prototype
- [ ] Create English Literary Terms Anki flashcards
- [ ] Toggl integration in Daily Timeblock
- [ ] Web worker refresh thing like Vue docs (since I still have caching issues with Netlify)
- [ ] Create `markdown-it` playground
  - [ ] Make backlog hidden on blog by default (or better, make all headers toggleable)
- [ ] Polish up reactive emails to the point where I can challenge myself to try and set up a meeting with Google asking whether it's possible to get better API support for dynamically changing emails instead of having to resort to browser automation

#### Distant

- [ ] Diff functionality in Daily Timeblock
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
- [ ] Finish setting up Docker containers for Precommit
- [ ] Fix blog loading screen when loading article
- [ ] Specify a standard notation when writing timeblocks (e.g. a ~ b = if finished a, do b)
- [ ] Make sure AdminControl keeps track of previous screen time passwords somewhere in case it goes wrong
- [ ] Create some Neovim configs that get me comfortable working in Neovim (e.g. pane shortcuts, etc.)
- [ ] Create a generic `run-bin` script for `@leonzalion/configs` that follows the `./src/bin/x.ts` convention
- [ ] Create a generic command that encompasses `lint`, `prettier`, and `typecheck` so I don't need to repeatedly specify it in the scripts of every package.json
- [ ] Compile AdminControl so I can download it on my Mac
- [ ] Create a website for AdminControl
- [ ] Make changing screen time passcode toggleable on AdminControl
- [ ] Fix AdminControl bitwarden integration where it creates a folder and keeps track of changes instead of overwriting
- [ ] Create a little CLI utility to print double-sided using AppleScript automation (it will print odd pages, then output instructions on how to insert the paper, and when you're done you press enter in the CLI and it will automatically print the even sides using the saved preset it creates by default, and then it will delete the temporary preset afterwards)
- [ ] Linter/formatter for Daily Timeblock files?
- [x] Find out what is causing the "can't read &lt;root&gt;/tsconfig.json file" eslint error when editing files in VSCode with my new configs setup (fixed: <https://github.com/leonzalion/configs/commit/b112d0bc69554aa37db9d789ce56ea6fb7abd211>)
- [ ] Consider setting a deadline for all my small, side-projects (Precommit will be my main project once exams are over). Make sure I don't get sucked into the trap of working on a billion small projects instead of one big project and taking the big project as far as possible (set a minimum limit to how much I must work on the big project every day). But, I do want to finish all my productivity utilities for my productivity workflow that will support me throughout the gap year (AdminControl, ProjectPure, etc.)
- [x] Experiment with precommit hooks for blog to add \[skip ci]
- [ ] Experiment with a script that makes old blog entries frozen (i.e. read-only on the file system) so I don't accidentally edit them in VSCode
- [ ] Create npm helper packages for managing pseudo-monorepos (where some packages of the monorepo are in their own repos)
- [ ] Consider learning the streaming API so I can create my own streaming software eventually (without having to depend on heavy OBS and also not worry about mic being unmuted)
- [ ] Create a `leonzalion-bot` to make my automated commits
- [ ] Create a proxy-based blocker for Cold Turkey
- [ ] Eventually switch to qutebrowser (what's stopping me now is the lack of a Qutebrowser Cold Turkey extension)

### Upstream

- [ ] Migrate browser configurations to Google Chrome when Yabai bug is fixed in Chrome Beta