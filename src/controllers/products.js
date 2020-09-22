exports.createProducts = (req, res, next) => {
    res.json({
        message: 'Create Product Success',
        data: {
            id: 1,
            name: 'Buku Tulis',
            price: 8000
        }

    });
    next();
}

exports.getAllProducts = (req, res, next) => {
    res.json({
        message: "Get All Products",
        data: [
            {
                id: 1,
                name: "Buku Gambar",
                price: 12
            }
        ]
    }
);
next();
}