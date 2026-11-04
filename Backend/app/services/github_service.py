import httpx
import base64

async def fetch_repository_tree(owner: str, repo: str):
    base_url = f"https://api.github.com/repos/{owner}/{repo}"
    async with httpx.AsyncClient(timeout=30) as client:
        repository_response = await client.get(base_url)
        repository_response.raise_for_status()
        default_branch = repository_response.json()["default_branch"]

        tree_response = await client.get(
            f"{base_url}/git/trees/{default_branch}",
            params={"recursive": "1"},
        )
        tree_response.raise_for_status()
        return {
            "branch": default_branch,
            "tree": tree_response.json()["tree"],
        }


async def fetch_file_content(
    owner: str,
    repo: str,
    branch: str,
    path: str,
):
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"

    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.get(url, params={"ref": branch})
        response.raise_for_status()

        data=response.json()

        if data.get("encoding") != "base64":
            raise ValueError("Unsupported file encoding")
        content = base64.b64decode(data["content"]).decode(
            "utf-8",
            errors="replace"
        )
        return {
            "name": data["name"],
            "path": data["path"],
            "size": data["size"],
            "content": content
        }