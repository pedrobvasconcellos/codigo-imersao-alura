import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();
app.use(express.static("uploads"));
routes(app);

app.listen(3000, () => {
    console.log("Servidor escutando...");
});


/*
function buscarPostId(id){
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}

app.get("/posts/:id", (req, res) => {
    const index = buscarPostId(req.params.id)
    res.status(200).json(posts[index]);
});
*/

/*
const posts = [
    {
        id: 1,
        descricao: "Uma foto teste",
        imagen: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Gato fazendo yoga",
        imagen: "https://placecats.com/millie/300/150"
    },
    {
        id: 3,
        descricao: "Gato fazendo panqueca",
        imagen: "https://placecats.com/millie/300/150"
    }
];
*/