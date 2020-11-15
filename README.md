# Stock_Market_App
Full Stack web develop using Django REST framework to handle data include getting stock history and market information and using React.js to display the frontend website for display.

## API
| HTTP Method | URI | Action| Sample Request Data |
| ------------- | ------------- | ------------- | ------------- |
| POST | http://[hostname]/api/ | Getting stock history | {"ticker": "TSLA"} |
| POST | http://[hostname]/api/multi | Getting stocks market value | {"tickers": ["TSLA","NIO"]} |

