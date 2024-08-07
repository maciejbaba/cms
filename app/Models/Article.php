<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// by default it will use articles table
class Article extends Model
{
  use HasFactory, HasUuids;

  protected $table = 'articles';

  protected $fillable = ['title', 'body', 'user_id'];

  public function author(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }
}
