import { AlertService } from '../../_services/alert.service';
import { RequestService } from '../../_services/request.service';
import { Component, OnInit, ViewChild, EventEmitter, Output, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { ActivatedRoute } from '@angular/router';

class Event {
  constructor(
    public id: number,
    public name: string,
    public date: Date,
    public address: string,
    public city: string,
    public state: string,
    public maxAttendees: number,
    public attendees: Attendee[],
    public dateStr?: string
  ) { }
}

class Attendee {
  constructor(
    public id: number,
    public name: string,
    public bornDate: Date,
    public buyer: string,
    public email: string,
    public state: string,
    public city: string,
    public bornDateStr: string,
    public confirmed: boolean
  ) { }
}

@Component({
  selector: 'app-specific-event',
  templateUrl: './specific-event.component.html',
  styleUrls: ['./specific-event.component.css']
})
export class SpecificEventComponent implements OnInit {
  columns: any = [];
  eventName: string;
  eventDateStr: string;
  eventDays: number;
  eventAddress: string;
  eventCity: string;
  eventState: string;
  contactFavorite: boolean;
  contactactive: string;
  rows: Attendee[] = [];
  name = 'Angular';
  public imagePath;
  imgURL: any;
  selectedContact: any;
  contactFlag: boolean;
  addContact: any;
  placement = 'bottom-right';
  imagepathdefault: any;
  addModal = null;
  editModal = null;
  value: any;
  loadingIndicator: true;
  selected = [];
  temp = [];
  temp2 = this.rows;
  error = '';
  event: Event;

  public config: PerfectScrollbarConfigInterface = { };

  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;

  @Output() closeModalEvent = new EventEmitter<boolean>();
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;

  /**
   * Constructor
   *
   * @param NgbModal  modal;
   * @param Renderer2  _renderer
   */
  constructor(
    private modal: NgbModal,
    private _renderer: Renderer2,
    private requestService: RequestService,
    public alertService: AlertService,
    private route: ActivatedRoute
    ) { }

    /**
     * OnInit
     */
  async ngOnInit() {
    this.route.params.subscribe(async params => {
      const eventId = +params['id'];
      await this.getEvent(eventId);
    });
  }

  async getEvent(eventId: number): Promise<void> {
    this.event = await this.requestService.getEvent(eventId);
    this.rows = this.event.attendees;
    //data do evento
    if (typeof this.event.date === 'string') {
      this.event.date = new Date(this.event.date);
    }
    if (this.event.date instanceof Date && !isNaN(this.event.date.getTime())) {
      this.event.dateStr = this.event.date.toLocaleDateString('pt-BR');
    } else {
      console.error(`A data para o evento "${this.event.name}" não é válida.`);
    }
    //data dos attendees
    this.rows.forEach(row => {
      if (typeof row.bornDate === 'string') {
        row.bornDate = new Date(row.bornDate);
      }
      if (row.bornDate instanceof Date && !isNaN(row.bornDate.getTime())) {
        row.bornDateStr = row.bornDate.toLocaleDateString('pt-BR');
      } else {
        console.error(`A data para o evento "${row.name}" não é válida.`);
      }
    });
  }

  /**
   * Add new contact
   *
   * @param addTableDataModalContent      Id of the add contact modal;
   */
  addTableDataModal(addTableDataModalContent) {
    this.addModal = this.modal.open(addTableDataModalContent, {
      windowClass: 'animated fadeInDown'
    });
    this.contactFlag = true;
  }

  /**
   * Edit selected contact row.
   *
   * @param editTableDataModalContent     Id of the edit contact model.
   * @param row     The row which needs to be edited.
   */
  editTableDataModal(editTableDataModalContent, row) {
    this.selectedContact = Object.assign({}, row);
    this.editModal = this.modal.open(editTableDataModalContent, {
      windowClass: 'animated fadeInDown'
    });
    this.contactFlag = false;
  }

  /**
   * Selected contact
   *
   * @param selected      Selected contact;
   */
  onSelectContact({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  /**
   * Search contact from contact table
   *
   * @param event     Convert value uppercase to lowercase;
   */
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    this.rows = [...this.temp2];
    this.temp = [...this.rows];
    const temp = this.rows.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  /**
   * Choose contact image
   *
   * @param event     Select contact image;
   */
  // preview(event) {
  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //     this.contactImage = e.target.result;
  //   };
  //   reader.readAsDataURL(event.target.files[0]);
  // }

  /**
   * Delete contact row
   * @param row     Selected row for delete contact
   */
  async deleteRow(row) {
    await this.requestService.deleteAgent(row.id)
    .then(async res => {
      this.rows = await this.requestService.getAllAgents();
      return res;
    }, err => {
      return;
    });
  }

  async goToEventPage(row) {
    console.log(row);
  }

  /**
   * Update contact details
   *
   * @param editForm      Edit form for values check
   * @param id      Id match to the selected row Id
   */
  onUpdate(editForm: NgForm, id) {
    for (const row of this.rows) {
      if (row.id === id && editForm.valid === true) {
        row.name = this.selectedContact['name'];
        this.editModal.close(editForm.resetForm);
        break;
      }
    }
  }

  /**
   * Contact changed to favorite or non-favorite
   *
   * @param row     Row of the favorite contact
   */
  favoriteChange(row) {
    if (row.isFavorite) {
      row.isFavorite = row.isFavorite ? false : true;
    } else {
      row.isFavorite = true;
    }
  }

  /**
   * Delete selected contact
   */
  deleteCheckedRow() {
    let index = 0;
    const removedIndex = [];
    const temp = [...this.rows];
    for (const row of temp) {
      for (const selectedRow of this.selected) {
        if (row.id === selectedRow.id) {
          removedIndex.push(index);
        }
      }
      index++;
    }
    for (let i = removedIndex.length - 1; i >= 0; i--) {
      temp.splice(removedIndex[i], 1);
    }
    this.rows = temp;
    this.selected = [];
  }

  /**
   * favorite set when add contact
   *
   * @param event     favorite set on click event
   */
  addFavoriteImage(event) {
    if (event.target.checked === true) {
      this.contactFavorite = true;
    } else {
      this.contactFavorite = false;
    }
  }

  /**
   * New contact add to the table
   *
   * @param addForm     Add contact form
   */
  async addNewEvent(addForm: NgForm) {
    // const event: Event = {
    //   name: this.eventName,
    //   date: new Date(this.eventDateStr),
    //   days: this.eventDays,
    //   address: this.eventAddress,
    //   city: this.eventCity,
    //   state: this.eventState
    // };
    // console.log(event);
    // const newEvent: Event = await this.requestService.addNewEvent(event).then(async res => {
    //   addForm.reset();
    //   this.addModal.close(addForm.resetForm);
    //   this.getAllEvents();
    //   return res;
    // }, err => {
    //   this.error = err.message;
    //   return;
    // });
  }

  /**
   * Set the phone number format
   */
  // onFormat() {
  //   if (this.contactFlag === true) {
  //     this.value = this.contactPhone;
  //   } else if (this.contactFlag === false) {
  //     this.value = this.selectedContact['phone'];
  //   }

  //   let country, city, number;

  //   switch (this.value.length) {
  //     case 6:
  //       country = 1;
  //       city = this.value.slice(0, 3);
  //       number = this.value.slice(3);
  //       break;

  //     case 7:
  //       country = this.value[0];
  //       city = this.value.slice(1, 4);
  //       number = this.value.slice(4);
  //       break;

  //     case 8:
  //       country = this.value.slice(0, 3);
  //       city = this.value.slice(3, 5);
  //       number = this.value.slice(5);
  //       break;

  //     default:
  //       return this.value;
  //   }
  //   if (country === 1) {
  //     country = '';
  //   }

  //   number = number.slice(0, 3) + '-' + number.slice(3);

  //   const no = '(' + city + ')' + '-' + number;
  //   if (this.contactFlag === true) {
  //     this.contactPhone = no;
  //   } else if (this.contactFlag === false) {
  //     this.selectedContact['phone'] = no;
  //   }
  // }

  /**
   * Sidebar open/close in responsive
   *
   * @param event     Sidebar open/close
   */
  sidebar(event) {
    const toggleIcon = document.getElementById('sidebar-left');
    const toggle = document.getElementById('content-overlay');
    if (event.currentTarget.className === 'sidebar-toggle d-block d-lg-none') {
      this._renderer.addClass(toggleIcon, 'show');
      this._renderer.addClass(toggle, 'show');
    }
  }

  /**
   * Overlay add/remove fuction in responsive
   *
   * @param event     Overlay click event
   */
  contentOverlay(event) {
    const toggleIcon = document.getElementById('sidebar-left');
    const toggle = document.getElementById('content-overlay');
    if (event.currentTarget.className === 'content-overlay show') {
      this._renderer.removeClass(toggleIcon, 'show');
      this._renderer.removeClass(toggle, 'show');
    }
  }

  clearError() {
    this.error = null;
  }
}
