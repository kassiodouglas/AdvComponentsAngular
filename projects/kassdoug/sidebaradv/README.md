## Sidebaradv

### Ideia
Ser um componente para navegação do tipo sidebar, reutilizável para Angular +12.



### Instalação
Execute o comando:
```
npm i @kassdoug/sidebaradv
```





<br><br>


## Como usar
O componente serve para ser um 'layout' de página, interagindo com o conteúdo, de acordo com o movimento e localidade da barra lateral. Assim o melhor uso é sendo dentro de um componente que seja pai das páginas do seu aplicativo angular. Segue exemplo de hierarquia:

```
├───app
│   ├───components
│   │   ├───@layouts
│   │   │   ├───header
│   │   │   ├───topbar
│   │   │   └───layout.component.ts
│   │   ├───home
│   │   │   ├───home.component.ts
│   ├───app.module.ts
```
Faça o import dentro de seu app.module.
```
import { SidebaradvModule } from '@kassdoug/sidebaradv';

...

@NgModule({
  declarations: [..],
  imports: [
    ...
    SidebaradvModule,
  ],
  providers: [..],
  bootstrap: [..],
})
export class AppModule {}
```

Dentro de 'layout.component.ts, você teria a chamada do componente:
```
@Component({
  selector: 'app-layout',
  template: `

    <sidebaradv 
        [links]="links" 
        [header]="header"
        [topbar]="topbar"
        [permissions]="permissions"
        [usePermissions]="true"

        [withHover]="hover"
        [search]="search"
        [theme]="theme"
        [position]="position" 

    ></sidebaradv>

  `
})
```
onde todas as props da sidebar serão configuradas aqui. Esse componente funciona com um 'router-outlet' internamente, então pode-se renderizar componentes (páginas) nele. As rotas ficariam:
```
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
    ],
  },
];
```
Todas as páginas que vão interagir a partir da sidebar, serão filhos dela.


<br><br>


## Configurando
Veja como configurar suas propriedades.

### links
Prop que recebe um array de links para renderizar no front.
```
this.links = [
    {
        path: '/',
        label: 'Home',
        icon: '<i class="fa-solid fa-house"></i>',
        permissions: ['home'],
        tags: ['home', 'inicio'],
    },

    {
    id: 'components',
    label: 'Componentes',       
    icon:'<i class="fa-solid fa-boxes-packing"></i>',
    permissions: ['home'],
    links:[
        {
        path: '/sidebar',
        label: 'Sidebar',
        icon: '<i class="fa-solid fa-bars"></i>',
        tags: ['sidebar', 'barra lateral'],
        },    
        {
        path: '/table',
        label: 'Table',
        icon: '<i class="fa-solid fa-table"></i>',
        tags: ['table', 'tableadv'],
        },
    ]
    },
];
```

Neste exemplo temos um link HOME, um sublink COMPONENTES que engloba 2 links SIDEBAR e TABLE.

O padrão de link segue como acima, sendo as chaves dos objetos:
- *path* -> caminho configurado nas rotas do app (opcional)
- *label* -> texto a ser exibido em tela
- *icon* -> icone da lib <a href="https://fontawesome.com/">fontawesome</a> (opcional)
- *permissions* -> recebe um array de valores que podem ser usados para validar se um link é permitido ser exibido ao usuário (opcional)
- *tags* -> palavras chaves usadas na busca por links, alem de buscar o label (opcional)
- *links* -> quando um link recebe essa chave, ele se torna um sublink, contendo uma lista de links, importante não ter a chave path, ela indica um link final (opcional)
- *id* -> chave que identifica o nome único de um conjunto de sublinks, uso com a chave links é obrigatória (opcional - uso com links) 

Sempre deverá haver, ou um 'path', ou 'links', nunca os 2 no mesmo objeto. Uso de níveis em sublinks é infinito.


### header
É o cabeçalho da barra lateral, podendo receber html simples, textos ou  a inserção de um componente.

```
this.header = HeaderComponent
```


### topbar
É uma barra superior, podendo receber html simples, textos ou a inserção de um componente.
```
this.topbar = TopbarComponent
```


### permissions 
Um array contendo uma lista de permissões que serão verificadas em cada link, exibindo ou não para o usuário.

### usePermissions (default = False)
Determina se a barra precisa verificar permissões.

### withHover (default = False)
Altera o modo como a barra se comporta. 
- *True* -> a barra esconde/mostra ao passar/tirar o mouse de cima. 
- *False* -> a barra fica fixa ate que o botao de fechamento ou abertura seja clicado

### search (default = '')
Texto a ser pesquisado nos links (label e tags)

### theme (default = white)
Temas que alteram a cor da barra e barra superior.Temos *light* e *dark*.

### position (default = left)
Define a posição da barra. Temos *left* e *right*.


<br><br>


## Favoritos
O componente conta com sistema de favoritos no browser, existe um icone de estrela na frente de cada link, podendo tirar ou adicionar como favorito ao clicar nesse icone.


<br><br>


## Mobile
Para telas menores que 720px, o componente altera sua configuração, abrangendo a tela toda e trabalhando sem 'hover' (withHover = false).


<br><br>


## Temas
Temos 2 temas configurados light (default), dark.

