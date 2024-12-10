<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\ProductMedia;
use App\Models\ProductType;
use App\Services\SupabaseService;

class ProductManagementController extends Controller
{
    //

    public function index()
    {
        $products = Product::with(['productType', 'tenant'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        return Inertia::render('Admin/ManageProducts', [
            'products' => $products,
            'auth' => auth('admin')->user(),
        ]);
    }

    public function create()
    {
        $auth = auth('admin')->user();
        $productTypes = ProductType::all(); // Ambil semua tenant types dari database
        return Inertia::render('Admin/CreateProduct', [
            'product_types' => $productTypes,
            'auth' => $auth,
        ]);
    }

    public function store(Request $request, SupabaseService $supabaseService)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'product_type_id' => 'required|exists:product_types,id', // Validasi tipe produk
            'photos.*' => 'nullable|image|max:2048', // Validasi array file gambar
            'tenant_id' => 'required|exists:tenants,id', // Validasi tenant
        ]);

        // Simpan data produk terlebih dahulu
        $product = Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'discount_price' => $validated['discount_price'] ?? 0,
            'stock' => $validated['stock'],
            'product_type_id' => $validated['product_type_id'],
            'tenant_id' => $validated['tenant_id'],
        ]);

        // Proses pengunggahan foto dan simpan ke tabel product_media
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $filePath = $photo->getPathname();
                $fileName = uniqid() . '_' . $photo->getClientOriginalName();

                // Upload foto ke Supabase
                $url = $supabaseService->uploadFile($filePath, $fileName);

                // Simpan URL foto ke tabel product_media
                ProductMedia::create([
                    'photo_url' => $url,
                    'product_id' => $product->id,
                ]);
            }
        }

        // Redirect ke halaman Manage Products
        return redirect()->route('admin.manageProducts')
            ->with('success', 'Product created successfully.');
    }

    public function destroy($id)
    {
        $tenant = Product::findOrFail($id);
        $tenant->delete();

        return redirect()->route('admin.manageProducts')->with('success', 'Product deleted successfully.');
    }
}
