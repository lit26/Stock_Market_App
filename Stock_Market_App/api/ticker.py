import yfinance as yf

def fetch_history(ticker, period, interval):
    data = yf.download(
            tickers=ticker,
            period=period,
            interval=interval,
            group_by='ticker',
            auto_adjust=True,
            prepost=False,
            threads=True,
    )
    df = data.reset_index()
    return df
