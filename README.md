## Day 5

- Manager: Man, it's complicated..... I want to see everyone that loses a deadline!

- Developer: Are you sure?

- Manager: Yeaaaaah

### Day 5 - Conclusion

Wow! Day 5 was incredible with a lot of things! Well, let's getting started to analyze what happened.

As the goal of requirement is to micro management the users, a new context was introduced to our application. As consequence, the ability to complete a task also is needed, of course.

A new use case was added to control the new flow for the new runner (we could easily extend the existing runner to make this flow too, but we will hurt the SRP) making integration with the broker.

To keep the contexts distinct, the communication between them already was born asynchrony and by an external provider. In that way, we needed to create a consumer to work for the new context and this strategy brings complexity (not at all, compared to implementing a pub/sub internally), but for the other hand, it let all ready for the day that we need to split the service (maybe).
