export const ValidationRules = {
  Service: {
    Description: {
      maxLength: 250,
    },
    Tag: {
      maxLength: 20,
      minLength: 2,
      maxCount: 10,
      minCount: 1
    },
    Duration: {   // in minutes
      max: 715,   // 11h 55m
      min: 6, // > 5
      step: 5
    }
  }
}