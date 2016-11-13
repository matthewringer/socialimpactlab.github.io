---
layout: page
title: BayLegal Emergency Text System (BETS)
---

The BayLegal Emergency Text System (BETS) is a simple all-staff announcement tool for emergencies. It enables BayLegal administrators to send staff-wide announcements over text message when other communications tools may be unavailable. It is **NOT** intended as a tool for summoning help in an emergency.

## Setup
BETS uses two manually-created contact groups in FrontlineCloud: Admin and Staff. 

Members of the Admin group are permitted to *send* messages via BETS, and members of the Staff group will *receive* messages sent through BETS. 


## Use
To use the system, an Admin group member sends a text to the BETS number that starts with the word **ALL**. FrontlineCloud will relay the remainder of the message to members of the Staff and Admin groups.

For example, an Admin sending the message:

> All The Oakland office is closed tomorrow.

Will result in the Admin and Staff group members receiving the message:

> The Oakland office is closed tomorrow.

Messages that do not begin with **ALL** will not be forwarded.


## Registration
At the moment, registration must be done manually. In FrontlineCloud, you can select contacts and add them to a group in the people tab. First, select the contacts and hit "Edit Selected"

![SMS](../images/bets_edit_group.jpg)

Then, select the group to add the selected contacts to.

![SMS](../images/bets_add_to_group.jpg)

