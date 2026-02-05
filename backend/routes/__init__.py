# routes/__init__.py
from .cursos_routes import cursos_bp

def register_routes(app):
    app.register_blueprint(cursos_bp)
