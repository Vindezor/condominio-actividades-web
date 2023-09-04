import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EquipmentFacilitiesModel } from 'src/app/core/models/equipment-facilities-model';
import { ApiService } from 'src/app/core/services/api.service';
import { globalAlert } from 'src/app/shared/global-alert/global-alert';
import { globalLoading } from 'src/app/shared/global-loading/global-loading.component';

@Component({
  selector: 'app-equipment-facilities',
  templateUrl: './equipment-facilities.component.html',
  styleUrls: ['./equipment-facilities.component.scss']
})
export class EquipmentFacilitiesComponent implements OnInit {
  equipmentFacilities: EquipmentFacilitiesModel[] = [];
  displayedColumns: string[] = ['name', 'floor', 'description', 'action'];
  dataSource = new MatTableDataSource<EquipmentFacilitiesModel>();
  
  @ViewChild(MatPaginator) paginator :any = MatPaginator;

  constructor(private dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllEquipmentFacilities();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllEquipmentFacilities(){
    let dialogRef = globalLoading(this.dialog);
    this.apiService.call(null, 'getAllEquipmentFacilities', 'GET', true).subscribe({
      next: (response) => {
        if(response.status === 'SUCCESS'){
          this.equipmentFacilities = [];
          response.data.map((equipmentFacility: any) => {
            this.equipmentFacilities.push({
              name: equipmentFacility.name,
              floor: equipmentFacility.floor.floor,
              description: equipmentFacility.description
            })
          });
          this.dataSource.data = this.equipmentFacilities;
          dialogRef.close();
        } else {
          dialogRef.close();
          globalAlert({
            title: 'Error',
            text: 'Disculpe, ha ocurrido un error con el servicio',
            icon: 'error',
          })
        }
      },
      error: (error) => {
        dialogRef.close();
        if(error.error.msg === 'Full authentication is required'){
          globalAlert({
            title: 'Error',
            text: 'Disculpe, su sesión ha expirado.',
            icon: 'error',
          }).then(() => this.apiService.logout());
        } else {
          globalAlert({
            title: 'Error',
            text: 'Disculpe, la plataforma no se encuentra disponible',
            icon: 'error',
          });
        }
      }
    })
  }

}
