# @kassdoug/tableadv

Componente Angular+2 para criação de uma table com recursos a mais. Uso com apis feitas com backend Laravel+Eloquent.

## Configurações BACKEND
O backend inicial foi feito uma api com Laravel na versão 10+.
Mais informações de como contruir o backend, acesse: https://packagist.org/.



## Configurações FRONTEND
Crie um componente, para o exemplo UsersComponent.

Em `users-component.ts`:
Crie 3 propriedades 'tableadvIdUser','tableadvUsers', 'tableadvUsersHeader' e um método,'getDataUsers()'.

Onde:
- *tableadvIdUser*: recebe o id único da tabela;
- *tableadvUsers*: recebe os dados vindos da api;
- *tableadvUsersHeader*: é a configuração das colunas;
- *getDataUsers()*: método que irá acessar o servicço dos dados na api.

<br>
<br>

### Configuração do ID
Somente informe um nome único para a tabela:
```
tableadvIdUser:string = 'tableUsers'
```

<br>
<br>


### Configuração das colunas
Em tableadvUsersHeader, configure as colunas e a ordem delas, existem algumas propriedades obrigatórias:

- *db: (string)*: nome da coluna no banco de dados a ser exibida;
- *label: (string)*: texto a ser exibido no cabeçalho da tabela;

```
tableadvUsersHeader = [
    {
        db:"name", label:"Nome do usuário"
    },
    {
        db:"email", label:"Email do usuário"
    }
]
```

As outras propriedades são:
- *search: (string | object)*: define se a coluna é pesquisavél e em qual coluna é feita a pesquisa;
- *order: (object)*: define se a coluna é ordenável e qual a coluna a ordenar;


```
tableadvUsersHeader = [
    {
        db:"name", label:"Nome do usuário",
        search: "name", order: {db:"name}
    },
    {
        db:"email", label:"Email do usuário",
        earch: "email", order: {db:"email}
    }
]
```

A prop `search` pode ser uma string ou um objeto, se a pesquisa for feita na tabela primária, somente definir o nome da coluna já basta. Agora, se a pesquisa precisa ser em uma tabela relacionada com a primária, é necessário informar mais informações. Como estamos usando modelos no backend Laravel, vamos passar as configurações do nome do modelo e da coluna no modelo. Exemplificando, o usuário precisa pegar um endereço em uma tabela relacionada, com o model 'address' e sua coluna 'name'. A prop 'db' também tem que buscar os dados no modelo e coluna:

```
tableadvUsersHeader = [
    {
        db:"name", label:"Nome do usuário",
        search: "name", order: {db:"name}
    },
    {
        db:"email", label:"Email do usuário",
        earch: "email", order: {db:"email}
    },
    {
        db:"address.name", label:"Endereço do usuário",
        search: {model:"address", field:"name"}
    }
]
```

A prop `order` tem como propriedade obrigatória o 'db' que é o nome da coluna a ordenar na tabela. Se for uma ordenação na tabela primária, somente essa prop é necessária. Se for uma ordenação na tabela relacionada, é necessário mais dados. Exemplificando, ordenar pelo nome do endereço, no model address:

```
tableadvUsersHeader = [
    {
        db:"name", label:"Nome do usuário",
        search: "name", order: {db:"name}
    },
    {
        db:"email", label:"Email do usuário",
        earch: "email", order: {db:"email}
    },
    {
        db:"address.name", label:"Endereço do usuário",
        search: {model:"address", field:"name"},
        order: {
            db:'address.name', 
            table_secondary:"address", 
            field_secondary:"name", 
            field_inner_primary:"address_id"
        }
    }
]
```
Onde:
- *db*: nome da coluna a ordenar;
- *table_secondary*: nome da tabela (não do modelo) relacionada;
- *field_secondary*: nome da coluna na tabela relacionada;
- *field_inner_primary*: nome da coluna na tabela primária que se relaciona com o id da secundaria;


<br>
<br>


### Configuração dos dados
Os dados da tabela virão de uma api que será consumida por um serviço (usersService). No método 'getDataUsers()', teremos a seguinte lógica:

```
getDataUsers(event:any){

    if(event.id == this.tableadvIdUser){

        this.usersService.get(event).subscribe({
            next: (response)=>{
                this.tableadvUsers = response
            }
        })

    }

}
```

Assim o retorno da api será atribuida a prop 'tableadvUsers'. E nesse método, é onde poderá alterar os dados da api para inserções de novas colunas, componentes ou transformar os dados.

```
getDataUsers(event:any){

    if(event.id == this.tableadvIdUser){

        this.usersService.get(event).subscribe({
            next: (response)=>{

                response.data.forEach((item:any) => {      
                    item['nova_coluna'] = "texto fixo na nova coluna"
                });

                this.tableadvUsers = response
            }
        })

    }

}
```

Essa nova coluna, deve ser informada na prop 'tableadvUsersHeader':

```
tableadvUsersHeader = [
    {
        db:"name", label:"Nome do usuário",
        search: "name", order: {db:"name}
    },
    {
        db:"email", label:"Email do usuário",
        earch: "email", order: {db:"email}
    },
    {
        db:"address.name", label:"Endereço do usuário",
        search: {model:"address", field:"name"},
        order: {
            db:'address.name', 
            table_secondary:"address", 
            field_secondary:"name", 
            field_inner_primary:"address_id"
        }
    },
    {
        db:"nova_coluna", label:"Nova coluna",
    },
]
```


### Uso com componentes externos
Você pode criar uma coluna com base em um componente externo. Basta criar uma nova coluna em 'tableadvUsersHeader', vamos chamar de 'options'.

```
tableadvUsersHeader = [
    {
        db:"name", label:"Nome do usuário",
        search: "name", order: {db:"name}
    },
    {
        db:"email", label:"Email do usuário",
        earch: "email", order: {db:"email}
    },
    {
        db:"address.name", label:"Endereço do usuário",
        search: {model:"address", field:"name"},
        order: {
            db:'address.name', 
            table_secondary:"address", 
            field_secondary:"name", 
            field_inner_primary:"address_id"
        }
    },
    {
        db:"options", label:"", //não exibirá texto no cabeçalho
    },
]
```

Assim no método 'getDataUsers(), configure a coluna:

```
getDataUsers(event:any){

    if(event.id == this.tableadvIdUser){

        this.usersService.get(event).subscribe({
            next: (response)=>{

                response.data.forEach((item:any) => {      
                    item['option'] = { component: { instance: OptionsComponent, properties: { data: item } } }
                });

                this.tableadvUsers = response
            }
        })

    }

}
```

Suponha que OptionsComponent, terá sua propria logica baseada em um objeto da api. Nosso caso, OptionsComponent irá exibir opções ao clicar em um icone. Para configurar é preciso informar a instancia do componente e suas propriedades se houver.
```
.
.
item['option'] = { 
    component: 
    { 
        instance: OptionsComponent, 
        properties: { data: item } 
    } 
}
.
.
```


<br><br>


Em `users-component.html`:
No html simplesmente chame o seletor 'tableadv' e informe os atributos que configuramos:

```
    <tableadv [id]="tableadvIdUser" [data]="tableadvUsers" [gridHeader]="tableadvUsersHeader" (onGetData)="getDataUsers($event)"></tableadv>
```
Onde:
- *id*: o id único da tabela;
- *data*: são os dados da api em array;
- *gridHeader*: dados da configuração das colunas;
* *onGetData*: evento que irá chamar o método getDataUsers(), que deve receber $event;