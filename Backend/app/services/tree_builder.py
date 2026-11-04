
def build_file_tree(entries):
    root = {}

    for entry in entries:
        parts = entry["path"].split("/")
        current = root

        # Create parent folders
        for folder in parts[:-1]:
            current = current.setdefault(
                folder,
                {
                    "name": folder,
                    "type": "folder",
                    "children": {},
                    "sha": None
                }
            )["children"]

        # Get the final item name
        name = parts[-1]

        # If item is a folder
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

        # If item is a file
        elif entry["type"] == "blob":
            current[name] = {
                "name": name,
                "type": "file",
                "sha": entry["sha"],
                "size": entry.get("size")
            }

    # Convert dictionaries into lists
    def convert(nodes):
        result = []

        for node in nodes.values():
            if node["type"] == "folder":
                node["children"] = convert(node["children"])

            result.append(node)

        return result

    return convert(root)
