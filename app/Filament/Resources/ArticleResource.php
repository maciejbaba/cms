<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ArticleResource\Pages;
use App\Models\Article;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Section;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Auth;

class ArticleResource extends Resource
{
  protected static ?string $model = Article::class;

  protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

  public static function form(Form $form): Form
  {
    return $form
      ->schema([
        Section::make()->schema([
          TextInput::make('title')->required()->minLength(2),
          RichEditor::make('body')->required()->minLength(2),
          Hidden::make('user_id')->dehydrateStateUsing(fn($state) => Auth::id()) // need to get user_id for the record creation so get it from auth when admin creates
        ])
      ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        TextColumn::make('title')->searchable(),
        TextColumn::make('body')->searchable(),
        TextColumn::make('publication_date'),
      ])
      ->filters([
        //
      ])
      ->actions([
        Tables\Actions\EditAction::make(),
      ])
      ->bulkActions([
        Tables\Actions\BulkActionGroup::make([
          Tables\Actions\DeleteBulkAction::make(),
        ]),
      ]);
  }

  public static function getRelations(): array
  {
    return [
      //
    ];
  }

  public static function getPages(): array
  {

    return [
      'index' => Pages\ListArticles::route('/'),
      'create' => Pages\CreateArticle::route('/create'),
      'edit' => Pages\EditArticle::route('/{record}/edit')
    ];
  }
}
