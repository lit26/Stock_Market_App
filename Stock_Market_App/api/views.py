from rest_framework import views
from rest_framework.response import Response
from .serializers import TickerSerializer
from django.http import HttpResponse
from .ticker import fetch_market
import numpy as np
import yfinance as yf

# Getting multi ticker market value and pct


class TickerView(views.APIView):
    def post(self, request):
        request_data = request.data
        ticker_list = request_data['tickers']
        ticker_list = [ticker.upper() for ticker in ticker_list]
        tickers = ' '.join(ticker_list)

        market = request_data['market']
        interval = request_data['interval']
        period = request_data['period']

        df = fetch_market(tickers, period, interval)

        if market == 'current':
            data = {
                'metadata': {
                    'tickers': ticker_list
                },
                'data': {}
            }

            def get_market(close_values):
                return {
                    'market': close_values[-1],
                    'chg': close_values[-1] - close_values[-2],
                    'pct': (close_values[-1] - close_values[-2])/close_values[-2]*100
                }
            if len(ticker_list) > 1:
                for ticker in ticker_list:
                    data['data'][ticker] = get_market(
                        df[ticker]['Close'].values)
            else:
                data['data'][ticker_list[0]] = get_market(df['Close'].values)

            results = TickerSerializer(data).data
        else:
            date_format = None
            if interval in ['1m', '2m', '5m', '15m', '30m', '60m', '90m']:
                df['Datetime'] = df['Datetime'].dt.strftime(
                    "%Y-%m-%d %H:%M:%S")
                date_format = 'Datetime'
            else:
                df['Date'] = df['Date'].dt.date
                date_format = 'Date'

            data_format = request_data['data_format']
            data = None
            metadata = {
                'ticker': ticker_list[0],
                'period': period,
                'interval': interval,
                'quote': [date_format, 'Open', 'High', 'Low', 'Close', 'Volume']
            }

            data_date = df[date_format].values
            data_open = df['Open'].values
            data_high = df['High'].values
            data_low = df['Low'].values
            data_close = df['Close'].values
            data_volume = df['Volume'].values
            if data_format == "v1":
                data = {
                    'metadata': metadata,
                    'data': {
                        'quote': {
                            date_format: data_date,
                            'Open': data_open,
                            'High': data_high,
                            'Low': data_low,
                            'Close': data_close,
                            'Volume': data_volume,
                        }

                    }
                }
            else:
                ticker_data = [{date_format: data_date[i],
                                'Open': data_open[i],
                                'High': data_high[i],
                                'Low': data_low[i],
                                'Close':data_close[i],
                                'Volume': data_volume[i]}
                               for i in range(len(data_date))]
                data = {
                    'metadata': metadata,
                    'data': ticker_data
                }

            results = TickerSerializer(data).data

        return Response(results)


class FundamentView(views.APIView):
    def get(self, request, pk):
        stock = yf.Ticker(pk.upper())
        data = {
                'metadata': {
                    'tickers': pk
                },
                'data': stock.info
            }
        results = TickerSerializer(data).data
        return Response(results)
