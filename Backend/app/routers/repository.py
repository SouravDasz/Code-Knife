import httpx
from fastapi import APIRouter, HTTPException
from urllib.parse import urlparse


from app.schemas.repository import RepositoryRequest
from app.services.github_service import fetch_repository_tree,fetch_file_content
from app.services.tree_builder import build_file_tree
from app.schemas.repository import FileRequest


router = APIRouter(prefix="/repository")


@router.post("/analyze")
async def analyzer(request: RepositoryRequest):
    parsed = urlparse(str(request.url))
    result=parsed.path.strip("/").split("/")
    if len(result) < 2 or not result[0] or not result[1]:
        raise HTTPException(
            status_code=400,
            detail="Invalid GitHub repository URL",
        )

    owner=result[0]
    repo = result[1].removesuffix(".git")

    try:
        response = await fetch_repository_tree(owner, repo)
        tree = build_file_tree(response["tree"])
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail="GitHub API request failed",
        ) from e

    except httpx.RequestError as e:
        raise HTTPException(
            status_code=503,
            detail="Unable to connect to GitHub",
        ) from e

    return {
        "owner": owner,
        "repo": repo,
        "branch": response["branch"],
        "tree": tree,
    }


@router.post("/file/{owner}/{repo}/{branch}")
async def get_file_content(
    owner: str,
    repo: str,
    branch: str,
    request: FileRequest,
):
    try:
        result = await fetch_file_content(
            owner,
            repo,
            branch,
            path=request.path,
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=415, detail=str(e)) from e

    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail="Unable to fetch file from GitHub",
        ) from e

    except httpx.RequestError as e:
        raise HTTPException(
            status_code=503,
            detail="Unable to connect to GitHub",
        ) from e
