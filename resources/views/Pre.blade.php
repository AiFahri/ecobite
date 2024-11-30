<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Instant Buy</title>
</head>
<body>
    <form action="/instant-buy" method="POST">
        @csrf
        <h3>Products</h3>
        <div id="products-container">
            <!-- Produk pertama -->
            <div class="product">
                <label>Product ID:</label></br>
                <input type="text" name="products[0][product_id]" required></br></br>

                <label>Quantity:</label></br>
                <input type="number" name="products[0][quantity]" min="1" required></br></br>
            </div>
        </div>

        <button type="button" id="add-product">Add Another Product</button></br></br>

        <h3>Voucher</h3>
        <label>Voucher ID:</label></br>
        <input type="text" name="voucher_id"></br></br>

        <button type="submit">Submit</button>
    </form>

    <script>
        // Script untuk menambah produk baru
        let productIndex = 1;
        document.getElementById('add-product').addEventListener('click', function () {
            const container = document.getElementById('products-container');
            const newProduct = `
                <div class="product">
                    <label>Product ID:</label></br>
                    <input type="text" name="products[${productIndex}][product_id]" required></br></br>

                    <label>Quantity:</label></br>
                    <input type="number" name="products[${productIndex}][quantity]" min="1" required></br></br>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', newProduct);
            productIndex++;
        });
    </script>
</body>
</html>
