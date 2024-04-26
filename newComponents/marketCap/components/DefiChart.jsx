import React, {useEffect, useRef, useState} from 'react';

import axios from 'axios';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';

import caretDownSolid from '../../../public/images/caret-down-solid.svg';
import Image from 'next/image';

const VolumeChart= () => {
  const arrayOfArrays = [];
  const [selectBtnDefi, setSelectBtnDefi] = useState('');
  const [chainFilter, setChainFilter] = useState('all');
  const [blockChains, setBlockChains] = useState([]);
  const [chartFilter, setChartFilter] = useState(['TVL']);

  const formatYAxisLabel = (value) => {
    if (value >= 1e12) {
      return '$' + (Math.round(value) / 1e12).toFixed(1) + 'T'; // Convert to trillion
    } else if (value >= 1e9) {
      return '$' + (value / 1e9).toFixed(0) + 'B'; // Convert to billion
    } else if (value >= 1e6) {
      return '$' + (value / 1e6).toFixed(0) + 'M'; // Convert to million
    } else if (value >= 1e5) {
      return '$' + (value / 1e5).toFixed(0) + 'L'; // Convert to lacs (hundreds of thousands)
    } else if (value >= 1e3) {
      return '$' + (value / 1e3).toFixed(0) + 'K'; // Convert to thousands
    } else {
      return '$' + value.toFixed(0); // Keep the original value
    }
  };

  const formatTooltipValue = (value) => {
    if (value >= 1e12) {
      return '$' + (Math.round(value) / 1e12).toFixed(1) + 'T'; // Convert to trillion
    } else if (value >= 1e9) {
      return '$' + (value / 1e9).toFixed(0) + 'B'; // Convert to billion
    } else if (value >= 1e6) {
      return '$' + (value / 1e6).toFixed(0) + 'M'; // Convert to million
    } else if (value >= 1e5) {
      return '$' + (value / 1e5).toFixed(0) + 'L'; // Convert to lacs (hundreds of thousands)
    } else if (value >= 1e3) {
      return '$' + (value / 1e3).toFixed(0) + 'K'; // Convert to thousands
    } else {
      return '$' + value.toFixed(0); // Keep the original value
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (value) => {
    setChainFilter(value);
    setIsOpen(false);
  };

  const toggleChartFilter = (chain) => {
    let chartFilterCopy = structuredClone(chartFilter);
    if (chartFilter.includes(chain)) {
      chartFilterCopy = chartFilterCopy.filter(function (item) {
        return item !== chain;
      });
      setChartFilter(chartFilterCopy);
      return;
    }
    chartFilterCopy.push(chain);
    setChartFilter(chartFilterCopy);
  };
  const options = {
    scrollbar: {enabled: false},
    rangeSelector: {
      enabled: false,
      selected: 1,
    },
    navigator: {
      enabled: false,
    },
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
    yAxis: [
      {
        labels: {
          formatter: function () {
            return formatYAxisLabel(this.value);
          },
          format: '${value}B', // Add custom label to each tick
          style: {color: 'purple'},
        },
        opposite: false, // Place y-axis on the left side
      },
      {
        labels: {
          formatter: function () {
            return formatYAxisLabel(this.value);
          },
          format: '${value}B', // Add custom label to each tick
          style: {color: 'green'},
        },
        opposite: false, // Place y-axis on the left side
      },
      {
        labels: {
          formatter: function () {
            return formatYAxisLabel(this.value);
          },
          format: '${value}B', // Add custom label to each tick
          style: {color: 'orange'},
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
            } else if (dateDifference > 30 * 24 * 3600 * 1000) {
              // If the difference is greater than or equal to a month but less than a year
              return Highcharts.dateFormat('%B', Number(this.value)).toString();
            } else if (dateDifference > 2 * 24 * 3600 * 1000 && dateDifference < 8 * 24 * 3600 * 1000) {
              // If the difference is greater than one day but less then 8 days means 7 days at max
              return Highcharts.dateFormat('%A', Number(this.value)).toString();
            } else if (dateDifference > 24 * 3600 * 1000) {
              // If the difference is greater than or equal to 1 day and more then 7 days
              return Highcharts.dateFormat('%m/%d/%y', Number(this.value)).toString();
            } else {
              // If the difference is less than 1 day, format as hours or minutes, depending on your preference
              return Highcharts.dateFormat('%H:%M', Number(this.value)).toString();
            }
          },
          style: {color: '#7A8291', fontSize: '10px', lineWidth: 100},
        },
      },
    ],
    series: [
      {
        yAxis: 0,
        type: 'spline', // Specify the type as 'line'
        name: 'Stablecoins Mcap',
        color: 'purple',
        tooltip: {
          valuePrefix: '$',
          valueDecimals: 2,
        },
      },
      {
        yAxis: 1,
        type: 'spline', // Specify the type as 'line'
        name: 'TVL',
        color: 'green',
        tooltip: {
          valuePrefix: '$',
          valueDecimals: 2,
        },
      },
      {
        yAxis: 2,
        type: 'column', // Specify the type as 'line'
        name: 'Volume',
        color: 'orange',
        tooltip: {
          valuePrefix: '$',
          valueDecimals: 2,
        },
      },
    ],
  };

  const chartComponentRef = useRef(null);

  // useEffect(() => {
  //   // Fetch data from the URL
  //   const myHeaders = new Headers();
  //   myHeaders.append('X-CMC_PRO_API_KEY', 'a6383bf3-9367-4178-9c9b-8ae69394157c');

  //   const requestOptions = {
  //     method: 'GET',
  //     headers: myHeaders,
  //   };

  //   const config = {
  //     method: 'get',
  //     maxBodyLength: Infinity,
  //     url: 'https://stablecoins.llama.fi/stablecoincharts/all',
  //     headers: {},
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log('defi', JSON.stringify(response.data));
  //       const data = response.data;
  //       const Data = data.map((item: any) => {
  //         return [
  //           item.date * 1000,
  //           item.totalCirculatingUSD.peggedUSD / 1e9, // Convert TVL to billion dollars
  //         ];
  //       });

  //       if (chartComponentRef.current) {
  //         chartComponentRef.current.chart.series[0].update({
  //           type: 'spline',
  //           data: Data,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   axios
  //     .get('https://api.llama.fi/v2/historicalChainTvl')
  //     .then((response) => {
  //       const data = response.data;
  //       const tvlData = data.map((item: any) => [
  //         item.date * 1000, // Convert Unix timestamp to milliseconds
  //         item.tvl / 1e9, // Convert TVL to billion dollars
  //       ]);

  //       if (chartComponentRef.current) {
  //         chartComponentRef.current.chart.series[1].update({
  //           type: 'spline',
  //           data: tvlData,
  //         });
  //       }

  //       // setTopGainers(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching tvl data:', error);
  //     });

  //   axios
  //     .get(
  //       'https://api.llama.fi/overview/dexs?excludeTotalDataChart=false&excludeTotalDataChartBreakdown=true&dataType=dailyVolume',
  //     )
  //     .then((response) => {
  //       const data = response.data;
  //       const volumeData = data.totalDataChart.map((item: any) => {
  //         return [
  //           item[0] * 1000, // Convert Unix timestamp to milliseconds
  //           item[1], // Convert TVL to billion dollars
  //         ];
  //       });

  //       if (chartComponentRef.current) {
  //         chartComponentRef.current.chart.series[2].update({
  //           type: 'bar',
  //           data: volumeData,
  //         });
  //       }

  //       console.log('tvlB', volumeData);
  //       // setTopGainers(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching volume Defi data:', error);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get(
        'https://api.llama.fi/overview/dexs?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyVolume',
      )
      .then((response) => {
        const data = response.data;
        console.log('allchains', data);
        const chainData = data.allChains.map((item) => ({
          name: item,
          url: `https://icons.llamao.fi/icons/chains/rsz_${item}?w=48&h=48`,
        }));

        setBlockChains(chainData);
      })
      .catch((error) => {
        console.error('Error fetching chain data:', error);
      });
  }, []);

  useEffect(() => {
    const chart = chartComponentRef.current?.chart;
    const setCustomTimeRange = (event) => {
      console.log('its called', event.currentTarget.id);
      const id = event.currentTarget.id;
      setSelectBtnDefi(id);
      console.log(id, 'chartz filter');
      if (chart) {
        if (id == '1D') {
          chart.axes[0].setExtremes(
            Date.now() - 24 * 3600 * 1000,
            Date.now(), // Current time
          );
        } else if (id == '7D') {
          chart.axes[0].setExtremes(
            Date.now() - 7 * 24 * 3600 * 1000,
            Date.now(), // Current time
          );
        } else if (id == '1M') {
          chart.axes[0].setExtremes(
            Date.now() - 30 * 24 * 3600 * 1000,
            Date.now(), // Current time
          );
        } else if (id == '1Y') {
          chart.axes[0].setExtremes(
            Date.now() - 12 * 30 * 24 * 3600 * 1000,
            Date.now(), // Current time
          );
        } else if (id == '3Y') {
          chart.axes[0].setExtremes(
            Date.now() - 36 * 30 * 24 * 3600 * 1000,
            Date.now(), // Current time
          );
        } else if (id == 'aLL') {
          chart.axes[0].setExtremes(null, null);
        }
      }
    };

    // Add event listeners to custom buttons
    document.getElementById('1D')?.addEventListener('click', setCustomTimeRange);
    document.getElementById('7D')?.addEventListener('click', setCustomTimeRange);
    document.getElementById('1M')?.addEventListener('click', setCustomTimeRange);
    document.getElementById('1Y')?.addEventListener('click', setCustomTimeRange);
    document.getElementById('3Y')?.addEventListener('click', setCustomTimeRange);
    document.getElementById('aLL')?.addEventListener('click', setCustomTimeRange);

    console.log(document.getElementById('customButton1'));

    return () => {
      document.getElementById('1D')?.removeEventListener('click', setCustomTimeRange);
      document.getElementById('7D')?.removeEventListener('click', setCustomTimeRange);
      document.getElementById('1M')?.removeEventListener('click', setCustomTimeRange);
      document.getElementById('1Y')?.addEventListener('click', setCustomTimeRange);
      document.getElementById('3Y')?.removeEventListener('click', setCustomTimeRange);
      document.getElementById('aLL')?.removeEventListener('click', setCustomTimeRange);
    };
  }, []);

  useEffect(() => {
    chartComponentRef.current.chart.showLoading();
    let stableCoinUrl = 'https://stablecoins.llama.fi/stablecoincharts/all';
    let tvlUrl = 'https://api.llama.fi/v2/historicalChainTvl';
    let volumeUrl =
      'https://api.llama.fi/overview/dexs?excludeTotalDataChart=false&excludeTotalDataChartBreakdown=true&dataType=dailyVolume';

    if (chainFilter != 'all') {
      stableCoinUrl = `https://stablecoins.llama.fi/stablecoincharts/${chainFilter}`;
      tvlUrl = `https://api.llama.fi/v2/historicalChainTvl/${chainFilter}`;
      volumeUrl = `https://api.llama.fi/overview/dexs/${chainFilter}?excludeTotalDataChart=false&excludeTotalDataChartBreakdown=true&dataType=dailyVolume`;
    }

    Promise.allSettled([axios.get(stableCoinUrl), axios.get(tvlUrl), axios.get(volumeUrl)]).then((res) => {
      if (res[0].status == 'fulfilled') {
        const stableData = res[0].value.data.map((item) => {
          return [item.date * 1000, item.totalCirculatingUSD.peggedUSD];
        });

        if (chartComponentRef.current) {
          chartComponentRef.current.chart.series[0].update({
            type: 'spline',
            data: stableData,
            zIndex: 1,
          });
        }
      } else {
        chartComponentRef.current.chart.series[0].setVisible(false);
      }

      if (res[1].status == 'fulfilled') {
        const tvlData = res[1].value.data.map((item) => [
          item.date * 1000, // Convert Unix timestamp to milliseconds
          item.tvl, // Convert TVL to billion dollars
        ]);

        if (chartComponentRef.current) {
          chartComponentRef.current.chart.series[1].update({
            type: 'spline',
            data: tvlData,
            zIndex: 1,
          });
        }
      } else {
        chartComponentRef.current.chart.series[1].setVisible(false);
      }

      if (res[2].status == 'fulfilled') {
        const volumeData = res[2].value.data.totalDataChart.map((item) => {
          return [
            item[0] * 1000, // Convert Unix timestamp to milliseconds
            item[1], // Convert TVL to billion dollars
          ];
        });

        if (chartComponentRef.current) {
          chartComponentRef.current.chart.series[2].update({
            type: 'column',
            data: volumeData,
            zIndex: 1,
          });
        }
      } else {
        chartComponentRef.current.chart.series[2].setVisible(false);
      }
      chartComponentRef.current.chart.hideLoading();
    });
  }, [chainFilter]);

  useEffect(() => {
    if (chartComponentRef.current.chart) {
      const chart = chartComponentRef.current.chart;
      chartFilter.includes('TVL') ? chart.series[1].setVisible(true) : chart.series[1].setVisible(false);
      chartFilter.includes('Volume') ? chart.series[2].setVisible(true) : chart.series[2].setVisible(false);
      chartFilter.includes('Stables') ? chart.series[0].setVisible(true) : chart.series[0].setVisible(false);
    }
  }, [structuredClone(chartFilter)]);

  return (
    <div className='tableChild' style={{paddingLeft: 10}}>
      <StyledTableHeadParagraph>DeFi Market</StyledTableHeadParagraph>
      <StyledRangeSelectorParentDiv>
        <StyledRangeSelectorButtonDiv>
          <StyledRangeSelectorButton id='1D' style={{backgroundColor: selectBtnDefi == '1D' ? 'white' : 'transparent'}}>
            1d
          </StyledRangeSelectorButton>
          <StyledRangeSelectorButton id='7D' style={{backgroundColor: selectBtnDefi == '7D' ? 'white' : 'transparent'}}>
            7d
          </StyledRangeSelectorButton>
          <StyledRangeSelectorButton id='1M' style={{backgroundColor: selectBtnDefi == '1M' ? 'white' : 'transparent'}}>
            1m
          </StyledRangeSelectorButton>
          <StyledRangeSelectorButton id='1Y' style={{backgroundColor: selectBtnDefi == '1Y' ? 'white' : 'transparent'}}>
            1y
          </StyledRangeSelectorButton>
          <StyledRangeSelectorButton id='3Y' style={{backgroundColor: selectBtnDefi == '3Y' ? 'white' : 'transparent'}}>
            3y
          </StyledRangeSelectorButton>
          <StyledRangeSelectorButton
            id='aLL'
            style={{backgroundColor: selectBtnDefi == 'aLL' ? 'white' : 'transparent'}}
          >
            all
          </StyledRangeSelectorButton>
        </StyledRangeSelectorButtonDiv>
        <StyledFilterParentDiv>
          <div className='custom-selector'>
            <div onClick={() => setIsOpen(!isOpen)} className='custom-select'>
              <div className='selected-value'>
                {chainFilter != 'all' ? (
                  <StyleBlockChainLogo
                    src={blockChains.find((chain) => chain.name === chainFilter)?.url}
                    alt={chainFilter}
                  />
                ) : null}

                {chainFilter}
                <StyledTableHeadIcon src={caretDownSolid}></StyledTableHeadIcon>
              </div>
              <div className={`custom-options ${isOpen ? 'open' : ''}`}>
                <div className='custom-option' onClick={() => handleSelectChange('all')}>
                  <span>All</span>
                </div>
                {blockChains.length > 0 &&
                  blockChains.map((chain) => (
                    <div className='custom-option' key={chain.name} onClick={() => handleSelectChange(chain.name)}>
                      <StyleBlockChainLogo src={chain.url} alt={chain.name} />
                      {chain.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <StyleFilterDiv
            onClick={() => {
              toggleChartFilter('TVL');
            }}
            style={{
              backgroundColor: chartFilter.includes('TVL') ? '#654CEC' : 'rgba(23, 231, 214, 0.6)',
              color: chartFilter.includes('TVL') ? 'white' : '#112455',
            }}
          >
            TVL
          </StyleFilterDiv>
          <StyleFilterDiv
            onClick={() => {
              toggleChartFilter('Volume');
            }}
            style={{
              backgroundColor: chartFilter.includes('Volume') ? '#654CEC' : 'rgba(23, 231, 214, 0.6)',
              color: chartFilter.includes('Volume') ? 'white' : '#112455',
            }}
          >
            Volume
          </StyleFilterDiv>
          {/* <StyleFilterDiv
            onClick={() => {
              toggleChartFilter('Raises');
            }}
            style={{
              backgroundColor: chartFilter.includes('Raises') ? '#654CEC' : 'rgba(23, 231, 214, 0.6)',
              color: chartFilter.includes('Raises') ? 'white' : '#112455',
            }}
          >
            Raises
          </StyleFilterDiv> */}
          <StyleFilterDiv
            onClick={() => {
              toggleChartFilter('Stables');
            }}
            style={{
              backgroundColor: chartFilter.includes('Stables') ? '#654CEC' : 'rgba(23, 231, 214, 0.6)',
              color: chartFilter.includes('Stables') ? 'white' : '#112455',
            }}
          >
            Stables
          </StyleFilterDiv>
        </StyledFilterParentDiv>
      </StyledRangeSelectorParentDiv>
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

export default VolumeChart;

const StyledTableHeadParagraph = styled.div`
  font-family: Montserrat;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 25px;
  margin-top: 10px;
  color: #112455;
`;

const StyledRangeSelectorParentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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

const StyledFilterParentDiv = styled.div`
  display: flex;
  @media (max-width: 500px) {
    justify-content: space-evenly;
    width: 100vw;
  }
`;

const StyleFilterDiv = styled.div`
  width: 60px;
  height: 22px;
  border-radius: 19px;
  background-color: rgba(23, 231, 214, 0.6);
  color: #112455;
  font-weight: 700;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 50px;
  }
`;

const StyledSelectTag = styled.select`
  width: 78px;
  height: 22px;
  border: spx solid #17e7d6;
`;

const StyleBlockChainLogo = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 8px;
`;

const StyledTableHeadIcon = styled(Image)`
  width: 11px;
  height: 15px;
  color: black;
  padding-bottom: 5px;
`;