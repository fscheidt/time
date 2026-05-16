export const App = {
  version: __APP_VERSION__,
  webpage: "https://fscheidt.github.io/time/",
  repo: "https://github.com/fscheidt/time",
  status(){
    return {
      app: {
        version: this.version,
        page: this.webpage,
        github: this.repo,
      },
      device: {
        width: 0,
        height: 0
      },
    }
  },
}
export const configs = {
  autostart: false,
  minutes: 30,
}
