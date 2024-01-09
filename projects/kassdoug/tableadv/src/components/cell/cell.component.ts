import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'gd-cell',
  templateUrl: 'cell.component.html',
})
export class CellComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  @Input() row: any;
  @Input() col: any;

  label: string | any = '';
  componentized: boolean = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.getLabel();
  }

  /** Pega o label a ser exibido, podendo ser um component ou string */
  getLabel() {
    const column_name = this.col.db;

    if (column_name.includes('.')) {
      let item = column_name.split('.').filter((f: any) => f);

      let value = this.row;
      item.forEach((ff: any) => {
        value = value[ff];
      });
      this.label = value;
    } else {
      this.label = this.row[column_name];
    }

    if (
      typeof this.label == 'object' &&
      this.label !== null &&
      this.label !== ''
    ) {
      if (this.label.component !== null) {
        this.componentized = true;

        let instance = this.label.component.instance;
        let properties = this.label.component.properties;

        setTimeout(() => this.setComponent(instance, properties), 0);
      }
    }
  }

  /** Caso o label for um componente, aquis era feito as tratativas para inserção do mesmo */
  setComponent(cmpInstance: any, properties: any) {
    const factory: any =
      this.componentFactoryResolver.resolveComponentFactory(cmpInstance);
    const componentRef = factory.create(this.container.injector);

    Object.keys(properties).forEach((key: any) => {
      let value = properties[key];
      componentRef.instance[key] = this.delteKeyComponent(value);
    });

    this.container.insert(componentRef.hostView);
  }

  /** Remove do valor inserido no component externo, somente os valores originais, retirando valores que possam ser compoenentes, corrigindo a duplicação infinita */
  delteKeyComponent(item: any) {
    Object.keys(item).forEach((key: string) => {
      if (item[key] !== null && item[key] !== undefined) {
        if (
          typeof item[key] == 'object' &&
          item[key].hasOwnProperty('component')
        ) {
          if (item[key]['component'].hasOwnProperty('instance')) {
            delete item[key];
          }
        }
      }
    });

    return item;
  }
}
