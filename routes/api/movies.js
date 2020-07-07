const express = require("express");
const router  = express.Router();

const Movie = require("../../models/Movie");

// @route GET api/movies/all
router.get("/all",(req,res) => {
    const promise = Movie.find({ }).sort({title: 1}); 
promise.then((data)=> {
    res.json(data);
}).catch((err)=> {
    res.json(err);
})
});

router.get("/moviesbygenre/:category",(req,res) => {
    const promise = Movie.find({ category: req.params.category }).sort({title: 1}); 
promise.then((data)=> {
    res.json(data);
}).catch((err)=> {
    res.json(err);
})
});

router.post("/add",(req,res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    const movie = new Movie(body)

    if (!movie) {
        return res.status(400).json({ success: false, error: err })
    }

    movie
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: movie._id,
                created: movie.createdAt,
                title:movie.title,
                imdb:movie.imdb,
                year:movie.year,
                message: 'Movie created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Movie not created!',
            })
        })
});

router.get('/top10',(req,res)=>{
    const promise = Movie.find({ }).limit(10).sort({imdb: -1}); // bütün filmlerin listelenmesi
    promise.then((data)=> {
      res.json(data);
    }).catch((err)=> {
      res.json(err);
    })
  });



router.get('/:id',(req,res) => {
    const promise = Movie.findById(req.params.id);
    promise.then((data)=> {
        res.json(data);
    }).catch((err)=> {
        res.json(err);
    })

}),

module.exports = router;