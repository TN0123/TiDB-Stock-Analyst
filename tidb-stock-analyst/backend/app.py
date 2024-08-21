from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import subprocess
import json
import os
import logging

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 


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
@cross_origin("*")
def scrape_data():
    result = subprocess.run(['node', '../scripts/scrape.js'], capture_output=True, text=True)
    articles = result.stdout
    logging.info(articles)

    # env = os.environ.copy()
    # env['PYTHONPATH'] = 'C:/Users/Tanay N/AppData/Roaming/Python/Python312/site-packages;C:/Python312/Lib/site-packages;'

    python_path = "C/Python312/python.exe"
    output = subprocess.run(['python', '../scripts/processData.py', articles], capture_output=True, text=True)
   
    return jsonify({'stdout' : output.stdout, 'stderr': output.stderr})
    # return jsonify(json.loads(articles))


if __name__ == '__main__':
    app.run(debug=True, port=5000)