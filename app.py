from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/events')
def get_events():
    # This would come from your database in a real app
    events = {
        "2024": {
            "June": {
                "15": [{
                    "title": "Youth Conference",
                    "time": "9:00 AM - 4:00 PM",
                    "venue": "Main Hall",
                    "description": "Annual youth gathering"
                }]
            }
        }
    }
    return jsonify(events)

if __name__ == '__main__':
    app.run(debug=True)