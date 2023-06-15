from fastapi import APIRouter
from model.predict import get_data, predict_image, get_random_id
from model.model import get_model, TYPE_GUN, TYPE_KNIFE, TYPE_PLIERS, TYPE_SCISSORS,TYPE_WRENCH

models = {
    TYPE_GUN: get_model(TYPE_GUN),
    TYPE_KNIFE: get_model(TYPE_KNIFE),
    TYPE_SCISSORS: get_model(TYPE_SCISSORS),
    TYPE_PLIERS: get_model(TYPE_PLIERS),
    TYPE_WRENCH: get_model(TYPE_WRENCH),
}

router = APIRouter()

@router.get("/")
async def get_images():
    return {"message": "Images!"}


@router.get("/random/{count}")
async def get_random_image(count: int):
    return {"message": get_random_id(count)}

@router.get("/predict/{image_id}")
async def predict(image_id: str = ""):
    return predict_image(models, image_id)
