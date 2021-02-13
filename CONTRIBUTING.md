# Contributing

Thanks for being willing to contribute! First time contributing? Please mention it in your pull request and I'll be happy to  help !

**Working on your first Pull Request?** You can learn how from this _free_
series [How to Contribute to an Open Source Project on GitHub][egghead]

## Project setup

1.  Fork and clone the repo
2.  Run `npm install` to install dependencies
3. Run `npm run test` to make sure you cloned a stable release. This will run tests.
4.  Create a branch for your PR with `git checkout -b pr/your-branch-name`

> Tip: Keep your `master` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream https://github.com/bahdcoder/buycoins-sdk.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```
>
> This will add the original repository as a "remote" called "upstream," Then
> fetch the git information from that remote, then set your local `master`
> branch to use the upstream master branch whenever you run `git pull`. Then you
> can make all of your pull request branches based on this `master` branch.
> Whenever you want to update your version of `master`, do a regular `git pull`.

## Common scripts
When working on the code base, please keep these scripts in mind:

1. `npm run prettier`. This should be run everytime you want to commit. This makes sure the code format stays consistent.
2. `npm run build`. Make sure your code can actually build before submitting a pull request.
3. `npm run commit`. In order to keep the conventional commits convention on this repository, please use this script to commit your work. CI will fail if you have the wrong commit format.

## Committing and Pushing changes

Please make sure to run the tests before you commit your changes. You can run
`npm run test` which will update any snapshots that need updating. Make
sure to include those changes (if they exist) in your commit.

## Help needed

Please checkout the [the open issues][issues]

Also, please watch the repo and respond to questions/bug reports/feature
requests! Thanks!

[egghead]:
  https://app.egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
[all-contributors]: https://github.com/all-contributors/all-contributors
[issues]: https://github.com/bahdcoder/buycoins-sdk/issues
