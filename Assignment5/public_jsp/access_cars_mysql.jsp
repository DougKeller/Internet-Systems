

<%@page import="java.sql.*"%>  

<%
Connection con;

// Class.forName("com.microsoft.jdbc.sqlserver.SQLServerDriver");

Class.forName("com.mysql.jdbc.Driver").newInstance();

 out.println("Connecting...\n <br>");


try {
 

// Open Database connection

con = DriverManager.getConnection("jdbc:mysql://db1.cs.uakron.edu:3306/xiaotest","xiaotest","wpdb");
//("jdbc:microsoft:sqlserver://130.101.10.2:1433;databasename=cs08_575","temp","temp");

 out.println("Connection established.\n <br>");

// Query Database (all queries use the same connection)
 
String sql1 =  "SELECT Year FROM Corvettes";

Statement stmt = con.createStatement();

ResultSet rs = stmt.executeQuery(sql1);


// Print a header and each record returned

out.println("Years of the Corvettes: \n <br>");

while(rs.next())
{
out.println(rs.getString("Year"));
out.println("<br>");
}
 
out.println("The END. \n <br>");

// Finished using the database instances

rs.close();

stmt.close();

con.close();

}

catch (Exception e) {

out.println(e.toString());  // Error message to display

}

%>

 

