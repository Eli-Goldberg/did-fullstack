import tensorflow as tf
from tensorflow import keras
from keras.models import load_model
from keras.utils import get_file, load_img, img_to_array
from tensorflow import expand_dims
from numpy import argmax, max, array
from urllib import request
from io import BytesIO
from PIL import Image
from json import dumps
from uvicorn import run
from model.model import IMAGE_WIDTH, IMAGE_HEIGHT, TYPE_GUN, TYPE_KNIFE, TYPE_NONE, TYPE_PLIERS, TYPE_SCISSORS, TYPE_WRENCH
from model.images import all_images
import numpy as np
import os, random

async def get_data():
    return {"message": "Welcome to the DID API!"}


IMAGE_PATH = "/home/eli/dev/school/data-science/did/dataset/JPEGImage"
# image_list = os.listdir(IMAGE_PATH)

s3_url = "https://eli-did-assets.s3.amazonaws.com/dataset/JPEGImage"

def get_random_id(n: int):
    random_choice = random.sample(all_images, n)
    return random_choice 

def predict_image(models: dict[str, tf.keras.models.Sequential], image_id: str = ""):
    try:
        if image_id == "":
            return {"message": "No image link provided", "ok": False}
        
        # image_location = os.path.join(IMAGE_PATH, image_id)
        image_location = f'{s3_url}/{image_id}.jpg'
        res = request.urlopen(image_location).read()
        img = Image.open(BytesIO(res)).resize((IMAGE_WIDTH, IMAGE_HEIGHT))

        # img_path = get_file(origin = image_location)

        # img = load_img(image_location, target_size=(IMAGE_WIDTH, IMAGE_HEIGHT))
        img_data = np.expand_dims(img, axis=0)

        prediction = dict()

        # Predict the result for each specific model (Should be positive)
        for key in models:
          model = models[key]
          pred = model.predict(img_data)
          prediction[key] = str(pred[0][0])
        

        # model_gun = models[TYPE_GUN]
        # model_knife = models[TYPE_KNIFE]
        
        # pred_gun = model_gun.predict(img_data)
        # pred_knife = model_knife.predict(img_data)
        
        # score = tf.nn.softmax(pred[0])

        # class_prediction = class_predictions[argmax(score)]
        # model_score = round(max(score) * 100, 2)

    except Exception as err:
        return {"message": "Internal Error", "url": image_location, "error": str(err), "ok": False}        

    return {
        "prediction": prediction,
        "url": image_location,
        "ok": True
    }
