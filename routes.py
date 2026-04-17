from flask import Blueprint, request, jsonify, render_template
from models import db, Produto

main = Blueprint("main", __name__)

def validar_produto(data, parcial=False):
    if not data:
        return "Envie dados em JSON."

    if not parcial or "nome" in data:
        nome = str(data.get("nome", "")).strip()
        if not nome:
            return "O nome não pode ficar vazio."

    if not parcial or "preco" in data:
        preco = data.get("preco", None)
        try:
            preco = float(preco)
        except (TypeError, ValueError):
            return "Preço inválido. Use número, ex: 10.5"
        if preco <= 0:
            return "O preço deve ser maior que zero."

    return None

@main.route("/")
def home():
    return render_template("index.html")

@main.route("/produtos", methods=["GET"])
def listar_produtos():
    produtos = Produto.query.all()
    return jsonify([p.to_dict() for p in produtos])

@main.route("/produtos", methods=["POST"])
def criar_produto():
    data = request.get_json()
    erro = validar_produto(data, parcial=False)
    if erro:
        return jsonify({"erro": erro}), 400

    produto = Produto(nome=str(data["nome"]).strip(), preco=float(data["preco"]))
    db.session.add(produto)
    db.session.commit()
    return jsonify(produto.to_dict()), 201

@main.route("/produtos/<int:id>", methods=["PUT"])
def atualizar_produto(id):
    produto = Produto.query.get(id)
    if not produto:
        return jsonify({"erro": "Produto não encontrado"}), 404

    data = request.get_json()
    erro = validar_produto(data, parcial=True)
    if erro:
        return jsonify({"erro": erro}), 400

    if "nome" in data:
        produto.nome = str(data["nome"]).strip()
    if "preco" in data:
        produto.preco = float(data["preco"])

    db.session.commit()
    return jsonify(produto.to_dict())

@main.route("/produtos/<int:id>", methods=["DELETE"])
def deletar_produto(id):
    produto = Produto.query.get(id)
    if not produto:
        return jsonify({"erro": "Produto não encontrado"}), 404

    db.session.delete(produto)
    db.session.commit()
    return "", 204
