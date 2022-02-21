## Day 4

- Manager: Oh my God, do you believe everyone is losing the due date. Let's alert them 3, 2, and 1 day before the deadline!

### Day 4 - Conclusion

A new "port" was introduced to be called via script in a cron-job or something similar to check tasks that the deadline is near. The Separation of Concern principle was used to create a use-case to do this super-specific job (but of course, it was better to put directly on the Facade to maintain simplicity, but it is an example).

Different from dependencies that the Facade has, the use-case actually is an extension of the behavior from the Facade, because of that it has the implementation as a property, keeping our Facade as the entrance of the core and reutilizing all fact that already exists.
