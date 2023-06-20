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
from model.images import images, all_images
import numpy as np
import os, random

IMAGE_PATH = "/home/eli/dev/school/data-science/did/dataset/JPEGImage"
# image_list = os.listdir(IMAGE_PATH)

s3_url = "https://eli-did-assets.s3.amazonaws.com/dataset/JPEGImage"

def get_random(n: int):
    if n > len(all_images):
        return all_images
    
    random_choice = random.sample(all_images, n)
    return random_choice 

def get_random_by_category(category: str, n: int):
    if category not in images:
        raise Exception("Category does not exist")
    
    cat = images[category]
    if n > len(cat):
      return cat
    
    random_choice = random.sample(images[category], n)
    return random_choice 


def predict_image_bytes(models: dict[str, tf.keras.models.Sequential], bytes_io):
    try:
      test = load_img(bytes_io, target_size=(300, 300))
      img_data = np.expand_dims(test, axis=0)
      prediction = dict()

      # Predict the result for each specific model (Should be positive)
      for key in models:
        model = models[key]
        pred = model.predict(img_data)
        prediction[key] = str(pred[0][0])
          

    except Exception as err:
        return {
            "message": "Internal Error", 
            "error": str(err), 
            "ok": False
        }

    return {
        "prediction": prediction,
        "ok": True
    }

def predict_image(models: dict[str, tf.keras.models.Sequential], image_id: str = ""):
    try:
        if image_id == "":
            return {"message": "No image link provided", "ok": False}
        
        image_location = f'{s3_url}/{image_id}.jpg'

        bytes_io = BytesIO(request.urlopen(image_location).read())

        result = predict_image_bytes(models, bytes_io)
        return {
            "prediction": result['prediction'],
            "url": image_location,
            "ok": result['ok']
        }

    except Exception as err:
        return {"message": "Internal Error", "url": image_location, "error": str(err), "ok": False}        
