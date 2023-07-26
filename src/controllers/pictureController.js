const Picture = require("../models/Picture");
const Picure = require("../models/Picture");

exports.create = async (req, res) =>{
    try {
        
        const { name } = req.body;

        const file = req.file;

        const picture = new Picture({
            name,
            src: file.path,
        });

        await picture.sabe();

        res.json({picture, msg: "Imagem Salva com Sucesso!"});

    } catch (error) {
        res.status(500).json({message: "Erro ao Salvar Imagem."})
    }
};

exports.findAll = async (req, res) =>{
    try {

        const pictures = await picture.find();

        res.json(pictures);
        
    } catch (error) {
        res.status(500).json({message: "Erro ao buscar Imagens."});
    }
}