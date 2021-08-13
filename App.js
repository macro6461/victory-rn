import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { VictoryBar, VictoryChart, VictoryArea, VictoryLine } from "victory-native";
import {Defs, LinearGradient, Stop} from "react-native-svg";
import RadioForm from 'react-native-simple-radio-button';

const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

const data = [
  { year: '2011', earnings: 13000 , fill: 'red'},
  { year: '2012', earnings: 16500 , fill: 'blue'},
  { year: '2013', earnings: 14250, fill: 'green' },
  { year: '2014', earnings: 19000, fill: 'pink'}
];

var radio_props = [
  {label: 'Bar', value: 0 },
  {label: 'Line', value: 1 },
  {label: 'Area', value: 2 }
];

var maxYear = 2015

const App = () => {

  const [chartData, setData] = useState(data)
  const [chart, setChart] = useState(0)
  
  const addData = () => {
    var d = [...chartData]
    var obj = {year: `${maxYear}`, earnings: Math.random() * (20000 - 10000) + 10000, fill: pickColor(d.length - 1) }
    d.push(obj)
    setData(d)
    maxYear++
  }

  const reset = () =>{
    setData(data)
    maxYear = 2015 
  }

  const genStops = () => {
    var percentage = 100 / chartData.length
    var stops = [<Stop key={0} offset="0%" stopColor={colorArray[0]}/>]
    chartData.forEach((x, i)=>{
      var stop = <Stop key={i+1} offset={`${percentage * (i + 1)}%`} stopColor={pickColor(i)}/>
      stops.push(stop)
    })
    return stops
  }

  const pickColor = (i) => {
    var index = indexHelper(i, colorArray.length)
    return colorArray[index]
  }

  const indexHelper = (a, b) => {
    return a >= b ? indexHelper(a - b, b) : a
  }

  const stops = genStops()

  // if you want colors for gradient to be static, replace {stops} inside <LinearGradient> with
  // <Stop offset="0%" stopColor="red"/>
  // <Stop offset="25%" stopColor="orange"/>
  // <Stop offset="50%" stopColor="gold"/>
  // <Stop offset="75%" stopColor="yellow"/>
  // <Stop offset="100%" stopColor="green"/>
  

  var MyChart = <VictoryBar data={chartData} 
                            x="year" 
                            y="earnings" 
                            animate={{
                              onLoad: {duration: 1000},
                              duration: 1000, 
                              easing: "bounce"
                            }}
                            style={{
                              data: {
                                fill: ({ datum }) => datum.fill || 'black'                             
                              }
                            }}
  />

  if (chart === 1){
    MyChart =  <VictoryLine data={chartData} 
                            x="year" 
                            y="earnings"  
                            animate={{
                              onLoad: {duration: 1000},
                              duration: 1000, 
                              easing: "bounce"
                            }}
                            style={{
                              data: {
                                stroke: 'purple',
                                strokeWidth: 3
                              }
                            }}
                />
  } else if (chart === 2){
    MyChart = <VictoryArea data={chartData} 
                            x="year" 
                            y="earnings"
                            animate={{
                              duration: 1000, 
                              easing: "bounce",
                              onLoad: {duration: 1000}
                            }}
                            style={{
                              data: {
                                fill: 'url(#gradientStroke)',
                                stroke: '#1E93FA',
                                strokeWidth: 2
                              }
                            }} 
              />
  }

  return (
    <View style={styles.container}>
       <Text style={styles.title}>Chart Type</Text>
       <RadioForm
          radio_props={radio_props}
          formHorizontal={true}
          labelHorizontal={false}
          buttonColor={'#2196f3'}
          onPress={(value) => setChart(value)}
        />
       <VictoryChart domainPadding={10} 
      //  animate={{duration: 1000}}
       >
         {/* GRADIENT FOR VictoryArea */}
         <Defs>
          <LinearGradient id="gradientStroke">
            {stops}
          </LinearGradient>
        </Defs>
          {MyChart}
        </VictoryChart>
        
        <Button onPress={addData} title="Add Earnings"/>
        <Button onPress={reset} title="Reset"/>
      </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  },
  title: {
    margin: 5
  }
})

export default App;
