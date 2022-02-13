## Day 5

- Manager: Ahhh they don't do the tasks, I want to see everyone that loses a deadline!

- Developer: Are you sure?

- Manager: Yeaaaaah

### Day 5 - Conclusion

Wow! Day 5 was incredible with a lot of things! Well, let is getting starting to analyze what happened.

As the requirements want to take control of users, a new context was introduced to our application. The ability to complete a task also, to clean the things :D

A new use case was added to control the new flow for the new runner (we could easily extend the existing runner to make this flow also but we will hurt the SRP) making integration with the broker.

To keep the contexts distinct, the communication between them already born asynchrony and by an external provider in that way, we needed to create a consumer to work for the new context, this strategy brings complexity (not at all compared to implementing a pub/sub internally), but already made all the work for the day that we need to split the service (maybe).