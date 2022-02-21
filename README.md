## Day 2

- Manager: Hmm really nice application, but we have a problem, I create a task and assign it, but my team don't know that the tasks are assigned, maybe we can send an email to alert...

### Day 2 - Conclusion

The day 2 implementation is straightforward but there is important details to analyze to keep a good structure. The first one is to respect our rule of "Boy-Scout Rule" and to do that we introduce a little complexity to create "helpers" to reduce the boilerplate on creating DTO and validate them.

Another point is that abstraction NotifyTask is how the domain flow works, but the fact that is used with the EmailNotify to notify via email works only to encapsulat the logic.

So abstractions are only to speak in the language of the domain, logic is always encapsulated.
