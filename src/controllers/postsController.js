import {getPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import fs from "fs"
import gerarDescricaoComGemini from "../services/geminiServices.js"

export async function listarPosts(req, res) {
    const posts = await getPosts();
    res.status(200).json(posts);
}

export async function postarPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    }catch(erro){
        console.log(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao:"",
        imgUrl: req.file.originalname,
        alt:""
    };
    try {
        const postCriado = await criarPost(novoPost);
        const imagem = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagem)
        res.status(200).json(postCriado);
    }catch(erro){
        console.log(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        const post = {
            imgUrl: urlImagem, 
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    }catch(erro){
        console.log(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}