---
layout: page
title: BayLegal (2016) FrontlineCloud Documentation
---

## Navigating FrontlineCloud
Although most of the day-to-day management of this integration will be done in your case management system, from time to time you may need to manage FrontlineCloud. 

The most up-to-date documentation for FrontlineCloud can be found on their support page. 

This documentation will cover:

* Exporting and managing data
* Editing survey questions
* Editing activities (recipes)
* Managing phone number connections

## Data Management
FrontlineCloud stores most data against individual contacts. This means that if you visit a contact in Frontline, you'll see their most recently scheduled appointment, most recent answers to survey questions, and so on. 
![client data]({{site.baseurl}}/images/baylegal/client-data.png)

The recipes in this integration will modify client data automatically. Manually editing client data is straightforward (click the 'Edit' button on a contact page), but beyond the scope of this documentation.  

Here, we'll cover filtering data and exporting it.

### Filtering Data - Smart Groups
Frontline uses groups to organize select contacts. "Smart Groups" use simple rules to automatically filter contacts, while "Groups" must be manually managed (or managed by recipes). 

![client data]({{site.baseurl}}/client/baylegal/images/People.jpg)

#### Creating Smart Groups
To create a new Smart Group, hit the + button next to the "Smart Groups" label.

![client data]({{site.baseurl}}/client/baylegal/images/Smart-Groups.jpg)

The right-hand side overlay will let you define a set of rules. Contacts that satisfy ALL of the rules will automatically be included in the group. 

In the example below, we've created a smart group for Clients associated with the Napa County office. 

![client data]({{site.baseurl}}/client/baylegal/images/Built-Smart-Group.jpg)

To edit a smart group's rules, click the "Edit Group" button.

### Exporting Data
You can export nearly all the data FrontlineCloud generates. 

Messages can be exported from the "Inbox" tab, using the "Export all" button. Selecting a subset of messages will change this button to "Export selected".

![client data]({{site.baseurl}}/client/baylegal/images/export-messages.jpg)

Contacts can be exported from the People tab, or from any Groups or Smart Groups. Exporting from within a group will only export contacts from that group.

After selecting your file type (CSV or PDF), you'll see a notification that your export is being prepared. 

![export notification]({{site.baseurl}}/client/baylegal/images/export-notification.jpg)

The notification will change to a download link when the export is prepared. You'll also receive an email when the export is ready for download.

![export complete]({{site.baseurl}}/client/baylegal/images/export-complete.jpg)

#### Managing CSV Files
FrontlineCloud will export data in CSV (comma separated values) files, which are text files that can be imported into Excel. For more on how to do this, please see [this Microsoft help file](https://support.office.com/en-us/article/Import-or-export-text-txt-or-csv-files-5250ac4c-663c-47ce-937b-339e391393ba).

> Note: You may need to make sure that the exported file has a CSV file extension. If you're opening a CSV file for the first time in Windows, your computer may prompt you to choose a program to open CSV files in. When prompted to do this, navigate to Excel, and check the box that reads "always use this program to open files of this type" 