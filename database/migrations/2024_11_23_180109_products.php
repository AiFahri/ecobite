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
        Schema::create('products', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->text('description')->nullable();
            $table->bigInteger('price');
            $table->bigInteger('discount_price');
            $table->smallInteger('stock');
            $table->timestamps();
            $table->foreignUlid('tenant_id')->constrained('tenants');
            $table->foreignUlid('product_type_id')->constrained('product_types');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
