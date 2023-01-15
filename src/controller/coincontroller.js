const coinmodel = require("../models/coinmodel")

app.get('/coins', (req, res) => {
    // Get API key from request headers
    const apiKey = req.headers.authorization;
  
    // Make request to CoinCap API
    request.get({
      url: 'https://api.coincap.io/v2/assets',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    }, (error, response, body) => {
      if (error) {
        return res.status(500).send(error);
      }
  
      const coins = JSON.parse(body).data;
  
      // Save coins to database
      coins.forEach((coin) => {
        const newCoin = new Coin({
          symbol: coin.symbol,
          name: coin.name,
          marketCapUsd: coin.marketCapUsd,
          priceUsd: coin.priceUsd
        });
      
        newCoin.save((err, coin) => {
          if (err) console.log(err)
          console.log(coin)
        });
      });
  
      // Find all coins in the database
      Coin.find({}, (err, coins) => {
        if (err) {
          return res.status(500).send(err);
        }
  
        // Sort coins by changePercent24Hr
        const sortedCoins = coins.sort((a, b) => {
          return b.changePercent24Hr - a.changePercent24Hr;
        });
  
        // Send sorted coins in response
        return res.status(200).send(sortedCoins);
      });
    });
  });
  
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });