import React, {useEffect, useRef, useState} from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';

const MyStockChart = () => {
  const arrayOfArrays = [];
  const [selectButton, setSelectButton] = useState('');
  const [threshold, setThreshold] = useState(null);

  const formatYAxisLabel = (value) => {
    if (value >= 1e12) {
      return '$' + (value / 1e12).toFixed(1) + 'T'; // Convert to trillion
    } else if (value >= 1e9) {
      return '$' + (value / 1e9).toFixed(1) + 'B'; // Convert to billion
    } else {
      return '$' + value.toFixed(1); // Keep the original value
    }
  };

  const formatTooltipValue = (value) => {
    if (value >= 1e12) {
      return '$' + (value / 1e12).toFixed(2) + 'T'; // Convert to trillion
    } else if (value >= 1e9) {
      return '$' + (value / 1e9).toFixed(2) + 'B'; // Convert to billion
    } else {
      return '$' + value.toFixed(2); // Keep the original value
    }
  };

  const options = {
    scrollbar: {enabled: false},
    plotOptions: {},
    tooltip: {
      outside: true,
      split: false,
      shared: true,
      useHTML: true,
      headerFormat: '<span style="font-size:12px"><b>{point.x:%m/%d/%y %H:%M}</b></span><br/><br/>',
      pointFormatter: function () {
        return (
          '<p style="font-size:12px;margin:0px;padding-top:1px;padding-bottom:1px;color:' +
          this.series.color +
          ';">' +
          this.series.name +
          ' <strong>' +
          formatTooltipValue(this.y) + // Format the tooltip value
          '</strong></p>'
        );
      },
      valueDecimals: 2,
      backgroundColor: 'white',
      borderWidth: 0,
      style: {
        width: 150,
        padding: '0px',
      },
      shadow: false,
    },
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
          text: 'All',
          title: 'View all',
        },
      ],
    },
    navigator: {
      enabled: false,
    },
    yAxis: [
      {
        labels: {
          formatter: function () {
            return formatYAxisLabel(this.value);
          },
          format: '${value}T', // Add custom label to each tick
          style: {color: '#7A8291'},
        },
        opposite: false, // Place y-axis on the left side
      },
    ],
    xAxis: [
      {
        labels: {
          formatter: function () {
            const dataRange = this.axis.series[0].data;
            console.log('dataRange', this.chart.axes[0]);
            const firstDate = this.chart.axes[0].min;
            const lastDate = this.chart.axes[0].max;
            const dateDifference = Number(lastDate) - Number(firstDate);

            if (dateDifference >= 365 * 24 * 3600 * 1000) {
              // If the difference is greater than or equal to a year
              return Highcharts.dateFormat('%Y', Number(this.value)).toString();
            } else if (dateDifference >= 30 * 24 * 3600 * 1000) {
              // If the difference is greater than or equal to a month but less than a year
              return Highcharts.dateFormat('%B', Number(this.value)).toString();
            } else {
              // If the difference is greater than or equal to 1 day but less than a month
              return Highcharts.dateFormat('%A', Number(this.value)).toString();
            }
            //  else {
            //   // If the difference is less than 1 day, format as hours or minutes, depending on your preference
            //   return Highcharts.dateFormat('%H', Number(this.value)).toString();
            // }
          },
          style: {color: '#7A8291', fontSize: '10px', lineWidth: 100},
        },
      },
    ],
    series: [
      {
        type: 'line', // Specify the type as 'line'
        name: 'Market cap',
        color: 'rgb(27,200,135)',
        tooltip: {
          valuePrefix: '$',
          valueDecimals: 2,
        },
        zones: [
          {
            value: 1.1, // The value at which the color should change
            color: 'red', // Color to use below the threshold
          },
          {
            color: 'rgb(27,200,135)', // Color to use above the threshold
          },
        ],
      },
    ],
  };

  const chartComponentRef = useRef(null);

  useEffect(() => {
    // Fetch data from the URL
    chartComponentRef.current.chart.showLoading();
    fetch(`https://crypto-api-j8ea.onrender.com/market-cap?time_period=${selectButton}`)
      .then((response) => response.json())
      .then((data) => {
        const minValue = Math.min(...data.map((point) => point.y));
        const threshold = minValue - 1;
        setThreshold(threshold);
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
          chartComponentRef.current.chart.hideLoading();
        }
      });
  }, [selectButton]);

  useEffect(() => {
    const chart = chartComponentRef.current?.chart;

    const setCustomTimeRange = (event) => {
      console.log('its called', event.currentTarget.id);
      const id = event.currentTarget.id;
      setSelectButton(id);
      if (chart) {
        console.log('chart', chart);
        if (id == '1d') {
          chart.axes[0].setExtremes(
            Date.now() - 1 * 24 * 3600 * 1000,
            Date.now(), // Current time
          );
        } else if (id == '7d') {
          chart.axes[0].setExtremes(
            Date.now() - 7 * 24 * 3600 * 1000,
            Date.now(), // Current time
          );
        } else if (id == '1m') {
          chart.axes[0].setExtremes(
            Date.now() - 30 * 24 * 3600 * 1000,
            Date.now(), // Current time
          );
        } else if (id == '1y') {
          chart.axes[0].setExtremes(
            Date.now() - 12 * 30 * 24 * 3600 * 1000,
            Date.now(), // Current time
          );
        } else if (id == '2y') {
          chart.axes[0].setExtremes(
            Date.now() - 36 * 30 * 24 * 3600 * 1000,
            Date.now(), // Current time
          );
        } else if (id == 'all') {
          chart.xAxis[0].setExtremes(null, null);
        }
      }
    };

    // Add event listeners to custom buttons
    document.getElementById('1d')?.addEventListener('click', setCustomTimeRange);
    document.getElementById('7d')?.addEventListener('click', setCustomTimeRange);
    document.getElementById('1m')?.addEventListener('click', setCustomTimeRange);
    document.getElementById('1y')?.addEventListener('click', setCustomTimeRange);
    document.getElementById('2y')?.addEventListener('click', setCustomTimeRange);
    document.getElementById('all')?.addEventListener('click', setCustomTimeRange);

    console.log(document.getElementById('customButton1'));

    return () => {
      document.getElementById('1d')?.removeEventListener('click', setCustomTimeRange);
      document.getElementById('7d')?.removeEventListener('click', setCustomTimeRange);
      document.getElementById('1m')?.removeEventListener('click', setCustomTimeRange);
      document.getElementById('1y')?.removeEventListener('click', setCustomTimeRange);
      document.getElementById('2y')?.removeEventListener('click', setCustomTimeRange);
      document.getElementById('all')?.removeEventListener('click', setCustomTimeRange);
    };
  }, []);

  return (
    <div className='tableChild' style={{paddingLeft: 10}}>
      <StyledTableHeadParagraph>All Crypto Market Cap</StyledTableHeadParagraph>
      <StyledRangeSelectorButtonDiv>
        <StyledRangeSelectorButton id='1d' style={{backgroundColor: selectButton == '1d' ? 'white' : 'transparent'}}>
          1d
        </StyledRangeSelectorButton>
        <StyledRangeSelectorButton id='7d' style={{backgroundColor: selectButton == '7d' ? 'white' : 'transparent'}}>
          7d
        </StyledRangeSelectorButton>
        <StyledRangeSelectorButton id='1m' style={{backgroundColor: selectButton == '1m' ? 'white' : 'transparent'}}>
          1m
        </StyledRangeSelectorButton>
        <StyledRangeSelectorButton id='1y' style={{backgroundColor: selectButton == '1y' ? 'white' : 'transparent'}}>
          1y
        </StyledRangeSelectorButton>
        <StyledRangeSelectorButton id='2y' style={{backgroundColor: selectButton == '2y' ? 'white' : 'transparent'}}>
          2y
        </StyledRangeSelectorButton>
        <StyledRangeSelectorButton id='all' style={{backgroundColor: selectButton == 'all' ? 'white' : 'transparent'}}>
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

export default MyStockChart;

const StyledTableHeadParagraph = styled.div`
  font-family: Montserrat;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 25px;
  margin-top: 10px;
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