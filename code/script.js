// Get the canvas element
import BirthChart from "./birthChart.js";

const canvas = document.getElementById('astrologyChart');
const context = canvas.getContext('2d');
const birthChart = new BirthChart(context, canvas);
