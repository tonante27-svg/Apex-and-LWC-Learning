//Cron Expressions
//String cronExpression = '0 0 10 * * ? *'; // Runs daily at 10 AM
//System.schedule('Daily 10am Job Test', cronExpression, new BasicScheduableJob());
//1. Run Everyday at Midnight
// String cronExpression  = '0 0 0 * * ? *'; 
// System.schedule('Daily Midngiht Job Test', cronExpression, new BasicScheduableJob());
//.2 Runa job every hour
// String cronExpression  = '0 0 * ? * * *'; 
// System.schedule('Hourly Job Test', cronExpression, new BasicScheduableJob());
//.3 Run a job every Monday @ 9:00 AM
// String cronExpression  = '0 0 9 ? * MON *'; 
// System.schedule('Monday 9:00 AM Job Test', cronExpression, new BasicScheduableJob());
//.4 Run a job every Monday - Friday @ 8:00 AM
// String cronExpression  = '0 0 8 ? * MON-FRI *'; 
// System.schedule('Monday Thru Friday  8:00 AM Job Test', cronExpression, new BasicScheduableJob());
//.5 Run a job on 1st Day of every month  @ 6:30 AM
// String cronExpression  = '0 30 6 1 * ? *'; 
// System.schedule('1st Day of every month  @ 6:30 AM Job Test', cronExpression, new BasicScheduableJob());
//.6 Run a job on 15th Day of every month  @ 2:00 AM
// String cronExpression  = '0 0 14 15 * ? *'; 
// System.schedule('15th Day of every month  @ 2:00 AM Job Test', cronExpression, new BasicScheduableJob());
//.7 Run a job on last day of every month @ 11 PM
// String cronExpression  = '0 0 23 L * ? *'; 
// System.schedule('Last Day of Every Month  @ 11:00 PM Job Test', cronExpression, new BasicScheduableJob());
//.8 Run a job on 1st Monday day of every month @ 10:00 AM
// String cronExpression  = '0 0 10 ? * MON#1 *'; 
// System.schedule('1st Monday day of every month @ 10:00 AM Job Test', cronExpression, new BasicScheduableJob());
//.8 Run a job on 1st Monday day of every month @ 10:00 AM
// String cronExpression  = '0 0 10 ? * MON#1 *'; 
// System.schedule('1st Monday day of every month @ 10:00 AM Job Test', cronExpression, new BasicScheduableJob());
//.8 Run a job on 1st Monday day of every month @ 10:00 AM
// String cronExpression  = '0 0 10 ? * MON#1 *'; 
// System.schedule('1st Monday day of every month @ 10:00 AM Job Test', cronExpression, new BasicScheduableJob());
//9. Run a job  in January daily @ 9:00 AM
// String cronExpression  = '0 0 9 * JAN ? *'; 
// System.schedule('Run in January daily @ 9:00 AM. Job Test', cronExpression, new BasicScheduableJob());
//9. Run a job  in January daily @ 9:00 AM
// String cronExpression  = '0 0 9 * JAN ? *'; 
// System.schedule('Run in January daily @ 9:00 AM. Job Test', cronExpression, new BasicScheduableJob());
//10. Run a job  quarterly (January,Apr daily @ 1:00 AM on 1st of Date.
// String cronExpression  = '0 0 1 1 JAN,APR,JUL,OCT ? *'; 
// System.schedule('Run a job  quarterly  - January,Apr,Jul,Oct - daily @ 1:00 AM. Job Test', cronExpression, new BasicScheduableJob());

//11. Run a job every 5 minutes: YOU NEED MULTIPLE JOB SCHEDULES
// String cronExpression  = '0 00 * * * ? *'; // 60 minutes /5 = 12 schedules
// String cronExpression2='0 05 * * * ? *';'
// System.schedule('00th Minute Schedule. Job Test', cronExpression, new BasicScheduableJob());
// System.schedule('05th Minute Schedule Job Test', cronExpression2, new BasicScheduableJob());
// System.schedule('10th Minute Schedule Job Test','0 10 * * * ? *', new BasicScheduableJob());
// System.schedule('15th Minute Schedule Job Test','0 15 * * * ? *', new BasicScheduableJob());
// System.schedule('20th Minute Schedule Job Test','0 20 * * * ? *', new BasicScheduableJob());
// System.schedule('25th Minute Schedule Job Test','0 25 * * * ? *', new BasicScheduableJob());
// System.schedule('30th Minute Schedule Job Test','0 30 * * * ? *', new BasicScheduableJob());
// System.schedule('35th Minute Schedule Job Test','0 35 * * * ? *', new BasicScheduableJob());
// System.schedule('40th Minute Schedule Job Test','0 40 * * * ? *', new BasicScheduableJob());
// System.schedule('45th Minute Schedule Job Test','0 45 * * * ? *', new BasicScheduableJob());
// System.schedule('50th Minute Schedule Job Test','0 50 * * * ? *', new BasicScheduableJob());
// System.schedule('55th Minute Schedule Job Test','0 55 * * * ? *', new BasicScheduableJob());
//Tracking Scheduled Job s using Queries
ID jobId = System.schedule('55th Minute Schedule Job Test','0 55 * * * ? *', new BasicScheduableJob());
