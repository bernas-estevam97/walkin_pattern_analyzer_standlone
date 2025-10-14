const path = require('path');
require('dotenv').config({ path: './.env' });

module.exports = {
  packagerConfig: {
    icon: path.resolve(__dirname, 'libs/img/mouse-animal.ico'), // Make sure this is .ico for Windows
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        setupIcon: path.resolve(__dirname, 'libs/img/mouse-animal.ico'),
        // Optional: you can set iconUrl for the update installer (required for auto-updater)
        iconUrl: 'https://raw.githubusercontent.com/bernas-estevam97/walkin_pattern_analyzer/main/libs/img/mouse-animal.ico',
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'bernas-estevam97',
          name: 'walkin_pattern_analyzer',
        },
        prerelease: false,
        draft: true,
        authToken: process.env.GH_TOKEN,
      },
    },
  ],
};
