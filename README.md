## Day 2

- Manager: Hmm really nice this application, but we have a problem, I create a task for everyone but nobody knows that is assigned to it, maybe we can send an email to alert...

### Day 2 - Conclusion

The day 2 implementation it's straightforward but has great details to analyze to keep a good structure. The first one is to respect our rule of "Boy-Scout Rule" and to do that we introduce a little complexity to create "helpers" to reduce the boilerplate on creating DTO and validate them.

Another point to see is that abstraction NotifyTask is how the domain flow works, but the fact that is used with the EmailNotify to use notification with email is only encapsulated the logic of how to send email works.

So abstractions are to speak the language of the domain, logic is always encapsulated