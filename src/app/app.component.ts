import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicComponentComponent } from './components/dynamic-component/dynamic-component.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  title = 'angular-dynamic-component-virtual-scroll';
  listComponent: any[] = [];
  constructor() { }
  ngOnInit(): void {
    this.listComponent = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      comp: DynamicComponentComponent
    }));
    this.listDemo = this.generateDataChunk(this.listComponent);
  }
  listDemo: any = [];
  getNextBatch(e: any) {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    // if (total - e > 5) return;
    if (total - e === 5) console.log('2222');
    if (end === total) {
      this.listComponent = this.listComponent.concat(Array.from({ length: 1 }).map((_, i) => ({
        id: this.listComponent.length,
        comp: DynamicComponentComponent
      })));
      this.listDemo = this.generateDataChunk(this.listComponent);
    }

  }

  // https://stackoverflow.com/questions/57476762/angular-material-cdk-virtual-scroll-viewport-how-to-render-multiple-items-per-r
  generateDataChunk(data: any, chunk = 2) {
    let index: number;
    let dataChunk: [][] = [];
    for (index = 0; index < data.length; index += chunk) {
      dataChunk.push(data.slice(index, index + chunk));
    }
    return dataChunk;
  }
}
