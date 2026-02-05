
import json
 
DATA_FILE = "./dados/cursos.json"

def read_items() -> list[dict]:
    '''
        função que lerá os items do arquivo ITEMS.JSON.
        - Seu retorno será json carregado como arquivo.
    '''
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def write_items(items: list[dict]) -> None:
    '''função que irá escrever os items do arquivo ITEMS.JSON.
        - Seu retorno será o dump de items no arquivo.
        '''
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(items, f, indent=2, ensure_ascii=False)

def list_items(tipo: str | None = None, status: str | None = None) -> list[dict]:
    items = read_items()

    if tipo:
        items = [i for i in items if i.get("tipo") == tipo]
    
    if status:
        items = [i for i in items if i.get("status") == status]
    
    # IMPORTANTE: O return precisa estar aqui, fora de qualquer IF
    return items

def create_item(data: dict) -> dict: #retona um dict chamado item
    items = read_items()
    max_id = 0

    for item in items:
        item_id = item.get("id", 0)
        if item_id > max_id:
            max_id = item_id

    new_id = max_id + 1

    item = {"id": new_id, **data}
    items.append(item)
    write_items(items)
    return item

def update_item(item_id: int, data: dict) -> dict | None: #retorna dict ou none apenas
    items = read_items()

    for idx, item in enumerate(items):
        if item.get("id") == item_id:
            items[idx] = {"id": item_id, **data}
            write_items(items)
            return items[idx]

    return None

def update_status(item_id: int, status: str) -> dict | None:
    items = read_items()

    for item in items:
        if item.get("id") == item_id:
            item["status"] = status
            write_items(items)
            return item

    return None

def delete_item(item_id: int) -> bool:
    items = read_items()
    new_items = []

    for item in items:
        if item.get("id") != item_id:
            new_items.append(item)

    if len(new_items) == len(items):
        return False  # não encontrou

    write_items(new_items)
    return True
