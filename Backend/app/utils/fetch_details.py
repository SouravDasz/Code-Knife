from urllib.parse import urlparse

def details(url:str)->dict:
    """Takes url of repository and return the details """
    data={}
    parsed=urlparse(url)
    result=parsed.path.strip("/").split("/")
    data["owner"]=result[0]
    data["repo"]=result[1].removesuffix(".git")
    if len(result)>=5 and result[2]=="blob":
        data["branch"]=result[3]
        data["path"]=result[4:]
    return data

