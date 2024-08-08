import requests
from bs4 import BeautifulSoup

def scrape_yahoo_finance_headlines():
    url = 'https://finance.yahoo.com'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    headlines = []
    for article in soup.find_all('h3', {'class': 'Mb(5px)'}):  # Adjust class based on current page structure
        if article.a:
            headlines.append(article.a.text)
    return headlines

import os
import requests

def generate_embeddings(text):
    JINAAI_API_URL = 'https://api.jina.ai/v1/embeddings'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {os.getenv("JINAAI_API_KEY")}'
    }
    data = {
        'input': [text],
        'model': 'jina-embeddings-v2-base-en'  # Adjust model as necessary
    }
    response = requests.post(JINAAI_API_URL, headers=headers, json=data)
    return response.json()['data'][0]['embedding']

from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from tidb_vector.sqlalchemy import VectorType
from sqlalchemy.orm import sessionmaker
import dotenv

dotenv.load_dotenv()
Base = declarative_base()

class Document(Base):
    __tablename__ = 'headlines'
    id = Column(Integer, primary_key=True)
    headline = Column(String(255), nullable=False)
    headline_vec = Column(VectorType(dim=768))  # Dimension based on Jina AI model

engine = create_engine(os.getenv('TIDB_DATABASE_URL'))
Session = sessionmaker(bind=engine)
Base.metadata.create_all(engine)

def store_embeddings():
    headlines = scrape_yahoo_finance_headlines()
    with Session() as session:
        for headline in headlines:
            embedding = generate_embeddings(headline)
            document = Document(headline=headline, headline_vec=embedding)
            session.add(document)
        session.commit()

store_embeddings()