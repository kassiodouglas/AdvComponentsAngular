import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ViewChildren, QueryList, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'tableadv',
  templateUrl: './griddata.component.html',
  styleUrls: ['./griddata.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class GriddataComponent implements OnInit, OnChanges, AfterViewInit {

  /** Properties -------------------------------------------------------------------- */

  @Input() id!:string


  driver: string = 'laravel-eloquent' // chave simbolica para determinar o uso do componente com backend em laravel com eloquent

  /** Define o estado da tabela maximizado ou normal */
  screenMaximize: boolean = false

  /** Registra o total de paginas geradas */
  totalPages: number = 0
  totalPagesArray: Array<number> = []

  /** Registra a pagina atual  */
  actualPage: number = 1

  /** Registra a última pagina  */
  lastPage: number = 0

  /** Quantidade de links a exibir na navegação para frente e tras em relação a  pagina atual */
  navigationLimitPages: number = 3

  /** Registra o total de registros na tabela */
  totalRegisters: number = 0

  /** Total de registros POR página */
  totalRegisterPerPage: number = 5

  /** Total de registros NA página */
  totalRegisterInPage: number = 0

  /** Determina se o header da tabela é fixo ou não */
  isFixed = false;


  /** Filtros dos dados para o backend */
  orderby: any = { db: 'id' }
  orderdirection: string = 'asc'
  whereColumn: any | null = null
  whereValue: any | null = null


  /** Dados externos */
  @Input() data: any | null = null
  @Input() gridHeader: any | null = null


  /** Envia solicitação */
  @Output() onGetData = new EventEmitter<any>();

  @ViewChildren('elementOrder') elementsOrder: QueryList<ElementRef> = new QueryList<ElementRef>();


  /** Constructor -------------------------------------------------------------------- */

  constructor() {
  }


  /** Cycles -------------------------------------------------------------------- */

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.data = changes['data'].currentValue
    if (this.data !== null)
      this.config()

    this.CONSOLE()

  }

  ngAfterViewInit(): void {
    this.emitGetData()    
  }





  /** Methods -------------------------------------------------------------------- */

  /** Debuga todas as propriedades */
  CONSOLE() {
    console.log(`---------------------------CONSOLE ${this.id}---------------------------`)

    console.log('driver', this.driver)
    console.log('screenMaximize', this.screenMaximize)
    console.log('totalPages', this.totalPages)
    console.log('totalPagesArray', this.totalPagesArray)
    console.log('actualPage', this.actualPage)
    console.log('lastPage', this.lastPage)
    console.log('totalRegisters', this.totalRegisters)
    console.log('totalRegisterPerPage', this.totalRegisterPerPage)
    console.log('navigationLimitPages', this.navigationLimitPages)
    console.log('data', this.data)
    console.log('gridHeader', this.gridHeader)
    console.log('isFixed', this.isFixed)
    console.log('orderby', this.orderby)
    console.log('orderdirection', this.orderdirection)
    console.log('whereColumn', this.whereColumn)
    console.log('whereValue', this.whereValue)


    console.log('---------------------------FIM CONSOLE---------------------------')
  }


  /** Adiciona um loader */
  loading() {
    console.log('loafin')
    Notiflix.Block.init({
      svgColor: '#4551cc',
      backgroundColor: "rgba(255, 255, 255, .7)"
    })
    Notiflix.Block.dots(`#gd-container-${this.id}`)
  }


  /** Remove o loader */
  removeLoading() {
    setTimeout(() => {
      Notiflix.Block.remove(`#gd-container-${this.id}`)
    }, 2000);
  }


  /** Configura os dados */
  config() {

    if(this.data.data.length == 0){
      this.data = null
      this.totalRegisters = 0
      this.totalRegisterInPage = 0
    }else{
      this.totalRegisters = this.data.total
      this.totalRegisterInPage = this.data.length
    }
    this.setTotalPages()
  }


  /** Emit um evento para carregar os dados */
  emitGetData() {
    this.loading()
    let offset = (this.totalRegisterPerPage == this.totalRegisterInPage) ? (this.actualPage * this.totalRegisterInPage) - this.totalRegisterInPage : (this.actualPage * this.totalRegisterPerPage) - this.totalRegisterPerPage

    this.onGetData.emit({
      id:this.id,
      limit: this.totalRegisterPerPage,
      offset: offset,
      orderby: this.orderby,
      orderdirection: this.orderdirection,
      whereColumn: this.whereColumn,
      whereValue: this.whereValue
    });

    this.removeLoading()
  }


  /** Evento de maximizar a tela e voltar ao normal */
  maximizeToggle() {
    this.screenMaximize = !this.screenMaximize
  }


  /** Gera um array com o total de paginas */
  setTotalPages() {

    let tot = this.totalRegisters / this.totalRegisterPerPage 
    this.totalPages = (tot <= 1) ? 1 : Math.ceil(tot)

    this.lastPage = this.totalPages

    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    this.totalPagesArray = this.totalPagesArray.filter(pg => {

      if (pg < this.actualPage && pg >= this.actualPage - this.navigationLimitPages) {
        return pg
      }

      if (this.actualPage == pg) {
        return pg
      }

      if (pg > this.actualPage && pg <= this.actualPage + this.navigationLimitPages) {
        return pg
      }

      return null

    })


  }


  /** Seta a pagina atual */
  setActualPage(page: number) {
    this.actualPage = page
    this.setTotalPages()
    this.emitGetData()
  }


  /** Seta na primeira página */
  setFirstPage() {
    this.actualPage = 1
    this.setTotalPages()
    this.emitGetData()
  }


  /** Seta para a página anterior */
  setBeforePage() {
    this.actualPage = this.actualPage - 1
    this.setTotalPages()
    this.emitGetData()
  }


  /** Seta para a proxiuma página */
  setNextPage() {
    this.actualPage = this.actualPage + 1
    this.setTotalPages()
    this.emitGetData()
  }


  /** Seta para a ulimta página */
  setLastPage() {
    this.actualPage = this.lastPage
    this.setTotalPages()
    this.emitGetData()
  }


  /** Atualiza a quantidade a exiebir por pagina */
  setRegistrsPerPage() {
    // console.log(this.totalRegisterPerPage)
    this.actualPage = 1
    this.setTotalPages()

    this.emitGetData()
  }


  /** Fixa o header ao rolar o scroll */
  fixeHeader(isFixed: any) {
    this.isFixed = isFixed
  }





  onSearch() {
    let columnsSearched:Array<any> = this.gridHeader.map((col:any)=>{
      if(col.search)
        return col.search
      return undefined
    }).filter((value:any) => value !== undefined); 

    console.log(columnsSearched)

    this.whereColumn = columnsSearched

    if(this.whereValue == null || this.whereColumn == '')
      return

    if(this.whereValue.length >= 2 || this.whereValue.length==0){
      this.actualPage = 1
      this.emitGetData()
    }   
  }

  /** Limpa a pesquisa e reset os dados */
  onCleanSearch(){
    if(this.whereValue == null)
      return

    this.whereColumn = null
    this.whereValue = null

    this.actualPage = 1
    this.emitGetData()
  }

  /** Evento ao reordenar uma coluna */
  onReorder(data: any) {

    this.orderby = data

    this.elementsOrder.forEach(elm => {
      let id = elm.nativeElement.id

      if (id == "order_" + data.db) {
        console.log(elm.nativeElement.classList)

        if (elm.nativeElement.classList.contains("fa-sort")) {
          elm.nativeElement.classList.remove("fa-sort")
          elm.nativeElement.classList.add('fa-sort-up');
          this.orderdirection = 'asc';

        } else if (elm.nativeElement.classList.contains("fa-sort-up")) {
          elm.nativeElement.classList.remove("fa-sort-up")
          elm.nativeElement.classList.add('fa-sort-down');
          this.orderdirection = 'desc';

        } else if (elm.nativeElement.classList.contains("fa-sort-down")) {
          elm.nativeElement.classList.remove("fa-sort-down")
          elm.nativeElement.classList.add('fa-sort');
          this.orderby = { db: 'id' };
          this.orderdirection = 'asc';
        }

      } else {
        elm.nativeElement.classList.remove("fa-sort-up", "fa-sort-down", "fa-sort")
        elm.nativeElement.classList.add("fa-sort")
      }

    })

    this.emitGetData()

  }

}
