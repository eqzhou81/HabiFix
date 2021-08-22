# add ML data, fetch 

from flask import Flask, jsonify, request
from flask_restful import Api
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api')
def sendData():
    data = []
    file_handler = open('example.json')
    return file_handler.read()

name = ''
@app.route('/api/login', methods=['GET', 'POST'])
def sendLogin(): 
    if request.method == "POST":
        global name
        name = request.json()
        return ''
    if request.method == "GET": 
        return name