// config-overrides.js
module.exports = function override(config, env) {
  // override devServer config jika sedang menjalankan "start"
  if (env === "development") {
    config.devServer = {
      ...config.devServer,
      allowedHosts: "all", // <--- Fix di sini
    };
  }

  return config;
};
