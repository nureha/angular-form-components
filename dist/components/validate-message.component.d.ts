import { OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorMessageFactoryService } from '../services';
export declare class AfcValidateMessageComponent implements OnInit, OnDestroy {
    private messageFactoryService;
    control: FormControl;
    name: string;
    private subscription;
    messages: string[];
    constructor(messageFactoryService: ErrorMessageFactoryService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
