import notifee, { TimestampTrigger, TriggerType, TimeUnit, RepeatFrequency } from '@notifee/react-native';

const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: Date.now() + 5, // fire in 3 hours
    repeatFrequency: RepeatFrequency.WEEKLY, // repeat once a week
  };

  