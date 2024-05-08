from flask import Flask, request, jsonify
import similarity

app = Flask(__name__)

@app.route('/calculate_similarity', methods=['POST'])
def calculate_similarity_route():
    try:
        data = request.get_json()
        cv_id = data.get('cv_id')
        offer_id = data.get('offer_id')

        cv_text, offer_text = similarity.get_text_from_mongodb(cv_id, offer_id)
        if not cv_text or not offer_text:
            return jsonify({'error': 'CV or offer not found in database'}), 404

        match_percentage = similarity.calculate_similarity(cv_text, offer_text)

        return jsonify({'match_percentage': match_percentage}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
