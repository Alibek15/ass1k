
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  const filePath = path.join(__dirname, "../webTemplates/index.html");
  res.sendFile(filePath);
});



app.post("/Calculator", function(req, res){

var weight = Number(req.body.n1);
var height = Number(req.body.n2);
if ( isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
  res.send('Please enter valid values for weight, and height.');

} else{
  var value = weight / Math.pow(height / 100, 2);
  var resultHtml = `
      <div style="text-align: center; font-size: 25px; color: blue;">
      <p>Your BMI is ${value.toFixed(2)}</p>
      
    </div>
  `;
  res.send(resultHtml);

}

});

app.get("/bmicalculator", function(req, res) {
  const filePath = path.join(__dirname, "../webTemplates/bmicalculator.html");
  res.sendFile(filePath);
});
app.get("/Calculator", function(req, res) {
  const filePath = path.join(__dirname, "../webTemplates/calculator.html");
  res.sendFile(filePath);
});

app.post("/bmicalculator", function(req, res) {
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);
  var age = parseFloat(req.body.age);
  var units=req.body.units;
  var gender=req.body.gender;
  if (isNaN(age) || isNaN(weight) || isNaN(height) || age <= 0 || weight <= 0 || height <= 0) {
    res.send('Please enter valid values for age, weight, and height.');
  
  } else {

    if(age>20){

    const bmi = calculateBMI(units, weight, height);
    if (bmi < 18.5) {
      var resultHtml = `
      <div style="text-align: center; font-size: 25px; color: blue;">
      <p>Your BMI is ${bmi.toFixed(2)}</p>
      <p class="bmi-category" style="font-weight: bold;">Underweight</p>
    </div>
  `;
      res.send(resultHtml);
      
    } else if (bmi >= 18.5 && bmi < 24.9) {
      var resultHtml = `
      <div style="text-align: center; font-size: 25px; color: green;">
      <p>Your BMI is ${bmi.toFixed(2)}</p>
      <p class="bmi-category" style="font-weight: bold;">Normal weight</p>
    </div>
  `;
      res.send(resultHtml);
     
    } else if (bmi >= 25 && bmi < 29.9) {
      var resultHtml = `
      <div style="text-align: center; font-size: 25px; color: orange;">
      <p>Your BMI is ${bmi.toFixed(2)}</p>
      <p class="bmi-category" style="font-weight: bold;">Overweigth</p>
    </div>
  `;
      res.send(resultHtml);
     
    } else {
      var resultHtml = `
      <div style="text-align: center; font-size: 25px; color: red;">
      <p>Your BMI is ${bmi.toFixed(2)}</p>
      <p class="bmi-category" style="font-weight: bold;">Obese</p>
    </div>
  `;
      res.send(resultHtml);
     
    }
  }
  else{
    if(gender === 'male'){
      
      const bmiResult = calculateBMIForAge( weight, height, age, units);
      const bmi = bmiResult[0];

      const bmiPercentile = bmiResult[1];
     
      if (bmiPercentile < 5) {
        var resultHtml = `
        <div style="text-align: center; font-size: 25px; color: blue;">
        <p>Your BMI is ${bmi} and bmiPercentile ${bmiPercentile}</p>
        <p class="bmi-category" style="font-weight: bold;">Underweight</p>
      </div>
    `;
        res.send(resultHtml);
        
      } else if (bmiPercentile >= 5 && bmiPercentile <= 75) {
        var resultHtml = `
        <div style="text-align: center; font-size: 25px; color: green;">
        <p>Your BMI is ${bmi} and bmiPercentile ${bmiPercentile}</p>
        <p class="bmi-category" style="font-weight: bold;">Normal weight</p>
      </div>
    `;
        res.send(resultHtml);
       
      } else if (bmiPercentile > 75 && bmiPercentile < 95) {
        var resultHtml = `
        <div style="text-align: center; font-size: 25px; color: orange;">
        <p>Your BMI is ${bmi} and bmiPercentile ${bmiPercentile}</p>
        <p class="bmi-category" style="font-weight: bold;">Overweigth</p>
      </div>
    `;
        res.send(resultHtml);
       
      } else {
        var resultHtml = `
        <div style="text-align: center; font-size: 25px; color: red;">
        <p>Your BMI is ${bmi} and bmiPercentile ${bmiPercentile}</p>
        <p class="bmi-category" style="font-weight: bold;">Obese</p>
      </div>
    `;
        res.send(resultHtml);
       
      }
    }
    else{
      const bmiResult = calculateBMIForAgeGirls( weight, height, age, units);
      const bmi = bmiResult[0];

      const bmiPercentile = bmiResult[1];
     
      if (bmiPercentile < 5) {
        var resultHtml = `
        <div style="text-align: center; font-size: 25px; color: blue;">
        <p>Your BMI is ${bmi} and bmiPercentile ${bmiPercentile}</p>
        <p class="bmi-category" style="font-weight: bold;">Underweight</p>
      </div>
    `;
        res.send(resultHtml);
        
      } else if (bmiPercentile >= 5 && bmiPercentile <= 75) {
        var resultHtml = `
        <div style="text-align: center; font-size: 25px; color: green;">
        <p>Your BMI is ${bmi} and bmiPercentile ${bmiPercentile}</p>
        <p class="bmi-category" style="font-weight: bold;">Normal weight</p>
      </div>
    `;
        res.send(resultHtml);
       
      } else if (bmiPercentile > 75 && bmiPercentile < 95) {
        var resultHtml = `
        <div style="text-align: center; font-size: 25px; color: orange;">
        <p>Your BMI is ${bmi} and bmiPercentile ${bmiPercentile}</p>
        <p class="bmi-category" style="font-weight: bold;">Overweigth</p>
      </div>
    `;
        res.send(resultHtml);
       
      } else {
        var resultHtml = `
        <div style="text-align: center; font-size: 25px; color: red;">
        <p>Your BMI is ${bmi} and bmiPercentile ${bmiPercentile}</p>
        <p class="bmi-category" style="font-weight: bold;">Obese</p>
      </div>
    `;
        res.send(resultHtml);
       
      }
    }
  }
    
  }


 
});
function calculateBMI(units, weight, height) {
  if (units === 'metric') {
  
    return weight / Math.pow(height / 100, 2);
  } else {
    
    return (weight / Math.pow(height, 2)) * 703;
  }
}
app.listen(3000, function(req, res) {
  console.log("server start on port 3000");
});


const bmiPercentiles = {
  3: 14.5,
  5: 15.0,
  10: 16.2,
  25: 17.8,
  50: 19.5,
  75: 21.4,
  90: 23.2,
  95: 24.5,
  97: 25.5,
};

function calculateBMIForAge(weight, height, ageYears, units) {


  
  if (units === 'metric') {
  
    const bmi = (weight / Math.pow(height / 100, 2));
    let closestPercentile = Object.keys(bmiPercentiles)[0];
    let minDifference = Math.abs(bmi - bmiPercentiles[closestPercentile]);
  
    for (const percentile in bmiPercentiles) {
      const difference = Math.abs(bmi - bmiPercentiles[percentile]);
      if (difference < minDifference) {
        minDifference = difference;
        closestPercentile = percentile;
      }
    }
  
    return [bmi.toFixed(2), parseInt(closestPercentile)];
  } else {

    const bmi =  (weight / Math.pow(height, 2)) * 703;
    let closestPercentile = Object.keys(bmiPercentiles)[0];
    let minDifference = Math.abs(bmi - bmiPercentiles[closestPercentile]);
  
    for (const percentile in bmiPercentiles) {
      const difference = Math.abs(bmi - bmiPercentiles[percentile]);
      if (difference < minDifference) {
        minDifference = difference;
        closestPercentile = percentile;
      }
    }
  
    return [bmi.toFixed(2), parseInt(closestPercentile)];
  }
  
 


 
}

const bmiPercentilesGirls = {
  3: 14.0,
  5: 14.5,
  10: 15.5,
  25: 17.0,
  50: 18.5,
  75: 20.0,
  90: 21.5,
  95: 22.5,
};

// Function to calculate BMI-for-age percentile for girls under 20
function calculateBMIForAgeGirls(weight, height, ageYears, units) {
  if (units === 'metric') {
 
    const bmi = (weight / Math.pow(height / 100, 2));
    let closestPercentile = Object.keys(bmiPercentilesGirls)[0];
    let minDifference = Math.abs(bmi - bmiPercentilesGirls[closestPercentile]);
  
    for (const percentile in bmiPercentilesGirls) {
      const difference = Math.abs(bmi - bmiPercentilesGirls[percentile]);
      if (difference < minDifference) {
        minDifference = difference;
        closestPercentile = percentile;
      }
    }
  
    return [bmi.toFixed(2), parseInt(closestPercentile)];
  } else {
    
    const bmi =  (weight / Math.pow(height, 2)) * 703;
    let closestPercentile = Object.keys(bmiPercentilesGirls)[0];
    let minDifference = Math.abs(bmi - bmiPercentilesGirls[closestPercentile]);
  
    for (const percentile in bmiPercentilesGirls) {
      const difference = Math.abs(bmi - bmiPercentilesGirls[percentile]);
      if (difference < minDifference) {
        minDifference = difference;
        closestPercentile = percentile;
      }
    }
  
    return [bmi.toFixed(2), parseInt(closestPercentile)];
  }
}
