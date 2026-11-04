import httpx


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
        return tree_response.json()



def build_file_tree(entries):
    root = {}

    for entry in entries:
        current = root
        parts = entry["path"].split("/")

        # Create parent folders
        for folder in parts[:-1]:
            current = current.setdefault(
                folder,
                {
                    "name": folder,
                    "type": "folder",
                    "children": {}
                }
            )["children"]

        name = parts[-1]

        if entry["type"] == "tree":
            current.setdefault(
                name,
                {
                    "name": name,
                    "type": "folder",
                    "children": {},
                    "sha": entry["sha"]
                }
            )

        elif entry["type"] == "blob":
            current[name] = {
                "name": name,
                "type": "file",
                "sha": entry["sha"],
                "size": entry.get("size")
            }

    def convert(nodes):
        result = []

        for node in sorted(
            nodes.values(),
            key=lambda item: (item["type"] != "folder", item["name"].lower()),
        ):
            if node["type"] == "folder":
                node["children"] = convert(node["children"])

            result.append(node)

        return result

    return convert(root)
