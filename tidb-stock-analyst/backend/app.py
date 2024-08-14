from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/run-script', methods=['POST'])
def run_script():
    data = request.json
    message = data.get('message', '')
    result = subprocess.run(['python3', '../scripts/my_script.py', message], capture_output=True, text=True)
    
    print(f"Message received: {message}")
    print(f"stdout: {result.stdout}")
    print(f"stderr: {result.stderr}")

    return jsonify({
        'stdout': result.stdout,
        'stderr': result.stderr
    })

@app.route('/scrape', methods=['GET'])
def scrape_data():
    result = subprocess.run(['node', '../scripts/scrape.js'], capture_output=True, text=True)
    articles = json.loads(result.stdout)

    #passing JSON to be processed by processData.py
    processingCode = subprocess.run(['python3', '../scripts/processData.py', articles], capture_output=True, text=True)
    # processingCode is an int that represents what happened during processData
    
    # this still returns the articles used back to the frontend, maybe we can create a component that displays the articles
    # that were used in generating the report with links to them
    return jsonify(articles)

if __name__ == '__main__':
    app.run(debug=True, port=5000)