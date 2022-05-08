# Sunday, May 8, 2022

## Daily Plans

### Target

- [ ] Set up & start gap year stream on Twitch
- [ ] Make backlog hidden on blog by default (or better, make all headers toggleable)
- [ ] Do a practice Paper 2 mock exam for Math; review integrals and volume of revolution
- [ ] Move discord-email-tunnel onto fly.io
- [ ] Flush out my portable backpack-desk idea (a fun project I have in mind for learning mechanical/computer engineering while still being pretty useful for me)
- [ ] Learn a bit about memory palace
- [ ] Set a reminder to bring a deck of cards every Friday to practice memory palace while on the car ride to gym
- [ ] Create InstaChat prototype (need a better name)
- [ ] Find more immediate way of updating blog (GitHub pages can take a while) - Use Fetch API to dynamically retrieve latest content using the `raw.githubusercontent.com` URLs since they don't have CORS (also need to place under a production flag in development)
- [ ] Find a way to not have to rebuild the site every single time I update it - create a script in the GitHub pages workflow to skip rebuilding if only markdown in `daily-timeblock/` was changed
- [ ] Get a bunch of cardboard to build backpack-desk thingy prototype

### Reach

- [ ] Update Cold Turkey email times based on new Evening Routine

### Backlog

#### Prioritized

- [ ] Create English Literary Terms Anki flashcards
- [ ] Create InstaChat, a on-the-fly "chat" app for posting stuff like links and images in limited "chat" places like Google Meet where you can't send images. Use WebRTC
  - [ ] I'll block Apple Mail once I create InstaChat
- [ ] Toggl integration in Daily Timeblock

#### Distant

- [ ] Diff functionality in Daily Timeblock
- [ ] Refresh functionality on blog (similar to Vue docs)
- [ ] Write article about thoughts on the worrying business model which is dependent on time spent on the service rather than value gained from the service
- [ ] Digital Minimalism talks about social media presenting a falsely overpositive portrayal of people's lives which is discouraging towards others; think about how I can try and avoid that aspect with my projects
- [ ] Digital minimalism mentions "philosophy of technology use"; think about what my philosophy of technology use is
- [ ] Write an article about minimalism
- [ ] Find a better way to organize this backlog (maybe port it into Notion and interact with Notion API to display some of them live on the blog?)
- [ ] Polish up reactive emails to the point where I can challenge myself to try and set up a meeting with Google asking whether it's possible to get better API support for dynamically changing emails instead of having to resort to browser automation
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
- [ ] Fix discord-email-tunnel image embeds on Apple Mail
- [ ] Finish writing "Internet Intention" article
- [ ] Finish setting up Docker containers for Precommit
- [ ] Fix blog loading screen when loading article
- [ ] Specify a standard notation when writing timeblocks (e.g. a ~ b = if finished a, do b)

### Upstream

- [ ] Migrate browser configurations to Google Chrome when Yabai bug is fixed in Chrome Beta
