var db;
    window.onload = function(){
    document.getElementById('Submit').addEventListener('click',onSubmit);
    db = window.openDatabase("mydatabase","1.0","My DataBase",2*1024*1024);
    }
    function onSubmit(event){
    db.transaction(saveData);
    }
    function saveData(transaction){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var city = document.getElementById('city').value;
    alert(name+email+phone+city);
    transaction.executeSql("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,email TEXT NOT NULL,phone INTEGER NOT NULL , city TEXT NOT NULL )");
    var sql="INSERT INTO users(name, email, phone, city) VALUES('"+name+"','"+email+"','"+phone+"','"+city+"')";
    transaction.executeSql(sql,[],onSuccess,onError);
    }
    function onSuccess(){
    alert("Data Saved !");
    }
    function onError(e){
    console.log("Error Occured" +e);
    }
    
    function GetBusinessData(transaction) {
        db.transaction(function(transaction) {
    alert();
    var rows="";
    transaction.executeSql("SELECT * FROM users",[],
    function(tx, result) {
    var dataLength = result.rows.length;
    console.log(result.rows);
    
    if(dataLength  > 0){
       /* var header += "<tr>"
        + "<td> Id </td>"
        + "<td> Name </td>"
        + "<td> Email </td>"
        + "<td> Phone </td>"
        + "<td> City </td>"
    + "</tr>"; */

//$('#tblProducts thead').append(header);
    $.each(result.rows, function( index, value ) {
    //console.log(value);
    console.log(value.name);
    console.log(value.email);
    console.log(value.phone);
    console.log(value.city);
    rows += "<tr>"
        + "<td>" + value.id + "</td>"
        + "<td>" + value.name + "</td>"
        + "<td>" + value.email + "</td>"
        + "<td>" + value.phone + "</td>"
        + "<td>" + value.city + "</td>"
        + "<td> <a href='editUser(value.id)'>Edit</a> </td>"
        + "<td><a onclick='deleteUser("+value.id+")'>Delete</a> </td>"
    + "</tr>";
    });
    
    $('#tblProducts tbody').append(rows);
    //console.log(result.rows.item(0).Name);
    //alert(result.rows.item(0).Name);
    }else{
    console.log("No business found having this business id");
    }
    },
    function(error) {
    console.log("Error occurred while getting the data");
    });
    });
    }
    /*transaction.executeSql(,[],
    function(tx, result) {
    var dataLength = result.rows.length;
    alert(dataLength);
    if(dataLength  > 0){
    var businessName = result.rows.item(0).business_name;
    alert(businessName);
    }else{
    alert("No business found having this business id.");
    }
    },
    function(error) {
    alert("Error occurred while getting the data.");
    });*/
      function RefreshRegistration() {

        $("#TableData").html("");

        db.transaction(function (transaction) {

            transaction.executeSql('SELECT * FROM users', [], function (tx, results) {

                var len = results.rows.length, i;

                $("#rowCount").html(len);

                for (i = 0; i < len; i++) {

                    $("#TableData").append("<tr><td>" + results.rows.item(i).Id + "</td><td>" + results.rows.item(i).FirstName + "</td><td>" + results.rows.item(i).LastName + "</td><td><a class='edit' href='#' id='edit_" + results.rows.item(i).Id + "'>Edit</a> &nbsp;&nbsp; <a class='delete' href='#' id='" + results.rows.item(i).Id + "'>Delete</a></td></tr>");

                }

            }, null);

        });

    }
    function deleteUser(id)
    {
         if (confirm("Do you want to delete")) {

 

            var id = id;

            db.transaction(function (transaction) {

                var executeQuery = "DELETE FROM users where Id=?";

                transaction.executeSql(executeQuery, [id],

                  //Success

                  function (tx, result) {
window.location.replace("https://www.google.com/");
//GetBusinessData();
                    /*RefreshRegistration();

                      ClearControl();
*/
                      alert('Delete successfully');

                  },

                  //Error

                  function (error) { alert('Data not deleted.'); });

            });

        }

        }