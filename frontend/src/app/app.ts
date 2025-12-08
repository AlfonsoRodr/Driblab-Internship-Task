import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './app.html'
})
export class App implements OnInit {
	protected readonly title = signal('Driblab Home Task');

	ngOnInit(): void {
		initFlowbite();
	}
}