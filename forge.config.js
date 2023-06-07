module.exports = {
  packagerConfig: {
    icon: './libs/img/mouse-animal'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        setupIcon: './libs/img/setup-icon.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
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
            name: 'walkin_pattern_analyzer'
          },
          prerelease: false,
          draft: true
        }
      }
    ]
  };
