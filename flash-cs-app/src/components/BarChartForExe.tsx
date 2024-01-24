import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../api/utilsAPI";
import { getCorrectPercentageAPI } from "../api/dashBoardAPI";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface GroupedData {
  [date: string]: {
    total: number;
    correct: number;
  };
}

interface PercentageData {
  date: string;
  percentage: number;
}

type DayData = {
  date: string;
  percentage: number;
};

const options = {
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "Correction Rate on Doing Exercise in Last 7 Days",
    },
  },
};

export default function BarChartForExe() {
  const {
    data: answer,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: [queryKey.DASHBOARDEXERCISES],
    queryFn: getCorrectPercentageAPI,
  });

  if (isLoading || isFetching)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loading loading-dots loading-8xl"></div>
      </div>
    );

  let formattedAnswer = answer?.map((data) => ({
    isCorrect: data.isCorrect,
    createdAt: moment(data.createdAt).format("YYYY-MM-DD"),
  }));

  const groupedData: GroupedData = (formattedAnswer ?? []).reduce(
    (result: GroupedData, data) => {
      const { createdAt, isCorrect } = data;
      if (!result[createdAt]) {
        result[createdAt] = { total: 0, correct: 0 };
      }
      result[createdAt].total++;
      if (isCorrect) {
        result[createdAt].correct++;
      }
      return result;
    },
    {} as GroupedData
  );

  const percentageData: PercentageData[] = Object.entries(groupedData).map(
    ([date, { total, correct }]) => ({
      date,
      percentage: (correct / total) * 100,
    })
  );

  const severDateData: DayData[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const formattedDate = moment(date).format("YYYY-MM-DD");

    severDateData.push({
      date: formattedDate,
      percentage: 0,
    });
  }

  for (const { date, percentage } of percentageData) {
    const foundData = severDateData.find((day) => day.date === date);
    if (foundData) {
      foundData.percentage = percentage;
    }
  }

  severDateData?.reverse();

  const data = {
    labels: severDateData?.map((data) => data.date),
    datasets: [
      {
        label: "Percentage",
        data: severDateData?.map((data) => data.percentage),
        backgroundColor: "#6366f1",
        borderColor: "#6366f1",
      },
    ],
  };

  return (
    <>
      <div className="p-10">
        <h2 className="bg-black rounded-xl max-w-[900px] p-10">
          <Bar data={data} options={options} />
        </h2>
      </div>
    </>
  );
}
