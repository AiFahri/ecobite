<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;

class TransactionManagementController extends Controller
{
    public function index()
    {

        $transactions = Transaction::with('address.user')
            ->orderBy('updated_at', 'desc')
            ->paginate(10);
        return Inertia::render('Admin/ManageTransactions', [
            'transactions' => $transactions,
            'auth' => auth('admin')->user(),
        ]);
    }
}
