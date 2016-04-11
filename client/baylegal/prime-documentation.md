---
layout: page
title: BayLegal (2015) Documentation
---
### Activating SMS messages
SMS messages are activated automatically via Prime. The FrontlineSMS system provides alternate ways of automating messages, which can be configured via the FrontlineSMS documentation. This documentation will cover the systems developed for the 2015 TIG project.

### Prime Integration
We have built an integration that allows SMS-based appointment reminders and surveys to be dispatched directly from Prime.

The core of this integration is a public function, callFrontline()
This function takes the following arguments, in this order:

* **name** - Client's full name
* **cell** - Client's cell number. It must take the form of +14445556666 (no dashes or spaces, and prepended with the +1 country code)
* **isSms** - True/False value for whether phone number can accept SMS.
* **hasAppointment** - True/False value for whether client has appointment
* **apptDate** - Appointment Date, in Medium Date (mm/dd/yyyy) format. If not applicable, this should be replaced with an empty string ("").
* **apptTime** - Appointment Time, in hh:mm AM/PM format. If not applicable, this should be replaced with an empty string ("").
* **problem** - Problem code
* **office** - Office location for appointment. If not applicable, this should be replaced with an empty string ("").
* **survey** - Name of survey to be activated in FrontlineSMS. This is a lowercase word, such as "appointment" that corresponds to a preset survey.
* **surveyDelay** - Delay, in days, before survey is sent. Default is 0.
* **extraNote** - An extra note to be sent to client.

You must pass all arguments to the function whenever it is called. To not include an argument, pass it as a blank string: "".

### Connecting Prime to FrontlineCloud
The callFrontline() function in Prime is hardcoded with the URL and FrontlineCloud API key. If at any point you need to provision a new API key

#### API Payload in FrontlineCloud
FrontlineCloud accepts incoming requests in JSON. It has two required fields: apiKey and payload. The variables in the above function are passed in via payload, which accepts arbitrary keys and values.

```
  {
    'apiKey': 'YOUR API KEY HERE',
    'payload':
      {
        'key': 'value',
        'foo': 'bar',
        ...
      }
  }
```

In configuring recipes, payload values are called with the FLang syntax trigger.payload.key.

## Appointment Reminders
If the hasAppointment flag is true, FrontlineSMS will create an appointment reminder. This reminder will fire twice: once upon creation, and once one business day before the scheduled appointment. Appointment reminders require the following variables:

```
cell: '+19175551234', [must include +1]
hasSMS: true
hasAppointment: true
apptDate: mm/dd/yyyy
apptTime: hh:mm AM/PM
office: name of office
problem: [optional problem code]
```

### Initial reminder
Immediately upon activating the appointment reminder, the client will receive the following SMS messages:

>Appointment confirmed for [Appointment Date] at [Appointment Time] at our [Office Name] office.

>Our office is located at [Office Address].

>To reschedule or cancel your appointment, please call [BayLegal Office Phone].

>Text REMIND to get this information again.

### Reminder Loops
One business day before the scheduled appointment, the client will receive another reminder, with the same content as above.

### Subsequent Appointments
A client can only have one appointment at a time. So, if an appointment is rescheduled, a client will receive a new confirmation, and a reminder one business day prior to the **new** appointment only.

### Office Data
Appointments are required to have offices. New offices can be created in userData, with keys named in the format "[Office Name] Address" (e.g. "Oakland Address"). The "office" string passed to callFrontline() must match the office prefix in the userData--strings are case sensitive.
![office]({{site.baseurl}}/images/baylegal/office-addresses.png)


## Client Notes
To send an arbitrary message to the client, pass it in the extraNote variable. Frontline will immediately send an SMS to the cell number given.

Required variables:

```
cell: '+19175551234', [must include +1]
extraNote: string
```

## Surveys
Your FrontlineCloud customization allows you to send surveys to clients. Surveys can contain yes/no or multiple choice questions. A survey is called by its name, which is a **unique lowercase string**. Surveys can also be called with delays, which are measured in days. For example, the following payload would send the survey titled "alpha" to the client in one day:

```
cell: '+19175551234', [must include +1]
survey: 'alpha',
surveyDelay: 1
```

### Creating or modifying surveys.
Surveys can be created or modified in the userData. Each survey has the key "Questions {survey name}" (e.g., "Questions alpha", "Questions beta").

A survey is a simple text entry. Separate questions with line breaks. By default, questions will be Yes/No questions. To add a multiple choice question, add choices in [brackets] after the question (but on the same line), separated by semicolons. For example:

```
How satisfied are you with your service? [not satisfied; satisfied; very satisfied]
```

Will automatically be formatted to read:

>How satisfied are you with your service?

>1 - not satisfied
>2 - satisfied
>3 - very satisfied



## Client Data
Client data can be found in the "People" menu, both for individual contacts, and aggregate filtered views. This includes survey responses, past appointments, and message histories. You can use the "Export" button to export datasets to CSV.
![client data]({{site.baseurl}}/images/baylegal/client-data.png)
