## TableAdv Backend Laravel

### Instalação
Descompacte o arquivo KassDoug.zip dentro de "app/" no Laravel.


### Como usar
Faça a chamada da classe normamente e de um return nela. A rota precisa ser do tipo POST.

```
## route/api.php
Route::post('/', [UsersController::class, 'all']);
```

```
## UsersController.php
user App\Model\User
use App\Kassdoug\Tableadv\TableadvController;

public function all(Request $request){     
    $query = User::with(["address"]);
    return TableadvController::run(User::class, $query, $request);        
}
```