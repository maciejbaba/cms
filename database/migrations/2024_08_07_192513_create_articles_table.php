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
    Schema::dropIfExists('articles');

    Schema::create('articles', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->string('title');
      $table->text('body');
      $table->foreignId('user_id')->constrained()->cascadeOnDelete();
      $table->date('publication_date');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('articles');
  }
};
