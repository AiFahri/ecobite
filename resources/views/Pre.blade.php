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

        @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

        <h3>Address</h3>
        <label>Address ID:</label></br>
        <input type="text" name="address_id" ></br></br>

        <h3>Product</h3>
        <div id="product-container">
            <!-- Input untuk satu produk -->
            <div class="product">
                <label>Product ID:</label></br>
                <input type="text" name="product_id" required></br></br>

                <label>Quantity:</label></br>
                <input type="number" name="quantity" min="1" required></br></br>
            </div>
        </div>

        <h3>Voucher</h3>
        <label>Voucher ID:</label></br>
        <input type="text" name="voucher_id"></br></br>

        <button type="submit">Submit</button>
    </form>
</body>
</html>
