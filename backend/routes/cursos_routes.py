from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import os
import uuid

from validators.cursos_validator import validate_item, validate_status
from services.cursos_service import (
    list_items,
    create_item,
    update_item,
    update_status,
    delete_item,
)

cursos_bp = Blueprint("cursos", __name__)

@cursos_bp.get("/cursos")
def get_items_route():
    tipo = request.args.get("tipo")
    status = request.args.get("status")

    items = list_items(tipo=tipo, status=status)
    return jsonify(items), 200

@cursos_bp.get("/cursos/<int:item_id>")
def get_item_by_id_route(item_id):
    items = list_items()

    for item in items:
        if item["id"] == item_id:
            return jsonify(item), 200

    return jsonify({"error": "Curso não encontrado"}), 404


@cursos_bp.post("/cursos")
def create_item_route():
    data = request.get_json(silent=True) or {}

    error = validate_item(data)
    if error:
        return jsonify({"error": error}), 400

    item = create_item(data)
    return jsonify(item), 201


@cursos_bp.put("/cursos/<int:item_id>")
def update_item_route(item_id):
    data = request.get_json(silent=True) or {}

    error = validate_item(data)
    if error:
        return jsonify({"error": error}), 400

    updated = update_item(item_id, data)
    if not updated:
        return jsonify({"error": "Curso não encontrado"}), 404

    return jsonify(updated), 200

@cursos_bp.patch("/cursos/<int:item_id>/status")
def update_status_route(item_id):
    payload = request.get_json(silent=True) or {}
    status = payload.get("status")

    error = validate_status(status)
    if error:
        return jsonify({"error": error}), 400

    updated = update_status(item_id, status)
    if not updated:
        return jsonify({"error": "Curso não encontrado"}), 404

    return jsonify(updated), 200

@cursos_bp.delete("/cursos/<int:item_id>")
def delete_item_route(item_id):
    ok = delete_item(item_id)

    if not ok:
        return jsonify({"error": "Curso não encontrado"}), 404

    return "", 204


@cursos_bp.post("/cursos/upload")
def upload_course_image():
    if "image" not in request.files:
        return jsonify({"error": "Nenhuma imagem enviada"}), 400

    image = request.files["image"]

    if image.filename == "":
        return jsonify({"error": "Arquivo inválido"}), 400

    # Gera nome único
    ext = os.path.splitext(image.filename)[1]
    filename = f"{uuid.uuid4()}{ext}"

    upload_folder = current_app.config.get("UPLOAD_FOLDER")

    if not upload_folder:
        return jsonify({"error": "UPLOAD_FOLDER não configurado"}), 500

    os.makedirs(upload_folder, exist_ok=True)

    path = os.path.join(upload_folder, secure_filename(filename))
    image.save(path)

    image_url = f"http://localhost:5000/uploads/cursos/{filename}"

    return jsonify({
        "filename": filename,
        "url": image_url
    }), 201
