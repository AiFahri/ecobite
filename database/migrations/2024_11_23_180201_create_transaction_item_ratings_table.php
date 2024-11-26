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
        Schema::create('transaction_item_ratings', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->text('feedback')->nullable();
            $table->smallInteger('star');
            $table->timestamps();
            $table->foreignUlid('transaction_item_id')->constrained('transaction_items')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_item_ratings');
    }
};
