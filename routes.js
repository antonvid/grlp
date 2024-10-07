const fs = require('fs');
const articlesPath = __dirname + '/articles';

module.exports = function(app) {

    app.get('/', function(req, res) {
        let articlesDir = __dirname + '/articles/';
        fs.readdir(articlesDir, (err, files) => {
            if (err) {
                return res.status(500).send('Error reading articles directory');
            }
    
            const articles = [];
    
            files.forEach(file => {
                // Read each article file (assuming they're JSON files)
                const articlePath = articlesDir + file;
                const data = fs.readFileSync(articlePath, 'utf8');
                const article = JSON.parse(data);
    
                // Extract the article ID from the filename (e.g., "1234.json" => "1234")
                const articleId = file.replace('.json', '');
    
                // Add the article title and its link to the list
                articles.push({
                    id: articleId,
                    name: article.name || `Article ${articleId}`
                });
            });
    
            // Render the articles list page, passing the articles array to the template
            res.render('index', { articles });
        });
    
    });
    
    app.get('/article/:id', function(req, res) {
        let id = req.params.id;
        let articlePath = `${articlesPath}/${id}.json`;
        fs.access(articlePath, fs.constants.F_OK, (err) => {
            if (err) {
                // If the file doesn't exist, send a 404 response
                return res.status(404).send('Article not found');
            }
    
            // Read the JSON file
            fs.readFile(articlePath, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).send('Error reading the article');
                }
    
                // Parse the JSON data
                const article = JSON.parse(data);

                console.log(article);
    
                // Render the EJS template with the article data
                res.render('article', { article });
            });
        });
    });
}