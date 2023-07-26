const Picture = require("../models/Picture");
const Picure = require("../models/Picture");

const fs = require("fs");

exports.create = async (req, res) =>{
    try {
        
        const { name } = req.body;

        const file = req.file;

        const picture = new Picture({
            name,
            src: file.path,
        });

        await picture.save();

        res.json({picture, msg: "Imagem Salva com Sucesso!"});

    } catch (error) {
        res.status(500).json({message: "Erro ao Salvar Imagem."})
    }
};

exports.findAll = async (req, res) =>{
    try {

        const pictures = await Picture.find();

        res.json(pictures);
        
    } catch (error) {
        res.status(500).json({message: "Erro ao buscar Imagens."});
    }
}

exports.remove = async (req, res) => {
    try {
        
        const picture = await Picture.findById(req.params.id);

        if (!picture) {
            return res.status(404).json({ message: "Imagem não Encontrada" });
        }

        fs.unlinkSync(picture.src);

        await picture.remove();

        res.json({ message: "Imagem removida com Sucesso!"});

    } catch (error) {
        res.status(500).json({message: "Erro ao excluir imagem."})
    }
}