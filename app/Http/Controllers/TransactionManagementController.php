<?php

namespace App\Http\Controllers;

use App\Models\Employee;
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

    public function edit($id)
    {
        $auth = auth('admin')->user();
        $transaction = Transaction::with('address.user')->find($id);
        $employees = Employee::where('tenant_id', $auth->tenant_id)->get();

        return Inertia::render('Admin/EditTransaction', [
            'transactions' => $transaction,
            'employees' => $employees,
            'auth' => $auth,
        ]);
    }

    public function update(Request $request, $id)
    {
        $transaction = Transaction::find($id);
        $transaction->employee_id = $request->employee_id;
        $transaction->status = 'on-delivery';
        $transaction->save();

        return redirect()->route('admin.manageTransactions');
    }
}
