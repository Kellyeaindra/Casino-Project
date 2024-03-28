$(document).ready(function () {
  const tendateLogo = $(".tenDate");
  const cart = $(".scrollable-cart");
  tendateLogo.click(function () {
    cart.slideToggle(1000);
  });
  // initial stage for screens less than or equal to 720px
  if ($(window).width() <= 720) {
    cart.hide();
    tendateLogo.hide();
  }
  // listen for window resize
  $(window).resize(function () {
    if ($(window).width() <= 720) {
      cart.hide();
      tendateLogo.hide();
    } else {
      // initial stage for screens greater than or equal to 720px
      cart.show();
      tendateLogo.show();
    }
  });
  /**
   *  fetch data for 2D live and 12am result and 4:30 result
   */
  const fetchData = async () => {
    const url = "https://api.thaistock2d.com/live";
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("data", data);
      if (data.live && data.live.twod) {
        $("#live").text(data.live.twod);
      }
      if (data.result && data.result[3] && data.result[3].twod) {
        $("#result-430pm-text").text(data.result[3].twod);
      }
      if (data.result && data.result[1] && data.result[1].twod) {
        $("#result-12am-text").text(data.result[1].twod);
      }
      $("#updateTime").text(data.live.time);
      $("#set").text(data.result[1].set);
      $("#value").text(data.result[1].value);
      $("#set2").text(data.result[3].set);
      $("#value2").text(data.result[3].value);
      $("#currentSet").text(data.live.set);
      $("#currentVal").text(data.live.value);
    } catch (error) {
      console.error("Error", error);
    }
  };
  fetchData();
  /**
   * live Number toggle every 5s
   *  */
  setInterval(function () {
    $("#live").css("visibility", "hidden");

    setTimeout(function () {
      $("#live").css("visibility", "visible");
    }, 1000);
  }, 5000);
  //fetch data every 5s
  setInterval(fetchData, 5000);
  /**
   *  fetch data for last 10days result
   */
  const tendayfetchData = async () => {
    const url = "https://api.thaistock2d.com/2d_result";
    try {
      const response = await fetch(url);
      const tenDayData = await response.json();
      let date = document.getElementById("date");
      date.innerHTML = tenDayData[0].date;
      console.log("tenday", tenDayData);
      $(document).ready(function () {
        $("#cart_set").text(tenDayData[0].child[1].set);
        $("#cart_value").text(tenDayData[0].child[1].value);
        $("#tenDay12am").text(tenDayData[0].child[1].twod);
        $("#tenDay430pm").text(tenDayData[0].child[3].twod);
        $("#cart_set02").text(tenDayData[0].child[3].set);
        $("#cart_value02").text(tenDayData[0].child[3].value);
        $("#date").text(tenDayData[0].date);
      });
      const updateTenDayData = (index) => {
        const suffix = index;
        const dayData = tenDayData[index].child;
        if (dayData[1] && dayData[1].twod) {
          $(`#cart_set${suffix}`).text(dayData[1].set);
          $(`#cart_value${suffix}`).text(dayData[1].value);
          $(`#tenDay12am${suffix}`).text(dayData[1].twod);
        }
        if (dayData[3] && dayData[3].twod) {
          $(`#tenDay430pm${suffix}`).text(dayData[3].twod);
          $(`#cart_set2${suffix}`).text(dayData[3].set);
          $(`#cart_value2${suffix}`).text(dayData[3].value);
        }
        $(`#date${suffix}`).text(tenDayData[index].date);
      };
      for (let i = 0; i < 10; i++) {
        updateTenDayData(i);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  tendayfetchData();
  //fetch data every 24hr
  setInterval(function () {
    tendayfetchData();
  }, 5000);
});
