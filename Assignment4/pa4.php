<html>
<head>
  <title>Doug Keller - Assignment 4</title>
  <style type="text/css">
  </style>
  <link rel="stylesheet" type="text/css" href="application.css">
  <link href="https://fonts.googleapis.com/css?family=Pavanam|Roboto:100" rel="stylesheet">
</head>
<body>
  <center>
    <div class="header">
      <h1>Social List</h1>
    </div>

    <form action="pa4.php" method="post" id="user_form">
      <?php
        // Connect to MySQL
        $connection = mysql_connect("db1.cs.uakron.edu:3306", "dwk24", "dwkpass");
        if (!$connection) {
          print '<span class="failure">Error - Could not connect to MySQL</span>';
           exit;
        }

        // Select the database
        $database = mysql_select_db("ISP_dwk24");
        if (!$database) {
          print '<span class="failure">Error - Could not select the database</span>';
          exit;
        }

        $GLOBALS['message'] = '';

        function executeQuery($query) {
          $result = mysql_query($query);
          if (!$result) {
              $error = mysql_error();
              $GLOBALS['message'] = '<span class="failure">Query not executed: <p>' . $error . '</p></span>';
          }
          return $result;
        }

        function createUser() {
          // Get input data
          $first_name = $_POST["first_name"];
          $last_name = $_POST["last_name"];
          $phone_number = $_POST["phone_number"];
          $address = $_POST["address"];

          $query = "INSERT INTO users (first_name, last_name, phone_number, address) VALUES ('$first_name', '$last_name', '$phone_number', '$address')";


          $GLOBALS['message'] = '<span class="success">Created User</span>';
          return executeQuery($query);
        }

        function queryUsers() {
          $query = "SELECT * FROM users";

          return executeQuery($query);
        }

        function updateUser() {
          // Get input data
          $user_id = $_POST["user_id"];
          $first_name = $_POST["first_name"];
          $last_name = $_POST["last_name"];
          $phone_number = $_POST["phone_number"];
          $address = $_POST["address"];

          $query = "UPDATE users SET first_name = '$first_name', last_name = '$last_name', phone_number = '$phone_number', address = '$address' WHERE id = $user_id";


          $GLOBALS['message'] = '<span class="success">Updated User ' . $user_id . '</span>';
          return executeQuery($query);
        }

        function deleteUser() {
          $user_id = $_POST["user_id"];
          $query = "DELETE FROM users WHERE id = $user_id";

          $GLOBALS['message'] = '<span class="success">Deleted User ' . $user_id . '</span>';
          return executeQuery($query);
        }

        $action = $_POST["action"];

        switch ($action) {
          case 'create':
            createUser();
            break;
          case 'update':
            updateUser();
            break;
          case 'delete':
            deleteUser();
            break;
        }

        // Query all users
        $users = queryUsers();

        // Display all user records
        $num_rows = mysql_num_rows($users);
        print "<h2>All Users ($num_rows)</h2>";
        print "<table>";

        $user = mysql_fetch_array($users);
        $num_fields = mysql_num_fields($users);

        // Produce the column labels

        $keys = array_keys($user);

        print '<tr align="center"><th>First Name</th><th>Last Name</th><th>Phone Number</th><th>Address</th></tr>';

        // Output the values of the fields in the rows
        for ($row_num = 0; $row_num < $num_rows; $row_num++) {
          print "<tr align='center'>";
          $values = array_values($user);

          $user_id = $values[1];

          for ($index = 0; $index < $num_fields; $index++){
            $key = $keys[2 * $index + 1];
            $value = htmlspecialchars($values[2 * $index + 1]);

            if ($key != 'id') {
              print "<td id=\"$key$user_id\">" . $value . "</td> ";
            }
          }

          // Display Edit button
          print "<td><input type=\"button\" value=\"Edit\" onclick=\"editUser($user_id);\" /></td>";

          // Display Delete button
          print "<td><input type=\"button\" class=\"danger-button\" value=\"Delete\" onclick=\"deleteUser($user_id);\"/></td>";

          print "</tr>";
          $user = mysql_fetch_array($users);
        }
        print "</table>";
      ?>

      <table>
        <tr>
          <caption><h3>User Form</h3></caption>
        </tr>
        <tr>
          <th>First Name</th>
          <td><input type="text" name="first_name" id="first_name" maxlength="30" placeholder="John" autofocus required /></td>
        </tr>
        <tr>
          <th>Last Name</th>
          <td><input type="text" name="last_name" id="last_name"  maxlength="30" placeholder="Smith" required /></td>
        </tr>
        <tr>
          <th>Phone Number</th>
          <td><input type="text" name="phone_number" id="phone_number" maxlength="14" placeholder="(xxx) xxx-xxxx" /></td>
        </tr>
        <tr>
          <th>Address</th>
          <td><input type="text" name="address" id="address" maxlength="50" placeholder="Akron, OH" /></td>
        </tr>
      </table>

      <p>
        <input type="reset" value="Clear" />
        <input type="submit" value="Save" />
      </p>

      <?php
        print $message;
      ?>

      <div style="display: none;">
        <input type="radio" name="action" id="create" value="create" checked/>
        <input type="radio" name="action" id="update" value="update" />
        <input type="radio" name="action" id="delete" value="delete" />
        <input type="number" name="user_id" id="user_id" />
      </div>
    </form>
  </center>

  <script>
    function setAction(action) {
      document.getElementById(action).checked = true;
    }

    function setUserId(userId) {
      document.getElementById('user_id').value = userId;
    }

    function createUser() {
      setAction('create');
    }

    function editUser(userId) {
      setAction('update');
      setUserId(userId);

      var elementIds = ['first_name', 'last_name', 'phone_number', 'address'];
      elementIds.forEach(function(elementId) {
        var userValue = document.getElementById(elementId + userId).innerHTML;
        var formElement = document.getElementById(elementId);
        formElement.value = userValue;
      });
    }

    function deleteUser(userId) {
      if (window.confirm('Are you sure you want to delete this user?')) {
        setAction('delete');
        setUserId(userId);
        document.getElementById('user_form').submit();
      }
    }
  </script>
</body>
</html>
