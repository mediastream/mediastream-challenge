# Question 1
My solution is on performance:
`O(n * m) + O(m * log(m)) + O(3)`
where `n` is the number of users and `m` is the number of different hats, and that is equal to something like:
`O(m * (n + log(m)))`
but I'm not 100% sure that that is the correct way to express it.

And is `O(m)` in space because I created an object with an element for each different hat.

# Question 2
`requester` function returns a promise that is used to issue requests of method `method` to a server of host `base` and headers `headers`. The function also needs a parameter path which should be an array and is joined with `base` (if it is defined) to form a path to which issue the request.

I can't help but notice that the defined internal function is missing it's body parameter
so you can't really send POSTs with body using that function, so I created a `properRequester`
function that does send a `body` and added an example.

I dont't know how this pattern of a function that returns a function is called

# Question 3
I used streams because its a more efficient way to read large collections because it keeps a cursor on the data and only fetches it when node asks for it.

# Question 4
I don't know react so I was told to left this blank.