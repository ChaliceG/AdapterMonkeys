# AdapterMonkeys
Demo of the adapter pattern for testable code

I gave a talk about the adapter pattern as a potential way to make unit testing easier, and this is the code I used to lead the discussion.  The program itself is a stupid monkey simulator.  You can run it by:

```shell
npm install
```

then

```shell
node index.js
```

I've seen many people fall into the trap of writing code directly coupled to an external dependency's API (in our case, its usually Entity Framework [yuck]).  This leads to having to mock the universe to test simple logic.  Adapters help you knock it before you mock it, and they help to separate access logic and business logic.
