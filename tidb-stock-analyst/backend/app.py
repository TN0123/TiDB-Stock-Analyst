from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

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

if __name__ == '__main__':
    app.run(debug=True, port=5000)