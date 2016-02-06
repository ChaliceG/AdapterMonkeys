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


There has been some interesting discussion about the adapter pattern as a prime example of "test driven damage": 

* http://david.heinemeierhansson.com/2014/test-induced-design-damage.html
* http://martinfowler.com/articles/is-tdd-dead/

I have to admit I did exactly what David has called out as the problem--using a design pattern specifically for testing's sake.  While I tend to agree with his more pragmatic approach to testing, I do think its O.K. to alter system design to enable testing, and the adapter pattern is a useful tool to have if you're trying to build business logic surrounded by hairy external dependencies.
