import React, {useEffect, useState} from 'react';
import Image from 'next/image';

import axios from 'axios';
import styled from 'styled-components';

import caretDownSolid from '../../../public/images/caret-down-solid.svg';
import caretUpSolid from '../../../public/images/caret-up-solid.svg';


const TopGainersAndLosers = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [gainerSortFilter, setGainerSortFilter] = useState({filterName: '', toggle: false});
  const [loserSortFilter, setLoserSortFilter] = useState({filterName: '', toggle: false});
  const [numberOfGainerFilter, setNumberOfGainerFilter] = useState(100);
  const [numberOfLoserFilter, setNumberOfLoserFilter] = useState(100);
  const [topGainers, setTopGainers] = useState([]);
  const [topLoser, setTopLoser] = useState([]);
  const [topGainersLoading, setTopGainersLoading] = useState(true);
  const [topLoserLoading, setTopLoserLoading] = useState(true);


  // Function to handle onMouseEnter for a row
  const handleRowHover = (rowId) => {
    setHoveredRow(rowId);
  };

  // Function to handle onMouseLeave for a row
  const handleRowLeave = () => {
    setHoveredRow(null);
  };

  const handleGainerSortFilter = (name) => {
    setGainerSortFilter((prevState) => {
      if (prevState.filterName == name) {
        sortTopGainers({filterName: prevState.filterName, toggle: !prevState.toggle});
        return {filterName: prevState.filterName, toggle: !prevState.toggle};
      }
      sortTopGainers({filterName: name, toggle: false});
      return {filterName: name, toggle: false};
    });
  };

  const handleLoserSortFilter = (name) => {
    setLoserSortFilter((prevState) => {
      if (prevState.filterName == name) {
        sortTopLoser({filterName: prevState.filterName, toggle: !prevState.toggle});
        return {filterName: prevState.filterName, toggle: !prevState.toggle};
      }
      sortTopLoser({filterName: name, toggle: false});
      return {filterName: name, toggle: false};
    });
  };

  

  useEffect(() => {
    const url = `https://crypto-api-j8ea.onrender.com/top-gainers?count=${numberOfGainerFilter}`;
    setTopGainersLoading(true);
    // Fetch top gainers
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        console.log('data', data);
        setTopGainers(data);
        setTopGainersLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching top gainers:', error);
      });
  }, [numberOfGainerFilter]);

  useEffect(() => {
    const url = `https://crypto-api-j8ea.onrender.com/top-loser?count=${numberOfLoserFilter}`;
    setTopLoserLoading(true);
    // Fetch top gainers
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        console.log('data', data);
        setTopLoser(data);
        setTopLoserLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching top gainers:', error);
      });
  }, [numberOfLoserFilter]);

  function sortTopGainers(filterOptions) {
    const topGainersCopy = structuredClone(topGainers);
    topGainersCopy.sort((a, b) => {
      const valueA = a[filterOptions.filterName];
      const valueB = b[filterOptions.filterName];
      if (valueA < valueB) {
        return -1;
      } else if (valueA > valueB) {
        return 1;
      } else {
        return 0;
      }
    });
    if (!filterOptions.toggle) topGainersCopy.reverse();
    setTopGainers(topGainersCopy);
  }

  function sortTopLoser(filterOptions) {
    const topLoserCopy = structuredClone(topLoser);
    topLoserCopy.sort((a, b) => {
      const valueA = a[filterOptions.filterName];
      const valueB = b[filterOptions.filterName];
      if (valueA < valueB) {
        return -1;
      } else if (valueA > valueB) {
        return 1;
      } else {
        return 0;
      }
    });
    if (!filterOptions.toggle) topLoserCopy.reverse();
    setTopLoser(topLoserCopy);
  }

  function formatNumber(number) {
    if (Math.abs(number) >= 1) {
      return number.toFixed(2); // Format numbers with 2 decimal places
    } else {
      return number.toFixed(7); // Format numbers in scientific notation with 4 decimal places
    }
  }

  return (
    <>
      <div className='tableChild'>
        <StyledTableHeadDiv>
          <StyledTableHeadParagraph>Top Gainers</StyledTableHeadParagraph>
          <StyledTableFilterParentDiv>
            <StyledTableFilterDiv
              onClick={() => {
                setNumberOfGainerFilter(100);
              }}
            >
              <StyledTableFilterText style={{color: numberOfGainerFilter == 100 ? 'white' : ''}}>
                Top 100
              </StyledTableFilterText>
            </StyledTableFilterDiv>
            <StyledTableFilterDiv
              onClick={() => {
                setNumberOfGainerFilter(500);
              }}
            >
              <StyledTableFilterText style={{color: numberOfGainerFilter == 500 ? 'white' : ''}}>
                Top 500
              </StyledTableFilterText>
            </StyledTableFilterDiv>
            <StyledTableFilterDiv
              onClick={() => {
                setNumberOfGainerFilter(1000);
              }}
            >
              <StyledTableFilterText style={{color: numberOfGainerFilter == 1000 ? 'white' : ''}}>
                Top 1000
              </StyledTableFilterText>
            </StyledTableFilterDiv>
          </StyledTableFilterParentDiv>
        </StyledTableHeadDiv>
        <StyledTableColumn>
          {topGainersLoading ? (
            <StyledLoadingDiv>
              <h2>Loading...</h2>
            </StyledLoadingDiv>
          ) : (
            <StyledTable>
              <StyledTableRow>
                <th>
                  <StyledTableHeadContentDiv
                    onClick={() => {
                      handleGainerSortFilter('cmc_rank');
                    }}
                  >
                    #
                    <StyledTableHeadIconsDiv style={{display: 'inline-flex', flexDirection: 'column'}}>
                      {gainerSortFilter.filterName == 'cmc_rank' ? (
                        gainerSortFilter.toggle ? (
                          <StyledTableHeadIcon src={caretUpSolid}></StyledTableHeadIcon>
                        ) : (
                          <StyledTableHeadIcon src={caretDownSolid}></StyledTableHeadIcon>
                        )
                      ) : (
                        ''
                      )}
                    </StyledTableHeadIconsDiv>
                  </StyledTableHeadContentDiv>
                </th>
                <th
                  onClick={() => {
                    handleGainerSortFilter('name');
                  }}
                >
                  <StyledTableHeadContentDiv style={{justifyContent: 'flex-start'}}>
                    Name
                    <StyledTableHeadIconsDiv style={{display: 'inline-flex', flexDirection: 'column'}}>
                      {gainerSortFilter.filterName == 'name' ? (
                        gainerSortFilter.toggle ? (
                          <StyledTableHeadIcon src={caretUpSolid}></StyledTableHeadIcon>
                        ) : (
                          <StyledTableHeadIcon src={caretDownSolid}></StyledTableHeadIcon>
                        )
                      ) : (
                        ''
                      )}
                    </StyledTableHeadIconsDiv>
                  </StyledTableHeadContentDiv>
                </th>
                <th
                  onClick={() => {
                    handleGainerSortFilter('price');
                  }}
                >
                  <StyledTableHeadContentDiv>
                    Price
                    <StyledTableHeadIconsDiv style={{display: 'inline-flex', flexDirection: 'column'}}>
                      {gainerSortFilter.filterName == 'price' ? (
                        gainerSortFilter.toggle ? (
                          <StyledTableHeadIcon src={caretUpSolid}></StyledTableHeadIcon>
                        ) : (
                          <StyledTableHeadIcon src={caretDownSolid}></StyledTableHeadIcon>
                        )
                      ) : (
                        ''
                      )}
                    </StyledTableHeadIconsDiv>
                  </StyledTableHeadContentDiv>
                </th>
                <th
                  onClick={() => {
                    handleGainerSortFilter('volume_24');
                  }}
                >
                  <StyledTableHeadContentDiv>
                    Volume24h
                    <StyledTableHeadIconsDiv style={{display: 'inline-flex', flexDirection: 'column'}}>
                      {gainerSortFilter.filterName == 'volume_24' ? (
                        gainerSortFilter.toggle ? (
                          <StyledTableHeadIcon src={caretUpSolid}></StyledTableHeadIcon>
                        ) : (
                          <StyledTableHeadIcon src={caretDownSolid}></StyledTableHeadIcon>
                        )
                      ) : (
                        ''
                      )}
                    </StyledTableHeadIconsDiv>
                  </StyledTableHeadContentDiv>
                </th>
                <th
                  onClick={() => {
                    handleGainerSortFilter('percent_change_24h');
                  }}
                >
                  <StyledTableHeadContentDiv>
                    24h
                    <StyledTableHeadIconsDiv style={{display: 'inline-flex', flexDirection: 'column'}}>
                      {gainerSortFilter.filterName == 'percent_change_24h' ? (
                        gainerSortFilter.toggle ? (
                          <StyledTableHeadIcon src={caretUpSolid}></StyledTableHeadIcon>
                        ) : (
                          <StyledTableHeadIcon src={caretDownSolid}></StyledTableHeadIcon>
                        )
                      ) : (
                        ''
                      )}
                    </StyledTableHeadIconsDiv>
                  </StyledTableHeadContentDiv>
                </th>
              </StyledTableRow>
              {topGainers.length > 0
                ? topGainers.map((crypto) => {
                    return (
                      <StyledTableRow
                        key={crypto.id}
                        onMouseEnter={() => handleRowHover(crypto.id)}
                        onMouseLeave={handleRowLeave}
                      >
                        <StyledTableData>{crypto.cmc_rank}</StyledTableData>
                        <StyledTableData>
                          <div className='nameParentDiv'>
                            <img
                              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
                              alt='logo image'
                            ></img>
                            <p>
                              {crypto.name}
                              <span>{crypto.symbol}</span>
                            </p>
                            {hoveredRow == crypto.id ? (
                              <div>
                                <p>Swap</p>
                              </div>
                            ) : null}
                          </div>
                        </StyledTableData>
                        <StyledTableData>${formatNumber(crypto.price)}</StyledTableData>
                        <StyledTableData>${Math.trunc(crypto.volume_24)}</StyledTableData>
                        <StyledTableData>+{crypto.percent_change_24h.toFixed(2)}%</StyledTableData>
                      </StyledTableRow>
                    );
                  })
                : null}
            </StyledTable>
          )}
        </StyledTableColumn>
      </div>
      <div className='tableChild'>
        <StyledTableHeadDiv>
          <StyledTableHeadParagraph>Top Losers</StyledTableHeadParagraph>
          <StyledTableFilterParentDiv>
            <StyledTableFilterDiv
              onClick={() => {
                setNumberOfLoserFilter(100);
              }}
            >
              <StyledTableFilterText style={{color: numberOfLoserFilter == 100 ? 'white' : ''}}>
                Top 100
              </StyledTableFilterText>
            </StyledTableFilterDiv>
            <StyledTableFilterDiv
              onClick={() => {
                setNumberOfLoserFilter(500);
              }}
            >
              <StyledTableFilterText style={{color: numberOfLoserFilter == 500 ? 'white' : ''}}>
                Top 500
              </StyledTableFilterText>
            </StyledTableFilterDiv>
            <StyledTableFilterDiv
              onClick={() => {
                setNumberOfLoserFilter(1000);
              }}
            >
              <StyledTableFilterText style={{color: numberOfLoserFilter == 1000 ? 'white' : ''}}>
                Top 1000
              </StyledTableFilterText>
            </StyledTableFilterDiv>
          </StyledTableFilterParentDiv>
        </StyledTableHeadDiv>
        <StyledTableColumn>
          {topLoserLoading ? (
            <StyledLoadingDiv>
              <h2>Loading...</h2>
            </StyledLoadingDiv>
          ) : (
            <StyledTable>
              <StyledTableRow>
                <th>
                  <StyledTableHeadContentDiv
                    onClick={() => {
                      handleLoserSortFilter('cmc_rank');
                    }}
                  >
                    #
                    <StyledTableHeadIconsDiv style={{display: 'inline-flex', flexDirection: 'column'}}>
                      {loserSortFilter.filterName == 'cmc_rank' ? (
                        loserSortFilter.toggle ? (
                          <StyledTableHeadIcon src={caretUpSolid}></StyledTableHeadIcon>
                        ) : (
                          <StyledTableHeadIcon src={caretDownSolid}></StyledTableHeadIcon>
                        )
                      ) : (
                        ''
                      )}
                    </StyledTableHeadIconsDiv>
                  </StyledTableHeadContentDiv>
                </th>
                <th
                  onClick={() => {
                    handleLoserSortFilter('name');
                  }}
                >
                  <StyledTableHeadContentDiv style={{justifyContent: 'flex-start'}}>
                    Name
                    <StyledTableHeadIconsDiv style={{display: 'inline-flex', flexDirection: 'column'}}>
                      {loserSortFilter.filterName == 'name' ? (
                        loserSortFilter.toggle ? (
                          <StyledTableHeadIcon src={caretUpSolid}></StyledTableHeadIcon>
                        ) : (
                          <StyledTableHeadIcon src={caretDownSolid}></StyledTableHeadIcon>
                        )
                      ) : (
                        ''
                      )}
                    </StyledTableHeadIconsDiv>
                  </StyledTableHeadContentDiv>
                </th>
                <th
                  onClick={() => {
                    handleLoserSortFilter('price');
                  }}
                >
                  <StyledTableHeadContentDiv>
                    Price
                    <StyledTableHeadIconsDiv style={{display: 'inline-flex', flexDirection: 'column'}}>
                      {loserSortFilter.filterName == 'price' ? (
                        loserSortFilter.toggle ? (
                          <StyledTableHeadIcon src={caretUpSolid}></StyledTableHeadIcon>
                        ) : (
                          <StyledTableHeadIcon src={caretDownSolid}></StyledTableHeadIcon>
                        )
                      ) : (
                        ''
                      )}
                    </StyledTableHeadIconsDiv>
                  </StyledTableHeadContentDiv>
                </th>
                <th
                  onClick={() => {
                    handleLoserSortFilter('volume_24');
                  }}
                >
                  <StyledTableHeadContentDiv>
                    Volume24h
                    <StyledTableHeadIconsDiv style={{display: 'inline-flex', flexDirection: 'column'}}>
                      {loserSortFilter.filterName == 'volume_24' ? (
                        loserSortFilter.toggle ? (
                          <StyledTableHeadIcon src={caretUpSolid}></StyledTableHeadIcon>
                        ) : (
                          <StyledTableHeadIcon src={caretDownSolid}></StyledTableHeadIcon>
                        )
                      ) : (
                        ''
                      )}
                    </StyledTableHeadIconsDiv>
                  </StyledTableHeadContentDiv>
                </th>
                <th
                  onClick={() => {
                    handleLoserSortFilter('percent_change_24h');
                  }}
                >
                  <StyledTableHeadContentDiv>
                    24h
                    <StyledTableHeadIconsDiv style={{display: 'inline-flex', flexDirection: 'column'}}>
                      {loserSortFilter.filterName == 'percent_change_24h' ? (
                        loserSortFilter.toggle ? (
                          <StyledTableHeadIcon src={caretUpSolid}></StyledTableHeadIcon>
                        ) : (
                          <StyledTableHeadIcon src={caretDownSolid}></StyledTableHeadIcon>
                        )
                      ) : (
                        ''
                      )}
                    </StyledTableHeadIconsDiv>
                  </StyledTableHeadContentDiv>
                </th>
              </StyledTableRow>
              {topLoser.length > 0
                ? topLoser.map((crypto) => {
                    return (
                      <StyledTableRow
                        key={crypto.id}
                        onMouseEnter={() => handleRowHover(crypto.id)}
                        onMouseLeave={handleRowLeave}
                      >
                        <StyledTableData>{crypto.cmc_rank}</StyledTableData>
                        <StyledTableData>
                          <div className='nameParentDiv'>
                            <img
                              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
                              alt='logo image'
                            ></img>
                            <p>
                              {crypto.name}
                              <span>{crypto.symbol}</span>
                            </p>
                            {hoveredRow == crypto.id ? (
                              <div>
                                <p>Swap</p>
                              </div>
                            ) : null}
                          </div>
                        </StyledTableData>
                        <StyledTableData>${formatNumber(crypto.price)}</StyledTableData>
                        <StyledTableData>${Math.trunc(crypto.volume_24)}</StyledTableData>
                        <StyledTableData style={{color: '#F76379'}}>
                          {crypto.percent_change_24h.toFixed(2)}%
                        </StyledTableData>
                      </StyledTableRow>
                    );
                  })
                : null}
            </StyledTable>
          )}
        </StyledTableColumn>
      </div>
    </>
  );
};

export default TopGainersAndLosers

const StyledTableColumn = styled.div`
  height: 270px;
  width: 600px;
  overflow-y: auto;
  padding-left: 10px;
  overflow-x: hidden;
  background-color: white;
  @media (max-width: 1500px) {
    width: 98%;
    overflow-x: scroll;
  }
`;

const StyledTableHeadDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-left: 10px;
  @media (max-width: 1500px) {
    width: 98%;
  }
`;

const StyledTableHeadParagraph = styled.div`
  font-family: Montserrat;
  font-weight: 700;
  font-size: 18px;
`;

const StyledTableFilterParentDiv = styled.div`
  display: flex;
`;

const StyledTableFilterDiv = styled.div`
  width: 60px;
  height: 22px;
  background-color: #17e7d6;
  border-radius: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px 0 5px;
  cursor: pointer;
`;

const StyledTableFilterText = styled.div`
  font-size: 10px;
  font-weight: 700;
`;

const StyledTable = styled.table`
  border-collapse: separate;
  width: 100%;
  background-color: #ffffff;
  table-layout: fixed;
  @media (max-width: 900px) {
    overflow-x: auto;
  }
`;

const StyledLoadingDiv = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTableRow = styled.tr`
  height: 40px;
  border: 1px solid #dfe3e6;
  border-bottom: 1px solid #dfe3e6;
`;

const StyledTableData = styled.td`
  text-align: center;
  font-family: Poppins;
  border-bottom: 1px solid #dfe3e6;
`;

const StyledTableHeadContentDiv = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const StyledTableHeadIconsDiv = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding-left: 7px;
`;

const StyledTableHeadIcon = styled(Image)`
  width: 5px;
  fill: #9ba1a6;
`;