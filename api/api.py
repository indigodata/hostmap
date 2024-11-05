import gzip
from flask import Flask, make_response
from awsgi import response
import boto3

app = Flask(__name__)

s3 = boto3.client('s3')

bucket_name = 'indigo-snowflake-staging'
file_key = 'offchain/export/host_map/dim_peer_performance.csv.gz'

@app.route('/hosts', methods=['GET', 'OPTIONS'])
def get_hosts():
    s3_response = s3.get_object(Bucket=bucket_name, Key=file_key)
    content = s3_response['Body'].read()

    response = make_response(content)
    response.headers['Content-Type'] = 'application/gzip'
    response.headers['Content-Disposition'] = 'attachment; filename=dim_peer_performance.csv.gz'
    response.headers['Content-Encoding'] = 'gzip'
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Content-Encoding'
    return response

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Encoding')
    response.headers.add('Access-Control-Allow-Methods', 'GET, OPTIONS')
    return response

def lambda_handler(event, context):
    return response(app, event, context, base64_content_types={'application/gzip'})

if __name__ == "__main__":
    app.run(debug=True)
