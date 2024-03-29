const POMODORO = 'POMODORO';
const SHORT_BREAK = 'SHORT_BREAK';
const LONG_BREAK = 'LONG_BREAK';

const CONFIG = {
  [POMODORO]: { time: 0.1 * 60 * 1000, themeId: "pomodoro-break-timer" },
  [SHORT_BREAK]: { time: 5 * 60 * 1000, themeId: "short-break-timer" },
  [LONG_BREAK]: { time: 15 * 60 * 1000, themeId: "long-break-timer" },
};

export { POMODORO, SHORT_BREAK, LONG_BREAK };
export default CONFIG;
