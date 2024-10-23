const fs = require('fs');
const articlesPath = __dirname + '/public/articles/';

module.exports = function(app) {

    app.get('/', function(req, res) {
        fs.readdir(articlesPath, (err, files) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error reading articles directory');
            }
    
            const articles = [];
    
            files.forEach(file => {
                // Read each article file (assuming they're JSON files)
                const articlePath = articlesPath + file;
                const data = fs.readFileSync(articlePath, 'utf8');
                const article = JSON.parse(data);
    
                // Add the article title and its link to the list
                articles.push({
                    id: article.id,
                    title: article.title,
                    author: article.author
                });
            });
            // Render the articles list page, passing the articles array to the template
            res.render('index', { articles });
        });
    
    });
    
    app.get('/article/:name', function(req, res) {
        let name = req.params.name;
        let articlePath = `articles/${name}.ejs`;
        res.render(articlePath);
    });

    app.all('*', function(req, res) {
        res.send('Invalid path');
    })
}