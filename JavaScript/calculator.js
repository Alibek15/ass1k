
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  const filePath = path.join(__dirname, "../webTemplates/index.html");
  res.sendFile(filePath);
});


// challenge Calculator
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
  if (isNaN(age) || isNaN(weight) || isNaN(height) || age <= 0 || weight <= 0 || height <= 0) {
    res.send('Please enter valid values for age, weight, and height.');
  
  } else {
    // Perform BMI calculation and display result
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


 
});
function calculateBMI(units, weight, height) {
  if (units === 'metric') {
    // Metric units
    return weight / Math.pow(height / 100, 2);
  } else {
    // Imperial units
    return (weight / Math.pow(height, 2)) * 703;
  }
}
app.listen(3000, function(req, res) {
  console.log("server start on port 3000");
});