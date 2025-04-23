from flask import Flask, request, jsonify
import numpy as np
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input, decode_predictions
from tensorflow.keras.preprocessing import image

app = Flask(__name__)

# טען את המודל המוכן MobileNetV2
model = MobileNetV2(weights='imagenet')

def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))  # שינוי גודל לתמונה
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)  # נורמליזציה לפי המודל
    return img_array

def find_best_album(photo_name, albums):
    img_array = preprocess_image(photo_name)
    predictions = model.predict(img_array)
    decoded_predictions = decode_predictions(predictions, top=1)[0]  # קבלת התחזיות הטובות ביותר
    
    # כאן תוכל לקשר בין התחזיות לאלבומים
    # לדוגמה, נניח שהאלבומים שלך תואמים לתוויות של התחזיות
    best_album = decoded_predictions[0][1]  # קבלת התווית של התחזית הטובה ביותר
    return best_album if best_album in albums else None

@app.route('/best_album', methods=['POST'])
def best_album():
    data = request.json
    photo_name = data.get('photo_name')
    albums = data.get('albums')

    best_album = find_best_album(photo_name, albums)
    return jsonify({'best_album': best_album})

if __name__ == '__main__':
    app.run(debug=True)
