import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  globalItems = [
    { title: 'Lecturas OK', value: '1,234', icon: 'check_circle' },
    { title: 'Alertas medias', value: '932', icon: 'warning' },
    { title: 'Alertas rojas', value: '543', icon: 'error' },
    { title: 'Sensores deshabilitados', value: '12', icon: 'block' }
  ];

  plants = [
    { country: 'Argentina', name: 'Quilmes', lectures: 300, mediumAlerts: 10, criticalAlerts: 2 },
    { country: 'Argentina', name: 'Zárate', lectures: 100, mediumAlerts: 15, criticalAlerts: 2 },
    { country: 'Brasil', name: 'São Paulo', lectures: 400, mediumAlerts: 40, criticalAlerts: 2 },
    { country: 'Paraguay', name: 'Asunción', lectures: 321, mediumAlerts: 9, criticalAlerts: 2 },
    { country: 'Uruguay', name: 'Montevideo', lectures: 434, mediumAlerts: 4, criticalAlerts: 4 }
  ];

  columns = ['country', 'name', 'lectures', 'mediumAlerts', 'criticalAlerts', 'actions'];

  indicators = [
    { title: 'Temperatura', ok: 100, warning: 20, critical: 3, icon: 'thermostat' },
    { title: 'Presión', ok: 100, warning: 20, critical: 3, icon: 'speed' },
    { title: 'Viento', ok: 100, warning: 20, critical: 3, icon: 'air' },
    { title: 'Niveles', ok: 100, warning: 20, critical: 3, icon: 'water' },
    { title: 'Energía', ok: 100, warning: 20, critical: 3, icon: 'bolt' },
    { title: 'Tensión', ok: 100, warning: 20, critical: 3, icon: 'electrical_services' },
    { title: 'Monóxido de carbono', ok: 100, warning: 20, critical: 3, icon: 'co2' },
    { title: 'Otros gases', ok: 100, warning: 20, critical: 3, icon: 'cloud' }
  ];

}
