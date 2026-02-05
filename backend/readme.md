# Como rodar o backend



























# Endpoints (com exemplos de request/response)
## GET/items:
    Irá ler os items, pegar o tipo e o status.
        Condições:
        - Se tiver tipo, variável items será uma lista dos items com tipo.
        - Se tiver status, variável items será uma lista dos items com status.
        -> O retorno será a lista dos items em formato json.

## POST/items:
    Irá criar os itens, os dados são uma requisição para json. Vai validar os erros usando a função validate_item com os dados.
        - Se tiver erro, retorna o erro em json com o padrão 400;
        Caso não tenha erro: 
        - vai ler os items com a função 'read_item', 
        - definir um novo id que será o id máximo em items + 1,
        - um item terá o padrão: "id" : novo_id, **dados (podendo ser diferente número de dados),
        - items lista recebera o item, e o item será escrito no items.json;
        Retorna o item em json, no padrão 201.

## PUT/items:
    Irá atualizar um item caso necessário via id, recebendo os dados json e validando erros com o validate_item, caso tenha erro retorna o erro em json no padrão 400.
        Se não houver erro:
        - Items = items em json;
        - Irá percorrer os items até achar um com o id informado, e atualizará este item com os novos dados. (enumerates: objetos)
        Vai retornar o item em json, e caso não encontre-o vai retornar um erro no padrão 404.

## PATCH/items:
    Irá atualizar o status de um item caso necessário via id, recebendo os dados json e o status atual. Caso o status não esteja no padrõa permitido configurado, retornará um erro json no padrão 400.
        Se não houver erro:
        - Items = items em json;
        - Irá percorrer os items até achar um com o id informado, e atualizará o status do item com os dados.
        Vai retornar o item em json, e caso não encontre-o vai retornar um erro no padrão 404.
    
## DELETE/items:
    Irá deletar um item via id, recebendo os dados json.
        - Vai escrever todos os items na variável items, exceto o id que deseja ser deletado.
        O retorno então, será uma string vazia no padrão 204.
