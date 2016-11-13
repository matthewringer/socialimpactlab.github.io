---
layout: post
title: "Land titling visualized: Rapidly prototyping dashboards for action "
date: 2016-06-17 15:43:00
categories: blog
author: Sara Ku
---
In rural and low-resource contexts, low-cost technology, like SMS, can facilitate faster, cheaper data collection and reporting about government processes. As a result, a new question arises: how can we use this new data to help people understand complex processes, and to drive them to action?

Here at SIMLab, we recently explored this question with our [project](http://simlab.org/blog/2015/07/23/paper-houses-digital-homes/) in Odisha, India. For the past two years, in collaboration with the state government and Landesa, we’ve worked to develop and implement an SMS-based process tracking system to support a land titling program for rural and tribal villagers. The system was designed to make it easier for local reporting data to be submitted by lower level officials and aggregated for use by their managers.

In order to make this data more useful and actionable, we recently built a dashboard for district-level officials–known as collectors–to use the data. To provide a snapshot of land titling progress, the dashboard focuses only on two metrics:  number of households identified as landless and number of titles distributed to households. It displays this data in a simplified percent-to-goal format, color-coded and broken down by district and tahasil (administrative area within a district).

As a result, rather than waiting to receive updates every month, collectors can use the dashboard to see real-time updates of progress. In addition, collectors can use the dashboard to trace reports to individual government officials, helping them to identify underperformers early on and take corrective action.

Dashboards like these are simple ways to connect dynamic SMS data with richer visualizations. Moreover, they’re easy and inexpensive to build. We built ours with Google Sheets, and connected it to FrontlineCloud via an API connection. Without having to install anything, collectors can access and print dashboard screens, as well as the underlying granular data.

![dashboard]({{site.baseurl}}/images/post_images/dashboard_prototype.jpg)

We hope that, by informing decisions and driving actions, the dashboard will make it easier for collectors to oversee progress and push the land titling process forward. We also plan to explore alternative ways of sharing this information with others to expand transparency and accountability.

To learn more about the dashboard or to express interest in working with SIMLab in similar endeavors, drop us a line at <hello@simlab.org>!
