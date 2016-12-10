<html>
<head>
<title>Database Management 475/575</title>
</head>

<%@ page import="java.sql.*" %>
<%
Connection con; 
Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

out.println("Connecting...\n <br>");
try
{
       // Open Database connection
       con = DriverManager.getConnection("jdbc:sqlserver://winserv1.cs.uakron.edu:1433;databasename=xiaotest","xiaotest","xiao1995");     

       out.println("Connection established.\n <br>");
       out.flush();

       // Query Database (all queries use the same connection)
       String sql1 =  "SELECT Year FROM Corvettes";

       Statement stmt = con.createStatement();
       ResultSet rs = stmt.executeQuery(sql1);


       // Print a header and each record returned
       out.println("Items in the database: \n <br>");

       while(rs.next())
       {
               out.println(rs.getString("Year"));
               out.println("<br>");
       }


       // Finished using the database instances
       rs.close();
       stmt.close();
       con.close();

}

catch (Exception e)
{
       out.println(e.toString());  // Error message to display
}

%>



</html>