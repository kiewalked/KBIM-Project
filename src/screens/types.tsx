export interface Goal {
    frequency: "daily" | "weekly" | "monthly";
    freqDays: [boolean] | null;
    freqCount: number | null;
    quantity: number;
    description: string;
    category: string;
    categoryObj: exercise | sleep | diet | smoking
}

export interface exercise {
    kind: "exercise"
    intensity: "light" | "moderate" | "vigorous";
    measurement: "minutes" | "hours";
}

export interface sleep {
    kind: "sleep"
    measurement: "minutes" | "hours";
}

export interface diet {
    kind: "diet"
    measurement: "meals" | "water" | "alcohol"
}
export interface smoking {
    kind: "smoking"
    measurement: "cigarettes" | "puffs"
}
