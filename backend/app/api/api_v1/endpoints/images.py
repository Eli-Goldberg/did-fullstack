from io import BytesIO
from fastapi import APIRouter, UploadFile, File
from model.predict import predict_image, predict_image_bytes, get_random, get_random_by_category
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
    return {"message": "Welcome to the DID API!"}


@router.get("/random/{count}")
async def get_random_image(count: int):
    try:
      return {"imageIds": get_random(count), "ok": True}
    except Exception as err:
        return {"error": str(err), "ok": False}        

@router.get("/random_by_category/{category}/{count}")
async def get_random_image(category: str, count: int):
    try:
      return {"imageIds": get_random_by_category(category, count), "ok": True}
    except Exception as err:
        return {"error": str(err), "ok": False}        


@router.get("/predict/{image_id}")
async def predict(image_id: str = ""):
    return predict_image(models, image_id)

@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    contents = await file.read()
    bytes_io = BytesIO(contents)
    return predict_image_bytes(models, bytes_io)
