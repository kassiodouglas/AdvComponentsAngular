# @kassdoug/tableadv 1.0.0

Arquivos de desenvolvimento do componente Tableadv.

Mais informações (FRONTEND): https://www.npmjs.com/package/@kassdoug/tableadv

Mais informações (BACKEND): ...

## Instalação
Para instalar rode:
```
npm i @kassdoug/tableadv
```

<br><br>

## Dev
Iniciar o app de testes:
```
npm run dev:app
```

Iniciar a lib e fazer build de testes:
```
npm run dev:tableadv
```

Para publicar
```
npm run pub
```


## Backend (temporario)
Copie a classe Tableadv no arquivo do repositorio (@backend - class Tableadv - laravel - 1.0.0.zip), somente cole na raiz da pasta 'app' dentro do Laravel.
Faça a chamada da classe normamente e de um return nela. A rota precisa ser do tipo POST.

```
    ## route/api.php
    Route::post('/', [UsersController::class, 'all']);



    ## UsersController.php
    use App\Kassdoug\Tableadv\TableadvController;

    public function all(Request $request){     
        $query = User::with(["address"]);
        return TableadvController::run(User::class, $query, $request);        
    }
```