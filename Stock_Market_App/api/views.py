from rest_framework import views
from rest_framework.response import Response
from .serializers import TickerSerializer
from django.http import HttpResponse
from .ticker import fetch_history

# Getting single ticker history
class TickerView(views.APIView):
    def post(self, request):
        request_data = request.data
        period = '1y'
        interval = '1d'
        ticker = request_data['ticker']
        df = fetch_history(ticker, period,interval)
        data = {
            'metadata': {
                'ticker': ticker,
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
        results = TickerSerializer(data).data
        return Response(results)

# Getting multi ticker market value and pct
class MultiView(views.APIView):
    def post(self, request):
        request_data = request.data
        ticker_list = request_data['tickers']
        ticker_list = [ticker.upper() for ticker in ticker_list]
        tickers = ' '.join(ticker_list)
        period = '5d'
        interval = '1d'
        df = fetch_history(tickers, period,interval)
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
        return Response(results)
