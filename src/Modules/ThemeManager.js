class ThemeManager {
    constructor(body) {
      this.body = body;
    }
  
    changeTheme(themeClass) {
      this.body.classList.remove(
        "pomodoro-timer",
        "short-break-timer",
        "long-break-timer"
      );
      this.body.classList.add(themeClass);
    }
  }
  
  export default ThemeManager;