import trendingCoins from './utils/getTrendingCoins'
import btcPrice from './utils/getBtcPrice'
import getNewsForCoin from './utils/getTopCoinHeadlines'

import { useState, useEffect } from 'react'

const App = () => {
  const [listOfTrendingCoins, setListOfTrendingCoins] = useState([])
  const [coinNews, setCoinNews] = useState([]) 
  const [priceOfBitcoin, setPriceOfBitcoin] = useState(0)
  const [currentDate, setCurrentDate] = useState("")

  const getTrendingCoins = async () => {
    const response = await trendingCoins();
    setListOfTrendingCoins(response.coins);
  }

  const loadNewsForCoin = async (coin) => {
    try {
      const news = await getNewsForCoin(coin);
      setCoinNews(prevState => ({...prevState, [coin]: news}));
    } catch (error) {
      console.error(error);
    }
  }

  const getBtcPrice = async () => {
    const response = await btcPrice()
    setPriceOfBitcoin(response.bitcoin.usd)
  }

  const getCurrentDate = async () => {
    let ts = Date.now();

    let date_time = new Date(ts);
    let date = date_time.getDate();
    let month = date_time.getMonth() + 1;
    let year = date_time.getFullYear();

    setCurrentDate(year + "-" + month + "-" + date)
  }

  useEffect(() => {
    getBtcPrice()
    getTrendingCoins()
    getCurrentDate()
  }, [])
  

  return (
    <div className='font-mono absolute mt-5 p-10'>
      <h1 className='text-emerald-400 text-3xl font-bold'>Trending cryptocurrencies news aggregator 🔥</h1>
      <h2 className='text-white mt-2'>Latest news surronding the most recently trending cryptocurrencies</h2>
      <p className='text-white mt-4'>{currentDate}</p>

      <div className='mt-10 p-2'>
        {listOfTrendingCoins.map((coinObj, index) => {
          let coin = coinObj.item;
          return (
            <div key={index} className='flex flex-col mt-5'>
              <div className='flex flex-row gap-4'>
                <a href={`https://www.coingecko.com/en/coins/${coin.id}`} target="_blank" rel="noreferrer" className='hover:bg-neutral-800 p-1 rounded-lg'>
                  <div className='flex flex-row gap-2'>
                    <img 
                      src={coin.small}
                      className='h-5 w-5 rounded-lg mr-2 mt-[2px]'
                    />
                    <p className='text-white font-bold'>{coin.name}</p>
                    <p className='text-white'>({coin.symbol})</p>
                    <p className='text-white ml-4'>{(coin.price_btc * priceOfBitcoin).toFixed(6)}</p>
                    <p className='text-white ml-4'>{coin.market_cap_rank}</p>
                  </div>
                </a>
                <button className='text-white hover:text-emerald-400 ml-10' onClick={() => loadNewsForCoin(coin.name)}>Get News</button>
              </div>
              
              <hr className='border-neutral-500 mt-3'></hr>
              

              
                {coinNews[coin.name] && coinNews[coin.name].map((newsItem, newsIndex) => (
                  <div key={newsIndex} className='flex flex-col p-4'>
                    <div className='flex flex-row items-left justify-left mt-3'>
                      <img 
                        src={newsItem.image}
                        className='h-8 w-8 rounded-full'

                      />

                      <div className='text-[12px] flex flex-col ml-4 mb-4'>
                        <p className='text-white'>{newsItem.source.name}</p>
                        <p className='text-white '>{newsItem.source.url}</p>
                      </div>
                    </div>

                    <div className='max-w-[800px]'>
                      <a href={newsItem.url} target='_blank' rel='noreferrer'>
                          <h1 className='text-emerald-400 text-[20px] font-bold hover:text-purple-400'>{newsItem.title}</h1>
                          <p className='text-white text-[14px] mt-2 mb-3'>{newsItem.description}</p>
                      </a>
                    </div>
                    <p className='text-neutral-500 text-[12px]'>{newsItem.publishedAt}</p>
                    
                    
                  </div>
                ))}


            </div>
          );
        })}
      </div>

      <div className='flex flex-col text-neutral-300 ml-2 mt-10'>
        <a className='hover:text-neutral-500' href='https://github.com/RexanWONG/trending-cryptocurrencies-news-aggregator'>Github</a>
        <a className='hover:text-neutral-500' href='https://linktr.ee/rexanwong'>Created by rexanwong</a>

      </div>
      
    </div>
  )
}

export default App
