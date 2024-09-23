# CST438_Project1_Grp1

Group 1's project is based on the API, PokeAPI, to help the user build a Pokemon team from an index of various pokemon. In our app, the user can search for different Pokemon along with its information.

API: https://pokeapi.co/

Contributers:
Caitlin Susbilla (caitlinsusbilla https://github.com/caitlinsusbilla)
Adrian Haro (aharo1110 https://github.com/aharo1110)
Sabino Galindo (SGalindo831 https://github.com/SGalindo831)
Enrique Rangel(EnRangel https://github.com/EnRangel)

# Project 01 Retrospective and overview

[Video Walkthrough](https://www.youtube.com/watch?v=-XN4EinF01U) 

[Github Repo](https://github.com/caitlinsusbilla/CST438_Project1_Grp1)

## Overview
This is a Pokemon team making app that makes use of the PokeAPI we found[here](https://pokeapi.co/).

We got styling help for this document from [this guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## Introduction

* The communication between the members was managed through slack and in person.
* We originally considered 16 stories with each member trying to complete 1 a week.
* We completed 13 stories by the end of the project as a group.

## Team Retrospective

### Enrique Rangel

1. [a link to your pull requests](https://github.com/caitlinsusbilla/CST438_Project1_Grp1/pulls?q=is%3Apr+is%3Aclosed+author%3AEnRangel)
2. [a link to your issues](https://github.com/caitlinsusbilla/CST438_Project1_Grp1/issues?q=is%3Aissue+is%3Aclosed+author%3AEnRangel)

#### What was your role / which stories did you work on
My role in the group was to set up the navigation and make sure everything was working when moving around the app, fixing some bugs that we came across that broke react native, and setting up the my party page. 
+ The biggest challenge was setting up the environment as we had a lot of problems getting it to work correctly, which had us behind for a week or so.
+ This was a challenge because without it we couldn’t really start the project, and we addressed it by having everyone working on it and looking up online what the issues could be for why we couldn’t get it working. We eventually figured out what the problem was but it was by the end of the first week, so we didn’t get a lot of coding done at first.
+ My favorite part of this project was the pokedex which allows the user to look at all the pokemon in the API. It came out looking very nice and stylish from the start and was a part of the project that almost didn’t change at all, because we all agreed that it came out looking good the first time.
+ If I could do it all over again, I would like to have the leaderboard page working to allow users to interact with each other by showing each other what everyone's teams look like. We also would have added a voting system that would allow you to like another person's party, which is what would have given it the leaderboard name.
+ What is the most valuable thing I learned from this project was how to work with react native as it seems this is an environment that is very popular in the industry. But also getting more experience working with git and github in a group setting, was nice as the whole industry works in groups for the most part.

### Sabino Galindo
1. Carol's pull requests are [here](https://github.com/caitlinsusbilla/CST438_Project1_Grp1/pulls?q=is%3Apr+is%3Aclosed+author%3ASGalindo831)
2. Carol's Github issues are [here](https://github.com/caitlinsusbilla/CST438_Project1_Grp1/issues?q=is%3Aissue+is%3Aclosed+author%3ASGalindo831)

#### What was your role / which stories did you work on
My role was to get the database working. I used a SQLite wrapper to set up the database. I also set up the functionality to pull information from the PokeAPI. I also helped with some of the app styling and theme.
	
+ The biggest challenge was getting the database to work. I’ve worked with online databases before but never a local database. Using SQLite was not super hard to figure out but just trying to save to the device was the challenge. 
+ The reason it was really frustrating was mainly due to dealing with the login Id for the user. When a user would sign in and use the pokedex, it would reset the user id. I realized that I was using more of an online database approach, thinking that the user was saved automatically throughout the whole app. I created a separate userId util;ity that would save the Id throughout the user’s session. After signing out it will save any activity specifically to the user id that was signed in to the database.
+ My favorite part was just the overall building of the app. Using React Native was really fun and easy to get a hold of (mainly once you got the environment going). I really enjoy web development so it was very similar when dealing with React Native.
+ If we could do it over again, I would add a leaderboard where users can vote on a team. Also displaying more information for the pokemon would have been a great feature to add.
+ The most valuable thing I learned was the process of github and the steps needed to take when developing an app. I used github in previous classes but pushing, pulling, creating issues, pull requests, etc. was all new to me. At first I was annoyed with this process but it really enlightened me on how keeping this documentation can help the development process. Keeping things organized and having a history of development is great to have so you can pinpoint previous versions and problems that may cause other future problems in development.

### Adrian Haro
1. Carol's pull requests are [here](https://github.com/caitlinsusbilla/CST438_Project1_Grp1/pulls?q=is%3Apr+is%3Aclosed+author%3Aaharo1110)
2. Carol's Github issues are [here](https://github.com/caitlinsusbilla/CST438_Project1_Grp1/issues?q=is%3Aissue+is%3Aclosed)

#### What was your role / which stories did you work on
My role in the group ended up being getting the profile page to work, and allowing the user to see everyone’s Pokemon through the database.

+ The biggest challenge was probably fixing the different bugs while I was working on my parts of the project. Other than that, it would have to be getting used to React Native and how it works.
+ The bugs are important to fix because if I don’t, then plenty of key functionality will simply not exist or not work. It also took us a long time to set up our React Native environments so that stopped us from working on features for a while. On both of these challenges we simply worked together and powered through.
+ My favorite part of the project is the way the Pokedex works. It ended up looking quite simple yet elegant. Also the way the parties work is excellent.
+ Ideally if I could restart this project I would add stuff like a leaderboard system, which we didn’t have time to add. We couldn’t really add something like that which would allow users to interact with each other’s Pokemon.
+ The most valuable thing I learned was that finding a rhythm is as important in SW development as in many other fields. Once you have a good sense of what you need to do you can accomplish things much better than if you’re just winging everything. This is important stuff when moving up from hobby projects to more serious projects.

### Caitlin Susbilla
1. [https://github.com/caitlinsusbilla/CST438_Project1_Grp1/pulls?q=is%3Apr+is%3Aclosed+author%3Acaitlinsusbilla](https://github.com/caitlinsusbilla/CST438_Project1_Grp1/pulls?q=is%3Apr+is%3Aclosed+author%3Acaitlinsusbilla)
2. [https://github.com/caitlinsusbilla/CST438_Project1_Grp1/issues?q=is%3Aissue+is%3Aclosed+author%3Acaitlinsusbilla](https://github.com/caitlinsusbilla/CST438_Project1_Grp1/issues?q=is%3Aissue+is%3Aclosed+author%3Acaitlinsusbilla)

#### What was your role / which stories did you work on
My role was to contribute to the login and create all of the tests for our screens

+ The biggest challenge was everyone getting on the same page when starting on react. It was especially a challenge for me because my package.json had different versions. Another challenge was setting up and learning jest
+ It took longer than expected, delaying other issues and preventing us from starting earlier. The different versions and compatibility was a setback because our programs would crash due to my project merging with my teammates. For jest, i also had difficulty downloading the correct versions because they were not automatically downloaded. Testing the API took me awhile to figure out. I had a lot trouble trying to get a few tests to run due to rendering a compatibility issues
+ Learning how to use/set up another framework even though we were still creating an android app. Finding out different ways to displays/animations for the user to see when the use interacts.
+ I think our team would have been more confident and more of our stories would be completed if we spent less time trying to figure out how to set up react.
+ The most valuable thing I learned was adapting to use another framework while collaborating.
## Conclusion

- In conclusion we would say the project was successful as we originally set out to create an app that could search, add/delete Pokemon, and create an account for each new user. Even with some hurdles in the way, the end result was what we originally envisioned. The largest victory for the group was setting up react native and getting it to work in everyone's computer, and the database working so teams could be formed with the API. Overall our project started off on a bad foot as we couldn’t get react native working for a couple of days, but in the end we were able to complete what we originally wanted to do with the project. Even if we couldn’t add any extra functionalities due to time constraints we still delivered what we originally planned as the base.
