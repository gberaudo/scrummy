# Specs

## Main view

As the Scrum Leader I want to:
- see an overview of active projects in the last 2 months and their leaders (SM, PO);
- detect which one have issues and see their health evolution;
- see ratio of SCRUM and non-Scrum projects.
- click on a project to reach the Project view

https://codepen.io/ojame/pen/HpKvx
https://codepen.io/Shywim/pen/xXYror


## Project view

As the Scrum Leader I want to see details about a given project.
As a Scrum Master I want to see stats about my project.

- Pass &project=$name as URL parameter to reach the project view
- See all sprints in antichronological order
- See Velocity evolutions, variance.
- See team size evolution.
- See the project health indicator and its evolutions;
- Have automatic advices or better, list what is wrong an leave open the remedy:
  - if total >> delivered && no grooming advice for it;
  - if happyness is durably low, propose discussions
  - no record and project is not terminated
