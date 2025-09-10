import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-app-header',
  imports: [CommonModule, MatToolbarModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent {}
