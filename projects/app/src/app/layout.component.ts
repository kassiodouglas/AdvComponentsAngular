import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
  <sidebaradv 
    position="left" 
    [links]="sidebarLinks" 
    [header]='header'
    
    ></sidebaradv>
  `
})
export class LayoutComponent implements OnInit {

  header = "<strong>My Example App</strong>"

  sidebarLinks = [

    {divider:"Admin"},

    {
      id: 'admin', label: 'Adminstração', icon: '<i class="fa-solid fa-gear"></i>',
      links:[
        {path:'/',label: 'Usuários'},             
        {path:'/app',label: 'apappp'},             
      ]
    },

    {divider:"Relatórios"},

    {
      id: 'relatorios', label: 'Relatorios', icon: '<i class="fa-solid fa-gear"></i>',
      links:[
        {path:'/',label: 'checklist'},                      
        {path:'/app',label: 'acessos'},         
        {
          id: 'financeiros', label: 'Financeiros', icon: '<i class="fa-solid fa-gear"></i>',
          links:[
            {path:'/',label: 'mesnal'},             
            {path:'/app',label: 'diario'},             
            {path:'/app',label: 'semanal'},      
            {
              id: 'financeiros2', label: 'Financeiros22', icon: '<i class="fa-solid fa-gear"></i>',
              links:[
                {path:'/',label: 'mesna2l'},             
                {path:'/app',label: 'diario2'},             
                {path:'/app',label: 'semanal2'},             
              ]
            },        
          ]
        },    
      ]
    },

    {divider:" "},

    {
      id: 'relatorios', label: 'Relatorios', icon: '<i class="fa-solid fa-gear"></i>',
      links:[
        {path:'/',label: 'checklist'},                      
        {path:'/app',label: 'acessos'},         
        {
          id: 'financeiros', label: 'Financeiros', icon: '<i class="fa-solid fa-gear"></i>',
          links:[
            {path:'/',label: 'mesnal'},             
            {path:'/app',label: 'diario'},             
            {path:'/app',label: 'semanal'},      
            {
              id: 'financeiros2', label: 'Financeiros22', icon: '<i class="fa-solid fa-gear"></i>',
              links:[
                {path:'/',label: 'mesna2l'},             
                {path:'/app',label: 'diario2'},             
                {path:'/app',label: 'semanal2'},             
              ]
            },        
          ]
        },    
      ]
    },


  ]

  constructor() { }

  ngOnInit() {
  }

}
