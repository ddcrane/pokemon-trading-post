const cron = require('node-cron');
/*

    node-cron: https://www.npmjs.com/package/node-cron

    syntax:

        cron.schedule('cron_expression', () => {function}, {options});

    cron_expression syntax:

        ┌────────────── second (optional)
        │ ┌──────────── minute
        │ │ ┌────────── hour
        │ │ │ ┌──────── day of month
        │ │ │ │ ┌────── month
        │ │ │ │ │ ┌──── day of week
        │ │ │ │ │ │
        │ │ │ │ │ │
        * * * * * *

    sample - every day at 0 hour:

        cron.schedule(
            '* * 0 * * *',
            () => {
                // function
            },
            {   
                // options
                scheduled: true,
                timezone: "America/Chicago"
            }
        );

*/

// Check Pokemon API every 24 hrs and update database
cron.schedule(
    '* * 0 * * *',
    () => {
        updateCards();
    },
    {   
        timezone: "America/Chicago"
    }
);