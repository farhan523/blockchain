import React, {useEffect, useRef, useState} from 'react';

import axios from 'axios';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';

const FearAndGreedChart = () => {
  const arrayOfArrays = [];
  const [selectBtnn, setSelectBtnn] = useState('');

  // Loop 100 times to create the arrays
  for (let i = 0; i < 100; i++) {
    // Generate the first index value (2014, 2016, 2018, or 2020)
    const year = 2014 + i * 2; // Start from 2014 and increment by 2
    const yearToSelect = [2014, 2016, 2018, 2020];

    // Generate the second index value (0, 1, 2, or 3)
    const value = i % 4; // Remainder of division by 4 (0, 1, 2, 3)

    // Push the pair of values into the array
    arrayOfArrays.push([yearToSelect[value], value]);
  }

  const options = {
    scrollbar: {enabled: false},
    rangeSelector: {
      enabled: false,
      selected: 1,
      buttonTheme: {
        fill: '#17E7D6',
        style: {
          color: 'black',
          borderRadius: 8,
        },
        inputStyle: {
          display: 'none',
        },
        labelStyle: {
          display: 'none',
        },
        states: {
          hover: {},
          select: {
            fill: 'white',
            style: {
              color: 'black',
            },
          },
          disabled: {
            style: {
              opacity: '0.6',
              color: 'black',
            },
          },
        },
      },
      buttons: [
        {
          type: 'day',
          count: 1,
          text: '1d',
          title: 'View 1 day',
        },
        {
          type: 'day',
          count: 7,
          text: '7d',
          title: 'View 7 days',
        },
        {
          type: 'month',
          count: 1,
          text: '1m',
          title: 'View 1 months',
        },
        {
          type: 'year',
          count: 1,
          text: '1y',
          title: 'View 1 year',
        },
        {
          type: 'year',
          count: 3,
          text: '3y',
          title: 'View 3 year',
        },
        {
          type: 'all',
          text: 'alll',
          title: 'View alll',
        },
      ],
    },
    navigator: {
      enabled: false,
    },
    yAxis: [
      {
        labels: {
          format: '${value}T', // Add custom label to each tick
          style: {color: '#7A8291'},
        },
        opposite: false, // Place y-axis on the left side
        plotLines: [
          {
            value: 120, // The value at which the plot line should appear
            width: 2, // Line width
            color: 'transparent',
            label: {
              text: 'Extreme fear', // Label text
              style: {
                color: '#7A8291',
              },
              align: 'left',
              y: -25, // Label position relative to the line
            },
          },
          {
            value: 140, // The value at which the plot line should appear
            width: 2, // Line width
            color: 'transparent',
            label: {
              text: 'Fear', // Label text
              style: {
                color: '#7A8291',
              },
              align: 'left',
              y: -25, // Label position relative to the line
            },
          },
          {
            value: 160, // The value at which the plot line should appear
            width: 2, // Line width
            color: 'transparent',
            label: {
              text: 'Neutral', // Label text
              style: {
                color: '#7A8291',
              },
              align: 'left',
              y: -25, // Label position relative to the line
            },
          },
          {
            value: 180, // The value at which the plot line should appear
            width: 2, // Line width
            color: 'transparent',
            label: {
              text: 'Greed', // Label text
              style: {
                color: '#7A8291',
              },
              align: 'left',
              y: -25, // Label position relative to the line
            },
          },
          {
            value: 200, // The value at which the plot line should appear
            width: 2, // Line width
            color: 'transparent',
            label: {
              text: 'Extreme Greed', // Label text
              style: {
                color: '#7A8291',
              },
              align: 'left',
              y: -25, // Label position relative to the line
            },
          },
        ],
      },
    ],
    xAxis: [
      {
        labels: {
          format: '{value}', // Add custom label to each tick
          style: {color: '#7A8291'},
        },
      },
    ],
    series: [
      {
        type: 'line', // Specify the type as 'line'
        name: 'Market cap',
        color: 'orange',
        tooltip: {
          valuePrefix: '$',
          valueDecimals: 2,
        },
      },
    ],
  };

  const chartComponentRef = useRef(null);

  useEffect(() => {
    // Fetch data from the URL
    const myHeaders = new Headers();
    myHeaders.append('X-CMC_PRO_API_KEY', 'a6383bf3-9367-4178-9c9b-8ae69394157c');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch('https://demo-live-data.highcharts.com/aapl-c.json', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // console.log('data', data);
        // Update the chart data when data is fetched
        if (chartComponentRef.current) {
          chartComponentRef.current.chart.update({
            series: [
              {
                type: undefined,
                data: data,
              },
            ],
          });
        }
      });
  }, []);

  useEffect(() => {
    const chart = chartComponentRef.current?.chart;
    console.log(chart);
    const setCustomTimeRange = (event) => {
      console.log('its called', event.currentTarget.id);
      const id = event.currentTarget.id;
      setSelectBtnn(id);
      if (chart) {
        if (id == '1ddd') {
          chart.axes[0].setExtremes(
            Date.now() - 1 * 24 * 3600 * 1000,
            Date.now(), // Current time
          );
        } else if (id == '7ddd') {
          chart.axes[0].setExtremes(
            Date.now() - 7 * 24 * 3600 * 1000,
            Date.now(), // Current time
          );
        } else if (id == '1mmm') {
          chart.axes[0].setExtremes(
            Date.now() - 30 * 24 * 3600 * 1000,
            Date.now(), // Current time
          );
        } else if (id == '1yyy') {
          chart.axes[0].setExtremes(
            Date.now() - 12 * 30 * 24 * 3600 * 1000,
            Date.now(), // Current time
          );
        } else if (id == '3yyy') {
          chart.axes[0].setExtremes(
            Date.now() - 36 * 30 * 24 * 3600 * 1000,
            Date.now(), // Current time
          );
        } else if (id == 'allll') {
          chart.axes[0].setExtremes(null, null);
        }
      }
    };

    // Add event listeners to custom buttons
    document.getElementById('1ddd')?.addEventListener('click', setCustomTimeRange);
    document.getElementById('7ddd')?.addEventListener('click', setCustomTimeRange);
    document.getElementById('1mmm')?.addEventListener('click', setCustomTimeRange);
    document.getElementById('1yyy')?.addEventListener('click', setCustomTimeRange);
    document.getElementById('3yyy')?.addEventListener('click', setCustomTimeRange);
    document.getElementById('allll')?.addEventListener('click', setCustomTimeRange);

    console.log(document.getElementById('customButton1'));

    return () => {
      document.getElementById('1ddd')?.removeEventListener('click', setCustomTimeRange);
      document.getElementById('7ddd')?.removeEventListener('click', setCustomTimeRange);
      document.getElementById('1mmm')?.removeEventListener('click', setCustomTimeRange);
      document.getElementById('1yyy')?.removeEventListener('click', setCustomTimeRange);
      document.getElementById('3yyy')?.removeEventListener('click', setCustomTimeRange);
      document.getElementById('allll')?.removeEventListener('click', setCustomTimeRange);
    };
  }, []);

  return (
    <div className='tableChild' style={{paddingLeft: 10}}>
      <StyledTableHeadParagraph>Fear And Greed Index</StyledTableHeadParagraph>
      <StyledRangeSelectorButtonDiv>
        <StyledRangeSelectorButton id='1ddd' style={{backgroundColor: selectBtnn == '1ddd' ? 'white' : 'transparent'}}>
          1d
        </StyledRangeSelectorButton>
        <StyledRangeSelectorButton id='7ddd' style={{backgroundColor: selectBtnn == '7ddd' ? 'white' : 'transparent'}}>
          7d
        </StyledRangeSelectorButton>
        <StyledRangeSelectorButton id='1mmm' style={{backgroundColor: selectBtnn == '1mmm' ? 'white' : 'transparent'}}>
          1m
        </StyledRangeSelectorButton>
        <StyledRangeSelectorButton id='1yyy' style={{backgroundColor: selectBtnn == '1yyy' ? 'white' : 'transparent'}}>
          1y
        </StyledRangeSelectorButton>
        <StyledRangeSelectorButton id='3yyy' style={{backgroundColor: selectBtnn == '3yyy' ? 'white' : 'transparent'}}>
          3y
        </StyledRangeSelectorButton>
        <StyledRangeSelectorButton
          id='allll'
          style={{backgroundColor: selectBtnn == 'allll' ? 'white' : 'transparent'}}
        >
          all
        </StyledRangeSelectorButton>
      </StyledRangeSelectorButtonDiv>
      {/* <button id='customButton1'>Click</button> */}
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'} // Use 'stockChart' constructor
        options={options}
        ref={chartComponentRef}
        height={341}
      />
    </div>
  );
};

export default FearAndGreedChart;

const StyledTableHeadParagraph = styled.div`
  font-family: Montserrat;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 25px;
  margin-top: 10px;
  color: #112455;
`;

const StyledRangeSelectorButtonDiv = styled.div`
  width: 236px;
  height: 30px;
  border-radius: 8px;
  background-color: rgba(23, 231, 214, 0.4);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 15px;
`;

const StyledRangeSelectorButton = styled.div`
  width: 30px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #112455;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 12px;
  border-radius: 8px;
  cursor: pointer;
`;