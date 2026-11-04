import httpx
from fastapi import APIRouter, HTTPException
from urllib.parse import urlparse


from app.schemas.repository import RepositoryRequest
from app.services.github_service import fetch_repository_tree
from app.services.tree_builder import build_file_tree


router = APIRouter(prefix="/repository")


@router.post("/analyze")
async def analyzer(request: RepositoryRequest):
    parsed=urlparse(str(request.url))
    #fetching user details form the url
    result=parsed.path.strip("/").split("/")
    owner=result[0]
    repo = result[1].removesuffix(".git")
    print(owner,repo)
    try:
        response=await fetch_repository_tree(owner,repo)
        tree=build_file_tree(response["tree"])
    except httpx.HTTPStatusError as e:
        print("Status:", e.response.status_code),
        print("GitHub error:", e.response.text),
        raise HTTPException(
        status_code=e.response.status_code,
        detail="GitHub API request failed"
    )

    except httpx.RequestError:
        raise HTTPException(
        status_code=503,
        detail="Unable to connect to GitHub"
    )
        

    
    return {"repository":repo,
            "tree":tree}
