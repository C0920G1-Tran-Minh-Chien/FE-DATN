import { Component, OnInit, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexTitleSubtitle,
} from "ng-apexcharts";
import { StatisticalChart } from "../../../model/statistical-chart";
import { ReportService } from "../../../service/report.service";

export class ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
}

@Component({
  selector: "app-statistical-chart",
  templateUrl: "./statistical-chart.component.html",
  styleUrls: ["./statistical-chart.component.css"],
})
export class StatisticalChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  chartOption?: Partial<ChartOptions>;
  isShowChart = false;
  statisticalCharts: StatisticalChart[] = [];
  week: number;
  month: number;
  year: number;
  isWeek = false;
  isMonth = false;
  isYear = false;
  msgDate = "";
  startDate = "";
  endDate = "";
  weekArray = new Array(52);
  yearArray = new Array(100);
  turnover = 0;
  profit = 0;
  averageTurnover: number;
  averageProfit: number;
  isSuccess = false;
  msgSuccess = "";
  type: string;
  isLoad = false;
  turnoverF = "";
  profitF = "";
  averageTurnoverF = "";
  averageProfitF = "";

  constructor(private sv: ReportService) {}

  ngOnInit(): void {}

  showChart() {
    if (
      this.isWeek === false &&
      this.isMonth === false &&
      this.isYear === false
    ) {
      this.msgDate = "Vui lòng chọn theo tuần/tháng/năm.";
      this.isSuccess = false;
      this.isShowChart = false;
      return;
    }
    if (this.statisticalCharts === null) {
      this.isShowChart = false;
      return;
    }
    if (this.startDate === "" || this.endDate === "") {
      this.msgDate = "Vui lòng chọn thời gian muốn hiển thị.";
      this.isSuccess = false;
      this.isShowChart = false;
      return;
    }

    this.isLoad = true;
    setTimeout(() => {
      this.paintChartByDate();
      this.chartOption.series[0].data = [];
      this.chartOption.series[1].data = [];
      this.showChartByWeekMonth();
      this.isLoad = false;
      this.isSuccess = true;
      this.isShowChart = true;
    }, 2000);
  }

  showChartByWeekMonth() {
    // tslint:disable-next-line:no-conditional-assignment
    if (this.isYear === true) {
      this.chartOption.tooltip.x.format = "MM/yyyy";
    } else {
      this.chartOption.tooltip.x.format = "dd/MM";
    }
    this.averageTurnover = 0;
    this.averageProfit = 0;
    this.turnover = 0;
    this.profit = 0;
    this.turnoverF = "";
    this.profitF = "";
    this.averageTurnoverF = "";
    this.averageProfitF = "";
    this.sv.showChart(this.startDate, this.endDate).subscribe(
      (o) => {
        console.log(o);
        this.statisticalCharts = o;
        if (this.statisticalCharts.length < 1) {
          this.isShowChart = false;
          this.msgDate = "Không tìm thấy kết quả.";
          this.isSuccess = false;
          return;
        }
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.statisticalCharts.length; i++) {
          // @ts-ignore
          this.chartOption.series[0].data.push({
            x: this.statisticalCharts[i].dateSale,
            y: this.statisticalCharts[i].turnover,
          });
          this.turnover += +this.statisticalCharts[i].turnover;
          // if (this.isYear === true) {
          //   this.chartOption.xaxis.categories = this.subDate(this.statisticalCharts[i].dateSale);
          // } else {
          this.chartOption.xaxis.categories =
            this.statisticalCharts[i].dateSale;
          // }
        }
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.statisticalCharts.length; i++) {
          // @ts-ignore
          this.chartOption.series[1].data.push({
            x: this.statisticalCharts[i].dateSale,
            y: this.statisticalCharts[i].profit,
          });
          this.profit += +this.statisticalCharts[i].profit;
        }
        this.averageTurnover = this.turnover / this.statisticalCharts.length;
        this.averageProfit = this.profit / this.statisticalCharts.length;

        this.turnoverF = this.fortMatNumber(Number(this.turnover.toFixed(1)));
        this.profitF = this.fortMatNumber(Number(this.profit.toFixed(1)));
        this.averageTurnoverF = this.fortMatNumber(
          Number(this.averageTurnover.toFixed(1))
        );
        this.averageProfitF = this.fortMatNumber(
          Number(this.averageProfit.toFixed(1))
        );

        if (
          this.averageTurnover === 0 &&
          this.averageProfit === 0 &&
          this.turnover === 0 &&
          this.profit === 0
        ) {
          this.isShowChart = false;
          this.msgDate = "Không tìm thấy kết quả.";
          this.isSuccess = false;
          return;
        }
      },
      (e) => {
        this.msgDate = "Không tìm thấy kết quả.";
        this.isSuccess = false;
        this.isShowChart = false;
      }
    );
  }

  paintChartByDate() {
    this.chartOption = {
      series: [
        {
          name: "Doanh thu",
          data: [],
        },
        {
          name: "Lợi nhuận",
          data: [],
        },
      ],
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: "Giá trị (triệu đồng)",
        align: "left",
        style: {
          fontSize: "14px",
          fontFamily: '"Roboto", "Helvetica Neue", "sans-serif"',
        },
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [],
      },
      tooltip: {
        x: {
          format: "",
        },
      },
    };
  }

  choiceDate(choice) {
    this.isSuccess = true;
    this.startDate = "";
    this.endDate = "";
    this.month = undefined;
    this.year = undefined;
    this.week = undefined;
    this.isShowChart = false;
    switch (choice.value) {
      case "week":
        this.msgDate = "";
        this.isWeek = true;
        this.isMonth = false;
        this.isYear = false;
        break;
      case "month":
        this.msgDate = "";
        this.isWeek = false;
        this.isMonth = true;
        this.isYear = false;
        break;
      case "year":
        this.msgDate = "";
        this.isWeek = false;
        this.isMonth = false;
        this.isYear = true;
        break;
    }
  }

  getWeek(week) {
    this.week = week.value;
    this.isSuccess = true;
    this.msgDate = this.getDateOfWeek(this.week, this.year);
    this.msgSuccess = this.getDateOfWeek(this.week, this.year);
  }

  getMonth(month) {
    this.month = month.value;
    this.isSuccess = true;
    this.msgDate = this.getDateOfMonth(month.value);
    this.msgSuccess = this.getDateOfMonth(month.value);
  }

  getYear(year) {
    this.isSuccess = true;
    this.msgDate = this.getDateOfYear(year.value);
    this.msgSuccess = this.getDateOfYear(year.value);
  }

  getYearOfWeek(year) {
    this.year = year.value;
    this.isSuccess = true;
    this.msgDate = this.getDateOfWeek(this.week, this.year);
    this.msgSuccess = this.getDateOfWeek(this.week, this.year);
  }

  // value
  getDateOfMonth(m) {
    const time = new Date(m);
    this.startDate = this.formatDateToDb(time);
    this.endDate = this.formatDateToDb(
      new Date(time.getFullYear(), time.getMonth() + 1, time.getDate())
    );
    const startDate = this.formatDateShowClient(time);
    const endDate = this.formatDateShowClient(
      new Date(time.getFullYear(), time.getMonth() + 1, time.getDate())
    );
    return "Từ " + startDate + " đến " + endDate + ".";
  }

  getDateOfWeek(w, y) {
    if (w === undefined || y === undefined) {
      return "";
    }
    this.startDate = this.formatDateToDb(new Date(y, 0, 1 + (w - 1) * 7 - 4));
    this.endDate = this.formatDateToDb(new Date(y, 0, 3 + (w - 1) * 7));
    const startDate = this.formatDateShowClient(
      new Date(y, 0, 1 + (w - 1) * 7 - 4)
    );
    const endDate = this.formatDateShowClient(new Date(y, 0, 3 + (w - 1) * 7));
    return "Từ " + startDate + " đến " + endDate + ".";
  }

  getDateOfYear(y) {
    this.startDate = this.formatDateToDb(new Date(y, 0, 1));
    this.endDate = this.formatDateToDb(new Date(+y + 1, 0, 1));
    const startDate = this.formatDateShowClient(new Date(y, 0, 1));
    const endDate = this.formatDateShowClient(new Date(+y + 1, 0, 1));
    return "Từ " + startDate + " đến " + endDate + ".";
  }

  formatDateShowClient(date) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [day, month, year].join("/");
  }

  formatDateToDb(date) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [year, month, day].join("-");
  }

  fortMatNumber(num: number) {
    return Number(num).toLocaleString("en");
  }
}
