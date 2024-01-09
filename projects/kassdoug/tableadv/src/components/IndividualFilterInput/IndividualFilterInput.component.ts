import { Component, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'InputIndividualSearch',
  templateUrl: 'IndividualFilterInput.component.html',
  styleUrls: ['../../assets/style.scss'],
})

export class IndividualFilterInputComponent {

  @Input() search: any | null = null

  whereValue: any | null = null

  @Output() addFilterEvent = new EventEmitter<object>();

  /** Adiciona o filtro individual na busca e executa a rota */
  addNewFilter() {

    if(this.whereValue == '' || this.whereValue == null) return

    var model:string | null = null
    var field:string | null = null

    if(typeof  this.search === 'object'){
      model=this.search.model
      field=this.search.field

    } else {
      field=this.search
    }

    this.addFilterEvent.emit({value: this.whereValue,field: field, model: model})

  }

}
