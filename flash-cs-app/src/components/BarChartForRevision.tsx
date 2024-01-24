import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../api/utilsAPI";
import { getRevisionVocabularyAPI } from "../api/dashBoardAPI";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
      text: "Cards Due This Week",
    },
  },
};

export default function BarChartForRevision() {
  const {
    data: numberOfRevisionWords,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: [queryKey.DASHBOARDREVISION],
    queryFn: getRevisionVocabularyAPI,
  });

  if (isLoading || isFetching)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loading loading-dots loading-8xl"></div>
      </div>
    );

  const data = {
    labels: numberOfRevisionWords?.map((data) => data.date),
    datasets: [
      {
        label: "Number of Cards",
        data: numberOfRevisionWords?.map((data) => data.count),
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
