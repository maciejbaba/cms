<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// by default it will use articles table
class Article extends Model
{
    use HasFactory;
    use HasUuids;

    const PUBLICATION_DATE = 'creation_date';
}
