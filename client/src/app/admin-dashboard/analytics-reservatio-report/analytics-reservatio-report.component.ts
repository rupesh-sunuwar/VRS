import {Component, ViewChild} from '@angular/core';


import {
  ChartComponent,
} from "ng-apexcharts";

export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  stroke: any;
  dataLabels: any;
  markers: any;
  tooltip: any;
  yaxis: any;
  grid: any;
  legend: any;
  title: any;
  plotOptions: any;
  fill: any;
  labels: any;
};
@Component({
  selector: 'app-analytics-reservatio-report',
  templateUrl: './analytics-reservatio-report.component.html',
  styleUrls: ['./analytics-reservatio-report.component.scss']
})
export class AnalyticsReservatioReportComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptionsMixed: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Session Duration",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: "Page Views",
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
          name: "Total Visits",
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        }],
      chart: {
        height: 350,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      title: {
        text: "Page Statistics",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function (val: any, opts: any) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: [
          "01 Jan",
          "02 Jan",
          "03 Jan",
          "04 Jan",
          "05 Jan",
          "06 Jan",
          "07 Jan",
          "08 Jan",
          "09 Jan",
          "10 Jan",
          "11 Jan",
          "12 Jan"
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val: any) {
                return val + " (mins)";
              }
            }
          },
          {
            title: {
              formatter: function (val: any) {
                return val + " per session";
              }
            }
          },
          {
            title: {
              formatter: function (val: any) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };

    this.chartOptionsMixed = {
      series: [
        {
          name: "Samsung",
          type: "column",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        },
        {
          name: "Apple",
          type: "area",
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
        },
        {
          name: "OnePlus",
          type: "line",
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
        }
      ],
      title: {
        text: "Product Statistics",
        align: "left"
      },
      chart: {
        height: 350,
        type: "line",
        stacked: false
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth"
      },
      plotOptions: {
        bar: {
          columnWidth: "50%"
        }
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: [
        "01/01/2024",
        "02/01/2024",
        "03/01/2024",
        "04/01/2024",
        "05/01/2024",
        "06/01/2024",
        "07/01/2024",
        "08/01/2024",
        "09/01/2024",
        "10/01/2024",
        "11/01/2024",
        "12/01/2024"
      ],
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        title: {
          text: "Points"
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y: any) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          }
        }
      }
    };
  }

  public generateData(count: any, yrange: any) {
    let i = 0;
    let series = [];
    while (i < count) {
      let x = "w" + (i + 1).toString();
      let y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }
}
