$(function () {
  function createTimeBlock(hour) {
    var timeBlock = $("<div>").addClass("row time-block");
    var hourCol = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(hour.format("hA"));
    var descriptionCol = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", 3);

    // Determine if the time block is in the past, present, or future
    if (currentDate.isSame(hour, "hour")) {
      descriptionCol.addClass("present");
    } else if (currentDate.isAfter(hour, "hour")) {
      descriptionCol.addClass("past");
    } else {
      descriptionCol.addClass("future");
    }

    var saveBtnCol = $("<button>")
      .addClass("btn saveBtn col-2 col-md-1")
      .attr("aria-label", "save")
      .html('<i class="fas fa-save" aria-hidden="true"></i>');

    var savedEvent = localStorage.getItem("event_" + hour.hour());
    if (savedEvent) {
      descriptionCol.val(savedEvent);
    }

    saveBtnCol.on("click", function () {
      var eventText = $(this).siblings(".description").val();
      localStorage.setItem("event_" + hour.hour(), eventText);
    });

    timeBlock.append(hourCol, descriptionCol, saveBtnCol);
    $(".container-fluid").append(timeBlock);
  }

  var currentDate = dayjs();
  $("#currentDay").text(currentDate.format("dddd, MMMM D, YYYY"));

  for (var hour = 9; hour <= 17; hour++) {
    createTimeBlock(currentDate.hour(hour).startOf("hour"));
  }
});
