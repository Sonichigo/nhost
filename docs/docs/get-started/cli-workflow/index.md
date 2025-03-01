---
title: 'CLI from Zero to Production'
---

In the previous tutorials, we tested various parts of Nhost, such as:

- Database
- GraphQL API
- Permission
- JavaScript SDK
- Authentication

All changes we did to our database and API happened directly in production of our Nhost app.

It's not ideal for making changes in production because you might break things, which will affect all users of your app.

Instead, it's recommended to make changes and test your app locally before deploying those changes to production.

To do changes locally, we need to have a complete Nhost app running locally, which the Nhost CLI does.

The Nhost CLI matches your production application in a local environment, this way you can make changes and test your code before deploying your changes to production.

## Recommended workflow with Nhost

1. Develop locally using the Nhost CLI.
2. Push changes to GitHub.
3. Nhost automatically applies changes to production.

## What you'll learn in this guide:

- Use the Nhost CLI to create a local environment
- Connect a GitHub repository with a Nhost app
- Deploy local changes to production
