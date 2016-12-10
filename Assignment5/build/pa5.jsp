<html>
<head>
  <title>Doug Keller - Assignment 4</title>
  <style type="text/css">
  </style>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body>
  <nav class="navbar navbar-default">
    <div class="container">
      <div class="navbar-header">
        <a class="navbar-brand">Social List</a>
      </div>
    </div>
  </nav>
  <div class="container">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First</th>
            <th>Last</th>
            <th>Phone</th>
            <th>Address</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <%@ page import="java.io.*" %>
          <%@ page import="java.sql.*" %>
          <%@ page import="java.util.Map" %>
          <%@ page import="java.util.HashMap" %>
          <%
          // Load DiverManager
          Class.forName("com.mysql.jdbc.Driver").newInstance();

          String[] fields = { "id", "first_name", "last_name", "phone_number", "address" };
          Map<String, String> form = new HashMap<String, String>();
          for (String field : fields) {
            String value = request.getParameter(field);
            if (value == null || value.equals("")) {
              value = "''";
            } else {
              value = "'" + value + "'";
            }
            form.put(field, value);
          }

          try {
            // Open Database connection
            Connection connection = DriverManager.getConnection("jdbc:mysql://db1.cs.uakron.edu:3306/ISP_dwk24","dwk24","dwkpass");
            Statement statement = connection.createStatement();

            String action = request.getParameter("action");
            if (action != null) {
              if (action.equals("create")) {
                String valueString = String.format("%s, %s, %s, %s", form.get("first_name"), form.get("last_name"), form.get("phone_number"), form.get("address"));
                statement.execute("INSERT INTO users (first_name, last_name, phone_number, address) VALUES (" + valueString + ")");
              } else if (action.equals("update")) {
                String id = request.getParameter("user_id");
                statement.executeUpdate(String.format("UPDATE users SET first_name = %s, last_name = %s, phone_number = %s, address = %s WHERE id = %s", form.get("first_name"), form.get("last_name"), form.get("phone_number"), form.get("address"), id));
              } else if (action.equals("delete")) {
                String id = request.getParameter("user_id");
                statement.execute(String.format("DELETE FROM users WHERE id = %s", id));
              }
            }

            ResultSet result = statement.executeQuery("SELECT * FROM users");

            while (result.next()) {
              String id = result.getString("id");
              out.println("<tr>");
              for (String field : fields) {
                String value = result.getString(field);
                out.println("<td id=\"" + field + id + "\">" + value + "</td>");
              }
              out.println("<td><input value=\"Edit\" type=\"button\" onclick=\"editUser(" + id + ")\" class=\"btn btn-warning\" />");
              out.println("<td><input value=\"Delete\" type=\"button\" onclick=\"deleteUser(" + id + ")\" class=\"btn btn-danger\" />");
              out.println("</tr>");
            }
            result.close();

            statement.close();
            connection.close();
          } catch (Exception e) {
            out.println(e.toString());  // Error message to display
          }
          %>
        </tbody>
      </table>
      <form id="user_form" action="pa5.jsp" method="post">
        <div class="form-group">
          <label>First Name</label>
          <input type="text" id="first_name" name="first_name" class="form-control" />
          <label>Last Name</label>
          <input type="text" id="last_name" name="last_name" class="form-control" />
          <label>Phone Number</label>
          <input type="text" id="phone_number" name="phone_number" class="form-control" />
          <label>Address</label>
          <input type="text" id="address" name="address" class="form-control" />
        </div>
        <div class="form-group">
          <input type="submit" value="Save" class="btn btn-primary" />
          <input type="reset" value="Clear" class="btn btn-default" />
        </div>

        <div style="display: none;">
          <input type="radio" name="action" id="create" value="create" checked/>
          <input type="radio" name="action" id="update" value="update" />
          <input type="radio" name="action" id="delete" value="delete" />
          <input type="number" name="user_id" id="user_id" />
        </div>
      </form>
    </div>
  </div>

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