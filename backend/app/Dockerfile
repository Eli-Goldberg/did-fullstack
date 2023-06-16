FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11
RUN pip install -r requirements.txt

FROM python:3.11

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./api /code/api
COPY ./model /code/model
COPY ./weights /code/weights
COPY main.py /code/main.py

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
