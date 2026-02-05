# validators/cursos_validator.py
from settings import TIPOS_PERMITIDOS, STATUS_PERMITIDOS

def validate_item(data: dict) -> str | None:
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

def validate_status(status: str | None) -> str | None:
    if status not in STATUS_PERMITIDOS:
        return "status inválido"
    return None
