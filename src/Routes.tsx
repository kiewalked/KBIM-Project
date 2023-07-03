export type Routes = {
    Home: undefined,
    DailyHealth: {
      date?: string;
    },
    PhysicalActivity: {
      date?: string
    },
    Diet: {
      date?: string
    },
    Sleep: {
      date?: string
    },
    SleepInput: {
      date?: string
    },
    Goals: undefined,
    Settings: undefined,
    Exercise: {
      date?: string
    },
    Camera: {
      index: Number,
      date?: string,
    },
    Media: {
      path: string,
      index: Number,
      date?: string,
    },
    History: {
      date: string,
    },
    Statistics: undefined,
    NotificationSettings: undefined,
    Login: undefined,
    Signup: undefined,
    GoalAddition: undefined,
    Export: undefined
};
