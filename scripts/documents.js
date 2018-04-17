  $(document).ready(function() {
  $.ajax({
    url:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTAcWNVWcj_IJbN66RvMSW4ICrxBr0SH2VGncgSV8RhJ9rK7Qxq4Hwf4E9UslfDdE2N5TsFwUfKk_r8/pub?gid=0&single=true&output=csv",
    dataType: "text",
    success: function(data) {
      var employee_data = data.split(/\r?\n|\r/);
      var table_data = '<table id="myTable" class="table table-bordered table-striped">';
      for (var count = 0; count < employee_data.length; count++) {
        var cell_data = employee_data[count].split(",");
        table_data += "<tr>";
        for (var cell_count = 0; cell_count < cell_data.length; cell_count++) {
          if (cell_data[cell_count] === "") {
            table_data += "<td>--</td>";
          } else {
            if (count === 0) {
              table_data += "<th>" + cell_data[cell_count] + "</th>";
            } else if (cell_count === 3) {
              table_data +=
                '<td><a href="' + cell_data[cell_count] + '">Source</a></td>';
            } else if (cell_count === 10) {
              table_data += '<td><button onclick="appData(' + cell_data[cell_count] + ')">Download</button></td>';
            } else {
              table_data += "<td>" + cell_data[cell_count] + "</td>";
            }
          }
        }
        table_data += "</tr>";
      }
      table_data += "</table>";
      $("#app-list").html(table_data);
    }
  });
});

  var type = 0;
  function filterApps(type) {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[type];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  /* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
  var dropdown = document.getElementsByClassName("dropdown-btn");
  var i;
  for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    });
  }
