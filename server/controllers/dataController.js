// Handles data analysis and regime recommendations
exports.dataAnalysis = (Height, Weight, Age, Sex, ActivityLevel, StressLevel, MuscleDev) => {
    
    // Calculations and important fitness constants
    const BMI = (Weight / (Height * Height)).toFixed(1);
    const underweightBMI = 18.5;
    const overweightBMI = 25;
    const obeseBMI = 30;
    const pounds = Weight * 2.205;
    const inches = Height * 39.37;
    const caloriesMale = 66.5 + (13.8 * pounds) + (5 * inches) - (6.8 * Age);
    const caloriesFemale = 66.51 + (9.6 * pounds) + (1.9 * inches) - (4.7 * Age);
    const middleAgeBracket = 19;
    const upperAgeBracket = 65;
    const lowerAgeActivity = 420;
    const olderAgeActivity = 115;

    var activityStatus;
    var muscleStatus;
    var stressStatus;
    var BMIStatus;
    var caloryStatus;

    // Checks if user is young
    if(Age < middleAgeBracket){
        // Checks user's activity level
        switch(true){
            case (ActivityLevel < lowerAgeActivity):
                activityStatus = "NOT ACTIVE ENOUGH: Current UK guidelines suggest around 60 active minutes per day for your age range - (Suggested activity: A diverse array of different activites (sports, running, swimming, cycling) - these are essential for younger individuals)";
                break;
            case (ActivityLevel >= lowerAgeActivity):
                activityStatus = "GOOD ACTIVITY: Remember it is important that you ensure your activities throughout the week are diverse";
                break;
        }
        // Checks user's stress level
        switch(true){
            case (StressLevel == "low"):
                stressStatus = "SPECIFIED FITNESS NOT FOR MENTAL HEALTH: Don't forget that exercise can still be used to improve aspects such as goal-setting and socialising";
                break;
            case (StressLevel == "high"):
                stressStatus = "SPECIFIED FITNESS FOR MENTAL HEALTH: A minimum of 3-4, 20-30 minute sessions per week is suggested, for at least 8 weeks - (Suggested activity: Moderate intensity activities (walking, calm cycling, chores) more effective than vigorous activities)";
                break;
        }
        // Checks user's muscle development
        switch(true){
            case (MuscleDev == 0):
                muscleStatus = "NOT TRAINING MUSCLE: Due to your age, this is fine; however, muscle/resistance training is good to think about and is still benefitial - (Suggested activity: Small and safe resistance training (pull-ups, push-ups, low-weight dumbbells/kettlebells) and/or practice correct resistance training techniques)";
                break;
            default:
                muscleStatus = "MUSCLE TRAINING IS GOOD: Just remember to stay safe and know your limitations - ensure staying active throughout the week is your main priority as building muscle is less important for your age range";
        }
    }

    // Checks if user is an adult
    if(middleAgeBracket <= Age && Age < upperAgeBracket){
        // Checks user's activity level
        switch(true){
            case (ActivityLevel < olderAgeActivity):
                activityStatus = "NOT ACTIVE ENOUGH: Current UK guidelines suggest around 115 active minutes per week for your age range - (Suggested activity: Aim for a minimum of either 75 minutes of viguorous intensity activities (running, swimming, uphill cycling) or 150 minutes minutes of moderate intensity activities (brisk walking, hiking, dancing) - a mix of the two is preferable)";
                break;
            case (ActivityLevel >= olderAgeActivity):
                activityStatus = "GOOD ACTIVITY: Don't stop there! The UK's recommended 115 active minutes per week is a minimum and just a guideline";
                break;
        }
        // Checks user's stress level
        switch(true){
            case (StressLevel == "low"):
                stressStatus = "SPECIFIED FITNESS NOT FOR MENTAL HEALTH: Don't forget that exercise can still be used to improve aspects such as goal-setting and socialising";
                break;
            case (StressLevel == "high"):
                stressStatus = "SPECIFIED FITNESS FOR MENTAL HEALTH: A minimum of 3-4, 20-30 minute sessions per week is suggested, for at least 8 weeks - (Suggested activity: Studies suggest moderate intensity activities (walking, calm cycling, chores) is more effective than vigorous activities, although both can benefit your mental wellbeing)";
                break;
        }
        // Checks user's muscle development
        switch(true){
            case (MuscleDev < 2):
                muscleStatus = "NOT TRAINING MUSCLE ENOUGH: Current UK guidelines suggest adults require a minimum of 2 days a week training muscle - (Suggested activity: Diverse resistance training (free weights, body weight exercises, squats))";
                break;
            default:
                muscleStatus = "MUSCLE TRAINING IS GOOD: Remember to mix up your resistance training for overall strength and bone improvement. Keep safe by remembering your limitations";
        }

    }

    // Check if user is and elder
    if(upperAgeBracket <= Age){
        // Checks user's activity level
        switch(true){
            case (ActivityLevel < olderAgeActivity):
                activityStatus = "NOT ACTIVE ENOUGH: Current UK guidelines suggest around 115 active minutes per week for your age range - (Suggested activity: Aim for a minimum of either 75 minutes of viguorous intensity activities (running, swimming, uphill cycling) or 150 minutes minutes of moderate intensity activities (brisk walking, hiking, dancing) - due to your age range, it is recommended that you perform more weight-bearing activities to help maintain bone strength (walking, dancing, stair-climbing))";
                break;
            case (ActivityLevel >= olderAgeActivity):
                activityStatus = "GOOD ACTIVITY: Don't stop there! The UK's recommended 115 active minutes per week is just a guideline and a minimum. Try to partake in more weight-bearing activities to help your bone strength";
                break;
        }
        // Checks user's stress level
        switch(true){
            case (StressLevel == "low"):
                stressStatus = "SPECIFIED FITNESS NOT FOR MENTAL HEALTH: Don't forget that exercise can still be used to improve aspects such as goal-setting and socialising";
                break;
            case (StressLevel == "high"):
                stressStatus = "SPECIFIED FITNESS FOR MENTAL HEALTH: A minimum of 3-4, 20-30 minute sessions per week is suggested, for at least 8 weeks - (Suggested activity: Moderate intensity activities (walking, calm cycling, chores))";
                break;
        }
        // Checks user's muscle development
        switch(true){
            case (MuscleDev < 2):
                muscleStatus = "NOT TRAINING MUSCLE ENOUGH: Current UK guidelines suggest adults require a minimum of 2 days a week training muscle - (Suggested activity: Focus on improving and maintaining your balance and flexibility (step-up, simple grapevine, heel-to-toe walking). Include diverse, casual resistance training (free weights, comfortable body weight exercises) if you're confident enough)";
                break;
            default:
                muscleStatus = "MUSCLE TRAINING IS GOOD: Remember to mix up your resistance training and focus on your balance and flexibility. Keep safe by remembering your limitations";
        }
    }

    // Checks user's BMI
    switch(true){
        case (BMI <= underweightBMI):
            BMIStatus = "BMI: " + BMI + " (Underweight)";
            break;
        case (overweightBMI <= BMI && BMI < obeseBMI):
            BMIStatus = "BMI: " + BMI + " (Overweight)";
            break;
        case (BMI >= obeseBMI):
            BMIStatus = "BMI: " + BMI + " (Obese)";
            break;
        default:
            BMIStatus = "BMI: " + BMI + " (Healthy)"
    }

    // Checks what calory equation to use
    if(Sex == "Male"){
        caloryStatus = "Your average daily calorie intake should be " + caloriesMale.toFixed(0) + " calories";
    }
    if(Sex == "Female"){
        caloryStatus = "Your average daily calorie intake should be " + caloriesFemale.toFixed(0) + " calories";
    }
    
    // Returns regime as array
    return [activityStatus, muscleStatus, stressStatus, BMIStatus, caloryStatus];
}