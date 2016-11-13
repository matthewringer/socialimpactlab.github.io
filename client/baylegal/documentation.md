---
layout: fullwidth
headerimage: "/images/header/services_header.png"
---

# BayLegal (2015) Documentation - Legal Advice Line

## What is it?
As part of a TIG project, we have developed an integration from BayLegal's case management system ("Prime") to FrontlineCloud. This integration enables BayLegal staff to send SMS-based appointment reminders and closing surveys.

## Appointment Reminders
To send an SMS appointment reminder to a client, navigate to the "Intake page 2" tab on the Client form in Prime. There, you'll find a button on the bottom row: "SMS Reminder". Click it.

![SMS]({{site.baseurl}}/images/baylegal/baylegal_smsreminder1.jpg)

You'll then be taken to a second form; some of the fields are already populated.

![SMS]({{site.baseurl}}/images/baylegal/baylegal_smsreminder2.jpg)

You'll need to fill in the rest of the fields, including an optional extra note. Please note that if the client's mobile number is not "Safe", FrontlineCloud will not send any text messages to that number.

Hit "Send SMS Reminder" when you're done. You'll get an alert that says "success", which indicates that FrontlineCloud has received the request.


### Initial reminder
Within a minute or so of activating the appointment reminder (the messages are spaced out by a few seconds to ensure they arrive in the correct order), the client will receive the following SMS messages:

>Appointment confirmed for [Appointment Date] at [Appointment Time] at our [Office Name] office.

>Our office is located at [Office Address].

>To reschedule or cancel your appointment, please call [BayLegal Office Phone].

>Text REMIND to get this information again.

>[Extra Reminder Note, if applicable]


### Reminder Loops
One business day before the scheduled appointment, the client will receive another reminder, with the same content as above.

### Subsequent Appointments
A client can only have one appointment at a time. So, if an appointment is rescheduled, a client will receive a new confirmation, and a reminder one business day prior to the **new** appointment only.

## Surveys
Your FrontlineCloud customization allows you to send surveys to clients. A survey is a short SMS exchange of yes/no or multiple-choice questions&mdash;usually three to five.

### Closing Survey
To send a closing survey, navigate to the "Intake Page 3" tab on the Client form, and hit "Send Closing Survey". Make sure that you have a mobile number listed for your client, and that the number has been marked safe.

![SMS]({{site.baseurl}}/images/baylegal/baylegal_smssurvey1.jpg)

You'll see a pop-up box when the information has successfully been passed to FrontlineCloud.
