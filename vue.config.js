module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'production' ? true : false,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      builderOptions: {
        appId: "com.kfr.app",
        productName: "music-app", //项目名，也是生成的安装文件名，即aDemo.exe
        copyright: "Copyright © 2023", //版权信息
        directories: {
          output: "./dist_electron" //输出文件路径
        },
        win: {
          target: [{
            target: 'nsis',
            arch: ['ia32', 'x64']
          }]
        },
        nsis: {
          oneClick: false, // 一键安装
          perMachine: true, // 为所有用户安装
          allowElevation: true, // 允许权限提升, 设置 false 的话需要重新允许安装程序
          allowToChangeInstallationDirectory: true, // 允许更改安装目录
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单
          deleteAppDataOnUninstall: true,
        }
      }
    }
  }
}