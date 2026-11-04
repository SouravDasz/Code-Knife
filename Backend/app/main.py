from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware



from app.routers.repository import router as repo_router

app=FastAPI(
    title="Code Knife",
    summary="Code Knife is a tool that help you to understand any git hub repo,explain any problem or code and help to dubug"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

all_routers=[repo_router]

for router in all_routers:
    app.include_router(router)

@app.get("/")
def home():
    return {
        "message":"server is runnig"
    }
