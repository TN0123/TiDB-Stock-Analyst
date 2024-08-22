from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import subprocess
import json

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
        'stderr': result.stderr,
    })


@app.route('/scrape', methods=['GET'])
@cross_origin("*")
def scrape_data():
    result = subprocess.run(['node', '../scripts/scrape.js'], capture_output=True, text=True)
    articles = result.stdout

    output = subprocess.run(['python', '../scripts/processData.py', "scraping", articles], capture_output=True, text=True)
   
    # return jsonify({'stdout' : output.stdout, 'stderr': output.stderr})
    return jsonify(json.loads(articles))

@app.route('/genResults', methods=['GET'])
@cross_origin("*")
def gen_results():
    query = request.args.get('query', "a good stock to invest in")

    result = subprocess.run(['python', '../scripts/processData.py', query], capture_output=True, text=True)
    output = result.stdout

    output_lines = output.splitlines()

    return jsonify(output_lines)
    
    # return jsonify({'stdout' : output.stdout, 'stderr': output.stderr})
    # return jsonify(output)

if __name__ == '__main__':
    app.run(debug=True, port=5000)