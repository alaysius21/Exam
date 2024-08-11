# Quickli Code Challenge

Welcome and thanks for taking the challenge!

You've got 4 hours - read this document carefully and then get cracking 🤘

We hope you enjoy the exercise, this is pretty reflective of the work you'll be doing with us at Quickli (we hope).
The main difference is that (1) we have _many_ calculators, (2) we've been hacking at them for 2 years, and (3) we've built a fairly extensive system around them.

We are looking for someone who can grapple with maths, is a confident programmer, and can express their ideas clearly.

I'm looking forward to seeing what you come up with!

Cheers,

Angus (Co-founder / Co-CEO)

p.s. This code challenge was whipped up in a few hours more than 2 years ago, yes it's pretty rough around the edges but I think it's still a good introduction to what we do at Quickli.

## ⚡️ Context

Mortgage brokers use servicability calculators like this when they are trying to work out how much someone can borrow.
Each lender has their own calculator. They are availabile only to licensed mortgage brokers. CBA's is widely regarded as the easiest to use. Lenders vary widely in risk related policy so these calculators can vary in results quite a bit. The calculators are frequently updated, usually minor changes in rates but sometimes substantial structural changes occur too.

Our mission is to bring all of these calculators together onto one platform with a high level of accuracy to give brokers a much better picture of the borrowing capacity landscape. This will allow brokers to work more efficiently and give their clients better advice.

We have reverse engineered and re-implemented them in a TypeScript backend. Our calculators have only been in the wild for 18 months but they have been battle tested by thousands of brokers and hundreds of thousands of home loans.

Accuracy is a big deal, this thing needs to be spot on.

## ⚡️ Submission

_(please don't fuck up the github stuff, it's going to make our lives easy if you do this properly)_

Create a private repo in GutHub and initialise this folder as the initial commit on `master`

Start a new branch to work on, call it whatever you want, e.g. `code-challenge`, `milestone-1`, ...

Invite the following GitHub users to this repo as collaborators, we will be evaluating your submission

- anguskeatinge
- karlomedallo
- legaspicary
- riqts
- ryankusanto
- ZhouZ-1

Please make regular, meaninfgul, and bite sized (if possible) commits. It's not ideal if you just have one big commit at the end.

When your 4 hours is up, create a PR from your branch into `master` and request a review from all 4 collaborators (if we've accepted the invite)

Please write a good PR description that summarises what you achieved and where you got up to

Send an email with the PR link to angus@quickli.com.au, ryan@quickli.com.au, karlo@quickli.com.au, jacko@quickli.com.au, zhou@quickli.com.au, and cary@quickli.com.au

If you want to do more work after the 4 hour mark, feel free to do so, but make sure to do it in a new branch and PR

## ⚡️ Task

Your task is to implement the CBA calculator in JS.

Please make note of any assupmtions you are making and any questions you need answered.

Please spend only 4 hours on this task.

### 🔥 Milestones / Expectations

To set the expectation, you should at least reach the first milestone within 4 hours. Some of the milestone are fairly small and some are more significant. I don't _really_ expect anyone to finish the whole calc in 4 hours.

If you can achieve any more milestones... Fantastic!

You should not hard code anything unreasonable, i.e. you should be able to change the figures and still get an accurate result. (you can test this by having your calculator open alongside the spreadsheet)

You should build and add test cases as you go.

#### 💥 1) Vanilla Scenario

The first scenario should get accurate results, i.e. running: `node checkCalc.js 0` should print `Success!`

#### 💥 2) Income Types

1. Add to overtime, pensions, and tax free income for the applicant's income in the spreadsheet
2. Create an additional scenario in scenarios.json to reflect the change
3. Create an additional result object in results.json to reflect the change
4. Update your calculator to return accurate results

#### 💥 3) Liabilities

Add a credit card loan and personal loan and repeat the above process

#### 💥 4) Minimum Living Expenses

Drop living expenses to $1 and add 2 dependants (you must implement a HEM table for this)

#### 💥 5) Investment Property

Add a rental property as an existing investment loan (you need to enter data in two places for this)

#### 💥 6) Self Employed

Add a self employed income

#### 💥 7) Multiple Households and Applicants

Add a household and an applicant and share the rental income, investment ownership, and self employed business 50 / 50

## ⚡️ Materials

- `CBA_HL_simulator` - this is an old version of CBA's serviceability calculator, I've loaded a test scenario into it
- `CBA servicing notes` - this is some random policy information that has been copy-pasted from CBA's broker portal
- `CBACalc.js` - this is where the calculator implementation lives
- `checkCalc.js` - this is the script that tests the accuracy of your calculator
- `scenarios.json` - these are the test scenarios, we've given you an example of a relatively complex financial sceanrio, you should probably add some simpler scenarios to start (e.g. 1 applicant, 1 loan, no rentals...)
- `results.json` - we've stubbed out the results for a single empty scenario, you need to input your scenario into the excel sheet to generate relevant results (hint: don't make typos!)

## ⚡️ References

- Reference: https://www.homeloanexperts.com.au/ - this is probably the most comprehensive resource on home loans and mortgage broking around. Even mortgage brokers frequent this website when they need to research something. To start, you should look up HEM and shading rates.
