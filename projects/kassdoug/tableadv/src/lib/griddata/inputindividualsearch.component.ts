import { Component, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'InputIndividualSearch',
  template: `
    <div class="input-group">
      <input
        class="form-control border-end-0 border"
        type="search"
        placeholder="Pesquisar"
        [(ngModel)]="whereValue"
      >
      <span class="input-group-append">
          <button
            class="btn btn-outline-secondary bg-white border-start-0 border-bottom-1 border ms-n5"
            type="button"
            gd-tooltip="Faz a pesquisa solicitada"
            (click)="addNewFilter()"
          >
              <i class="fa fa-search"></i>
          </button>
      </span>
    </div>
  `
})

export class InputIndividualSearchComponent {

  @Input() search: any | null = null

  whereValue: any | null = null

  @Output() addFilterEvent = new EventEmitter<object>();

  addNewFilter() {

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
