import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IExpertise } from '../expertise.model';
import { ExpertiseService } from '../service/expertise.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './expertise-delete-dialog.component.html',
})
export class ExpertiseDeleteDialogComponent {
  expertise?: IExpertise;

  constructor(protected expertiseService: ExpertiseService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.expertiseService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
