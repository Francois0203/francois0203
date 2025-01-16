const stats = {
  totalVisits: 0,
  backendLoads: 1,  // Starts with 1 as backend is loaded at startup.
  routesAccessed: {},
  uniqueUsers: new Set(),  // For tracking unique users (based on IP)
  mostAccessedRoute: { route: "", count: 0 },
  routeResponseTimes: {},  // For tracking the average response time of each route
  errorCount: 0  // For counting errors
};

module.exports = (req, res, next) => {
  // Increment total visits only if it's a new visit (from a new user)
  const userIP = req.ip; // For simplicity, using IP as unique user identifier
  if (!stats.uniqueUsers.has(userIP)) {
    stats.uniqueUsers.add(userIP);
    stats.totalVisits += 1;  // Increment only for new user visits
  }

  // Track route access and response times
  stats.routesAccessed[req.path] = (stats.routesAccessed[req.path] || 0) + 1;

  // Track the most accessed route
  if (stats.routesAccessed[req.path] > stats.mostAccessedRoute.count) {
    stats.mostAccessedRoute = { route: req.path, count: stats.routesAccessed[req.path] };
  }

  // Track response time per route
  const startTime = Date.now();
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    stats.routeResponseTimes[req.path] = stats.routeResponseTimes[req.path]
      ? (stats.routeResponseTimes[req.path] + responseTime) / 2
      : responseTime;
  });

  // Error handling
  res.on('error', () => {
    stats.errorCount += 1;
  });

  next();
};

// Increment backend loads on app start
// Expose stats for use in other modules
module.exports.stats = stats;