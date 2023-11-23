<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  setup() {
    onMounted(() => {
      const ctx = document.getElementById("myChart");

      //   keys is iterator of array
      const labels = Array.from(Array(7).keys()).map((index) =>
        new Date(0, index).toLocaleString("en-US", { month: "long" })
      );
      console.log(labels);

      const data = {
        labels: labels,
        datasets: [
          {
            data: [65, 59, 100, 81, 56, 55, 40],
            label: "Quantity of Products",
            backgroundColor: ["rgba(201, 203, 207, 0.2)"],
            borderColor: ["rgb(201, 203, 207)"],
            borderWidth: 2,
          },

          {
            data: [65, 59, 100, 81, 56, 55, 40],
            label: "Income",
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgb(255, 99, 132)"],
            borderWidth: 2,
          },
        ],
      };
      const myChart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          plugins: {
            title: {
              display: true,
              text: "Revenue Chart",
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        },
      });
      myChart;
    });
  },
});
</script>
<style scoped>
.card-item {
  padding: 10px;
}
</style>
