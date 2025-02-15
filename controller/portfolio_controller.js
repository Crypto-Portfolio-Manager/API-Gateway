module.exports = {
  createPortfolio
};  
  
async function createPortfolio(userData, res, client) {
    try {
        const portfolioData = {
            name: userData.name,
            userId: userData.email
        };

        client.CreatePortfolio(portfolioData, (error, response) => {
            if (error) {
                console.error('Error creating portfolio:', error.message);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }
            console.log('Portfolio creation success:', response.success);
            res.statusCode = 200;
            res.end(JSON.stringify({ success: response.success }));
        });
    } catch (err) {
        console.error('Unexpected error:', err.message);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Unexpected error occurred' }));
    }
}
