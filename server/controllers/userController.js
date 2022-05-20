const db = require('../../dbConnection');
const session = require('express-session');
const analysis = require('./dataController');

// Handles main viewing of user hub
exports.view = (req, res) => {
    // Checks if health data exists for user
    db.promise().query("SELECT * FROM HealthData WHERE userID = '" + session.userID + "'").then(([rows]) => {
        if(rows.length>0){
            const [Height, Weight, Age, Sex, ActivityLevel, StressLevel, MuscleDev] = [rows[0].height, rows[0].weight, rows[0].age, rows[0].sex, rows[0].activityLevel, rows[0].stressLevel, rows[0].muscleDev];
            // Sets regime variable to personalised regime
            let regime = analysis.dataAnalysis(Height, Weight, Age, Sex, ActivityLevel, StressLevel, MuscleDev);
            var stressLevelBool = stress(StressLevel);
            // Pushes variables to handlebar expressions
            res.render('user', {activityMessage: regime[0], 
                                muscleMessage: regime[1], 
                                stressMessage: regime[2], 
                                BMIMessage: regime[3], 
                                caloryMessage: regime[4], 
                                message: session.infoMessage, 
                                currentHeight: "Current height: " + Height + "m",
                                currentWeight: "Current weight: " + Weight + "kg",
                                currentAge: "Current age: " + Age + " y/o",
                                currentSex: "Current sex: " + Sex,
                                currentActivityLevel: "Current minutes per week spent active: " + ActivityLevel + " minutes",
                                currentMuscleDev: "Current days per week training muscle: " + MuscleDev + " days",
                                currentStressLevel: "Currently using exercise for mental wellbeing: " + stressLevelBool});
        }
        else {
            res.render('user', {message: "Enter your health data to get started", activityMessage: "(User data required for custom regime)"});
        }
    })
};

// Converts database StressLevel value to yes/no
stress = (StressLevel) => {
    if(StressLevel == "high"){
        StressLevel = "Yes"
    }
    else{
        StressLevel = "No"
    }
    return StressLevel;
}

// Handles how application reacts to inputted data
exports.inputData = (req, res) => {
    // Sets inputted values to variables
    const {Height, Weight, Age, Sex, ActivityLevel, MuscleDev, StressLevel} =  req.body;
    // Checks if health data exists for user
    db.promise().query("SELECT * FROM HealthData WHERE userID = '" + session.userID + "'").then(([rows2]) => {
        if(rows2.length>0){
            // Sets variables to new values or previous values if field left blank by user
            var upHeight = Height || rows2[0].height;
            var upWeight = Weight || rows2[0].weight;
            var upAge = Age || rows2[0].age;
            var upSex = Sex || rows2[0].sex;
            var upActivityLevel = ActivityLevel || rows2[0].activityLevel;
            var upStressLevel = StressLevel || rows2[0].stressLevel;
            var upMuscleDev = MuscleDev || rows2[0].muscleDev;

            // Inputs variables to database
            db.promise().query(`UPDATE HealthData SET height = '${upHeight}', weight = '${upWeight}', age = '${upAge}', sex = '${upSex}', activityLevel = '${upActivityLevel}', stressLevel = '${upStressLevel}', MuscleDev = '${upMuscleDev}' WHERE userID = '${session.userID}'`);
            session.infoMessage = "Health data updated succesfully";
            res.redirect('/user');
        }
        else{
            // Checks if form fully completed by new user
            if(Height && Weight && Age && Sex && ActivityLevel && StressLevel && MuscleDev != null){
                // Inputs variables to database
                db.promise().query(`INSERT INTO HealthData (userID, height, weight, age, sex, activityLevel, stressLevel, MuscleDev) VALUES ('${session.userID}', '${Height}', '${Weight}', '${Age}', '${Sex}', '${ActivityLevel}', '${StressLevel}', '${MuscleDev}')`);
                session.infoMessage = "Health data updated succesfully";
                res.redirect('/user');
            }
            else{
                res.render('user', {message: "Please complete full form"});
            }
        }
    })
};