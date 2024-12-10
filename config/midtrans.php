<?php

return [
    'merchant_id' => env('MIDTRANS_MERCHANT_ID'),
    'client_key' => env('MIDTRANS_CLIENT_KEY'),
    'server_key' => env('MIDTRANS_SERVER_KEY'),

    'is_production' => env('MIDTRANS_IS_PRODUCTION', false),
    'is_sanitized' => false,
    'is_3ds' => false,

    'finish_redirect_url' => env('MIDTRANS_FINISH_REDIRECT_URL', 'https://yourdomain.com/finish'),
    'unfinish_redirect_url' => env('MIDTRANS_UNFINISH_REDIRECT_URL', 'https://yourdomain.com/unfinish'),
    'error_redirect_url' => env('MIDTRANS_ERROR_REDIRECT_URL', 'https://yourdomain.com/error'),
];
