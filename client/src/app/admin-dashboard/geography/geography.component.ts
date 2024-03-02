import { Component } from '@angular/core';
import {EChartsOption} from "echarts";
// @ts-ignore
import * as nepalMap from "src/assets/nepal.json";
import * as echarts from 'echarts';

@Component({
  selector: 'app-geography',
  templateUrl: './geography.component.html',
  styleUrls: ['./geography.component.scss']
})
export class GeographyComponent {
  mapOption: EChartsOption = {};
  ngOnInit() {
    this.mapFunction();
  }

  mapFunction(): void {
    echarts.registerMap('Nepal', nepalMap);
    this.mapOption = {
      title: {
        text: 'Nepal Population Estimates (2012)', // Update the title
        subtext: 'Data source: Government of Nepal', // You can update the subtext if needed
        left: 'center' // Align title to center
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2
      },
      visualMap: {
        left: 'right', min: 500000,
        max: 38000000,
        inRange: {
          color: [
            '#313695',
            '#4575b4',
            '#74add1',
            '#abd9e9',
            '#e0f3f8',
            '#ffffbf',
            '#fee090',
            '#fdae61',
            '#f46d43',
            '#d73027',
            '#a50026'
          ]
        },
        text: ['High', 'Low'],
        calculable: true
      },      toolbox: {
        show: true,
        left: 'left',
        top: 'top',
        feature: {
          dataView: {readOnly: false},
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: 'Nepal PopEstimates', // Update the series name
          type: 'map',
          roam: true,
          map: 'Nepal', // Use Nepal map data
          emphasis: {
            label: {
              show: true
            }
          },
          data: [
            // Sample population data for Nepal provinces or regions
            {name: 'Province No. 1', value: 5435343},
            {name: 'Province No. 2', value: 4343434},
            {name: 'Bagmati Province', value: 6545656},
            {name: 'Gandaki Province', value: 4545454},
            {name: 'Lumbini Province', value: 6767676},
            {name: 'Karnali Province', value: 3232323},
            {name: 'Sudurpashchim Province', value: 7878787},
          ]
        }
      ]
    };
  }
          }
