import { Component } from '@angular/core';
import { Publisher } from '../schemas/Publisher';
import { PublishersService } from '../publishers.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPublisherComponent } from '../add-publisher/add-publisher.component';
import { NgFor } from '@angular/common';
import { PublisherComponent } from '../publisher/publisher.component';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrl: './publisher-list.component.css',
  standalone:true,
  imports:[
    NgFor,
    PublisherComponent,
    MaterialModule
  ]
})
export class PublisherListComponent {

publishers:Publisher[]=[];

constructor(private publishersService: PublishersService, public addPublisherDialog:MatDialog){}

getPublishers():void{
this.publishersService.getPublishers().subscribe((res)=>{
  this.publishers=res;
})
}

openAddPublisherDialog():void{
  this.addPublisherDialog.open(AddPublisherComponent);
}
ngOnInit(){
  this.getPublishers();
  this.publishersService.onpublishersListChanged().subscribe(()=>{
    this.getPublishers();
  })
}

}
