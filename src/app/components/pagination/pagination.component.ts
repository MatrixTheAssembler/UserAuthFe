import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

    @Input()
    public dataList: any[] = [];

    @Output()
    public pageNumberChangedEvent = new EventEmitter();

    @Output()
    public pageSizeChangedEvent = new EventEmitter();

    public pageNumber = 1;
    public pageSize = this.dataService.getPageSize();

    constructor(private dataService: DataService) {
    }

    public setPageSize(event: Event): void{
        this.pageSize = Number(event);
        this.dataService.savePageSize(this.pageSize);
        this.pageSizeChangedEvent.emit(this.pageSize);
    }

    public pageChanged(pageNumber: number): void{
        this.pageNumber = pageNumber;
        this.pageNumberChangedEvent.emit(this.pageNumber);
    }
}
