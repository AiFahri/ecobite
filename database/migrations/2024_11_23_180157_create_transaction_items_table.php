<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transaction_items', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->smallInteger('quantity');
            $table->bigInteger('price');
            $table->bigInteger('discount_price');
            $table->foreignUlid('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignUlid('transaction_id')->constrained('transactions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_items');
    }
};
