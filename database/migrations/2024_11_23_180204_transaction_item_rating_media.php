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
        Schema::create('transaction_item_rating_media', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->text('photo_url')->nullable();
            $table->timestamps();
            $table->foreignUlid('transaction_item_rating_id')->constrained('transaction_item_ratings')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_item_rating_media');
    }
};
