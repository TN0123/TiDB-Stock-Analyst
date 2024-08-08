import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta

def scrape_yahoo_finance_headlines():
    url = 'https://finance.yahoo.com'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Current date and the date for the past day
    current_date = datetime.now()
    yesterday_date = current_date - timedelta(days=1)

    headlines = []
    # Example class 'Mb(5px)', you will need to adjust this based on the actual webpage structure
    for article in soup.find_all('h3', {'class': 'Mb(5px)'}):
        if article.a:
            # Assuming there's a <time> tag or similar; you may need to adjust this based on the page
            date_tag = article.find('time')
            if date_tag and 'datetime' in date_tag.attrs:
                article_date = datetime.strptime(date_tag['datetime'], '%Y-%m-%dT%H:%M:%SZ')
                if yesterday_date.date() <= article_date.date() <= current_date.date():
                    headlines.append(article.a.text)
    return headlines

if __name__ == "__main__":
    yesterday_headlines = scrape_yahoo_finance_headlines()
    print("Headlines from the past day:")
    for headline in yesterday_headlines:
        print(headline)
