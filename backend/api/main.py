from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from uvicorn import run
from predict import get_data, predict_image, get_random_image
from model import get_model
import os

app = FastAPI()

origins = ["*"]
methods = ["*"]
headers = ["*"]

app.add_middleware(
    CORSMiddleware, 
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = methods,
    allow_headers = headers    
)

models = {
    'gun': get_model('gun'),
    'knife': get_model('knife')
}

@app.get("/")
async def root():
    return await get_data()

@app.get("/random_image")
async def root():
    return get_random_image()

@app.get("/predict/{image_id}")
async def get_net_image_prediction(image_id: str = ""):
    return predict_image(models, image_id)
    
    
if __name__ == "__main__":
	port = int(os.environ.get('PORT', 5000))
	run(app, host="0.0.0.0", port=port)
