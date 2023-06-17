import tensorflow as tf
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Activation, Dropout, Flatten, Dense
from keras.optimizers import RMSprop, Adam

IMAGE_WIDTH = 300
IMAGE_HEIGHT = 300
IMAGE_CHANNELS = 3

TYPE_GUN = 'gun'
TYPE_KNIFE = 'knife'
TYPE_PLIERS = 'pliers'
TYPE_SCISSORS = 'scissors'
TYPE_WRENCH = 'wrench'
TYPE_NONE = 'none'

def get_model(model_type: str = ""):
    model = tf.keras.models.Sequential()
    model.add(tf.keras.layers.Conv2D(16, (3,3), activation='relu', input_shape=(IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS)))
    model.add(tf.keras.layers.Conv2D(16, (3,3), activation='relu'))
    model.add(tf.keras.layers.MaxPooling2D(2, 2))

    model.add(tf.keras.layers.Conv2D(32, (3,3), activation='relu'))
    model.add(tf.keras.layers.MaxPooling2D(2,2))

    model.add(tf.keras.layers.Conv2D(64, (3,3), activation='relu'))
    model.add(tf.keras.layers.MaxPooling2D(2,2))

    model.add(tf.keras.layers.Conv2D(64, (3,3), activation='relu'))
    model.add(tf.keras.layers.MaxPooling2D(2,2))

    model.add(tf.keras.layers.Conv2D(64, (3,3), activation='relu'))
    model.add(tf.keras.layers.MaxPooling2D(2,2))

    model.add(tf.keras.layers.Flatten())
    model.add(tf.keras.layers.Dense(512, activation='relu'))
    model.add(tf.keras.layers.Dropout(0.5))
    model.add(tf.keras.layers.Dense(1, activation='sigmoid'))
    
    load_weights(model, model_type)
    
    return model


def load_weights(model: tf.keras.models.Sequential, model_type: str = ""):
    file_name = f'weights/{model_type}.h5'
    model.load_weights(file_name)
