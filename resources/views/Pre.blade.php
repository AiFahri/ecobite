<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="instant-buy" method="POST">
        @csrf
        Product ID:</br>
        <input type="text" name="product_id" id=""></br></br>
        Quantity:</br>
        <input type="text" name="quantity" id=""></br></br>
        Voucher ID: </br>
        <input type="text" name="voucher_id" id=""></br></br>
        <button type="submit">Gas</button>

    </form>
</body>
</html>