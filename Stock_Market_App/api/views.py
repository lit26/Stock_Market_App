from rest_framework import views
from rest_framework.response import Response
from .serializers import TickerSerializer
from django.http import HttpResponse
from .ticker import fetch_market
import numpy as np

# Getting multi ticker market value and pct
class TickerView(views.APIView):
    def post(self, request):
        request_data = request.data
        ticker_list = request_data['tickers']
        ticker_list = [ticker.upper() for ticker in ticker_list]
        tickers = ' '.join(ticker_list)

        market = request_data['market']
        period = '1y'
        if market == 'current':
            period = '5d'
        interval = '1d'
        
        df = fetch_market(tickers, period,interval)

        if market == 'current':
            data = {
                'metadata':{
                    'tickers': ticker_list
                },
                'data':{}
            }
            def get_market(close_values):
                return {
                    'market': close_values[-1],
                    'chg': close_values[-1] - close_values[-2],
                    'pct': (close_values[-1] - close_values[-2])/close_values[-2]*100
                }
            if len(ticker_list) > 1: 
                for ticker in ticker_list:
                    data['data'][ticker] = get_market(df[ticker]['Close'].values)
            else:
                data['data'][ticker_list[0]] = get_market(df['Close'].values)

            results = TickerSerializer(data).data
        else:
            df['Date'] = df['Date'].dt.date
            data_format = request_data['data_format']
            data = None
            if data_format == "v1":
                data = {
                    'metadata': {
                        'ticker': ticker_list[0],
                        'period': period,
                        'interval': interval,
                        'quote': ['Date','Open','High','Low','Close','Volume']
                    },
                    'data': {
                        'quote':{
                            'Date': df['Date'].values,
                            'Open': df['Open'].values,
                            'High': df['High'].values,
                            'Low': df['Low'].values,
                            'Close': df['Close'].values,
                            'Volume': df['Volume'].values,
                        }
                        
                    }
                }
            else:
                data_date = df['Date'].values
                data_open = df['Open'].values
                data_high = df['High'].values
                data_low = df['Low'].values
                data_close = df['Close'].values
                data_volume = df['Volume'].values

                ticker_data = [{'Date':data_date[i],
                         'Open': data_open[i],
                         'High': data_high[i],
                         'Low': data_low[i],
                         'Close':data_close[i],
                         'Volume': data_volume[i]}
                        for i in range(len(data_date))]
                data = {
                    'metadata': {
                        'ticker': ticker_list[0],
                        'period': period,
                        'interval': interval,
                        'quote': ['Date','Open','High','Low','Close','Volume']
                    },
                    'data':ticker_data
                }

            results = TickerSerializer(data).data

        return Response(results)
