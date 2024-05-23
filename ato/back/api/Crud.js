const router = require('express').Router();
const Animals = require('../models/Animals');
const multer = require('multer');
const fs = require('fs');
const Compte = require('../models/Compte');

router.get('/animal/:idAnimal', async (req, res) => {
  const id = req.params.idAnimal
  try {
    const animal = await Animals.findByPk(id, {
        include:[
            {
                model: Compte,
                as:'Personne',
                attributes:['nom','id']
            }
        ]
    });
    if (!animal) {
        return res.status(404).json({ error: 'animal introuvable' });
    }
    res.json({ animal });
}
catch (err) {
    console.error('Erreur lors de la récupération', err);
    res.status(500).json({ error: 'Erreur lors de la récupération' })
}
});

router.get('/allAnimal', async (req, res) => {
  try {
    const animals = await Animals.findAll({
        include:[
           { model:Compte,
            as: 'Personne',
            attributes:['nom','id']
           }
        ]
    })
    res.status(200).json(animals)
}
catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produit dans la récupération des données" })
}
});

router.post('/addFavorite/:id', async (req, res) => {
    const idAnimal = req.params.id;
    try {
        const animal = await Animals.findByPk(idAnimal);
        if (!animal) {
            return res.status(404).json({ message: "Le animal n'a pas été trouvé." });
        }
        const updatedFavoriteValue = !animal.favorite;
        await Animals.update(
            { favorite: updatedFavoriteValue },
            { where: { id: idAnimal } }
        );
        return res.status(200).json({ favorite: updatedFavoriteValue });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Une erreur est survenue." });
    }
});

// Configuration Multer pour spécifier où stocker les fichiers téléchargés
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = file.originalname.split('.').pop();
        cb(null, 'pieceJointe-' + uniqueSuffix + '.' + extension);
    }
});

const upload = multer({ storage: storage });

// Route pour créer un chat
router.post('/new', upload.single('photo'), async (req, res) => {
  try {
      const image = req.file;

      const newAnimal = await Animals.create({
          nom: req.body.nom,
          type:req.body.type,
          couleur:req.body.couleur,
          description:req.body.description,
          personne : req.body.personne,
          favorite:0,
          image: image ? image.path.replace(/\\/g, '/') : null,
          age:req.body.age,
          sexe:req.body.sexe
      })
      const savedAnimal = await newAnimal.save();
      res.status(201).json(savedAnimal);
  }
  catch (err) {
      console.error('Erreur lors de la création: ', err);
      res.status(201).json({ message: 'Erreur lors de la création' });
  }
})


router.delete('/animal/:id', async (req, res) => {
  const{id} = req.params
  try {
    const animal = await Animals.findByPk(id);
    if (!animal) {
        return res.status(404).json({ error: 'Collaborateur introuvable' });
    }
    await animal.destroy();
    res.sendStatus(204);
  }
  catch (error) {
      console.error('Erreur lors de la suppression :', error)
      res.status(500).json({ message: 'Erreur lors de la suppressione' })
  }
});

router.put('/:id/edit', upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  const image = req.file;
  try {
      const updateAnimal = await Animals.findByPk(id);
      const imageAnimal = updateAnimal.image
      if (!updateAnimal) {
          return res.status(404).json({ error: 'Animal introuvable' });
      }

      if (image && imageAnimal && fs.existsSync(imageAnimal)){
          fs.unlinkSync(imageAnimal)
      }
      const updatedanimal = await updateAnimal.update({
          nom: req.body.nom,
          type: req.body.type,
          couleur: req.body.couleur,
          description: req.body.description,
          image: image ? image.path.replace(/\\/g, '/') : imageAnimal,
      })


      res.status(201).json(updatedanimal)
  }
  catch (error) {
      console.error('Erreur lors de la mise à jour du collaborateur', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour du collaborateur' });
  }
})

module.exports = router;
