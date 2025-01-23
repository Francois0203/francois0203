const schedule = require("node-schedule");
const { stats } = require("../middleware/statsTracker");
const emailService = require("./email");

const scheduleWeeklyStatsEmail = () => {
  // Change cron expression to send email every minute
  schedule.scheduleJob("* * * * *", async () => {
    console.log("Email scheduling triggered...");

    // Prepare the stats in a well-formatted, easy-to-read manner
    const statsReport = `
      ------------------------------ Stats Report ------------------------------
      
      Total Visits: ${stats.totalVisits}
      Backend Loads: ${stats.backendLoads}
      
      Routes Accessed:
      ${Object.entries(stats.routesAccessed)
        .map(([route, count]) => `  - ${route}: ${count} visit(s)`)
        .join("\n")}
      
      Unique Users: ${stats.uniqueUsers.size}
      
      Most Accessed Route:
      ${stats.mostAccessedRoute.route} (${stats.mostAccessedRoute.count} visit(s))
      
      Average Response Times per Route:
      ${Object.entries(stats.routeResponseTimes)
        .map(([route, avgTime]) => `  - ${route}: ${avgTime.toFixed(2)} ms`)
        .join("\n")}
      
      Errors Encountered: ${stats.errorCount}
      
      ---------------------------------------------------------------------------
    `;
    
    console.log("Sending email...");

    try {
      await emailService.sendEmail(
        process.env.PERSONAL_EMAIL,
        "Stats Report",
        statsReport
      );
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  });
};

module.exports = { scheduleWeeklyStatsEmail };