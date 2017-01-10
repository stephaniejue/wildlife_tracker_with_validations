$(document).ready(function(){
  $("#create_animal").on("click", function(){
    var common_name = $("#animal_common_name").val();
    var latin_name = $("#animal_latin_name").val();
    var kingdom = $("#animal_kingdom").val();
    var image = $("#animal_image").val();
    console.log(image);

    newAnimal = {
      "animal": {
        "common_name": common_name,
        "latin_name": latin_name,
        "kingdom": kingdom,
        "image": image
      }
    }
    $.ajax({
      dataType: 'json',
      url: '/animals',
      method: 'POST',
      data: newAnimal,
      success: function(dataFromServer){
        alert("recived message:" + JSON.stringify(dataFromServer));
        $("#animal_list > tbody:last-child").append("<tr><td>" + dataFromServer.common_name + "</td>" + "<td>" + dataFromServer.latin_name + "</td>" + "<td>" + dataFromServer.kingdom + "</td>" +
        // "<td><a href='/animals/" + dataFromServer.id + "'>Show</a></td>" +
        "<td><a href='/animals/" + dataFromServer.id + "/edit'>Edit</a></td>" +
        "<td><a data-confirm='Are you sure?' rel='nofollow' data-method='delete' href='/animals/" + dataFromServer.id + "'>Destroy</a></td></tr>");
      },
      error: function(jqHXR, textStatus, errorThrown){
        alert("add new animal failed:" + errorThrown);
      }
    });
  });

  $("#create_sighting").on("click", function(){
    var year = $("#sighting_date_1i").val();
    var month = $("#sighting_date_2i").val();
    var day = $("#sighting_date_3i").val();
    var hour = $("#sighting_date_4i").val();
    var minute = $("#sighting_date_5i").val();
    var time = "2000-01-01T" + hour + ":" + minute + ":00.000Z";
    var date = year + "-" + month + "-" + day + " " + time;
    var latitude = $("#sighting_latitude").val();
    var longitude = $("#sighting_longitude").val();
    var region_id = $("#sighting_region_id").val();
    var region_name = $("#sighting_region_id option:selected").text();
    var animal_id = $("#animal_id").val();

    newSighting = {
      "sighting": {
        "date": date,
        "latitude": latitude,
        "longitude": longitude,
        "region_id": region_id,
        "animal_id": animal_id
      }
    }

    $.ajax({
      dataType: 'json',
      url: '/sightings',
      method: 'POST',
      data: newSighting,
      success: function(dataFromServer){
        alert("recived message:" + JSON.stringify(dataFromServer));
        var date = dataFromServer.date.substring(0,10).split("-")[1] + "/" + dataFromServer.date.substring(0,10).split("-")[2] + "/" + dataFromServer.date.substring(0,10).split("-")[0];

        var time = dataFromServer.date.substring((dataFromServer.date.indexOf("T") + 1), dataFromServer.date.length - 8);

        dataFromServer.date.replace("T", " ");


        var region = dataFromServer.region_id.region

        $("#sighting_list > tbody:last-child").append("<tr><td>" + date + " " + time + "</td>" + "<td>" + dataFromServer.longitude + "</td>" + "<td>" + dataFromServer.latitude + "</td>" + "<td>" + region_name + "</td></tr>");
      },
      error: function(jqHXR, textStatus, errorThrown){
        alert("add new sighting failed:" + errorThrown);
      }
    });
  });


});
