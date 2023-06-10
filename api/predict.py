import tensorflow as tf
from tensorflow import keras
from keras.models import load_model
from keras.utils import get_file, load_img, img_to_array
from tensorflow import expand_dims
from numpy import argmax, max, array
from json import dumps
from uvicorn import run
from model import TYPE_KNIFE, TYPE_GUN, IMAGE_WIDTH, IMAGE_HEIGHT
import numpy as np
import os, random

async def get_data():
    return {"message": "Welcome to the DID API!"}


IMAGE_PATH = "/home/eli/dev/school/data-science/did/dataset/JPEGImage"

image_list = os.listdir(IMAGE_PATH)

def get_random_image():
    random_choice = random.choice(image_list)
    return { 
        "image_id": random_choice 
    }

def predict_image(models: dict[str, tf.keras.models.Sequential], image_id: str = ""):
    try:
        if image_id == "":
            return {"message": "No image link provided", "ok": False}
        
        image_location = os.path.join(IMAGE_PATH, image_id)

        # img_path = get_file(origin = image_location)

        # Predict the result for this specific image (Should be positive)
        img = load_img(image_location, target_size=(IMAGE_WIDTH, IMAGE_HEIGHT))
        img_data = np.expand_dims(img, axis=0)

        model_gun = models[TYPE_GUN]
        model_knife = models[TYPE_KNIFE]
        
        pred_gun = model_gun.predict(img_data)
        pred_knife = model_knife.predict(img_data)
        
        # score = tf.nn.softmax(pred[0])

        # class_prediction = class_predictions[argmax(score)]
        # model_score = round(max(score) * 100, 2)
    except Exception as err:
        return {"message": "Internal Error", "error": str(err), "ok": False}        

    return {
        "prediction": {
            TYPE_GUN: str(pred_gun[0][0]),
            TYPE_KNIFE: str(pred_knife[0][0])
        },
        "ok": True
    }