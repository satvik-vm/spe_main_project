from flask import Flask
# from dotenv import load_dotenv
import os
# load_dotenv()

app = Flask(__name__)

port = 8000

@app.route('/')
def index():
	return 'Server up and running'

if __name__ == '__main__':
	print('server running on port ' + str(port))
	app.run(port=port, debug=True)
