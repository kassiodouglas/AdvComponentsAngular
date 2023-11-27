import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class Service {

    urlApi = "http://localhost:8000/api"
    token = ""

    constructor(
        private http: HttpClient,
    ) { }

    options() {
        return {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('accept', 'application/json')
                .set('Authorization', `Bearer ${this.token}`)
        }
    }

    // users(e: any): Observable<any> {
    //   let url = `${this.urlApi}/users`
    //   return this.http.post<any>(url, e, this.options())
    // }

    users(e: any) {
        return {
            "total": 5,
            "total_in_page": 5,
            "data": [
                {
                    "id": 56,
                    "created_at": "2023-10-10T19:19:28.000000Z",
                    "updated_at": "2023-10-10T19:19:28.000000Z",
                    "deleted_at": null,
                    "plate": "XWE4630",
                    "color_id": 2,
                    "model_id": 1929,
                    "color": {
                        "id": 2,
                        "created_at": "2023-10-10T19:19:25.000000Z",
                        "updated_at": "2023-10-10T19:19:25.000000Z",
                        "cod": "#FFFFFF",
                        "description": "BRANCO"
                    },
                    "model": {
                        "id": 1929,
                        "created_at": "2023-10-10T19:19:25.000000Z",
                        "updated_at": "2023-10-10T19:19:25.000000Z",
                        "name": "SPORTLANDER 250XR",
                        "type_id": 2,
                        "brand_id": 229,
                        "type": {
                            "id": 2,
                            "created_at": "2023-10-10T19:19:18.000000Z",
                            "updated_at": "2023-10-10T19:19:18.000000Z",
                            "deleted_at": null,
                            "name": "MOTO",
                            "description": "MOTO CONVENCIONAL"
                        },
                        "brand": {
                            "id": 229,
                            "created_at": "2023-10-10T19:19:19.000000Z",
                            "updated_at": "2023-10-10T19:19:19.000000Z",
                            "name": "ACELLERA"
                        }
                    }
                },
                {
                    "id": 263,
                    "created_at": "2023-10-10T19:19:28.000000Z",
                    "updated_at": "2023-10-10T19:19:28.000000Z",
                    "deleted_at": null,
                    "plate": "BPB9625",
                    "color_id": 2,
                    "model_id": 1931,
                    "color": {
                        "id": 2,
                        "created_at": "2023-10-10T19:19:25.000000Z",
                        "updated_at": "2023-10-10T19:19:25.000000Z",
                        "cod": "#FFFFFF",
                        "description": "BRANCO"
                    },
                    "model": {
                        "id": 1931,
                        "created_at": "2023-10-10T19:19:25.000000Z",
                        "updated_at": "2023-10-10T19:19:25.000000Z",
                        "name": "SPORTLANDER 450TR",
                        "type_id": 2,
                        "brand_id": 229,
                        "type": {
                            "id": 2,
                            "created_at": "2023-10-10T19:19:18.000000Z",
                            "updated_at": "2023-10-10T19:19:18.000000Z",
                            "deleted_at": null,
                            "name": "MOTO",
                            "description": "MOTO CONVENCIONAL"
                        },
                        "brand": {
                            "id": 229,
                            "created_at": "2023-10-10T19:19:19.000000Z",
                            "updated_at": "2023-10-10T19:19:19.000000Z",
                            "name": "ACELLERA"
                        }
                    }
                },
                {
                    "id": 75,
                    "created_at": "2023-10-10T19:19:28.000000Z",
                    "updated_at": "2023-10-10T19:19:28.000000Z",
                    "deleted_at": null,
                    "plate": "ANJ4256",
                    "color_id": 2,
                    "model_id": 1926,
                    "color": {
                        "id": 2,
                        "created_at": "2023-10-10T19:19:25.000000Z",
                        "updated_at": "2023-10-10T19:19:25.000000Z",
                        "cod": "#FFFFFF",
                        "description": "BRANCO"
                    },
                    "model": {
                        "id": 1926,
                        "created_at": "2023-10-10T19:19:25.000000Z",
                        "updated_at": "2023-10-10T19:19:25.000000Z",
                        "name": "ACX 250F",
                        "type_id": 2,
                        "brand_id": 229,
                        "type": {
                            "id": 2,
                            "created_at": "2023-10-10T19:19:18.000000Z",
                            "updated_at": "2023-10-10T19:19:18.000000Z",
                            "deleted_at": null,
                            "name": "MOTO",
                            "description": "MOTO CONVENCIONAL"
                        },
                        "brand": {
                            "id": 229,
                            "created_at": "2023-10-10T19:19:19.000000Z",
                            "updated_at": "2023-10-10T19:19:19.000000Z",
                            "name": "ACELLERA"
                        }
                    }
                },
                {
                    "id": 67,
                    "created_at": "2023-10-10T19:19:28.000000Z",
                    "updated_at": "2023-10-10T19:19:28.000000Z",
                    "deleted_at": null,
                    "plate": "ACZ4578",
                    "color_id": 3,
                    "model_id": 837,
                    "color": {
                        "id": 3,
                        "created_at": "2023-10-10T19:19:25.000000Z",
                        "updated_at": "2023-10-10T19:19:25.000000Z",
                        "cod": "#DDDDDD",
                        "description": "CINZA"
                    },
                    "model": {
                        "id": 837,
                        "created_at": "2023-10-10T19:19:22.000000Z",
                        "updated_at": "2023-10-10T19:19:22.000000Z",
                        "name": "MDX",
                        "type_id": 1,
                        "brand_id": 24,
                        "type": {
                            "id": 1,
                            "created_at": "2023-10-10T19:19:18.000000Z",
                            "updated_at": "2023-10-10T19:19:18.000000Z",
                            "deleted_at": null,
                            "name": "CARRO",
                            "description": "CARRO PASSEIO CONVENCIONAL"
                        },
                        "brand": {
                            "id": 24,
                            "created_at": "2023-10-10T19:19:19.000000Z",
                            "updated_at": "2023-10-10T19:19:19.000000Z",
                            "name": "ACURA"
                        }
                    }
                },
                {
                    "id": 20,
                    "created_at": "2023-10-10T19:19:28.000000Z",
                    "updated_at": "2023-10-10T19:19:28.000000Z",
                    "deleted_at": null,
                    "plate": "BVV3563",
                    "color_id": 2,
                    "model_id": 837,
                    "color": {
                        "id": 2,
                        "created_at": "2023-10-10T19:19:25.000000Z",
                        "updated_at": "2023-10-10T19:19:25.000000Z",
                        "cod": "#FFFFFF",
                        "description": "BRANCO"
                    },
                    "model": {
                        "id": 837,
                        "created_at": "2023-10-10T19:19:22.000000Z",
                        "updated_at": "2023-10-10T19:19:22.000000Z",
                        "name": "MDX",
                        "type_id": 1,
                        "brand_id": 24,
                        "type": {
                            "id": 1,
                            "created_at": "2023-10-10T19:19:18.000000Z",
                            "updated_at": "2023-10-10T19:19:18.000000Z",
                            "deleted_at": null,
                            "name": "CARRO",
                            "description": "CARRO PASSEIO CONVENCIONAL"
                        },
                        "brand": {
                            "id": 24,
                            "created_at": "2023-10-10T19:19:19.000000Z",
                            "updated_at": "2023-10-10T19:19:19.000000Z",
                            "name": "ACURA"
                        }
                    }
                }
            ]
        }
    }

    sidebarlinks() {
        return [

            {path: '/', label: 'Home', icon: '<i class="fa-solid fa-house"></i>', permissions: ['home']},

            { divider: "Componentes" },

            {path: '/componentes/tableadv', label: 'TableAdv', icon: '<i class="fa-solid fa-table-list"></i>'},
            {path: '/componentes/tableadv/individual', label: 'TableAdv-individual', icon: '<i class="fa-solid fa-table-list"></i>'},

            {
                id: 'sidebaradv', label: 'SidebarAdv', icon: '<i class="fa-solid fa-bars-staggered"></i>',
                links: [
                    { path: '/componentes/sidebar/esquerdo', label: 'Lado esquerdo', },
                    { path: '/componentes/sidebar/direito', label: 'Lado direito' },
                    { path: '/componentes/sidebar/hover', label: 'Com hover' },
                    { path: '/componentes/sidebar/botao', label: 'Com botão' },
                    // {path:'/componentes/sidebar/sem-topbar',label: 'Sem topbar'},                    
                    { path: '/componentes/sidebar/topbar', label: 'Com topbar' },


                    {
                        id: 'sidebaradv3', label: 'SidebarAdv', icon: '<i class="fa-solid fa-bars-staggered"></i>',
                        links: [
                            { path: '/componentes/sidebar/esquerdo', label: 'Lado esquerdo3' },
                        ]
                    }


                ]
            }         

        ]
    }

}
