from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from settings import TIPOS_PERMITIDOS, STATUS_PERMITIDOS

app = Flask(__name__)
CORS(app) # o CORS para conectar coma API

DATA_FILE = "items.json" # Arquivo de Dados -> Para a API em formato JSON

# FUNÇÕES AUXILIARES
def read_items():
    '''
        função que lerá os items do arquivo ITEMS.JSON.
        - Seu retorno será json carregado como arquivo.
    '''
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def write_items(items):
    '''função que irá escrever os items do arquivo ITEMS.JSON.
        - Seu retorno será o dump de items no arquivo.
        '''
    with open(DATA_FILE, "w") as f:
        json.dump(items, f, indent=2)

# VALIDAÇÃO OBRIGATÓRIA DOS DADOS DA API
def validate_item(data):
    '''
        Função que recebe os dados e valida cada item contido no json.
        - Se o item estiver sem título ou com um título curto, retorna uma string de erro.
        - Se o tipo do item não for um tipo permitido, retorna uma string de erro.
        - Se o status do item não for um tipo permitido, retorna uma string de erro.
        - Se o item tiver valor mas o valor é negativo, retorna uma string de erro.
        ! Caso contrário, a validação retornará None: sem erros encontrados.
    '''
    if "titulo" not in data or len(data["titulo"]) < 3:
        return "titulo é obrigatório e deve ter no mínimo 3 caracteres"

    if data.get("tipo") not in TIPOS_PERMITIDOS:
        return "tipo inválido"

    if data.get("status") not in STATUS_PERMITIDOS:
        return "status inválido"

    if "valor" in data and data["valor"] < 0:
        return "valor não pode ser negativo"

    return None

# ROTAS DA API
# GET/items
@app.route("/items", methods=["GET"])
def get_items():
    '''
        ROTA GET/items:
        Função que irá ler os items, pegar o tipo e o status.
        Condições:
        - Se tiver tipo, variável items será uma lista dos items com tipo.
        - Se tiver status, variável items será uma lista dos items com status.
        -> O retorno será a lista dos items em formato json.
    '''
    items = read_items()
    tipo = request.args.get("tipo")
    status = request.args.get("status")

    if tipo:
        items = [i for i in items if i["tipo"] == tipo]
    if status:
        items = [i for i in items if i["status"] == status]

    return jsonify(items)

# POST/items
@app.route("/items", methods=["POST"])
def create_item():
    '''
        ROTA POST/items:
        Função que irá criar os itens, os dados são uma requisição para json. Vai validar os erros usando a função validate_item com os dados.
        - Se tiver erro, retorna o erro em json com o padrão 400;
        Caso não tenha erro: 
        - vai ler os items com a função 'read_item', 
        - definir um novo id que será o id máximo em items + 1,
        - um item terá o padrão: "id" : novo_id, **dados (podendo ser diferente número de dados),
        - items lista recebera o item, e o item será escrito no items.json;
        Retorna o item em json, no padrão 201.
    '''
    data = request.json
    error = validate_item(data)
    if error:
        return jsonify({"error": error}), 400

    items = read_items()
    new_id = max([i["id"] for i in items], default=0) + 1

    item = { "id": new_id, **data }
    items.append(item)
    write_items(items)

    return jsonify(item), 201

# PUT/items
@app.route("/items/<int:item_id>", methods=["PUT"])
def update_item(item_id):
    '''
        PUT/items:
        Função que irá atualizar um item caso necessário via id, recebendo os dados json e validando erros com o validate_item, caso tenha erro retorna o erro em json no padrão 400.
        Se não houver erro:
        - Items = items em json;
        - Irá percorrer os items até achar um com o id informado, e atualizará este item com os novos dados. (enumerates: objetos)
        Vai retornar o item em json, e caso não encontre-o vai retornar um erro no padrão 404.
    '''
    data = request.json
    error = validate_item(data)
    if error:
        return jsonify({"error": error}), 400

    items = read_items()
    for i, item in enumerate(items):
        if item["id"] == item_id:
            items[i] = { "id": item_id, **data }
            write_items(items)
            return jsonify(items[i])

    return jsonify({"error": "Item não encontrado"}), 404

# PATCH/items
@app.route("/items/<int:item_id>/status", methods=["PATCH"])
def update_status(item_id):
    '''
        PATCH/items:
        Função que irá atualizar o status de um item caso necessário via id, recebendo os dados json e o status atual. Caso o status não esteja no padrõa permitido configurado, retornará um erro json no padrão 400.
        Se não houver erro:
        - Items = items em json;
        - Irá percorrer os items até achar um com o id informado, e atualizará o status do item com os dados.
        Vai retornar o item em json, e caso não encontre-o vai retornar um erro no padrão 404.
    '''
    items = read_items()
    status = request.json.get("status")

    if status not in STATUS_PERMITIDOS:
        return jsonify({"error": "status inválido"}), 400

    for item in items:
        if item["id"] == item_id:
            item["status"] = status
            write_items(items)
            return jsonify(item)

    return jsonify({"error": "Item não encontrado"}), 404


# DELETE/items
@app.route("/items/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):
    '''
        DELETE/items:
        Função que irá deletar um item via id, recebendo os dados json.
        - Vai escrever todos os items na variável items, exceto o id que deseja ser deletado.
        O retorno então, será uma string vazia no padrão 204.
    '''
    items = read_items()
    items = [i for i in items if i["id"] != item_id]
    write_items(items)
    return "", 204