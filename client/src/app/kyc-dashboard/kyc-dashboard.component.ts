import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from '@angular/material/table';
import {Router} from "@angular/router";
import {UserService} from "../service/user/user.service";

@Component({
  selector: 'app-kyc-dashboard',
  templateUrl: './kyc-dashboard.component.html',
  styleUrls: ['./kyc-dashboard.component.scss']
})
export class KycDashboardComponent implements OnInit {
  customerTable!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'username', 'email', 'kycStatus', 'actions', 'more'];

  @ViewChild(MatPaginator) kycPaginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userService.getAllUnverifiedUser().subscribe((data: any) => {
      this.customerTable = new MatTableDataSource(data);
      this.customerTable.paginator = this.kycPaginator;
    });
  }

  changeKycStatus(userId: number, kycStatus: string) {
    this.userService.changeKycStatus(userId, kycStatus).subscribe(() => {
      this.userService.getAllUnverifiedUser().subscribe((data: any) => {
        this.customerTable = new MatTableDataSource(data);
        this.customerTable.paginator = this.kycPaginator;
      });
    });
  }

  applyFilter(event: Event) {
    this.customerTable.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  mapKycStatus(status: string): string {
    switch (status) {
      case 'PENDING':
        return '#f0f0f0';
      case 'APPROVED':
        return '#00cc00';
      case 'REJECTED':
        return '#ff0505';
      default:
        return '#ff0505';
    }
  }

  redirectToAnotherComponent(id: any) {
    this.router.navigate(['/view-kyc', id]);
  }
}
